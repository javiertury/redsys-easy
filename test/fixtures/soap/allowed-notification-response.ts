export {
  soapNotificationMerchantKey as allowedSoapNotificationResponseMerchantKey
} from './redirect-notification';

export const allowedNotificationResponseParams = {
  order: '165441',
  allow: true
};

export const allowedNotificationResponse3DESOrder = '9vgc3PPtGIU=';

export const serializedAllowedNotificationResponseParams =
  '<Response Ds_Version="0.0">' +
  '<Ds_Response_Merchant>OK</Ds_Response_Merchant>' +
  '</Response>';

export const allowedNotificationResponseParamsSignature = 'yQOHa14Yk2fpjHuO69+1cANLes6Z2/VwaoTWluiXe50=';

export const serializedAndSignedAllowedNotificationResponseParams =
  '<Message>' +
  serializedAllowedNotificationResponseParams +
  `<Signature>${allowedNotificationResponseParamsSignature}</Signature>` +
  '</Message>';

export const serializedAllowedNotificationResponse11 =
  '<?xml version="1.0" encoding="utf-8"?>' +
  '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
  '<soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
  '<q2:procesaNotificacionSISResponse xmlns:q2="InotificacionSIS">' +
  '<return xsi:type="xsd:string">&lt;Message&gt;&lt;Response Ds_Version=&quot;0.0&quot;&gt;&lt;Ds_Response_Merchant&gt;OK&lt;/Ds_Response_Merchant&gt;&lt;/Response&gt;&lt;Signature&gt;yQOHa14Yk2fpjHuO69+1cANLes6Z2/VwaoTWluiXe50=&lt;/Signature&gt;&lt;/Message&gt;</return>' +
  '</q2:procesaNotificacionSISResponse>' +
  '</soap:Body>' +
  '</soap:Envelope>';

export const serializedAllowedNotificationResponse12 =
  '<?xml version="1.0" encoding="utf-8"?>' +
  '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://www.w3.org/2003/05/soap-encoding" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:rpc="http://www.w3.org/2003/05/soap-rpc" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">' +
  '<soap12:Body soap12:encodingStyle="http://www.w3.org/2003/05/soap-encoding">' +
  '<q4:procesaNotificacionSISResponse xmlns:q4="InotificacionSIS">' +
  '<rpc:result xmlns="">return</rpc:result>' +
  '<return xsi:type="xsd:string">&lt;Message&gt;&lt;Response Ds_Version=&quot;0.0&quot;&gt;&lt;Ds_Response_Merchant&gt;OK&lt;/Ds_Response_Merchant&gt;&lt;/Response&gt;&lt;Signature&gt;yQOHa14Yk2fpjHuO69+1cANLes6Z2/VwaoTWluiXe50=&lt;/Signature&gt;&lt;/Message&gt;</return>' +
  '</q4:procesaNotificacionSISResponse>' +
  '</soap12:Body>' +
  '</soap12:Envelope>';
