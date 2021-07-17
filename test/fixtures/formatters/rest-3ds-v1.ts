import {
  iniciaPeticionRequest,
  deserializedIniciaPeticionResponse,
  authDataRequest,
  deserializedAuthDataResponse,
  challengeResponseRequest,
  deserializedChallengeResponseResponse
} from '../rest/3ds-v1';

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
  order: '6705iUKijC4u',
  transactionType: '0',
  pan: '4548812049400004',
  expiryMonth: '12',
  expiryYear: '34',
  cvv: '123',
  merchantData: 'foo',
  emv3ds: {
    threeDSInfo: 'CardData'
  }
} as const;

export const formattedIniciaPeticionResponse = {
  cardPSD2: true,
  merchantCode: '999008881',
  order: '6705iUKijC4u',
  terminal: '1',
  transactionType: '0',
  emv3ds: {
    protocolVersion: 'NO_3DS_v2',
    threeDSInfo: 'CardConfiguration'
  },
  raw: deserializedIniciaPeticionResponse
} as const;

export const unformattedAuthDataRequest = {
  amount: '33.5',
  currency: 'EUR',
  merchantCode: '999008881',
  terminal: '1',
  order: '6705iUKijC4u',
  transactionType: '0',
  pan: '4548812049400004',
  expiryYear: '34',
  expiryMonth: '12',
  cvv: '123',
  merchantData: 'foo',
  emv3ds: {
    protocolVersion: '1.0.2',
    threeDSInfo: 'AuthenticationData',
    browserAcceptHeader: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json',
    browserUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98Safari/537.36'
  }
} as const;

export const formattedAuthDataResponse = {
  amount: '33.5',
  currency: 'EUR',
  order: '6705iUKijC4u',
  merchantCode: '999008881',
  terminal: '1',
  transactionType: '0',
  emv3ds: {
    threeDSInfo: 'ChallengeRequest',
    protocolVersion: '1.0.2',
    acsURL: 'https://sis-d.redsys.es/sis-simulador-web/3DS1/pares.jsp',
    PAReq: 'eJxVUttugzAM/RXEpL2NJARE27mZspZpfWCqWvYBEVgrU6EsoaPd1y9pYZeHyD6248ux4eFU771P1KY6NHOfBdT3sCkOZdW8zf3X/Olu4j8IyHcacbnF4qhRQIbGqDf0qnLum7pV1SmcqA5NF9IoSlhIQ0YvgiY8ppQyHvkC1nKDHwKGWsKWCkIgI7RJdbFTTSdAFR+PqxcRxTFLpkAGCDXq1VJs002WrmWWbhbP8iUHcjVDo2oUm3S78NLtWt7ehHR6L4FczFAcjk2nzyIJIyAjgKPei13XtTNC+r4PNJbmbAI0pFCN2qMJ3k0LxEUB+e1ufXSasVlPVSmyd3nOcsmzfNVbnWdfr322lO7NgbgIKC01YuTEo3RGkxmPgVzsoGrXjuA8iKmd9YqgdUXk6HKevxawa9B2S2cxTSZ2oBEBntpDgzbCEvujQ4mmsCMM4rf/xbPjuugsfSFlU0Y5pRG3K+Rs4mi/eFzOyrLFI3ZN6gAQ95cMGyXDPVjt3518Axctwgw=',
    MD: 'efca7298949ce12042c4e5da95a07e324f2d5cbd'
  },
  raw: deserializedAuthDataResponse
} as const;

export const unformattedChallengeResponseRequest = {
  amount: '33.5',
  currency: 'EUR',
  merchantCode: '999008881',
  terminal: '1',
  order: '6705iUKijC4u',
  transactionType: '0',
  pan: '4548812049400004',
  expiryYear: '34',
  expiryMonth: '12',
  cvv: '123',
  merchantData: 'foo',
  emv3ds: {
    protocolVersion: '1.0.2',
    threeDSInfo: 'ChallengeResponse',
    MD: 'efca7298949ce12042c4e5da95a07e324f2d5cbd',
    PARes: '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\\nb0LPL1qPzxifv3T9G0cy44s='
  }
} as const;

export const formattedChallengeResponseResponse = {
  amount: '33.5',
  currency: 'EUR',
  order: '6705iUKijC4u',
  merchantCode: '999008881',
  terminal: '1',
  response: 0,
  authorisationCode: '392882',
  transactionType: '0',
  securePayment: true,
  lang: 'es',
  cardNumber: '454881******0004',
  merchantData: 'foo',
  cardCountry: 'es',
  cardBrand: 'VISA',
  raw: deserializedChallengeResponseResponse
} as const;
