import {
  iniciaPeticionRequest,
  deserializedIniciaPeticionResponse,
  authDataRequest,
  deserializedAuthDataResponse,
  challengeResponseRequest,
  deserializedChallengeResponseResponse
} from '../rest/3ds-v2.1-challenge';

export {
  iniciaPeticionRequest,
  deserializedIniciaPeticionResponse,
  authDataRequest,
  deserializedAuthDataResponse,
  challengeResponseRequest,
  deserializedChallengeResponseResponse
};

export const unformattedIniciaPeticionRequest = {
  amount: '33.5',
  currency: 'EUR',
  merchantCode: '999008881',
  terminal: '1',
  order: '6564vNUgKHSe',
  transactionType: '0',
  pan: '4918019199883839',
  expiryYear: '34',
  expiryMonth: '12',
  cvv: '123',
  emv3ds: {
    threeDSInfo: 'CardData'
  }
} as const;

export const formattedIniciaPeticionResponse = {
  order: '6564vNUgKHSe',
  merchantCode: '999008881',
  terminal: '1',
  transactionType: '0',
  cardPSD2: true,
  emv3ds: {
    protocolVersion: '2.1.0',
    threeDSServerTransID: 'ad5165fd-bc46-4d64-84de-d135070191a1',
    threeDSInfo: 'CardConfiguration',
    threeDSMethodURL: 'https://sis-d.redsys.es/sis-simulador-web/threeDsMethod.jsp'
  },
  raw: deserializedIniciaPeticionResponse
} as const;

export const unformattedAuthDataRequest = {
  amount: '33.5',
  currency: 'EUR',
  merchantCode: '999008881',
  terminal: '1',
  order: '6564vNUgKHSe',
  transactionType: '0',
  pan: '4918019199883839',
  expiryYear: '34',
  expiryMonth: '12',
  cvv: '123',
  emv3ds: {
    threeDSInfo: 'AuthenticationData',
    protocolVersion: '2.1.0',
    browserAcceptHeader: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    browserUserAgent: 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
    browserJavascriptEnabled: false,
    browserJavaEnabled: false,
    browserLanguage: 'ES-es',
    browserColorDepth: '32',
    browserScreenHeight: '1080',
    browserScreenWidth: '1920',
    browserTZ: '-120',
    threeDSServerTransID: 'ad5165fd-bc46-4d64-84de-d135070191a1',
    notificationURL: 'http://my-server:3000/post-challenge-v2',
    threeDSCompInd: 'Y'
  }
} as const;

export const formattedAuthDataResponse = {
  amount: '33.5',
  currency: 'EUR',
  order: '6564vNUgKHSe',
  merchantCode: '999008881',
  terminal: '1',
  transactionType: '0',
  emv3ds: {
    threeDSInfo: 'ChallengeRequest',
    protocolVersion: '2.1.0',
    acsURL: 'https://sis-d.redsys.es/sis-simulador-web/authenticationRequest.jsp',
    creq: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsImFjc1RyYW5zSUQiOiIxMWQxNzk1ZC1kMDIwLTQ2MmMtYTllZC03MDIwM2VlZTViMmEiLCJtZXNzYWdlVHlwZSI6IkNSZXEiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwiY2hhbGxlbmdlV2luZG93U2l6ZSI6IjA1In0'
  },
  raw: deserializedAuthDataResponse
} as const;

export const unformattedChallengeResponseRequest = {
  amount: '33.5',
  currency: 'EUR',
  merchantCode: '999008881',
  terminal: '1',
  order: '6564vNUgKHSe',
  transactionType: '0',
  pan: '4918019199883839',
  expiryYear: '34',
  expiryMonth: '12',
  cvv: '123',
  emv3ds: {
    protocolVersion: '2.1.0',
    threeDSInfo: 'ChallengeResponse',
    cres: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsImFjc1RyYW5zSUQiOiIxMWQxNzk1ZC1kMDIwLTQ2MmMtYTllZC03MDIwM2VlZTViMmEiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwidHJhbnNTdGF0dXMiOiJZIn0='
  }
} as const;

export const formattedChallengeResponseResponse = {
  amount: '33.5',
  currency: 'EUR',
  order: '6564vNUgKHSe',
  merchantCode: '999008881',
  terminal: '1',
  response: 0,
  authorisationCode: '392889',
  transactionType: '0',
  securePayment: true,
  lang: 'es',
  cardNumber: '491801******3839',
  cardCountry: 'es',
  cardBrand: 'VISA',
  raw: deserializedChallengeResponseResponse
} as const;
