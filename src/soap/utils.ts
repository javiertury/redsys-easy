import { ParseError } from '../errors';

export const unescapeXML = (str: string) => {
  const xml = str.replace(
    /&(lt|#60|gt|#62|quot|#34|amp|#38|apos|#39);/g,
    (_match, p1) => {
      switch (p1) {
        case 'lt':
        case '#60':
          return '<';
        case 'gt':
        case '#62':
          return '>';
        case 'quot':
        case '#34':
          return '"';
        case 'amp':
        case '#38':
          return '&';
        case 'apos':
        case '#39':
          return "'";
        default:
          throw new ParseError('Unknown xml escape character', p1, str);
      }
    }
  );

  return xml;
};

export const escapeXML = (str: string) => {
  const xml = str.replace(/<|>|"|&|'/g, (match) => {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      default:
        throw new ParseError('Unknown special xml character', match, str);
    }
  });

  return xml;
};

type SoapRequest =
  | {
      headers: Record<string, string>;
      body?: string | undefined;
    }
  | {
      headers?: Record<string, string> | undefined;
      body: string;
    };

/**
 * Detects the soap version of a HTTP request
 *
 * @public
 */
export const detectSoapVersion = (req: SoapRequest) => {
  const contentType = req.headers?.['Content-Type'];
  if (contentType != null && contentType) {
    if (contentType.includes('soap+xml')) {
      return '1.2';
    } else {
      return '1.1';
    }
  } else if (req.body != null && req.body) {
    if (req.body.includes('www.w3.org/2003/05/soap-envelope')) {
      return '1.2';
    } else if (req.body.includes('schemas.xmlsoap.org/soap/envelope')) {
      return '1.1';
    }
  }

  throw new ParseError('Not a valid SOAP request', req);
};

/**
 * Extracts the body of a SOAP notification from the body of the HTTP request
 *
 * @remarks
 * It does not understand SOAP or use WSDL, the implementation is a little bit hacky
 *
 * @public
 */
export const mimicSoapNotificationReceiver = (xml: string): string => {
  const regex = /<(?:\w+:)?XML(?: [^<>]+)?>([^<>]+)<\/(?:\w+:)?XML>/;

  const matchArray = regex.exec(xml);
  const xmlContent = matchArray ? matchArray[1] : undefined;
  if (xmlContent == null) {
    throw new ParseError('Invalid SOAP notification', xml);
  }

  // wsdl defines XML tag as a string. It cannot be a CDATA (which is a XML element).
  return unescapeXML(xmlContent);
};

/**
 * Creates the body of a HTTP response as SOAP 1.1 from the body of a SOAP notification response
 *
 * @remarks
 * It does not understand SOAP or use WSDL, the implementation is a little bit hacky
 *
 * @public
 */
export const mimicSoap11NotificationResponse = (answer: string) => {
  const escapedAnswer = escapeXML(answer);
  return `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><q2:procesaNotificacionSISResponse xmlns:q2="InotificacionSIS"><return xsi:type="xsd:string">${escapedAnswer}</return></q2:procesaNotificacionSISResponse></soap:Body></soap:Envelope>`;
};

/**
 * Creates the body of a HTTP response as SOAP 1.2 from the body of a SOAP notification response
 *
 * @remarks
 * It does not understand SOAP or use WSDL, the implementation is a little bit hacky
 *
 * @public
 */
export const mimicSoap12NotificationResponse = (answer: string) => {
  const escapedAnswer = escapeXML(answer);

  return `<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://www.w3.org/2003/05/soap-encoding" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:rpc="http://www.w3.org/2003/05/soap-rpc" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body soap12:encodingStyle="http://www.w3.org/2003/05/soap-encoding"><q4:procesaNotificacionSISResponse xmlns:q4="InotificacionSIS"><rpc:result xmlns="">return</rpc:result><return xsi:type="xsd:string">${escapedAnswer}</return></q4:procesaNotificacionSISResponse></soap12:Body></soap12:Envelope>`;
};
