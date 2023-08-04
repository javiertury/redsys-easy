import { fetch } from 'undici';
import cheerio from 'cheerio';
import { threeDSv21Challenge } from '../../fixtures/cards';
import {
  createRedsysAPI,
  TRANSACTION_TYPES,
  randomTransactionId,
  SANDBOX_URLS,
  create3DSMethodForm,
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
  createChallengeFinalForm,
  extractChallengeVariables,
  createThreeDSv2ChallengeNotificationFromBody,
  assert3DSv2CardConfig,
  assert3DSv2WithMethodCardConfig,
  assert3DSv2ChallengeRequest
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
} = threeDSv21Challenge;

const {
  restIniciaPeticion,
  restTrataPeticion
} = createRedsysAPI({
  urls: SANDBOX_URLS,
  secretKey
});

describe('Rest 3DS v2.1 challenge', () => {
  let infoResult: RestIniciaPeticionOutputParams | undefined;

  const baseParams = {
    // amount in smallest currency unit(cents)
    // 33.50€
    DS_MERCHANT_AMOUNT: '3350',
    DS_MERCHANT_CURRENCY: '978',
    DS_MERCHANT_MERCHANTCODE: merchantData.merchantCode,
    DS_MERCHANT_TERMINAL: merchantData.terminal,
    DS_MERCHANT_ORDER: randomTransactionId(),
    DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.AUTHORIZATION,
    DS_MERCHANT_PAN: card.pan,
    DS_MERCHANT_EXPIRYDATE: `${card.expiryYear}${card.expiryMonth}`,
    DS_MERCHANT_CVV2: card.cvv
  } as const;

  it('should obtain preauth info', async () => {
    const params = {
      ...baseParams,
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
      Ds_EMV3DS: {
        protocolVersion: '2.1.0',
        threeDSInfo: 'CardConfiguration',
        threeDSMethodURL: 'https://sis-d.redsys.es/sis-simulador-web/threeDsMethod.jsp',
        threeDSServerTransID: expect.stringMatching(/^[0-9a-f-]+$/) as string
      }
    });
  });

  it('should execute 3DSMethod', async () => {
    assert3DSv2WithMethodCardConfig(infoResult);
    const form = create3DSMethodForm(infoResult.Ds_EMV3DS, threeDS.methodURL);

    // Fetch 3DSMethod page
    const res = await fetch(form.url, {
      method: 'POST',
      body: encodePostParams(form.body),
      headers: clientPostHeaders
    });
    expect(res.status).toEqual(200);

    const text = await res.text();
    const $ = cheerio.load(text);

    const methodFinalPostURL = $('form[name=frm1]').attr('action');
    const threeDSMethodData = $('input[name=threeDSMethodData]').attr('value') as string;

    expect(methodFinalPostURL).toEqual(threeDS.methodURL);
    expect(threeDSMethodData).toEqual(form.body.threeDSMethodData);
  });

  let challengeRequestResult: RestTrataPeticionOutputParams | undefined;

  it('should obtain challenge url', async () => {
    assert3DSv2CardConfig(infoResult);

    const params = {
      ...baseParams,
      DS_MERCHANT_EMV3DS: {
        threeDSInfo: 'AuthenticationData',
        protocolVersion: '2.1.0',
        ...clientBrowserFullInfo,
        threeDSServerTransID: infoResult.Ds_EMV3DS.threeDSServerTransID,
        notificationURL: threeDS.challengeV2URL,
        threeDSCompInd: 'Y'
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
        protocolVersion: '2.1.0',
        threeDSInfo: 'ChallengeRequest',
        acsURL: 'https://sis-d.redsys.es/sis-simulador-web/authenticationRequest.jsp',
        creq: expect.stringMatching(/^[0-9a-zA-Z]+$/) as string
      }
    });
  });

  let challengeSolution: ThreeDSv2ChallengeSolutionNotificationOutputParams;

  it('should solve challenge', async () => {
    assert3DSv2ChallengeRequest(challengeRequestResult);
    const form = create3DSv2ChallengeForm(challengeRequestResult.Ds_EMV3DS);

    // Fetch challenge page
    const challengeInitRes = await fetch(form.url, {
      method: 'POST',
      body: encodePostParams(form.body),
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

  it('should transact', async () => {
    if (challengeSolution === undefined) {
      throw new Error('Missing challenge solution');
    }

    const params = {
      ...baseParams,
      DS_MERCHANT_EMV3DS: {
        protocolVersion: '2.1.0',
        threeDSInfo: 'ChallengeResponse',
        cres: challengeSolution.cres
      }
    } as const;

    const result = await restTrataPeticion(params);
    expect(result).toEqual({
      Ds_Amount: '3350',
      Ds_Currency: '978',
      Ds_Order: params.DS_MERCHANT_ORDER,
      Ds_MerchantCode: params.DS_MERCHANT_MERCHANTCODE,
      Ds_Terminal: params.DS_MERCHANT_TERMINAL,
      Ds_TransactionType: params.DS_MERCHANT_TRANSACTIONTYPE,
      Ds_CardNumber: '491801******3839',
      Ds_Card_Brand: '1',
      Ds_Card_Country: '724',
      Ds_AuthorisationCode: expect.stringMatching(/^[0-9]+$/) as string,
      Ds_Language: '1',
      Ds_MerchantData: '',
      Ds_ProcessedPayMethod: '78',
      Ds_Response: '0000',
      Ds_SecurePayment: '2'
    });
  });
});
