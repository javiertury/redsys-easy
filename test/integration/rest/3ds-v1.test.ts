import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { threeDSv1 } from '../../fixtures/cards';
import {
  createRedsysAPI,
  TRANSACTION_TYPES,
  randomTransactionId,
  SANDBOX_URLS,
  create3DSv1ChallengeForm
} from 'redsys-easy';

import type {
  RestTrataPeticionOutputParams
} from 'redsys-easy';

import {
  encodePostParams
} from '../utils';

import {
  assert3DSv1ChallengeRequest
} from '../3ds';

import type {
  ThreeDSv1ChallengeSolutionNotificationOutputParams
} from '../../../src/types/3ds-params';

import {
  clientPostHeaders
} from '../../fixtures/client';
import settings from '../settings';
import { createDsControlExpectation } from '../../support/misc';

const {
  threeDS
} = settings;

const {
  secretKey,
  merchantData,
  card
} = threeDSv1;

const {
  restIniciaPeticion,
  restTrataPeticion
} = createRedsysAPI({
  urls: SANDBOX_URLS,
  secretKey
});

describe('Rest 3DS v1', () => {
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
    DS_MERCHANT_CVV2: card.cvv,
    DS_MERCHANT_MERCHANTDATA: 'foo'
  } as const;

  it('should obtaine preauth info', async () => {
    const params = {
      ...baseParams,
      DS_MERCHANT_EMV3DS: {
        threeDSInfo: 'CardData'
      }
    } as const;

    const result = await restIniciaPeticion(params);

    expect(result).toEqual({
      Ds_Order: params.DS_MERCHANT_ORDER,
      Ds_MerchantCode: params.DS_MERCHANT_MERCHANTCODE,
      Ds_Terminal: params.DS_MERCHANT_TERMINAL,
      Ds_TransactionType: params.DS_MERCHANT_TRANSACTIONTYPE,
      Ds_Card_PSD2: 'Y',
      Ds_EMV3DS: {
        protocolVersion: 'NO_3DS_v2',
        threeDSInfo: 'CardConfiguration'
      }
    });
  });

  let challengeRequestResult: RestTrataPeticionOutputParams | undefined;

  it('should obtain challenge url', async () => {
    const params = {
      ...baseParams,
      DS_MERCHANT_EMV3DS: {
        protocolVersion: '1.0.2',
        threeDSInfo: 'AuthenticationData',
        browserAcceptHeader: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json',
        browserUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
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
        protocolVersion: '1.0.2',
        threeDSInfo: 'ChallengeRequest',
        acsURL: 'https://sis-d.redsys.es/sis-simulador-web/3DS1/pares.jsp',
        MD: expect.stringMatching(/^[0-9a-f]+$/) as string,
        PAReq: expect.stringMatching(/^[0-9a-zA-Z+/=]+$/) as string
      }
    });
  });

  let challengeSolution: ThreeDSv1ChallengeSolutionNotificationOutputParams | undefined;

  it('should solve challenge', async () => {
    assert3DSv1ChallengeRequest(challengeRequestResult);
    const challengeInitForm = create3DSv1ChallengeForm(challengeRequestResult.Ds_EMV3DS, threeDS.challengeV1URL);

    // Fetch challenge page
    const challengeInitRes = await fetch(challengeInitForm.url, {
      method: 'POST',
      body: encodePostParams(challengeInitForm.body),
      headers: clientPostHeaders
    });
    expect(challengeInitRes.status).toEqual(200);

    const challengeInitResText = await challengeInitRes.text();
    const challengeInitResDoc = cheerio.load(challengeInitResText);

    const challengeSolutionForm = {
      url: challengeInitResDoc('form[name=formulario]').attr('action') as string,
      body: {
        status: 'Y', // 'Y' | 'N' | 'A'
        md: challengeInitResDoc('input[name=md]').attr('value') as string,
        paReq: challengeInitResDoc('input[name=paReq]').attr('value') as string,
        termUrl: challengeInitResDoc('input[name=termUrl]').attr('value') as string
      }
    };

    expect(challengeSolutionForm.body.termUrl).toEqual(threeDS.challengeV1URL);
    expect(challengeSolutionForm.body.md).toEqual(challengeRequestResult.Ds_EMV3DS.MD);
    expect(challengeSolutionForm.body.paReq).toEqual(challengeRequestResult.Ds_EMV3DS.PAReq);

    // Fetch 3DSMethod page
    const challengeEndRes = await fetch(challengeSolutionForm.url, {
      method: 'POST',
      body: encodePostParams(challengeSolutionForm.body),
      headers: clientPostHeaders
    });
    expect(challengeEndRes.status).toEqual(200);

    const challengeEndResText = await challengeEndRes.text();
    const challengeEndResDoc = cheerio.load(challengeEndResText);

    const notificationForm = {
      url: challengeEndResDoc('form[name=formulario]').attr('action') as string,
      body: {
        PaRes: challengeEndResDoc('input[name=PaRes]').attr('value') as string,
        MD: challengeEndResDoc('input[name=MD]').attr('value') as string
      }
    };

    expect(notificationForm.url).toEqual(threeDS.challengeV1URL);
    expect(notificationForm.body.MD).toEqual(expect.any(String));
    expect(notificationForm.body.PaRes).toEqual(expect.any(String));

    challengeSolution = notificationForm.body;
  });

  it('should transact', async () => {
    if (challengeSolution === undefined) {
      throw new Error('Missing challenge solution');
    }

    const params = {
      ...baseParams,
      DS_MERCHANT_EMV3DS: {
        protocolVersion: '1.0.2',
        threeDSInfo: 'ChallengeResponse',
        MD: challengeSolution.MD,
        PARes: challengeSolution.PaRes
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
      Ds_CardNumber: '454881******0004',
      Ds_Card_Brand: '1',
      Ds_Card_Country: '724',
      Ds_AuthorisationCode: expect.stringMatching(/^[0-9]+$/) as string,
      Ds_Language: '1',
      Ds_MerchantData: 'foo',
      Ds_ProcessedPayMethod: '1',
      Ds_Response: '0000',
      Ds_SecurePayment: '2',
      ...createDsControlExpectation(result)
    });
  });
});
