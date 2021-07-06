export const redirectMerchantKey = 'Mk9m98IfEblmPfrpsawt7BmxObt98Jev';

export const redirectRequest = {
  DS_MERCHANT_ORDER: '1234567890',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_AMOUNT: '999',
  DS_MERCHANT_MERCHANTURL: 'http://www.prueba.com/urlNotificacion.php',
  DS_MERCHANT_URLOK: 'http://www.prueba.com/urlOK.php',
  DS_MERCHANT_URLKO: 'http://www.prueba.com/urlKO.php'
} as const;

export const redirectRequest3DESOrder = 'skzDZ5ChKP5QLergu1TcXA==';

export const serializedRedirectRequest = 'eyJEU19NRVJDSEFOVF9PUkRFUiI6IjEyMzQ1Njc4OTAiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9UUkFOU0FDVElPTlRZUEUiOiIwIiwiRFNfTUVSQ0hBTlRfVEVSTUlOQUwiOiIxIiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9BTU9VTlQiOiI5OTkiLCJEU19NRVJDSEFOVF9NRVJDSEFOVFVSTCI6Imh0dHA6Ly93d3cucHJ1ZWJhLmNvbS91cmxOb3RpZmljYWNpb24ucGhwIiwiRFNfTUVSQ0hBTlRfVVJMT0siOiJodHRwOi8vd3d3LnBydWViYS5jb20vdXJsT0sucGhwIiwiRFNfTUVSQ0hBTlRfVVJMS08iOiJodHRwOi8vd3d3LnBydWViYS5jb20vdXJsS08ucGhwIn0=';

export const serializedAndSignedRedirectRequest = {
  Ds_MerchantParameters: serializedRedirectRequest,
  Ds_Signature: '0bqWhAFUE0KDF9z1NpXV33xDDAHiyMDeEsRJENxs3E0=',
  Ds_SignatureVersion: 'HMAC_SHA256_V1'
};
