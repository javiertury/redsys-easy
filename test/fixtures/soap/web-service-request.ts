export const webServiceRequestMerchantKey = 'Mk9m98IfEblmPfrpsawt7BmxObt98Jev';

export const webServiceRequestParams = {
  DS_MERCHANT_ORDER: '0000ijd2d3',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TRANSACTIONTYPE: 'A',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_AMOUNT: '3350',
  DS_MERCHANT_IDENTIFIER: 'REQUIRED',
  DS_MERCHANT_PAN: '4548812049400004',
  DS_MERCHANT_EXPIRYDATE: '2012',
  DS_MERCHANT_CVV2: '123'
} as const;

export const webServiceRequest3DESOrder = '/BHKdcRWVc3zWWsG+OYdfA==';

export const serializedWebServiceRequestParams =
  '<DATOSENTRADA>' +
  '<DS_MERCHANT_ORDER>0000ijd2d3</DS_MERCHANT_ORDER>' +
  '<DS_MERCHANT_MERCHANTCODE>999008881</DS_MERCHANT_MERCHANTCODE>' +
  '<DS_MERCHANT_TRANSACTIONTYPE>A</DS_MERCHANT_TRANSACTIONTYPE>' +
  '<DS_MERCHANT_TERMINAL>1</DS_MERCHANT_TERMINAL>' +
  '<DS_MERCHANT_CURRENCY>978</DS_MERCHANT_CURRENCY>' +
  '<DS_MERCHANT_AMOUNT>3350</DS_MERCHANT_AMOUNT>' +
  '<DS_MERCHANT_IDENTIFIER>REQUIRED</DS_MERCHANT_IDENTIFIER>' +
  '<DS_MERCHANT_PAN>4548812049400004</DS_MERCHANT_PAN>' +
  '<DS_MERCHANT_EXPIRYDATE>2012</DS_MERCHANT_EXPIRYDATE>' +
  '<DS_MERCHANT_CVV2>123</DS_MERCHANT_CVV2>' +
  '</DATOSENTRADA>';

export const webServiceRequestSignature = 'CDoeNHeFj1DfIsa/NiNSiz2l5IvSfP1aIpXliLA4Cvc=';

export const serializedAndSignedWebServiceRequestParams =
  '<REQUEST>' +
  serializedWebServiceRequestParams +
  '<DS_SIGNATUREVERSION>HMAC_SHA256_V1</DS_SIGNATUREVERSION>' +
  `<DS_SIGNATURE>${webServiceRequestSignature}</DS_SIGNATURE>` +
  '</REQUEST>';

export const serializedWebServiceRequest = {
  datoEntrada: serializedAndSignedWebServiceRequestParams
};
