export const redirectMerchantKey = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';

export const redirectRequest = {
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_ORDER: '0726qI3H7sZx',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_AMOUNT: '4999',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_MERCHANTURL: 'http://www.prueba.com/urlNotificacion.php',
  DS_MERCHANT_URLOK: 'http://www.prueba.com/urlOK.php',
  DS_MERCHANT_URLKO: 'http://www.prueba.com/urlKO.php'
} as const;

export const redirectRequest3DESOrder = 'GViV77kFjMPKVUcE9qxzlg==';

export const serializedRedirectRequest = 'eyJEU19NRVJDSEFOVF9UUkFOU0FDVElPTlRZUEUiOiIwIiwiRFNfTUVSQ0hBTlRfT1JERVIiOiIwNzI2cUkzSDdzWngiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9BTU9VTlQiOiI0OTk5IiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVFVSTCI6Imh0dHA6Ly93d3cucHJ1ZWJhLmNvbS91cmxOb3RpZmljYWNpb24ucGhwIiwiRFNfTUVSQ0hBTlRfVVJMT0siOiJodHRwOi8vd3d3LnBydWViYS5jb20vdXJsT0sucGhwIiwiRFNfTUVSQ0hBTlRfVVJMS08iOiJodHRwOi8vd3d3LnBydWViYS5jb20vdXJsS08ucGhwIn0=';

export const serializedAndSignedRedirectRequest = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: serializedRedirectRequest,
  Ds_Signature: 'TyW+LIa2GZnhCPLM7JSPwbQn4ZjOvMO/KiIf4yJgwo8='
};

export const serializedRedirectRestNotification = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEc19EYXRlIjoiMjIlMkYxMCUyRjIwMjEiLCJEc19Ib3VyIjoiMjIlM0E1MSIsIkRzX1NlY3VyZVBheW1lbnQiOiIxIiwiRHNfQ2FyZF9OdW1iZXIiOiI0NTQ4ODEqKioqKiowMDA0IiwiRHNfQ2FyZF9Db3VudHJ5IjoiNzI0IiwiRHNfQW1vdW50IjoiNDk5OSIsIkRzX0N1cnJlbmN5IjoiOTc4IiwiRHNfT3JkZXIiOiIwNzI2cUkzSDdzWngiLCJEc19NZXJjaGFudENvZGUiOiI5OTkwMDg4ODEiLCJEc19UZXJtaW5hbCI6IjAwMSIsIkRzX1Jlc3BvbnNlIjoiMDAwMCIsIkRzX01lcmNoYW50RGF0YSI6IiIsIkRzX1RyYW5zYWN0aW9uVHlwZSI6IjAiLCJEc19Db25zdW1lckxhbmd1YWdlIjoiMSIsIkRzX0F1dGhvcmlzYXRpb25Db2RlIjoiMDUyMDI5IiwiRHNfQ2FyZF9CcmFuZCI6IjEiLCJEc19Qcm9jZXNzZWRQYXlNZXRob2QiOiIxIn0=',
  Ds_Signature: '52nPyUkyDws__OfMqDka_yN-arxzulELZC1TYTvvR0s='
};

export const deserializedRedirectRestNotification = {
  Ds_Date: '22/10/2021',
  Ds_Hour: '22:51',
  Ds_SecurePayment: '1',
  Ds_Card_Number: '454881******0004',
  Ds_Card_Country: '724',
  Ds_Amount: '4999',
  Ds_Currency: '978',
  Ds_Order: '0726qI3H7sZx',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '001',
  Ds_Response: '0000',
  Ds_MerchantData: '',
  Ds_TransactionType: '0',
  Ds_ConsumerLanguage: '1',
  Ds_AuthorisationCode: '052029',
  Ds_Card_Brand: '1',
  Ds_ProcessedPayMethod: '1'
} as const;
