import type { AppMiddleware } from '../../types/app';
import type { AuthBody, AuthOutput } from '../../types/routes';
import type {
  RestTrataPeticionInputParams
} from 'redsys-easy';
import {
  TRANSACTION_TYPES,
  create3DSv1ChallengeForm,
  create3DSv2ChallengeForm,
  assertSuccessfulResponse
} from 'redsys-easy';
import {
  createBasicRedsysOrderParams
} from '../../utils';
import {
  restTrataPeticion,
  merchantInfo,
  challengeV1URL,
  challengeV2URL
} from '../../redsys';

/*
 * Start a 3DS payment transaction for an order
 *
 * Depending on the *threeDSProtocolVersion* returned by preauth, the are two
 * scenarios.
 *
 * If *threeDSProtocolVersion* was '1.0.2' or 'none', the input looks like this.
 *
 * {
 *   transactionData: {
 *     type: 'regular',
 *     orderId: '12345', // Obtained from checkout and used in also in preauth
 *     threeDSProtocolVersion: 'none', // Obtained from preauth
 *     cardData: {
 *       pan: '4548812049400004',
 *       expiryYear: '34',
 *       expiryMonth: '12',
 *       cvv: '123'
 *     }
 *   }
 * }
 *
 * If *threeDSProtocolVersion* was '2.1.0' or '2.2.0', preauth should have also
 * returned a *threeDSServerTransID* and the input looks like this.
 *
 * {
 *   transactionData: {
 *     type: '3ds-v2',
 *     threeDSServerTransID: '123e4567-e89b-12d3-a456-426614174000'
 *   }
 * }
 *
 * If Insite integration was used to obtain a DS_MERCHANT_IDOPER, the input
 * looks like this.
 *
 * {
 *   transactionData: {
 *     type: 'id-oper',
 *     orderId: '12345', // Obtained from checkout
 *     idOper: 'a091f0f9f0aaf0506930dda4a6974f1df4a0d9c1'
 *   }
 * }
 */
export const authHandler: AppMiddleware = async ({ request, response, db }, next) => {
  const {
    transactionData,
    clientInfo: clientBrowserInfo
  } = request.body as unknown as AuthBody;

  let params: RestTrataPeticionInputParams;
  let requestParams: RestTrataPeticionInputParams;

  if (transactionData.type === 'regular') {
    const { orderId, paymentMethod, threeDSProtocolVersion } = transactionData;

    // Never trust the frontend, recover order data from database using orderId
    const orderData = db.orders.findOneByOrderId(orderId);

    if (!orderData) {
      throw new Error(`Unknown order ${orderId}`);
    }

    const orderParams = createBasicRedsysOrderParams(orderData);

    params = {
      ...merchantInfo,
      ...orderParams, // Inclues orderId, amount and currency
      DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.AUTHORIZATION,
      ...(paymentMethod.type === 'card-data'
        ? {
          DS_MERCHANT_PAN: paymentMethod.pan,
          DS_MERCHANT_EXPIRYDATE: `${paymentMethod.expiryYear}${paymentMethod.expiryMonth}`,
          DS_MERCHANT_CVV2: paymentMethod.cvv
        }
        : {
          DS_MERCHANT_IDOPER: paymentMethod.idOper
        }
      )
    };

    requestParams = {
      ...params,
      ...(threeDSProtocolVersion === '1.0.2'
        ? {
          DS_MERCHANT_EMV3DS: {
            threeDSInfo: 'AuthenticationData',
            protocolVersion: '1.0.2',
            browserAcceptHeader: request.headers['accept'] as string,
            browserUserAgent: request.headers['user-agent'] as string
          }
        }
        : undefined
      )
    };
  } else if (transactionData.type === '3ds-v2') {
    const { threeDSServerTransID } = transactionData;

    // Never trust the frontend, recover order data from database using threeDSServerTransID
    const threeDSInfo = db.threeDSv2Transactions.findOneBy3DSServerTransID(threeDSServerTransID);

    if (!threeDSInfo) {
      throw new Error('Unknown 3DS transaction ID');
    }

    params = { ...threeDSInfo.params };
    requestParams = {
      ...params,
      DS_MERCHANT_EMV3DS: {
        // Fill information about client
        ...(clientBrowserInfo
          ? {
            ...clientBrowserInfo,
            browserJavascriptEnabled: true
          }
          : {
            browserLanguage: request.acceptsLanguages()[0] as string,
            browserColorDepth: '1',
            browserScreenHeight: '0',
            browserScreenWidth: '0',
            browserTZ: '0',
            browserJavaEnabled: false,
            browserJavascriptEnabled: false
          }
        ),
        browserUserAgent: request.headers['user-agent'] as string,
        browserAcceptHeader: request.headers['accept'] as string,
        // Fill elemental 3DS information
        threeDSInfo: 'AuthenticationData',
        protocolVersion: threeDSInfo.protocolVersion,
        threeDSServerTransID: threeDSServerTransID,
        notificationURL: `${challengeV2URL}?orderId=${threeDSInfo.orderId}`,
        threeDSCompInd: (threeDSInfo?.hasCompleted3DSMethod ?? false) ? 'Y' : 'N'
      }
    };
  } else {
    throw new Error('Unknown transaction type');
  }

  const orderId = requestParams.DS_MERCHANT_ORDER;

  const result = await restTrataPeticion(requestParams);

  let output: AuthOutput;

  if (result.Ds_EMV3DS) {
    // Send challenge form to client
    if (result.Ds_EMV3DS.threeDSInfo !== 'ChallengeRequest') {
      throw new Error(`Unexpected threeDSInfo ${result.Ds_EMV3DS.threeDSInfo as string}`);
    }

    switch (result.Ds_EMV3DS.protocolVersion) {
      case '1.0.2': {
        const form = create3DSv1ChallengeForm(result.Ds_EMV3DS, `${challengeV1URL}?orderId=${orderId}`);
        db.threeDSv1Challenges.insert({
          MD: result.Ds_EMV3DS.MD,
          params
        });
        output = { orderId, status: 'challenge', formVersion: '1', form };
        break;
      }
      case '2.1.0':
      case '2.2.0': {
        const form = create3DSv2ChallengeForm(result.Ds_EMV3DS);
        output = { orderId, status: 'challenge', formVersion: '2', form };
        break;
      }
      default: {
        throw new Error(`Unknown 3DS protocol version: ${(result.Ds_EMV3DS as Record<string, string>)['protocolVersion'] as string}`);
      }
    }
  } else {
    assertSuccessfulResponse(result);

    db.orders.update(orderId, { status: 'payed' });

    // Success, we are done!
    output = { orderId, status: 'done' };
  }

  response.status = 200;
  response.body = output;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next();
};
