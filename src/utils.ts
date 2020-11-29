import crypto from 'crypto';

import { ParseError } from './errors';
import { SIS_ERROR_CODES } from './assets/error-codes';
import RESPONSE_CODES from './assets/response-codes';
import TRANSACTION_TYPES from './assets/transaction-types';

/**
 * Adds padding to a buffer.
 *
 * Rounds up the buffer length to the next block and uses 0 as padding.
 *
 * @params {buffer} buf - Input buffer
 * @params {number} blocksize - Size of block
 * @return {buffer}
 */
export const zeroPad = (buf: Buffer, blocksize: number): Buffer => {
  const pad = Buffer.alloc((blocksize - (buf.length % blocksize)) % blocksize, 0);
  return Buffer.concat([buf, pad]);
};

/**
 * Encrypt a message using 3DES
 *
 * @params {string} key - Key to encrypt message
 * @params {string} message - Message to be encrypted
 * @return {buffer}
 */
export const encrypt3DES = (key: string, message: string): Buffer => {
  const keyBuf = Buffer.from(key, 'base64');
  const iv = Buffer.alloc(8, 0);

  const messageBuf = Buffer.from(message.toString(), 'utf8');
  // Align to blocksize by padding the message buffer
  const paddedMessageBuf = zeroPad(messageBuf, 8);

  const cipher = crypto.createCipheriv('des-ede3-cbc', keyBuf, iv);
  cipher.setAutoPadding(false);
  const encryptedBuf = Buffer.concat([cipher.update(paddedMessageBuf), cipher.final()]);

  // Make sure that encrypted buffer is not longer than the padded message
  const maxLength = Math.ceil(messageBuf.length / 8) * 8;
  return encryptedBuf.slice(0, maxLength);
};

export const sha256Sign = (merchantKey: string, order: string, params: string) => {
  const orderKeyBuf = encrypt3DES(merchantKey, order);
  return crypto.createHmac('sha256', orderKeyBuf).update(params).digest('base64');
};

export { TRANSACTION_TYPES };

export const getResponseCodeMessage = (code: string | number): string | null => {
  if ((typeof code !== 'number' && typeof code !== 'string') || !Number.isInteger(code)) {
    return null;
  }

  const lookupNum = typeof code === 'string' ? Number.parseInt(code.trim()) : code;

  if (!Number.isFinite(lookupNum) || lookupNum < 0) {
    return null;
  }

  const msg = RESPONSE_CODES[lookupNum.toString()];

  if ((msg == null || !msg) && lookupNum < 100) {
    return 'Transacción autorizada para pagos y preautorizaciones';
  }

  return msg ?? null;
};

export const getSISErrorCodeMessage = (code: string): string | undefined => {
  if (!code || typeof code !== 'string') {
    return undefined;
  }

  return SIS_ERROR_CODES[code.trim()];
};

// Order is important
export const signedFieldsXMLResponse = ['Ds_Amount', 'Ds_Order',
  'Ds_MerchantCode', 'Ds_Currency', 'Ds_Response', 'Ds_CardNumber',
  'Ds_TransactionType', 'Ds_SecurePayment'];

export const unescapeXML = (str: string) => {
  const xml = str.replace(/&(lt|#60|gt|#62|quot|#34|amp|#38|apos|#39);/g, (_match, p1) => {
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
        return '\'';
      default:
        throw new ParseError('Unknown xml escape character', p1, str);
    }
  });

  return xml;
};

export const escapeXML = (str: string) => {
  const xml = str.replace(/<|>|"|&|'/g, match => {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      default:
        throw new ParseError('Unknown special xml character', match, str);
    }
  });

  return xml;
};

type SoapRequest = {
  headers: Record<string, string>
  body?: string
} | {
  headers?: Record<string, string>
  body: string
};

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

export const mimicSoapNotificationReceiver = (xml: string) => {
  const regex = /<(?:\w+:)?XML(?: [^<>]+)?>([^<>]+)<\/(?:\w+:)?XML>/;

  const matchArray = regex.exec(xml);
  const xmlContent = matchArray ? matchArray[1] : undefined;
  if (xmlContent == null) {
    throw new ParseError('Invalid SOAP notification', xml);
  }

  // wsdl defines XML tag as a string. It cannot be a CDATA (which is a XML element).
  return unescapeXML(xmlContent);
};

export const mimicSoap11NotificationResponse = (answer: string) => {
  const escapedAnswer = escapeXML(answer);
  return `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><q2:procesaNotificacionSISResponse xmlns:q2="InotificacionSIS"><return xsi:type="xsd:string">${escapedAnswer}</return></q2:procesaNotificacionSISResponse></soap:Body></soap:Envelope>`;
};

export const mimicSoap12NotificationResponse = (answer: string) => {
  const escapedAnswer = escapeXML(answer);

  return `<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://www.w3.org/2003/05/soap-encoding" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:rpc="http://www.w3.org/2003/05/soap-rpc" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body soap12:encodingStyle="http://www.w3.org/2003/05/soap-encoding"><q4:procesaNotificacionSISResponse xmlns:q4="InotificacionSIS"><rpc:result xmlns="">return</rpc:result><return xsi:type="xsd:string">${escapedAnswer}</return></q4:procesaNotificacionSISResponse></soap12:Body></soap12:Envelope>`;
};

// Range: 0 to (top -1)
const randomInt = (top: number) => {
  return Math.floor(Math.random() * Math.floor(top));
};

const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const randomTransactionId = () => {
  // Random 4 digit number between 0 and 9999
  const num = randomInt(10000);
  const numStr = num.toString().padStart(4, '0');
  // Random 8 letter alphanumeric sequence
  const alphanum = new Array(8);

  for (let idx = 0; idx < 8; idx++) {
    alphanum[idx] = alphanumeric[randomInt(alphanumeric.length)];
  }

  const alphanumStr = alphanum.join('');
  return `${numStr}${alphanumStr}`;
};
