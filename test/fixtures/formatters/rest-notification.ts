import {
  parsedRestNotification
} from '../rest/redirect-notification';

export {
  restNotificationMerchantKey,
  serializedRestNotification,
  parsedRestNotification
} from '../rest/redirect-notification';

export const formattedRestNotification = {
  time: '18:03',
  date: '2015-11-09',
  timestamp: new Date('2015-11-09 17:03 Z'),
  securePayment: false,
  amount: 145,
  order: '0069',
  merchantCode: '999008881',
  terminal: '871',
  response: 0,
  transactionType: '0',
  authorisationCode: '082150',
  currency: 'EUR',
  cardCountry: 'es',
  lang: 'es',
  raw: parsedRestNotification
};
