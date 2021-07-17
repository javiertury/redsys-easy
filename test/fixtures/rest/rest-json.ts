export const restJsonMerchantKey = 'Mk9m98IfEblmPfrpsawt7BmxObt98Jev';

export const restJsonRequest = {
  DS_MERCHANT_AMOUNT: '145',
  DS_MERCHANT_ORDER: '1446068581',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_PAN: '4548812049400004',
  DS_MERCHANT_EXPIRYDATE: '1512',
  DS_MERCHANT_CVV2: '123'
} as const;

export const restJson3DESOrder = 'Uv3ZTYJhPi5Hpi9R6NzR6w==';

export const serializedRestJsonRequest = 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIxNDUiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjE0NDYwNjg1ODEiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9DVVJSRU5DWSI6Ijk3OCIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9QQU4iOiI0NTQ4ODEyMDQ5NDAwMDA0IiwiRFNfTUVSQ0hBTlRfRVhQSVJZREFURSI6IjE1MTIiLCJEU19NRVJDSEFOVF9DVlYyIjoiMTIzIn0=';

export const serializedAndSignedRestJsonRequest = {
  Ds_MerchantParameters: serializedRestJsonRequest,
  Ds_Signature: '8usPaCKawqjYeFi6KdNSB4jQ4Wi5XwOORcAk58MMFyU=',
  Ds_SignatureVersion: 'HMAC_SHA256_V1'
};

export const serializedRestJsonResponse = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEc19BbW91bnQiOiIxNDUiLCJEc19DdXJyZW5jeSI6Ijk3OCIsIkRzX09yZGVyIjoiMTQ0NjA2ODU4MSIsIkRzX01lcmNoYW50Q29kZSI6Ijk5OTAwODg4MSIsIkRzX1Rlcm1pbmFsIjoiMSIsIkRzX1Jlc3BvbnNlIjoiMDAwMCIsIkRzX0F1dGhvcmlzYXRpb25Db2RlIjoiNTAxNjAyIiwiRHNfVHJhbnNhY3Rpb25UeXBlIjoiMCIsIkRzX1NlY3VyZVBheW1lbnQiOiIwIiwiRHNfTGFuZ3VhZ2UiOiIxIiwiRHNfQ2FyZE51bWJlciI6IjQ1NDg4MSoqKioqKioqMDQiLCJEc19NZXJjaGFudERhdGEiOiIiLCJEc19DYXJkX0NvdW50cnkiOiI3MjQiLCJEc19DYXJkX0JyYW5kIjoiMSJ9',
  Ds_Signature: 'IoGNijSDZGbk+qChH2iqRCg6jZVl3Ee6Ha/WBM4wgto='
};

export const deserializedRestJsonResponse = {
  Ds_Amount: '145',
  Ds_Currency: '978',
  Ds_Order: '1446068581',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '1',
  Ds_Response: '0000',
  Ds_AuthorisationCode: '501602',
  Ds_TransactionType: '0',
  Ds_SecurePayment: '0',
  Ds_Language: '1',
  Ds_CardNumber: '454881********04',
  Ds_MerchantData: '',
  Ds_Card_Country: '724',
  Ds_Card_Brand: '1'
} as const;
