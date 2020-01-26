'use strict';

const crypto = require('crypto');

const { ParseError } = require('./errors');
const { SIS_ERROR_CODES } = require('./assets/error-codes');
const RESPONSE_CODES = require('./assets/response-codes');
const TRANSACTION_TYPES = require('./assets/transaction-types');

/**
 * Adds padding to a buffer.
 *
 * Rounds up the buffer length to the next block and uses 0 as padding.
 *
 * @params {buffer} buf - Input buffer
 * @params {number} blocksize - Size of block
 * @return {buffer}
 */
const zeroPad = (buf, blocksize) => {
  const pad = Buffer.alloc((blocksize - (buf.length % blocksize)) % blocksize, 0);
  return Buffer.concat([buf, pad]);
};

exports.zeroPad = zeroPad;

/**
 * Encrypt a message using 3DES
 *
 * @params {string} key - Key to encrypt message
 * @params {string} message - Message to be encrypted
 * @return {buffer}
 */
const encrypt3DES = (key, message) => {
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

exports.encrypt3DES = encrypt3DES;

exports.sha256Sign = (merchantKey, order, params) => {
  const orderKeyBuf = encrypt3DES(merchantKey, order);
  return crypto.createHmac('sha256', orderKeyBuf).update(params).digest('base64');
};

exports.TRANSACTION_TYPES = TRANSACTION_TYPES;

exports.getResponseCodeMessage = code => {
  if (!code || (typeof code !== 'string' && !Number.isInteger(code))) {
    return null;
  }

  const lookupNum = typeof code === 'string' ? Number.parseInt(code.trim()) : code;

  if (!Number.isFinite(lookupNum) || lookupNum < 0) {
    return null;
  }

  const msg = RESPONSE_CODES[lookupNum.toString()];

  if (!msg && lookupNum < 100) {
    return 'Transacción autorizada para pagos y preautorizaciones';
  }

  return msg || null;
};

exports.getSISErrorCodeMessage = code => {
  if (!code || typeof code !== 'string') {
    return null;
  }

  return SIS_ERROR_CODES[code.trim()] || null;
};

// Order is important
exports.signedFieldsXMLResponse = ['Ds_Amount', 'Ds_Order',
  'Ds_MerchantCode', 'Ds_Currency', 'Ds_Response', 'Ds_CardNumber',
  'Ds_TransactionType', 'Ds_SecurePayment'];

const unescapeXML = str => {
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

exports.unescapeXML = unescapeXML;

const escapeXML = str => {
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

exports.escapeXML = escapeXML;

exports.detectSoapVersion = req => {
  if (req.headers && req.headers['Content-Type']) {
    if (req.headers['Content-Type'].includes('soap+xml')) {
      return '1.2';
    } else {
      return '1.1';
    }
  } else if (req.body) {
    if (req.body.includes('www.w3.org/2003/05/soap-envelope')) {
      return '1.2';
    } else if (req.body.includes('schemas.xmlsoap.org/soap/envelope')) {
      return '1.1';
    }
  }

  throw new ParseError('Not a valid SOAP request', req);
};

exports.mimicSoapNotificationReceiver = xml => {
  const regex = /<(?:\w+:)?XML(?: [^<>]+)?>([^<>]+)<\/(?:\w+:)?XML>/;

  const match = regex.exec(xml);
  if (!match || !match[1]) {
    throw new ParseError('Invalid SOAP notification', xml);
  }

  // wsdl defines XML tag as a string. It cannot be a CDATA (which is a XML element).
  return unescapeXML(match[1]);
};

exports.mimicSoap11NotificationResponse = answer => {
  const escapedAnswer = escapeXML(answer);
  return `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><q2:procesaNotificacionSISResponse xmlns:q2="InotificacionSIS"><return xsi:type="xsd:string">${escapedAnswer}</return></q2:procesaNotificacionSISResponse></soap:Body></soap:Envelope>`;
};

exports.mimicSoap12NotificationResponse = answer => {
  const escapedAnswer = escapeXML(answer);

  return `<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://www.w3.org/2003/05/soap-encoding" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:rpc="http://www.w3.org/2003/05/soap-rpc" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body soap12:encodingStyle="http://www.w3.org/2003/05/soap-encoding"><q4:procesaNotificacionSISResponse xmlns:q4="InotificacionSIS"><rpc:result xmlns="">return</rpc:result><return xsi:type="xsd:string">${escapedAnswer}</return></q4:procesaNotificacionSISResponse></soap12:Body></soap12:Envelope>`;
};

// Range: 0 to (top -1)
function randomInt(top) {
  return Math.floor(Math.random() * Math.floor(top));
}

const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

exports.randomTransactionId = () => {
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
