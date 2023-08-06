import type { AppMiddleware } from '../../types/app';
import type { PreauthBody, PreauthOutput } from '../../types/routes';
import { createBasicRedsysOrderParams } from '../../utils';
import {
  restIniciaPeticion,
  merchantInfo,
  threeDSMethodUrl
} from '../../redsys';

import {
  TRANSACTION_TYPES,
  create3DSMethodForm
} from 'redsys-easy';

import type {
  RestIniciaPeticionInputParams
} from 'redsys-easy';

/**
 * Obtains preliminary information about the type of 3DS transaction needed to pay for an order
 *
 * The input looks like this.
 *
 * {
 *   orderId: '123456', // Obtained from checkout endpoint
 *   cardData: {
 *     pan: '4548812049400004',
 *     expiryYear: '34',
 *     expiryMonth: '12',
 *     cvv: '123'
 *   }
 * }
 */
export const preauthHandler: AppMiddleware = async ({ request, response, db }, next) => {
  const {
    orderId,
    transactionData
  } = request.body as unknown as PreauthBody;

  // Never trust the frontend, recover order data from database using orderId
  const orderData = db.orders.findOneByOrderId(orderId);

  if (!orderData) {
    throw new Error(`Unknown order ${orderId}`);
  }

  const orderParams = createBasicRedsysOrderParams(orderData);

  const params: RestIniciaPeticionInputParams = {
    ...merchantInfo,
    ...orderParams, // Inclues orderId, amount and currency
    DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.AUTHORIZATION
  } as const;

  if (transactionData.type === 'id-oper') {
    const { idOper } = transactionData;
    params.DS_MERCHANT_IDOPER = idOper;
  } else if (transactionData.type === 'regular') {
    const { pan, expiryYear, expiryMonth, cvv } = transactionData;

    params.DS_MERCHANT_PAN = pan;
    params.DS_MERCHANT_EXPIRYDATE = `${expiryYear}${expiryMonth}`;
    params.DS_MERCHANT_CVV2 = cvv;
  } else {
    throw new Error(`Unknown transaction type ${(transactionData as Record<string, string>)['type'] as string}`);
  }

  /** Pre-auth information */
  const infoResult = await restIniciaPeticion({
    ...params,
    DS_MERCHANT_EMV3DS: {
      threeDSInfo: 'CardData'
    }
  });

  let output: PreauthOutput;

  if (
    infoResult.Ds_EMV3DS == null ||
    (
      infoResult.Ds_EMV3DS.protocolVersion !== '2.1.0' &&
      infoResult.Ds_EMV3DS.protocolVersion !== '2.2.0'
    )
  ) {
    output = {
      // Inform the frontend about the 3DS version used
      // Rename "NO_3DS_v2" to 1.0.2
      threeDSProtocolVersion: infoResult.Ds_EMV3DS?.protocolVersion === 'NO_3DS_v2'
        ? '1.0.2'
        : 'none'
    };
  } else {
    // Keep track of the 3DS v2 transaction
    db.threeDSv2Transactions.insert({
      orderId,
      protocolVersion: infoResult.Ds_EMV3DS.protocolVersion,
      threeDSServerTransID: infoResult.Ds_EMV3DS.threeDSServerTransID,
      hasCompleted3DSMethod: false,
      params
    });

    if (
      'threeDSMethodURL' in infoResult.Ds_EMV3DS &&
      infoResult.Ds_EMV3DS.threeDSMethodURL != null
    ) {
      // 3DS method required

      output = {
        // Inform the frontend about the 3DS version used
        threeDSProtocolVersion: infoResult.Ds_EMV3DS.protocolVersion,
        threeDSServerTransID: infoResult.Ds_EMV3DS.threeDSServerTransID,
        // Data for 3DS method
        // The frontend should create an iframe and use a POST request to submit this data
        threeDSMethodForm: create3DSMethodForm(infoResult.Ds_EMV3DS, `${threeDSMethodUrl}?orderId=${orderId}`)
      };
    } else {
      output = {
        // Inform the frontend about the 3DS version used
        threeDSProtocolVersion: infoResult.Ds_EMV3DS.protocolVersion,
        threeDSServerTransID: infoResult.Ds_EMV3DS.threeDSServerTransID
      };
    }
  }

  response.status = 200;
  response.body = output;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next();
};
