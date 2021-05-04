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

describe('Rest trataPeticion Integration', () => {
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

    const result = await redsys.restTrataPeticion(params);

    expect(result.response).toEqual(0);
    expect(result.order).toEqual(params.order);
    expect(result.merchantCode).toEqual(params.merchantCode);
    expect(result.terminal).toEqual(params.terminal);
    expect(result.transactionType).toEqual(params.transactionType);
    expect(result.amount).toEqual(params.amount);
    expect(result.currency).toEqual(params.currency);
    expect(result.securePayment).toEqual(false);
    expect(result.lang).toEqual('es');
    expect(result.cardCountry).toEqual('es');
    expect(result.cardBrand).toEqual('VISA');
  });
});
