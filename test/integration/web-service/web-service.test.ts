import {
  Redsys,
  TRANSACTION_TYPES,
  randomTransactionId
} from '../../../src';

import settings from '../settings';

const {
  instanceSettings,
  merchantData,
  cardData
} = settings;

const redsys = new Redsys(instanceSettings);

describe('Web Service Integration', () => {
  it('should process a payment', async () => {
    const params = {
      // amount in smallest currency unit(cents)
      // 33.50€
      amount: 3350,
      currency: 'EUR',
      merchantCode: merchantData.merchantCode,
      terminal: merchantData.terminal,
      order: randomTransactionId(),
      transactionType: TRANSACTION_TYPES.NO_AUTHENTICATION,
      pan: cardData.pan,
      expiryMonth: cardData.expiryMonth,
      expiryYear: cardData.expiryYear,
      cvv: cardData.cvv,
      // Raw parameters
      raw: {
        // merchantData
        DS_MERCHANT_MERCHANTDATA: 'foo'
      }
    } as const;

    const result = await redsys.wsPetition(params);

    expect(result.response).toEqual(0);
    expect(result.order).toEqual(params.order);
    expect(result.merchantCode).toEqual(params.merchantCode);
    expect(result.terminal).toEqual(params.terminal);
    expect(result.transactionType).toEqual(params.transactionType);
    expect(result.currency).toEqual(params.currency);
    expect(result.amount).toEqual(params.amount);
    expect(result.merchantData).toEqual(params.raw.DS_MERCHANT_MERCHANTDATA);
    expect(result.securePayment).toEqual(false);
    expect(result.cardNumber).toEqual(`${params.pan.slice(0, 6)}******${params.pan.slice(12, 16)}`);
    expect(result.cardCountry).toEqual('es');
    expect(result.cardBrand).toEqual('VISA');
  });
});
