export {
  webServiceRequestMerchantKey,
  serializedWebServiceRequest,
  webServiceRequestParams as formattedWebServiceRequest
} from '../soap/web-service-request';

export const unformattedWebServiceRequest = {
  order: '0000ijd2d3',
  merchantCode: '999008881',
  transactionType: 'A',
  terminal: '1',
  currency: 'EUR',
  amount: 3350,
  identifier: 'REQUIRED',
  pan: '4548812049400004',
  expiryMonth: '12',
  expiryYear: '20',
  cvv: '123'
} as const;
