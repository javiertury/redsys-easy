export const redirectWithDccMerchantKey = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';

export const serializedRestNotificationWithDcc = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters:
    'eyJEc19NZXJjaGFudENvZGUiOiI5OTkwMDg4ODEiLCJEc19UZXJtaW5hbCI6IjAwMSIsIkRzX09yZGVyIjoiOTc2OGR1R1VSUjFMIiwiRHNfQW1vdW50IjoiNDk5OSIsIkRzX0N1cnJlbmN5IjoiOTc4IiwiRHNfRGF0ZSI6IjI4XC8wNlwvMjAyNCIsIkRzX0hvdXIiOiIyMzoyMyIsIkRzX1NlY3VyZVBheW1lbnQiOiIxIiwiRHNfQ2FyZF9OdW1iZXIiOiI0MTE3NzMqKioqKio3ODkxIiwiRHNfQ2FyZF9Db3VudHJ5IjoiODQwIiwiRHNfUmVzcG9uc2UiOiIwMDAwIiwiRHNfTWVyY2hhbnREYXRhIjoiIiwiRHNfVHJhbnNhY3Rpb25UeXBlIjoiMCIsIkRzX0NvbnN1bWVyTGFuZ3VhZ2UiOiIxIiwiRHNfQXV0aG9yaXNhdGlvbkNvZGUiOiIwMTMzNzgiLCJEc19DYXJkX0JyYW5kIjoiMSIsIkRzX1Byb2Nlc3NlZFBheU1ldGhvZCI6Ijc4IiwiRHNfQ3VycmVuY3lfRENDIjoiODQwIiwiRHNfQW1vdW50X0RDQyI6IjU4NDAiLCJEc19DdXJyZW5jeU5hbWVfRENDIjoiRE9MQVIgVS5TLkEuIiwiRHNfTWFya3VwX0RDQyI6IjMuMCIsIkRzX0V4Y2hhbmdlUmF0ZV9EQ0MiOiIwLjg4MTYwOSIsIkRzX0VDSSI6IjA1IiwiRHNfUmVzcG9uc2VfRGVzY3JpcHRpb24iOiJPUEVSQUNJT04gQVVUT1JJWkFEQSJ9',
  Ds_Signature: 'cgLd-6DO0wqoalRidsHdaAu69kzj8HVebBvHJdklYZA='
};

export const deserializedRestNotificationWithDcc = {
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '001',
  Ds_Order: '9768duGURR1L',
  Ds_Amount: '4999',
  Ds_Currency: '978',
  // prettier-ignore
  // eslint-disable-next-line no-useless-escape
  Ds_Date: '28\/06\/2024',
  Ds_Hour: '23:23',
  Ds_SecurePayment: '1',
  Ds_Card_Number: '411773******7891',
  Ds_Card_Country: '840',
  Ds_Response: '0000',
  Ds_MerchantData: '',
  Ds_TransactionType: '0',
  Ds_ConsumerLanguage: '1',
  Ds_AuthorisationCode: '013378',
  Ds_Card_Brand: '1',
  Ds_ProcessedPayMethod: '78',
  Ds_Currency_DCC: '840',
  Ds_Amount_DCC: '5840',
  Ds_CurrencyName_DCC: 'DOLAR U.S.A.',
  Ds_Markup_DCC: '3.0',
  Ds_ExchangeRate_DCC: '0.881609',
  Ds_ECI: '05',
  Ds_Response_Description: 'OPERACION AUTORIZADA'
} as const;

export const serializedRedirectNotificationWithDcc = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters:
    'eyJEc19EYXRlIjoiMjglMkYwNiUyRjIwMjQiLCJEc19Ib3VyIjoiMjMlM0EyMyIsIkRzX1NlY3VyZVBheW1lbnQiOiIxIiwiRHNfQW1vdW50IjoiNDk5OSIsIkRzX0N1cnJlbmN5IjoiOTc4IiwiRHNfT3JkZXIiOiI5NzY4ZHVHVVJSMUwiLCJEc19NZXJjaGFudENvZGUiOiI5OTkwMDg4ODEiLCJEc19UZXJtaW5hbCI6IjAwMSIsIkRzX1Jlc3BvbnNlIjoiMDAwMCIsIkRzX1RyYW5zYWN0aW9uVHlwZSI6IjAiLCJEc19NZXJjaGFudERhdGEiOiIiLCJEc19BdXRob3Jpc2F0aW9uQ29kZSI6IjAxMzM3OCIsIkRzX0NhcmRfTnVtYmVyIjoiNDExNzczKioqKioqNzg5MSIsIkRzX0NvbnN1bWVyTGFuZ3VhZ2UiOiIxIiwiRHNfQ2FyZF9Db3VudHJ5IjoiODQwIiwiRHNfQ2FyZF9CcmFuZCI6IjEiLCJEc19Qcm9jZXNzZWRQYXlNZXRob2QiOiI3OCIsIkRzX0VDSSI6IjA1IiwiRHNfUmVzcG9uc2VfRGVzY3JpcHRpb24iOiJPUEVSQUNJT04rQVVUT1JJWkFEQSIsIkRzX0NvbnRyb2xfMTcxOTYwOTgyODU5NSI6IjE3MTk2MDk4Mjg1OTUiLCJEc19DdXJyZW5jeV9EQ0MiOiI4NDAiLCJEc19BbW91bnRfRENDIjoiNTg0MCIsIkRzX0N1cnJlbmN5TmFtZV9EQ0MiOiJET0xBUitVLlMuQS4iLCJEc19NYXJrdXBfRENDIjoiMy4wJTI1IiwiRHNfRXhjaGFuZ2VSYXRlX0RDQyI6IjAuODgxNjA5In0=',
  Ds_Signature: 'KDb9Gu69g7VHfWtx9kg10eq6Yyz1TSuUyqiWcBir93I='
} as const;

export const deserializedRedirectNotificationWithDcc = {
  Ds_Date: '28/06/2024',
  Ds_Hour: '23:23',
  Ds_SecurePayment: '1',
  Ds_Amount: '4999',
  Ds_Currency: '978',
  Ds_Order: '9768duGURR1L',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '001',
  Ds_Response: '0000',
  Ds_TransactionType: '0',
  Ds_MerchantData: '',
  Ds_AuthorisationCode: '013378',
  Ds_Card_Number: '411773******7891',
  Ds_ConsumerLanguage: '1',
  Ds_Card_Country: '840',
  Ds_Card_Brand: '1',
  Ds_ProcessedPayMethod: '78',
  Ds_ECI: '05',
  Ds_Response_Description: 'OPERACION AUTORIZADA',
  Ds_Control_1719609828595: '1719609828595',
  Ds_Currency_DCC: '840',
  Ds_Amount_DCC: '5840',
  Ds_CurrencyName_DCC: 'DOLAR U.S.A.',
  Ds_Markup_DCC: '3.0%',
  Ds_ExchangeRate_DCC: '0.881609'
} as const;
