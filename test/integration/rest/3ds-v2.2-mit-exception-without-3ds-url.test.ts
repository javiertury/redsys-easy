/*
 * There is extrange about this card or this test
 *
 * It's supposedly a 3DS v2.2 with MIT exception, but it asks for a 3DS v1 with challenge
 */

import { fetch } from 'undici';
import { threeDSv22FrictionlessMitWithout3DSURL } from '../../fixtures/cards';
import {
  createRedsysAPI,
  TRANSACTION_TYPES,
  randomTransactionId,
  SANDBOX_URLS,
  create3DSv2ChallengeForm
} from 'redsys-easy';

import type {
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams
} from 'redsys-easy';

import type {
  ThreeDSv2ChallengeSolutionNotificationOutputParams
} from '../../../src/types/3ds-params';

import {
  encodePostParams
} from '../utils';

import {
  assert3DSv2CardConfig,
  assert3DSv2ChallengeRequest,
  createChallengeFinalForm,
  createThreeDSv2ChallengeNotificationFromBody,
  extractChallengeVariables
} from '../3ds';

import {
  clientPostHeaders,
  clientBrowserFullInfo
} from '../../fixtures/client';
import settings from '../settings';

const {
  threeDS
} = settings;

const {
  secretKey,
  merchantData,
  card
} = threeDSv22FrictionlessMitWithout3DSURL;

const {
  restIniciaPeticion,
  restTrataPeticion
} = createRedsysAPI({
  urls: SANDBOX_URLS,
  secretKey
});

describe('Rest 3DS v2.2 MIT exception', () => {
  let infoResult: RestIniciaPeticionOutputParams | undefined;

  const baseParams = {
    // amount in smallest currency unit(cents)
    // 33.50€
    DS_MERCHANT_AMOUNT: '3350',
    DS_MERCHANT_CURRENCY: '978',
    DS_MERCHANT_MERCHANTCODE: merchantData.merchantCode,
    DS_MERCHANT_TERMINAL: merchantData.terminal,
    DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.AUTHORIZATION
  } as const;

  const initialParams = {
    ...baseParams,
    DS_MERCHANT_ORDER: randomTransactionId(),
    Ds_Merchant_Identifier: 'REQUIRED',
    DS_MERCHANT_PAN: card.pan,
    DS_MERCHANT_EXPIRYDATE: `${card.expiryYear}${card.expiryMonth}`,
    DS_MERCHANT_CVV2: card.cvv,
    DS_MERCHANT_COF_TYPE: 'R',
    DS_MERCHANT_COF_INI: 'S'
  } as const;

  it('should obtain preauth info', async () => {
    const params = {
      ...initialParams,
      DS_MERCHANT_EXCEP_SCA: 'Y',
      DS_MERCHANT_EMV3DS: {
        threeDSInfo: 'CardData'
      }
    } as const;

    const result = infoResult = await restIniciaPeticion(params);

    expect(result).toEqual({
      Ds_Order: params.DS_MERCHANT_ORDER,
      Ds_MerchantCode: params.DS_MERCHANT_MERCHANTCODE,
      Ds_Terminal: params.DS_MERCHANT_TERMINAL,
      Ds_TransactionType: params.DS_MERCHANT_TRANSACTIONTYPE,
      Ds_Card_PSD2: 'Y',
      Ds_Excep_SCA: 'LWV;TRA[30.0];COR;MIT;ATD',
      Ds_EMV3DS: {
        protocolVersion: '2.2.0',
        threeDSInfo: 'CardConfiguration',
        threeDSServerTransID: expect.stringMatching(/^[0-9a-f-]+$/) as string
      }
    });
  });

  let challengeRequestResult: RestTrataPeticionOutputParams | undefined;

  it('should obtain challenge url', async () => {
    assert3DSv2CardConfig(infoResult);

    const params = {
      ...initialParams,
      DS_MERCHANT_EMV3DS: {
        threeDSInfo: 'AuthenticationData',
        protocolVersion: '2.2.0',
        ...clientBrowserFullInfo,
        threeDSServerTransID: infoResult.Ds_EMV3DS.threeDSServerTransID,
        notificationURL: threeDS.challengeV2URL,
        threeDSCompInd: 'U'
      }
    } as const;

    const result = challengeRequestResult = await restTrataPeticion(params);

    expect(result).toEqual({
      Ds_Order: params.DS_MERCHANT_ORDER,
      Ds_MerchantCode: params.DS_MERCHANT_MERCHANTCODE,
      Ds_Terminal: params.DS_MERCHANT_TERMINAL,
      Ds_TransactionType: params.DS_MERCHANT_TRANSACTIONTYPE,
      Ds_Amount: params.DS_MERCHANT_AMOUNT,
      Ds_Currency: params.DS_MERCHANT_CURRENCY,
      Ds_EMV3DS: {
        protocolVersion: '2.2.0',
        threeDSInfo: 'ChallengeRequest',
        acsURL: 'https://sis-d.redsys.es/sis-simulador-web/authenticationRequest.jsp',
        creq: expect.stringMatching(/^[0-9a-zA-Z+/=]+$/) as string
      }
    });
  });

  let challengeSolution: ThreeDSv2ChallengeSolutionNotificationOutputParams | undefined;

  it('should solve challenge', async () => {
    assert3DSv2ChallengeRequest(challengeRequestResult);
    const challengeInitForm = create3DSv2ChallengeForm(challengeRequestResult.Ds_EMV3DS);

    // Fetch challenge page
    const challengeInitRes = await fetch(challengeInitForm.url, {
      method: 'POST',
      body: encodePostParams(challengeInitForm.body),
      headers: clientPostHeaders
    });
    expect(challengeInitRes.status).toEqual(200);

    const responseText = await challengeInitRes.text();
    const challengeVariables = extractChallengeVariables(responseText);
    expect(challengeVariables.notificationURL).toEqual(threeDS.challengeV2URL);

    const cResSend = {
      threeDSServerTransID: challengeVariables.threeDSServerTransID,
      acsTransID: challengeVariables.acsTransID,
      messageType: 'CRes',
      messageVersion: '2.1.0',
      transStatus: 'Y'
    } as const;

    const challengeForm = createChallengeFinalForm(cResSend);

    // Fetch 3DSMethod page
    const challengeEndRes = await fetch(challengeForm.url, {
      method: 'POST',
      body: encodePostParams(challengeForm.body),
      headers: clientPostHeaders
    });
    expect(challengeEndRes.status).toEqual(200);

    const notificationFormBody = createThreeDSv2ChallengeNotificationFromBody(cResSend);
    challengeSolution = notificationFormBody;
  });

  let firstTransactionResult: RestTrataPeticionOutputParams | undefined;

  it('should transact and obtain COF identifier', async () => {
    if (challengeSolution === undefined) {
      throw new Error('Missing challenge solution');
    }

    const params = {
      ...initialParams,
      DS_MERCHANT_EMV3DS: {
        protocolVersion: '2.1.0',
        threeDSInfo: 'ChallengeResponse',
        cres: challengeSolution.cres
      }
    } as const;

    const result = firstTransactionResult = await restTrataPeticion(params);

    const dsControlEntry = Object.entries(result).find(([k,_v]) => k.startsWith('Ds_Control_'));

    if (dsControlEntry == null) {
      throw new Error('Undefined Ds_Control key');
    }

    expect(result).toEqual({
      Ds_Amount: '3350',
      Ds_Currency: '978',
      Ds_Order: params.DS_MERCHANT_ORDER,
      Ds_MerchantCode: params.DS_MERCHANT_MERCHANTCODE,
      Ds_Terminal: params.DS_MERCHANT_TERMINAL,
      Ds_TransactionType: params.DS_MERCHANT_TRANSACTIONTYPE,
      Ds_ExpiryDate: params.DS_MERCHANT_EXPIRYDATE,
      Ds_CardNumber: '454881******5114',
      Ds_Card_Brand: '1',
      Ds_Card_Country: '724',
      Ds_AuthorisationCode: expect.stringMatching(/^[0-9]+$/) as string,
      Ds_Language: '1',
      Ds_MerchantData: '',
      Ds_ProcessedPayMethod: '78',
      Ds_Response: '0000',
      Ds_SecurePayment: '2',
      Ds_Merchant_Cof_Txnid: expect.stringMatching(/^[0-9]+$/) as string,
      Ds_Merchant_Identifier: expect.stringMatching(/^[0-9a-f]+$/) as string,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [dsControlEntry[0]]: dsControlEntry[1]
    });
  });

  it('should transact frictionless with MIT exception', async () => {
    if (firstTransactionResult === undefined) {
      throw new Error('Missing initial transaction result');
    }

    const params = {
      ...baseParams,
      DS_MERCHANT_DIRECTPAYMENT: 'true',
      DS_MERCHANT_ORDER: randomTransactionId(),
      DS_MERCHANT_COF_INI: 'N',
      DS_MERCHANT_COF_TXNID: firstTransactionResult.Ds_Merchant_Cof_Txnid,
      DS_MERCHANT_IDENTIFIER: firstTransactionResult.Ds_Merchant_Identifier,
      DS_MERCHANT_EXCEP_SCA: 'MIT'
    } as const;

    const result = await restTrataPeticion(params);

    const dsControlEntry = Object.entries(result).find(([k,_v]) => k.startsWith('Ds_Control_'));

    if (dsControlEntry == null) {
      throw new Error('Undefined Ds_Control key');
    }

    expect(result).toEqual({
      Ds_Amount: '3350',
      Ds_Currency: '978',
      Ds_Order: params.DS_MERCHANT_ORDER,
      Ds_MerchantCode: params.DS_MERCHANT_MERCHANTCODE,
      Ds_Terminal: params.DS_MERCHANT_TERMINAL,
      Ds_TransactionType: params.DS_MERCHANT_TRANSACTIONTYPE,
      Ds_CardNumber: '454881******5114',
      Ds_Card_Brand: '1',
      Ds_Card_Country: '724',
      Ds_AuthorisationCode: expect.stringMatching(/^[0-9]+$/) as string,
      Ds_Language: '1',
      Ds_MerchantData: '',
      Ds_ProcessedPayMethod: '3',
      Ds_Response: '0000',
      Ds_SecurePayment: '0',
      Ds_Merchant_Identifier: expect.stringMatching(/^[0-9a-f]+$/) as string,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [dsControlEntry[0]]: dsControlEntry[1]
    });
  });
});
