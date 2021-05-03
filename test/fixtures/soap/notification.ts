export const soapNotificationMerchantKey = 'Mk9m98IfEblmPfrpsawt7BmxObt98Jev';

export const serializedSoapNotification12 = {
  headers: {
    'Content-Type': 'application/soap+xml; charset=utf-8'
  },
  body:
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://www.w3.org/2003/05/soap-encoding" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:rpc="http://www.w3.org/2003/05/soap-rpc" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">' +
    '<soap12:Body soap12:encodingStyle="http://www.w3.org/2003/05/soap-encoding">' +
    '<q3:procesaNotificacionSIS xmlns:q3="InotificacionSIS">' +
    '<XML xsi:type="xsd:string">&lt;Message&gt;&lt;Request Ds_Version=&quot;0.0&quot;&gt;&lt;Fecha&gt;01/04/2003&lt;/Fecha&gt;&lt;Hora&gt;16:57&lt;/Hora&gt;&lt;Ds_SecurePayment&gt;1&lt;/Ds_SecurePayment&gt;&lt;Ds_Amount&gt;345&lt;/Ds_Amount&gt;&lt;Ds_Currency&gt;978&lt;/Ds_Currency&gt;&lt;Ds_Order&gt;165446&lt;/Ds_Order&gt;&lt;Ds_Card_Type&gt;C&lt;/Ds_Card_Type&gt;&lt;Ds_MerchantCode&gt;999008881&lt;/Ds_MerchantCode&gt;&lt;Ds_Terminal&gt;001&lt;/Ds_Terminal&gt;&lt;Ds_Card_Country&gt;724&lt;/Ds_Card_Country&gt;&lt;Ds_Response&gt;0000&lt;/Ds_Response&gt;&lt;Ds_MerchantData&gt;Alfombrilla para raton&lt;/Ds_MerchantData&gt;&lt;Ds_TransactionType&gt;1&lt;/Ds_TransactionType&gt;&lt;Ds_ConsumerLanguage&gt;1&lt;/Ds_ConsumerLanguage&gt;&lt;/Request&gt;&lt;Signature&gt;RSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=&lt;/Signature&gt;&lt;/Message&gt;</XML>' +
    '</q3:procesaNotificacionSIS>' +
    '</soap12:Body>' +
    '</soap12:Envelope>'
};

export const serializedSoapNotification11 = {
  headers: {
    'Content-Type': 'text/xml; charset=utf-8',
    SOAPAction: 'urn:InotificacionSIS#procesaNotificacionSIS'
  },
  body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><q1:procesaNotificacionSIS xmlns:q1="InotificacionSIS"><XML xsi:type="xsd:string">&lt;Message&gt;&lt;Request Ds_Version=&quot;0.0&quot;&gt;&lt;Fecha&gt;01/04/2003&lt;/Fecha&gt;&lt;Hora&gt;16:57&lt;/Hora&gt;&lt;Ds_SecurePayment&gt;1&lt;/Ds_SecurePayment&gt;&lt;Ds_Amount&gt;345&lt;/Ds_Amount&gt;&lt;Ds_Currency&gt;978&lt;/Ds_Currency&gt;&lt;Ds_Order&gt;165446&lt;/Ds_Order&gt;&lt;Ds_Card_Type&gt;C&lt;/Ds_Card_Type&gt;&lt;Ds_MerchantCode&gt;999008881&lt;/Ds_MerchantCode&gt;&lt;Ds_Terminal&gt;001&lt;/Ds_Terminal&gt;&lt;Ds_Card_Country&gt;724&lt;/Ds_Card_Country&gt;&lt;Ds_Response&gt;0000&lt;/Ds_Response&gt;&lt;Ds_MerchantData&gt;Alfombrilla para raton&lt;/Ds_MerchantData&gt;&lt;Ds_TransactionType&gt;1&lt;/Ds_TransactionType&gt;&lt;Ds_ConsumerLanguage&gt;1&lt;/Ds_ConsumerLanguage&gt;&lt;/Request&gt;&lt;Signature&gt;RSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=&lt;/Signature&gt;&lt;/Message&gt;</XML></q1:procesaNotificacionSIS></soap:Body></soap:Envelope>'
};

export const serializedSoapNotificationParams =
  '<Request Ds_Version="0.0">' +
  '<Fecha>01/04/2003</Fecha>' +
  '<Hora>16:57</Hora>' +
  '<Ds_SecurePayment>1</Ds_SecurePayment>' +
  '<Ds_Amount>345</Ds_Amount>' +
  '<Ds_Currency>978</Ds_Currency>' +
  '<Ds_Order>165446</Ds_Order>' +
  '<Ds_Card_Type>C</Ds_Card_Type>' +
  '<Ds_MerchantCode>999008881</Ds_MerchantCode>' +
  '<Ds_Terminal>001</Ds_Terminal>' +
  '<Ds_Card_Country>724</Ds_Card_Country>' +
  '<Ds_Response>0000</Ds_Response>' +
  '<Ds_MerchantData>Alfombrilla para raton</Ds_MerchantData>' +
  '<Ds_TransactionType>1</Ds_TransactionType>' +
  '<Ds_ConsumerLanguage>1</Ds_ConsumerLanguage>' +
  '</Request>';

export const serializedAndSignedSoapNotificationParams =
  '<Message>' +
  serializedSoapNotificationParams +
  '<Signature>RSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=</Signature>' +
  '</Message>';

export const parsedSoapNotification = {
  Request: {
    Fecha: '01/04/2003',
    Hora: '16:57',
    Ds_SecurePayment: '1',
    Ds_Amount: '345',
    Ds_Currency: '978',
    Ds_Order: '165446',
    Ds_Card_Type: 'C',
    Ds_MerchantCode: '999008881',
    Ds_Terminal: '001',
    Ds_Card_Country: '724',
    Ds_Response: '0000',
    Ds_MerchantData: 'Alfombrilla para raton',
    Ds_TransactionType: '1',
    Ds_ConsumerLanguage: '1'
  },
  Signature: 'RSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok='
};

export const soapNotification3DESOrder = 'fKbHvdchVfk=';
