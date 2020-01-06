'use strict';

const { expect } = require('chai');

const {
  Redsys,
  TRANSACTION_TYPES,
  randomTransactionId,
} = require('../../../src');
const settings = require('../settings');

const redsys = new Redsys({
  secretKey: settings.secretKey,
  urls: settings.urls,
});


describe('Web Service Integration', () => {
  it('should process a payment', () => {
    const params = {
      // amount in smallest currency unit(cents)
      // 33.50€
      amount: 3350,
      order: randomTransactionId(),
      merchantCode: '999008881',
      currency: 'EUR',
      pan: '4548812049400004',
      CVV2: '123',
      expiryDate: '1220', // MMYY format
      transactionType: TRANSACTION_TYPES.NO_AUTHENTICATION,
      terminal: '1',
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
