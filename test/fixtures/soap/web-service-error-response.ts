/* eslint-disable no-useless-escape */

export const serializedWebServiceErrorResponseParams =
  '<RETORNOXML>' +
  '<CODIGO>SIS0051</CODIGO>' +
  '<RECIBIDO>' +
  '<trataPeticion>' +
  '<datoEntrada>' +
  '<![CDATA[<REQUEST>' +
  '<DATOSENTRADA>' +
  '<DS_MERCHANT_AMOUNT>100</DS_MERCHANT_AMOUNT>' +
  '<DS_MERCHANT_ORDER>0089X1234</DS_MERCHANT_ORDER>' +
  '<DS_MERCHANT_MERCHANTCODE>999008881</DS_MERCHANT_MERCHANTCODE>' +
  '<DS_MERCHANT_CURRENCY>978</DS_MERCHANT_CURRENCY>' +
  '<DS_MERCHANT_TRANSACTIONTYPE>A</DS_MERCHANT_TRANSACTIONTYPE>' +
  '<DS_MERCHANT_TERMINAL>001</DS_MERCHANT_TERMINAL>' +
  '<DS_MERCHANT_PAN>4548812049400004</DS_MERCHANT_PAN>' +
  '<DS_MERCHANT_EXPIRYDATE>2012</DS_MERCHANT_EXPIRYDATE>' +
  '<DS_MERCHANT_CVV2>123</DS_MERCHANT_CVV2>' +
  '</DATOSENTRADA>' +
  '<DS_SIGNATUREVERSION>HMAC_SHA256_V1</DS_SIGNATUREVERSION>' +
  '<DS_SIGNATURE>sWd/ZTCWwRjEx6S0VwPsOUamOdbzg7MIXAN3XgoGBH8=</DS_SIGNATURE>' +
  '</REQUEST>]]>' +
  '</datoEntrada>' +
  '</trataPeticion>' +
  '</RECIBIDO>' +
  '</RETORNOXML>';

export const serializedWebServiceErrorResponse = [
  {
    trataPeticionReturn: serializedWebServiceErrorResponseParams
  },
  '<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><soapenv:Header/><soapenv:Body><p231:trataPeticionResponse xmlns:p231=\"http://webservice.sis.sermepa.es\"><p231:trataPeticionReturn>&lt;RETORNOXML&gt;&lt;CODIGO&gt;SIS0051&lt;/CODIGO&gt;&lt;RECIBIDO&gt;&lt;trataPeticion&gt;&lt;datoEntrada&gt;&lt;![CDATA[&lt;REQUEST&gt;&lt;DATOSENTRADA&gt;&lt;DS_MERCHANT_AMOUNT&gt;100&lt;/DS_MERCHANT_AMOUNT&gt;&lt;DS_MERCHANT_ORDER&gt;0089X1234&lt;/DS_MERCHANT_ORDER&gt;&lt;DS_MERCHANT_MERCHANTCODE&gt;999008881&lt;/DS_MERCHANT_MERCHANTCODE&gt;&lt;DS_MERCHANT_CURRENCY&gt;978&lt;/DS_MERCHANT_CURRENCY&gt;&lt;DS_MERCHANT_TRANSACTIONTYPE&gt;A&lt;/DS_MERCHANT_TRANSACTIONTYPE&gt;&lt;DS_MERCHANT_TERMINAL&gt;001&lt;/DS_MERCHANT_TERMINAL&gt;&lt;DS_MERCHANT_PAN&gt;4548812049400004&lt;/DS_MERCHANT_PAN&gt;&lt;DS_MERCHANT_EXPIRYDATE&gt;2012&lt;/DS_MERCHANT_EXPIRYDATE&gt;&lt;DS_MERCHANT_CVV2&gt;123&lt;/DS_MERCHANT_CVV2&gt;&lt;/DATOSENTRADA&gt;&lt;DS_SIGNATUREVERSION&gt;HMAC_SHA256_V1&lt;/DS_SIGNATUREVERSION&gt;&lt;DS_SIGNATURE&gt;sWd/ZTCWwRjEx6S0VwPsOUamOdbzg7MIXAN3XgoGBH8=&lt;/DS_SIGNATURE&gt;&lt;/REQUEST&gt;]]&gt;&lt;/datoEntrada&gt;&lt;/trataPeticion&gt;&lt;/RECIBIDO&gt;&lt;/RETORNOXML&gt;</p231:trataPeticionReturn></p231:trataPeticionResponse></soapenv:Body></soapenv:Envelope>',
  null,
  '<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"  xmlns:impl=\"http://webservice.sis.sermepa.es\" xmlns:intf=\"http://webservice.sis.sermepa.es\"><soap:Body><impl:trataPeticion xmlns:impl=\"http://webservice.sis.sermepa.es\" xmlns=\"http://webservice.sis.sermepa.es\"><impl:datoEntrada>&lt;REQUEST&gt;&lt;DATOSENTRADA&gt;&lt;DS_MERCHANT_ORDER&gt;0000ijd2d3&lt;/DS_MERCHANT_ORDER&gt;&lt;DS_MERCHANT_MERCHANTCODE&gt;999008881&lt;/DS_MERCHANT_MERCHANTCODE&gt;&lt;DS_MERCHANT_TRANSACTIONTYPE&gt;A&lt;/DS_MERCHANT_TRANSACTIONTYPE&gt;&lt;DS_MERCHANT_TERMINAL&gt;1&lt;/DS_MERCHANT_TERMINAL&gt;&lt;DS_MERCHANT_CURRENCY&gt;978&lt;/DS_MERCHANT_CURRENCY&gt;&lt;DS_MERCHANT_AMOUNT&gt;3350&lt;/DS_MERCHANT_AMOUNT&gt;&lt;DS_MERCHANT_IDENTIFIER&gt;REQUIRED&lt;/DS_MERCHANT_IDENTIFIER&gt;&lt;DS_MERCHANT_PAN&gt;4548812049400004&lt;/DS_MERCHANT_PAN&gt;&lt;DS_MERCHANT_EXPIRYDATE&gt;2012&lt;/DS_MERCHANT_EXPIRYDATE&gt;&lt;DS_MERCHANT_CVV2&gt;123&lt;/DS_MERCHANT_CVV2&gt;&lt;/DATOSENTRADA&gt;&lt;DS_SIGNATUREVERSION&gt;HMAC_SHA256_V1&lt;/DS_SIGNATUREVERSION&gt;&lt;DS_SIGNATURE&gt;luR+88HQ0HF0qpCZX1JbOriyfRiv2KXjMa0jvRxV6i0=&lt;/DS_SIGNATURE&gt;&lt;/REQUEST&gt;</impl:datoEntrada></impl:trataPeticion></soap:Body></soap:Envelope>'
] as const;

export const parsedWebServiceErrorResponse = {
  CODIGO: 'SIS0051',
  RECIBIDO: {
    trataPeticion: {
      datoEntrada:
        '<REQUEST>' +
        '<DATOSENTRADA>' +
        '<DS_MERCHANT_AMOUNT>100</DS_MERCHANT_AMOUNT>' +
        '<DS_MERCHANT_ORDER>0089X1234</DS_MERCHANT_ORDER>' +
        '<DS_MERCHANT_MERCHANTCODE>999008881</DS_MERCHANT_MERCHANTCODE>' +
        '<DS_MERCHANT_CURRENCY>978</DS_MERCHANT_CURRENCY>' +
        '<DS_MERCHANT_TRANSACTIONTYPE>A</DS_MERCHANT_TRANSACTIONTYPE>' +
        '<DS_MERCHANT_TERMINAL>001</DS_MERCHANT_TERMINAL>' +
        '<DS_MERCHANT_PAN>4548812049400004</DS_MERCHANT_PAN>' +
        '<DS_MERCHANT_EXPIRYDATE>2012</DS_MERCHANT_EXPIRYDATE>' +
        '<DS_MERCHANT_CVV2>123</DS_MERCHANT_CVV2>' +
        '</DATOSENTRADA>' +
        '<DS_SIGNATUREVERSION>HMAC_SHA256_V1</DS_SIGNATUREVERSION>' +
        '<DS_SIGNATURE>sWd/ZTCWwRjEx6S0VwPsOUamOdbzg7MIXAN3XgoGBH8=</DS_SIGNATURE>' +
        '</REQUEST>'
    }
  }
};
