import {
  createRedsysAPI,
  SANDBOX_URLS,
  TRANSACTION_TYPES,
  randomTransactionId
} from 'redsys-easy';

import { declined } from '../../fixtures/cards';
import { createDsControlExpectation } from '../../support/misc';

const {
  secretKey,
  merchantData,
  card
} = declined;

const {
  restTrataPeticion
} = createRedsysAPI({
  urls: SANDBOX_URLS,
  secretKey
});

describe('Rest trataPeticion declined', () => {
  it('should process a payment', async () => {
    const params = {
      // amount in smallest currency unit(cents)
      // 33.50€
      DS_MERCHANT_AMOUNT: '3350',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_MERCHANTCODE: merchantData.merchantCode,
      DS_MERCHANT_TERMINAL: merchantData.terminal,
      DS_MERCHANT_ORDER: randomTransactionId(),
      DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.NO_AUTHENTICATION,
      DS_MERCHANT_PAN: card.pan,
      DS_MERCHANT_EXPIRYDATE: `${card.expiryYear}${card.expiryMonth}`,
      DS_MERCHANT_CVV2: card.cvv,
      DS_MERCHANT_MERCHANTDATA: 'foo'
    } as const;

    const result = await restTrataPeticion(params);

    expect(result).toEqual({
      Ds_Response: '0190',
      Ds_Order: params.DS_MERCHANT_ORDER,
      Ds_MerchantCode: params.DS_MERCHANT_MERCHANTCODE,
      Ds_Terminal: params.DS_MERCHANT_TERMINAL,
      Ds_TransactionType: params.DS_MERCHANT_TRANSACTIONTYPE,
      Ds_Amount: params.DS_MERCHANT_AMOUNT,
      Ds_Currency: params.DS_MERCHANT_CURRENCY,
      Ds_SecurePayment: '0',
      Ds_AuthorisationCode: '',
      Ds_CardNumber: '557644******8500',
      Ds_Card_Country: '724',
      Ds_Language: '1',
      Ds_MerchantData: 'foo',
      Ds_ProcessedPayMethod: '3',
      ...createDsControlExpectation(result)
    });
  });
});
