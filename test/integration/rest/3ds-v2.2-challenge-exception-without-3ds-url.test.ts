import { threeDSv22ChallengeExceptionWithout3DSURL } from '../../fixtures/cards';
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
  assert3DSv2CardConfig
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
} = threeDSv22ChallengeExceptionWithout3DSURL;

const {
  restIniciaPeticion,
  restTrataPeticion
} = createRedsysAPI({
  urls: SANDBOX_URLS,
  secretKey
});

describe('Rest 3DS v2.2 frictionless exception', () => {
  let infoResult: RestIniciaPeticionOutputParams | undefined;

  const baseParams = {
    // amount in smallest currency unit(cents)
    // 28.50€
    DS_MERCHANT_AMOUNT: '2850',
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
        threeDSMethodURL: 'https://sis-d.redsys.es/sis-simulador-web/threeDsMethod.jsp',
        threeDSServerTransID: expect.stringMatching(/^[0-9a-f-]+$/) as string
      }
    });
  });

  it('should transact', async () => {
    assert3DSv2CardConfig(infoResult);

    const params = {
      ...baseParams,
      DS_MERCHANT_EXCEP_SCA: 'LWV',
      DS_MERCHANT_EMV3DS: {
        threeDSInfo: 'AuthenticationData',
        protocolVersion: '2.2.0',
        ...clientBrowserFullInfo,
        threeDSServerTransID: infoResult.Ds_EMV3DS.threeDSServerTransID,
        notificationURL: threeDS.challengeV2URL,
        threeDSCompInd: 'U'
      }
    } as const;

    const result = await restTrataPeticion(params);

    const dsControlEntry = Object.entries(result).find(([k,_v]) => k.startsWith('Ds_Control_'));

    if (dsControlEntry == null) {
      throw new Error('Undefined Ds_Control key');
    }

    expect(result).toEqual({
      Ds_Amount: '2850',
      Ds_Currency: '978',
      Ds_Order: params.DS_MERCHANT_ORDER,
      Ds_MerchantCode: params.DS_MERCHANT_MERCHANTCODE,
      Ds_Terminal: params.DS_MERCHANT_TERMINAL,
      Ds_TransactionType: params.DS_MERCHANT_TRANSACTIONTYPE,
      Ds_CardNumber: '454881******8868',
      Ds_Card_Brand: '1',
      Ds_Card_Country: '724',
      Ds_AuthorisationCode: expect.stringMatching(/^[0-9]+$/) as string,
      Ds_Language: '1',
      Ds_MerchantData: '',
      Ds_ProcessedPayMethod: '3',
      Ds_Response: '0000',
      Ds_SecurePayment: '0',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [dsControlEntry[0]]: dsControlEntry[1]
    });
  });
});
