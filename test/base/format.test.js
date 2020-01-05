'use strict';

const { expect } = require('chai');

const { formatParams } = require('../../src/params-formatter');
const { TRANSACTION_TYPES } = require('../../src/utils');

describe('Input Parameters Format', () => {

  it('should format currencies', function() {
    const params = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
    });

    expect(params).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
    });
  });

  it('should format currencies, giving priority to internal format', function() {
    const params = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      raw: {
        DS_MERCHANT_CURRENCY: '840', // USD
      },
    });

    expect(params).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '840',
    });
  });

  it('should format card countries', function() {
    const params = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      cardCountry: 'es',
    });

    expect(params).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_CARD_COUNTRY: '724',
    });
  });

  it('should format card countries, giving priority to internal format', function() {
    const paramsInt = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      cardCountry: 'es',
      raw: {
        DS_CARD_COUNTRY: '840', // us
      },
    });

    expect(paramsInt).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_CARD_COUNTRY: '840',
    });
  });

  it('should format languages', function() {
    const params = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      lang: 'es',
    });

    expect(params).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_CONSUMERLANGUAGE: '1',
    });
  });

  it('should format languages, giving priority to internal format', function() {
    const params = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      lang: 'es',
      raw: {
        DS_MERCHANT_CONSUMERLANGUAGE: '2', // en
      }
    });

    expect(params).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_CONSUMERLANGUAGE: '2',
    });
  });

  it('should format expiry dates', function() {
    const params = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      expiryDate: '1220',
    });

    expect(params).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_EXPIRYDATE: '2012',
    });

    const paramsSplit = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      expiryMonth: '05',
      expiryYear: '20',
    });

    expect(paramsSplit).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_EXPIRYDATE: '2005',
    });
  });

  it('should format expiry dates, giving priority to internal format and date', function() {
    const paramsAll = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      expiryDate: '0621',
      expiryMonth: '07',
      expiryYear: '22',
      raw: {
        DS_MERCHANT_EXPIRYDATE: '2005', // May 2020
      }
    });

    expect(paramsAll).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_EXPIRYDATE: '2005',
    });

    const paramsRemaining = formatParams({ 
      amount: 4999,
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      expiryDate: '0621',
      expiryMonth: '07',
      expiryYear: '22',
    });

    expect(paramsRemaining).to.deep.equal({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_EXPIRYDATE: '2106',
    });
  });

});
