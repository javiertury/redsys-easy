'use strict';

const {
  Redsys,
  TRANSACTION_TYPES,
  SANDBOX_URLS,
  randomTransactionId,
} = require('../src/index.js');

const redsys = new Redsys({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS,
});

const params = {
  // amount in smallest currency unit(cents)
  // 33.50€
  amount: 3350,
  order: randomTransactionId(),
  merchantCode: '999008881',
  currency: 'EUR',
  pan: '4548812049400004',
  cvv: '123',
  expiryDate: '1220', // MMYY format
  transactionType: TRANSACTION_TYPES.NO_AUTHENTICATION,
  terminal: '1',
  // Raw parameters
  raw: {
    // merchantData
    DS_MERCHANT_MERCHANTDATA: 'foo',
  },
};

redsys.wsPetition(params).then(result => {
  console.log(result);
});
