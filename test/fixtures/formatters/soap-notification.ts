import {
  parsedSoapNotification
} from '../soap/redirect-notification';

export {
  soapNotificationMerchantKey,
  parsedSoapNotification,
  serializedAndSignedSoapNotificationParams
} from '../soap/redirect-notification';

export const formattedSoapNotification = {
  date: '2003-04-01',
  time: '16:57',
  timestamp: new Date('2003-04-01 14:57 Z'),
  securePayment: true,
  amount: '3.45',
  currency: 'EUR',
  order: '165446',
  cardType: 'C',
  merchantCode: '999008881',
  terminal: '001',
  cardCountry: 'es',
  response: 0,
  merchantData: 'Alfombrilla para raton',
  transactionType: '1',
  lang: 'es',
  raw: parsedSoapNotification.Request
};
