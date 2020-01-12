'use strict';

const { expect } = require('chai');

const {
  Redsys,
  TRANSACTION_TYPES,
  randomTransactionId,
} = require('../../../src');

const {
  instanceSettings,
  merchantData,
  cardData,
} = require('../settings');

const redsys = new Redsys(instanceSettings);

describe('Web Service Integration', () => {
  it('should process a payment', () => {
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
        DS_MERCHANT_MERCHANTDATA: 'foo',
      },
    };

    return redsys.wsPetition(params).then(result => {
      expect(result.response).to.equal(0);
      expect(result.order).to.equal(params.order);
      expect(result.merchantCode).to.equal(params.merchantCode);
      expect(result.terminal).to.equal(params.terminal);
      expect(result.transactionType).to.equal(params.transactionType);
      expect(result.currency).to.equal(params.currency);
      expect(result.amount).to.equal(params.amount);
      expect(result.merchantData).to.equal(params.raw.DS_MERCHANT_MERCHANTDATA);
      expect(result.securePayment).to.equal(false);
      expect(result.cardNumber).to.equal(`${params.pan.slice(0, 6)}******${params.pan.slice(12, 16)}`);
      expect(result.cardCountry).to.equal('es');
      expect(result.cardBrand).to.equal('VISA');
    });
  });
});
