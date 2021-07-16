import { noThreeDS } from '../../fixtures/cards';
import {
  createRedsysAPI,
  TRANSACTION_TYPES,
  randomTransactionId,
  SANDBOX_URLS
} from 'redsys-easy';

const {
  secretKey,
  merchantData,
  card
} = noThreeDS;

const {
  wsPetition
} = createRedsysAPI({
  urls: SANDBOX_URLS,
  secretKey
});

describe('Web Service Integration', () => {
  it('should process a payment', async () => {
    const params = {
      DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.NO_AUTHENTICATION, // '0'
      DS_MERCHANT_ORDER: randomTransactionId(),
      DS_MERCHANT_MERCHANTCODE: merchantData.merchantCode,
      DS_MERCHANT_TERMINAL: merchantData.terminal,
      // amount in smallest currency unit(cents)
      // 33.50€
      DS_MERCHANT_AMOUNT: '3350',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_PAN: card.pan,
      DS_MERCHANT_EXPIRYDATE: `${card.expiryYear}${card.expiryMonth}`,
      DS_MERCHANT_CVV2: card.cvv,
      // Raw parameters
      raw: {
        // merchantData
        DS_MERCHANT_MERCHANTDATA: 'foo'
      }
    } as const;

    const result = await wsPetition(params);

    expect(result.Ds_Response).toEqual('0000');
    expect(result.Ds_Order).toEqual(params.DS_MERCHANT_ORDER);
    expect(result.Ds_MerchantCode).toEqual(params.DS_MERCHANT_MERCHANTCODE);
    expect(result.Ds_Terminal).toEqual(params.DS_MERCHANT_TERMINAL);
    expect(result.Ds_TransactionType).toEqual(params.DS_MERCHANT_TRANSACTIONTYPE);
    expect(result.Ds_Currency).toEqual(params.DS_MERCHANT_CURRENCY);
    expect(result.Ds_Amount).toEqual(params.DS_MERCHANT_AMOUNT);
    expect(result.Ds_MerchantData).toEqual(params.raw.DS_MERCHANT_MERCHANTDATA);
    expect(result.Ds_SecurePayment).toEqual('0');
    expect(result.Ds_CardNumber).toEqual(`${params.DS_MERCHANT_PAN.slice(0, 6)}******${params.DS_MERCHANT_PAN.slice(12, 16)}`);
    expect(result.Ds_Card_Country).toEqual('724'); // es
    expect(result.Ds_Card_Brand).toEqual('1'); // VISA
  });
});
