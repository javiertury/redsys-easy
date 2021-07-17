import {
  restJsonRequest,
  deserializedRestJsonResponse
} from '../rest/rest-json';

export {
  restJsonRequest,
  deserializedRestJsonResponse
};

export const unformattedRestJsonRequest = {
  order: '1446068581',
  merchantCode: '999008881',
  transactionType: '0',
  terminal: '1',
  currency: 'EUR',
  amount: '1.45',
  pan: '4548812049400004',
  expiryYear: '15',
  expiryMonth: '12',
  cvv: '123'
} as const;

export const formattedRestJsonResponse = {
  order: '1446068581',
  merchantCode: '999008881',
  transactionType: '0',
  terminal: '1',
  currency: 'EUR',
  amount: '1.45',
  cardNumber: '454881********04',
  cardBrand: 'VISA',
  cardCountry: 'es',
  lang: 'es',
  securePayment: false,
  authorisationCode: '501602',
  response: 0,
  raw: deserializedRestJsonResponse
};
