import {
  parsedWebServiceResponseParams
} from '../soap/web-service-response';

export {
  webServiceResponseMerchantKey,
  serializedWebServiceResponse,
  parsedWebServiceResponseParams
} from '../soap/web-service-response';

export const formattedWebServiceResponse = {
  amount: 3350,
  currency: 'EUR',
  order: '0000ijd2d3',
  merchantCode: '999008881',
  terminal: '1',
  response: 0,
  authorisationCode: '640599',
  transactionType: 'A',
  securePayment: false,
  lang: 'es',
  cardNumber: '454881******0004',
  expiryDate: '1220',
  expiryYear: '20',
  expiryMonth: '12',
  identifier: 'e1996507292293e8db292e5542992cd237861dbd',
  cardCountry: 'es',
  cardBrand: 'VISA',
  raw: parsedWebServiceResponseParams
};
