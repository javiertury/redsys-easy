/* eslint-disable no-useless-escape */
export {
  webServiceRequestMerchantKey as webServiceResponseMerchantKey
} from './web-service-request';

export const serializedWebServiceResponseParams =
  '<RETORNOXML>' +
  '<CODIGO>0</CODIGO>' +
  '<OPERACION>' +
  '<Ds_Amount>3350</Ds_Amount>' +
  '<Ds_Currency>978</Ds_Currency>' +
  '<Ds_Order>0000ijd2d3</Ds_Order>' +
  '<Ds_Signature>OTcH98KdGhGJ3hTKsXJCvJFO9KjcIYgj1oxwSSC+yw0=</Ds_Signature>' +
  '<Ds_MerchantCode>999008881</Ds_MerchantCode>' +
  '<Ds_Terminal>1</Ds_Terminal>' +
  '<Ds_Response>0000</Ds_Response>' +
  '<Ds_AuthorisationCode>640599</Ds_AuthorisationCode>' +
  '<Ds_TransactionType>A</Ds_TransactionType>' +
  '<Ds_SecurePayment>0</Ds_SecurePayment>' +
  '<Ds_Language>1</Ds_Language>' +
  '<Ds_CardNumber>454881******0004</Ds_CardNumber>' +
  '<Ds_ExpiryDate>2012</Ds_ExpiryDate>' +
  '<Ds_Merchant_Identifier>e1996507292293e8db292e5542992cd237861dbd</Ds_Merchant_Identifier>' +
  '<Ds_MerchantData>' +
  '</Ds_MerchantData>' +
  '<Ds_Card_Country>724</Ds_Card_Country>' +
  '<Ds_Card_Brand>1</Ds_Card_Brand>' +
  '</OPERACION>' +
  '</RETORNOXML>';

export const serializedWebServiceResponse = [
  {
    trataPeticionReturn: serializedWebServiceResponseParams
  },
  '<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><soapenv:Header/><soapenv:Body><p231:trataPeticionResponse xmlns:p231=\"http://webservice.sis.sermepa.es\"><p231:trataPeticionReturn>&lt;RETORNOXML&gt;&lt;CODIGO&gt;0&lt;/CODIGO&gt;&lt;OPERACION&gt;&lt;Ds_Amount&gt;3350&lt;/Ds_Amount&gt;&lt;Ds_Currency&gt;978&lt;/Ds_Currency&gt;&lt;Ds_Order&gt;0000ijd2d3&lt;/Ds_Order&gt;&lt;Ds_Signature&gt;OTcH98KdGhGJ3hTKsXJCvJFO9KjcIYgj1oxwSSC+yw0=&lt;/Ds_Signature&gt;&lt;Ds_MerchantCode&gt;999008881&lt;/Ds_MerchantCode&gt;&lt;Ds_Terminal&gt;1&lt;/Ds_Terminal&gt;&lt;Ds_Response&gt;0000&lt;/Ds_Response&gt;&lt;Ds_AuthorisationCode&gt;640599&lt;/Ds_AuthorisationCode&gt;&lt;Ds_TransactionType&gt;A&lt;/Ds_TransactionType&gt;&lt;Ds_SecurePayment&gt;0&lt;/Ds_SecurePayment&gt;&lt;Ds_Language&gt;1&lt;/Ds_Language&gt;&lt;Ds_CardNumber&gt;454881******0004&lt;/Ds_CardNumber&gt;&lt;Ds_ExpiryDate&gt;2012&lt;/Ds_ExpiryDate&gt;&lt;Ds_Merchant_Identifier&gt;e1996507292293e8db292e5542992cd237861dbd&lt;/Ds_Merchant_Identifier&gt;&lt;Ds_MerchantData&gt;&lt;/Ds_MerchantData&gt;&lt;Ds_Card_Country&gt;724&lt;/Ds_Card_Country&gt;&lt;Ds_Card_Brand&gt;1&lt;/Ds_Card_Brand&gt;&lt;/OPERACION&gt;&lt;/RETORNOXML&gt;</p231:trataPeticionReturn></p231:trataPeticionResponse></soapenv:Body></soapenv:Envelope>',
  null,
  '<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"  xmlns:impl=\"http://webservice.sis.sermepa.es\" xmlns:intf=\"http://webservice.sis.sermepa.es\"><soap:Body><impl:trataPeticion xmlns:impl=\"http://webservice.sis.sermepa.es\" xmlns=\"http://webservice.sis.sermepa.es\"><impl:datoEntrada>&lt;REQUEST&gt;&lt;DATOSENTRADA&gt;&lt;DS_MERCHANT_ORDER&gt;0000ijd2d3&lt;/DS_MERCHANT_ORDER&gt;&lt;DS_MERCHANT_MERCHANTCODE&gt;999008881&lt;/DS_MERCHANT_MERCHANTCODE&gt;&lt;DS_MERCHANT_TRANSACTIONTYPE&gt;A&lt;/DS_MERCHANT_TRANSACTIONTYPE&gt;&lt;DS_MERCHANT_TERMINAL&gt;1&lt;/DS_MERCHANT_TERMINAL&gt;&lt;DS_MERCHANT_CURRENCY&gt;978&lt;/DS_MERCHANT_CURRENCY&gt;&lt;DS_MERCHANT_AMOUNT&gt;3350&lt;/DS_MERCHANT_AMOUNT&gt;&lt;DS_MERCHANT_IDENTIFIER&gt;REQUIRED&lt;/DS_MERCHANT_IDENTIFIER&gt;&lt;DS_MERCHANT_PAN&gt;4548812049400004&lt;/DS_MERCHANT_PAN&gt;&lt;DS_MERCHANT_EXPIRYDATE&gt;2012&lt;/DS_MERCHANT_EXPIRYDATE&gt;&lt;DS_MERCHANT_CVV2&gt;123&lt;/DS_MERCHANT_CVV2&gt;&lt;/DATOSENTRADA&gt;&lt;DS_SIGNATUREVERSION&gt;HMAC_SHA256_V1&lt;/DS_SIGNATUREVERSION&gt;&lt;DS_SIGNATURE&gt;luR+88HQ0HF0qpCZX1JbOriyfRiv2KXjMa0jvRxV6i0=&lt;/DS_SIGNATURE&gt;&lt;/REQUEST&gt;</impl:datoEntrada></impl:trataPeticion></soap:Body></soap:Envelope>'
] as const;

export const webServiceResponseSignedString = '33500000ijd2d39990088819780000454881******0004A0';

export const deserializedWebServiceResponseParams = {
  Ds_Amount: '3350',
  Ds_Currency: '978',
  Ds_Order: '0000ijd2d3',
  Ds_Signature: 'OTcH98KdGhGJ3hTKsXJCvJFO9KjcIYgj1oxwSSC+yw0=',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '1',
  Ds_Response: '0000',
  Ds_AuthorisationCode: '640599',
  Ds_TransactionType: 'A',
  Ds_SecurePayment: '0',
  Ds_Language: '1',
  Ds_CardNumber: '454881******0004',
  Ds_ExpiryDate: '2012',
  Ds_Merchant_Identifier: 'e1996507292293e8db292e5542992cd237861dbd',
  Ds_MerchantData: '',
  Ds_Card_Country: '724',
  Ds_Card_Brand: '1'
} as const;

export const deserializedWebServiceResponse = {
  CODIGO: '0',
  OPERACION: deserializedWebServiceResponseParams
} as const;

export const webServiceResponse3DESOrder = '/BHKdcRWVc3zWWsG+OYdfA==';
