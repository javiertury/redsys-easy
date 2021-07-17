export const threeDSv21MerchantKey = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';

export const iniciaPeticionRequest = {
  DS_MERCHANT_AMOUNT: '3350',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_ORDER: '6564vNUgKHSe',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_PAN: '4918019199883839',
  DS_MERCHANT_EXPIRYDATE: '3412',
  DS_MERCHANT_CVV2: '123',
  DS_MERCHANT_EMV3DS: {
    threeDSInfo: 'CardData'
  }
} as const;

export const serializedAndSignedIniciaPeticionRequest = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIzMzUwIiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjY1NjR2TlVnS0hTZSIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9QQU4iOiI0OTE4MDE5MTk5ODgzODM5IiwiRFNfTUVSQ0hBTlRfRVhQSVJZREFURSI6IjM0MTIiLCJEU19NRVJDSEFOVF9DVlYyIjoiMTIzIiwiRFNfTUVSQ0hBTlRfRU1WM0RTIjp7InRocmVlRFNJbmZvIjoiQ2FyZERhdGEifX0=',
  Ds_Signature: 'DugiX6C93l8IKJSzhL00zUqzdEOqua4upbMaPa8pIB4='
};

export const serializedIniciaPeticionResponse = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEc19PcmRlciI6IjY1NjR2TlVnS0hTZSIsIkRzX01lcmNoYW50Q29kZSI6Ijk5OTAwODg4MSIsIkRzX1Rlcm1pbmFsIjoiMSIsIkRzX1RyYW5zYWN0aW9uVHlwZSI6IjAiLCJEc19FTVYzRFMiOnsicHJvdG9jb2xWZXJzaW9uIjoiMi4xLjAiLCJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsInRocmVlRFNJbmZvIjoiQ2FyZENvbmZpZ3VyYXRpb24iLCJ0aHJlZURTTWV0aG9kVVJMIjoiaHR0cHM6Ly9zaXMtZC5yZWRzeXMuZXMvc2lzLXNpbXVsYWRvci13ZWIvdGhyZWVEc01ldGhvZC5qc3AifSwiRHNfQ2FyZF9QU0QyIjoiWSJ9',
  Ds_Signature: '9ef9hH-R_DOwz8OsXObbPbReSO3XgEZm25n82z6mv_0='
};

export const deserializedIniciaPeticionResponse = {
  Ds_Order: '6564vNUgKHSe',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '1',
  Ds_TransactionType: '0',
  Ds_Card_PSD2: 'Y',
  Ds_EMV3DS: {
    protocolVersion: '2.1.0',
    threeDSServerTransID: 'ad5165fd-bc46-4d64-84de-d135070191a1',
    threeDSInfo: 'CardConfiguration',
    threeDSMethodURL: 'https://sis-d.redsys.es/sis-simulador-web/threeDsMethod.jsp'
  }
} as const;

export const threeDSMethodForm = {
  url: 'https://sis-d.redsys.es/sis-simulador-web/threeDsMethod.jsp',
  body: {
    threeDSMethodData: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsInRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiOiJodHRwOi8vbXktc2VydmVyOjMwMDAvbm90aWZpY2F0aW9uLTNkcy1tZXRob2QifQ'
  }
};

export const threeDSMethodNotificationBody = {
  threeDSMethodData: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsInRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiOiJodHRwOi8vbXktc2VydmVyOjMwMDAvbm90aWZpY2F0aW9uLTNkcy1tZXRob2QifQ'
};

export const deserializedThreeDSMethodData = {
  threeDSMethodNotificationURL: 'http://my-server:3000/notification-3ds-method',
  threeDSServerTransID: 'ad5165fd-bc46-4d64-84de-d135070191a1'
};

export const authDataRequest = {
  DS_MERCHANT_AMOUNT: '3350',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_ORDER: '6564vNUgKHSe',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_PAN: '4918019199883839',
  DS_MERCHANT_EXPIRYDATE: '3412',
  DS_MERCHANT_CVV2: '123',
  DS_MERCHANT_EMV3DS: {
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

export const serializedAndSignedAuthDataRequest = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOi IzMzUwIiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19 NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjY1NjR2TlVnS0hTZSIsIkRTX01FUkNIQU5UX1RSQU5TQUNU SU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9QQU4iOiI0OTE4MDE5MTk5ODgzODM5IiwiRFNfTUVSQ0hBTlRfRVhQSVJZREFURSI6IjM0M TIiLCJEU19NRVJDSEFOVF9DVlYyIjoiMTIzIiwiRFNfTUVSQ0hBTlRfRU1WM0RTIjp7InRocmVlRFNJbmZvIjoiQXV0aGVudGljYXRpb2 5EYXRhIiwicHJvdG9jb2xWZXJzaW9uIjoiMi4xLjAiLCJicm93c2VyQWNjZXB0SGVhZGVyIjoidGV4dC9odG1sLGFwcGxpY2F0aW9uL3h odG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksaW1hZ2Uvd2VicCwqLyo7cT0wLjgiLCJicm93c2VyVXNlckFnZW50IjoiTW96aWxs YS81LjAgKFgxMTsgRmVkb3JhOyBMaW51eCB4ODZfNjQ7IHJ2OjcyLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvNzIuMCIsImJyb3dzZ XJKYXZhc2NyaXB0RW5hYmxlZCI6ZmFsc2UsImJyb3dzZXJKYXZhRW5hYmxlZCI6ZmFsc2UsImJyb3dzZXJMYW5ndWFnZSI6IkVTLWVzIi wiYnJvd3NlckNvbG9yRGVwdGgiOiIzMiIsImJyb3dzZXJTY3JlZW5IZWlnaHQiOiIxMDgwIiwiYnJvd3NlclNjcmVlbldpZHRoIjoiMTk yMCIsImJyb3dzZXJUWiI6Ii0xMjAiLCJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAx OTFhMSIsIm5vdGlmaWNhdGlvblVSTCI6Imh0dHA6Ly9teS1zZXJ2ZXI6MzAwMC9wb3N0LWNoYWxsZW5nZS12MiIsInRocmVlRFNDb21wS W5kIjoiWSJ9fQ==',
  Ds_Signature: 'lXD5lUIR00MncpwK4VAtE6OcqhVrHIzd/zDpwvkoWhw='
};

export const serializedAuthDataResponse = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEc19BbW91bnQiOiIzMzUwIiwiRHNfQ3VycmVuY3kiOiI5NzgiLCJEc19PcmRlciI6IjY1NjR2TlVnS0hTZSIsIkRzX01lcmNoYW50Q29kZSI6Ijk5OTAwODg4MSIsIkRzX1Rlcm1pbmFsIjoiMSIsIkRzX1RyYW5zYWN0aW9uVHlwZSI6IjAiLCJEc19FTVYzRFMiOnsidGhyZWVEU0luZm8iOiJDaGFsbGVuZ2VSZXF1ZXN0IiwicHJvdG9jb2xWZXJzaW9uIjoiMi4xLjAiLCJhY3NVUkwiOiJodHRwczovL3Npcy1kLnJlZHN5cy5lcy9zaXMtc2ltdWxhZG9yLXdlYi9hdXRoZW50aWNhdGlvblJlcXVlc3QuanNwIiwiY3JlcSI6ImV5SjBhSEpsWlVSVFUyVnlkbVZ5VkhKaGJuTkpSQ0k2SW1Ga05URTJOV1prTFdKak5EWXROR1EyTkMwNE5HUmxMV1F4TXpVd056QXhPVEZoTVNJc0ltRmpjMVJ5WVc1elNVUWlPaUl4TVdReE56azFaQzFrTURJd0xUUTJNbU10WVRsbFpDMDNNREl3TTJWbFpUVmlNbUVpTENKdFpYTnpZV2RsVkhsd1pTSTZJa05TWlhFaUxDSnRaWE56WVdkbFZtVnljMmx2YmlJNklqSXVNUzR3SWl3aVkyaGhiR3hsYm1kbFYybHVaRzkzVTJsNlpTSTZJakExSW4wIn19',
  Ds_Signature: 'zuJDMhHP8L8_KKmUXn_UegHkUtoKVSDi6rvdi0rYXfE='
};

export const deserializedAuthDataResponse = {
  Ds_Amount: '3350',
  Ds_Currency: '978',
  Ds_Order: '6564vNUgKHSe',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '1',
  Ds_TransactionType: '0',
  Ds_EMV3DS: {
    threeDSInfo: 'ChallengeRequest',
    protocolVersion: '2.1.0',
    acsURL: 'https://sis-d.redsys.es/sis-simulador-web/authenticationRequest.jsp',
    creq: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsImFjc1RyYW5zSUQiOiIxMWQxNzk1ZC1kMDIwLTQ2MmMtYTllZC03MDIwM2VlZTViMmEiLCJtZXNzYWdlVHlwZSI6IkNSZXEiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwiY2hhbGxlbmdlV2luZG93U2l6ZSI6IjA1In0'
  }
} as const;

export const threeDSChallengeForm = {
  url: 'https://sis-d.redsys.es/sis-simulador-web/authenticationRequest.jsp',
  body: {
    creq: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsImFjc1RyYW5zSUQiOiIxMWQxNzk1ZC1kMDIwLTQ2MmMtYTllZC03MDIwM2VlZTViMmEiLCJtZXNzYWdlVHlwZSI6IkNSZXEiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwiY2hhbGxlbmdlV2luZG93U2l6ZSI6IjA1In0'
  }
};

export const threeDSChallengeNotificationBody = {
  cres: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsImFjc1RyYW5zSUQiOiIxMWQxNzk1ZC1kMDIwLTQ2MmMtYTllZC03MDIwM2VlZTViMmEiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwidHJhbnNTdGF0dXMiOiJZIn0=',
  cRes: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsImFjc1RyYW5zSUQiOiIxMWQxNzk1ZC1kMDIwLTQ2MmMtYTllZC03MDIwM2VlZTViMmEiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwidHJhbnNTdGF0dXMiOiJZIn0=',
  threeDSSessionData: 'null'
};

export const deserializedCres = {
  acsTransID: '11d1795d-d020-462c-a9ed-70203eee5b2a',
  messageType: 'CRes',
  messageVersion: '2.1.0',
  threeDSServerTransID: 'ad5165fd-bc46-4d64-84de-d135070191a1',
  transStatus: 'Y'
};

export const challengeResponseRequest = {
  DS_MERCHANT_AMOUNT: '3350',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_ORDER: '6564vNUgKHSe',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_PAN: '4918019199883839',
  DS_MERCHANT_EXPIRYDATE: '3412',
  DS_MERCHANT_CVV2: '123',
  DS_MERCHANT_EMV3DS: {
    protocolVersion: '2.1.0',
    threeDSInfo: 'ChallengeResponse',
    cres: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImFkNTE2NWZkLWJjNDYtNGQ2NC04NGRlLWQxMzUwNzAxOTFhMSIsImFjc1RyYW5zSUQiOiIxMWQxNzk1ZC1kMDIwLTQ2MmMtYTllZC03MDIwM2VlZTViMmEiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwidHJhbnNTdGF0dXMiOiJZIn0='
  }
} as const;

export const serializedAndSignedChallengeResponseRequest = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIzMzUwIiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjY1NjR2TlVnS0hTZSIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9QQU4iOiI0OTE4MDE5MTk5ODgzODM5IiwiRFNfTUVSQ0hBTlRfRVhQSVJZREFURSI6IjM0MTIiLCJEU19NRVJDSEFOVF9DVlYyIjoiMTIzIiwiRFNfTUVSQ0hBTlRfRU1WM0RTIjp7InByb3RvY29sVmVyc2lvbiI6IjIuMS4wIiwidGhyZWVEU0luZm8iOiJDaGFsbGVuZ2VSZXNwb25zZSIsImNyZXMiOiJleUowYUhKbFpVUlRVMlZ5ZG1WeVZISmhibk5KUkNJNkltRmtOVEUyTldaa0xXSmpORFl0TkdRMk5DMDROR1JsTFdReE16VXdOekF4T1RGaE1TSXNJbUZqYzFSeVlXNXpTVVFpT2lJeE1XUXhOemsxWkMxa01ESXdMVFEyTW1NdFlUbGxaQzAzTURJd00yVmxaVFZpTW1FaUxDSnRaWE56WVdkbFZIbHdaU0k2SWtOU1pYTWlMQ0p0WlhOellXZGxWbVZ5YzJsdmJpSTZJakl1TVM0d0lpd2lkSEpoYm5OVGRHRjBkWE1pT2lKWkluMD0ifX0=',
  Ds_Signature: 'LHzB+OwxPoBx19EHXssms9IWM/dShjd/G7xST48Ie3I='
};

export const serializedChallengeResponseResponse = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEc19BbW91bnQiOiIzMzUwIiwiRHNfQ3VycmVuY3kiOiI5NzgiLCJEc19PcmRlciI6IjY1NjR2TlVnS0hTZSIsIkRzX01lcmNoYW50Q29kZSI6Ijk5OTAwODg4MSIsIkRzX1Rlcm1pbmFsIjoiMSIsIkRzX1Jlc3BvbnNlIjoiMDAwMCIsIkRzX0F1dGhvcmlzYXRpb25Db2RlIjoiMzkyODg5IiwiRHNfVHJhbnNhY3Rpb25UeXBlIjoiMCIsIkRzX1NlY3VyZVBheW1lbnQiOiIyIiwiRHNfTGFuZ3VhZ2UiOiIxIiwiRHNfQ2FyZE51bWJlciI6IjQ5MTgwMSoqKioqKjM4MzkiLCJEc19NZXJjaGFudERhdGEiOiIiLCJEc19DYXJkX0NvdW50cnkiOiI3MjQiLCJEc19DYXJkX0JyYW5kIjoiMSIsIkRzX1Byb2Nlc3NlZFBheU1ldGhvZCI6Ijc4In0=',
  Ds_Signature: '7TUJ8uzT1ex857PUrPQdfdRML_9MUP9Bjaf1YErbmQ4='
};

export const deserializedChallengeResponseResponse = {
  Ds_Amount: '3350',
  Ds_Currency: '978',
  Ds_Order: '6564vNUgKHSe',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '1',
  Ds_Response: '0000',
  Ds_AuthorisationCode: '392889',
  Ds_TransactionType: '0',
  Ds_SecurePayment: '2',
  Ds_Language: '1',
  Ds_CardNumber: '491801******3839',
  Ds_MerchantData: '',
  Ds_Card_Country: '724',
  Ds_Card_Brand: '1',
  Ds_ProcessedPayMethod: '78'
} as const;
