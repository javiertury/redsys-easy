export const redirectWithIdentifierMerchantKey = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';

export const redirectWithIdentifierRequest = {
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_ORDER: '2681dq0KyQBo',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_AMOUNT: '4999',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_MERCHANTNAME: 'MI COMERCIO',
  DS_MERCHANT_MERCHANTURL: 'http://www.prueba.com/urlNotificacion.php',
  DS_MERCHANT_URLOK: 'http://www.prueba.com/urlOK.php',
  DS_MERCHANT_URLKO: 'http://www.prueba.com/urlKO.php',
  DS_MERCHANT_IDENTIFIER: 'REQUIRED'
} as const;

export const redirectWithIdentifier3DESOrder = 'vw1qte++vTSiW2g2gWXKoA==';

export const serializedRedirectWithIdentifierRequest = 'eyJEU19NRVJDSEFOVF9UUkFOU0FDVElPTlRZUEUiOiIwIiwiRFNfTUVSQ0hBTlRfT1JERVIiOiIyNjgxZHEwS3lRQm8iLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9BTU9VTlQiOiI0OTk5IiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVE5BTUUiOiJNSSBDT01FUkNJTyIsIkRTX01FUkNIQU5UX01FUkNIQU5UVVJMIjoiaHR0cDovL3d3dy5wcnVlYmEuY29tL3VybE5vdGlmaWNhY2lvbi5waHAiLCJEU19NRVJDSEFOVF9VUkxPSyI6Imh0dHA6Ly93d3cucHJ1ZWJhLmNvbS91cmxPSy5waHAiLCJEU19NRVJDSEFOVF9VUkxLTyI6Imh0dHA6Ly93d3cucHJ1ZWJhLmNvbS91cmxLTy5waHAiLCJEU19NRVJDSEFOVF9JREVOVElGSUVSIjoiUkVRVUlSRUQifQ==';

export const serializedAndSignedRedirectWithIdentifierRequest = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: serializedRedirectWithIdentifierRequest,
  Ds_Signature: 'UM0+V+KMduJ2q6M8r/W8P1edLm5XyIsg/y7W/JcVVg8='
};

export const serializedRestNotificationWithIdentifier = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEc19EYXRlIjoiMjIlMkYxMCUyRjIwMjEiLCJEc19Ib3VyIjoiMjElM0E0MCIsIkRzX1NlY3VyZVBheW1lbnQiOiIxIiwiRHNfQ2FyZF9OdW1iZXIiOiI0NTQ4ODEqKioqKiowMDA0IiwiRHNfRXhwaXJ5RGF0ZSI6IjM0MTIiLCJEc19NZXJjaGFudF9JZGVudGlmaWVyIjoiNjIxNTc3YWI4NzYxNTBhZjY4ZmNmYTk3ZWFhYjgwODg2NTA4YzdlMyIsIkRzX0NhcmRfQ291bnRyeSI6IjcyNCIsIkRzX0Ftb3VudCI6IjQ5OTkiLCJEc19DdXJyZW5jeSI6Ijk3OCIsIkRzX09yZGVyIjoiMjY4MWRxMEt5UUJvIiwiRHNfTWVyY2hhbnRDb2RlIjoiOTk5MDA4ODgxIiwiRHNfVGVybWluYWwiOiIwMDEiLCJEc19SZXNwb25zZSI6IjAwMDAiLCJEc19NZXJjaGFudERhdGEiOiIiLCJEc19UcmFuc2FjdGlvblR5cGUiOiIwIiwiRHNfQ29uc3VtZXJMYW5ndWFnZSI6IjEiLCJEc19BdXRob3Jpc2F0aW9uQ29kZSI6IjA1MjAwMiIsIkRzX0NhcmRfQnJhbmQiOiIxIiwiRHNfTWVyY2hhbnRfQ29mX1R4bmlkIjoiMjExMDIyMjE0MDIyMCIsIkRzX1Byb2Nlc3NlZFBheU1ldGhvZCI6IjEifQ==',
  Ds_Signature: 'eujBY6YBm2u5P4FNnlsGMSbiuuBvv4POYXa-7314EDI='
};

export const deserializedRestNotificationWithIdentifier = {
  Ds_Date: '22/10/2021',
  Ds_Hour: '21:40',
  Ds_SecurePayment: '1',
  Ds_Card_Number: '454881******0004',
  Ds_ExpiryDate: '3412',
  Ds_Merchant_Identifier: '621577ab876150af68fcfa97eaab80886508c7e3',
  Ds_Card_Country: '724',
  Ds_Amount: '4999',
  Ds_Currency: '978',
  Ds_Order: '2681dq0KyQBo',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '001',
  Ds_Response: '0000',
  Ds_MerchantData: '',
  Ds_TransactionType: '0',
  Ds_ConsumerLanguage: '1',
  Ds_AuthorisationCode: '052002',
  Ds_Card_Brand: '1',
  Ds_Merchant_Cof_Txnid: '2110222140220',
  Ds_ProcessedPayMethod: '1'
} as const;
