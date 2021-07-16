import {
  deserializedWebServiceResponseParams
} from '../soap/web-service-response';

export {
  webServiceResponseMerchantKey,
  serializedWebServiceResponse,
  deserializedWebServiceResponseParams
} from '../soap/web-service-response';

export const formattedWebServiceResponse = {
  amount: '33.5',
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
  expiryYear: '20',
  expiryMonth: '12',
  identifier: 'e1996507292293e8db292e5542992cd237861dbd',
  cardCountry: 'es',
  cardBrand: 'VISA',
  raw: deserializedWebServiceResponseParams
};
