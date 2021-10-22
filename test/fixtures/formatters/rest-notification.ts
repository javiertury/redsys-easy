import {
  deserializedRestNotification
} from '../rest/redirect';

export {
  redirectMerchantKey,
  serializedRestNotification,
  deserializedRestNotification
} from '../rest/redirect';

export const formattedRestNotification = {
  time: '22:51',
  date: '2021-10-22',
  timestamp: new Date('2021-10-22 20:51 Z'),
  securePayment: true,
  amount: '49.99',
  order: '0726qI3H7sZx',
  merchantCode: '999008881',
  terminal: '001',
  response: 0,
  transactionType: '0',
  authorisationCode: '052029',
  currency: 'EUR',
  cardCountry: 'es',
  lang: 'es',
  cardBrand: 'VISA',
  raw: deserializedRestNotification
};
