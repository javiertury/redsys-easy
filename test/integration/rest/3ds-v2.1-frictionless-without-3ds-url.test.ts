import { threeDSv21FrictionlessWithout3DSURL } from '../../fixtures/cards';
import {
  createRedsysAPI,
  TRANSACTION_TYPES,
  randomTransactionId,
  SANDBOX_URLS
} from 'redsys-easy';

import type {
  RestIniciaPeticionOutputParams
} from 'redsys-easy';

import {
  assertEMV3DSv2CardConfig
} from '../3ds';

import {
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
} = threeDSv21FrictionlessWithout3DSURL;

const {
  restIniciaPeticion,
  restTrataPeticion
} = createRedsysAPI({
  urls: SANDBOX_URLS,
  secretKey
});

describe('Rest 3DS v2.1 frictionless', () => {
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
        threeDSServerTransID: expect.stringMatching(/^[0-9a-f-]+$/) as string
      }
    });
  });

  it('should send 3DS auth data and transact', async () => {
    assertEMV3DSv2CardConfig(infoResult);

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

    const result = await restTrataPeticion(params);

    expect(result).toEqual({
      Ds_Amount: params.DS_MERCHANT_AMOUNT,
      Ds_Currency: params.DS_MERCHANT_CURRENCY,
      Ds_Order: params.DS_MERCHANT_ORDER,
      Ds_MerchantCode: params.DS_MERCHANT_MERCHANTCODE,
      Ds_Terminal: params.DS_MERCHANT_TERMINAL,
      Ds_TransactionType: params.DS_MERCHANT_TRANSACTIONTYPE,
      Ds_AuthorisationCode: expect.stringMatching(/^[0-9a-zA-Z]+$/) as string,
      Ds_CardNumber: '454881******7229',
      Ds_Card_Brand: '1',
      Ds_Card_Country: '724',
      Ds_Language: '1',
      Ds_MerchantData: '',
      Ds_ProcessedPayMethod: '80',
      Ds_Response: '0000',
      Ds_SecurePayment: '2'
    });
  });
});
