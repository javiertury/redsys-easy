export const jsonRequestMerchantKey = 'Mk9m98IfEblmPfrpsawt7BmxObt98Jev';

export const jsonRequest = {
  DS_MERCHANT_AMOUNT: '145',
  DS_MERCHANT_ORDER: '1446068581',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_MERCHANTURL: 'http://www.prueba.com/urlNotificacion.php',
  DS_MERCHANT_PAN: '4548812049400004',
  DS_MERCHANT_EXPIRYDATE: '1512',
  DS_MERCHANT_CVV2: '123'
} as const;

export const jsonRequest3DESOrder = 'Uv3ZTYJhPi5Hpi9R6NzR6w==';

export const serializedJSONRequest = 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIxNDUiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjE0NDYwNjg1ODEiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9DVVJSRU5DWSI6Ijk3OCIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9NRVJDSEFOVFVSTCI6Imh0dHA6Ly93d3cucHJ1ZWJhLmNvbS91cmxOb3RpZmljYWNpb24ucGhwIiwiRFNfTUVSQ0hBTlRfUEFOIjoiNDU0ODgxMjA0OTQwMDAwNCIsIkRTX01FUkNIQU5UX0VYUElSWURBVEUiOiIxNTEyIiwiRFNfTUVSQ0hBTlRfQ1ZWMiI6IjEyMyJ9';

export const serializedAndSignedJSONRequest = {
  Ds_MerchantParameters: serializedJSONRequest,
  Ds_Signature: 'aAL1aW3e9XLP3JyraURhhyHNfv9bjHkrHap0Sd44PdA=',
  Ds_SignatureVersion: 'HMAC_SHA256_V1'
};
