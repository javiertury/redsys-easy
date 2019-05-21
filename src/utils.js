'use strict';

const momentTz = require('moment-timezone');
const crypto = require('crypto');

const { LANGUAGES, REV_LANGUAGES } = require('./assets/lang-codes');
const { CURRENCIES, REV_CURRENCIES } = require('./assets/currencies');
const { COUNTRIES, REV_COUNTRIES } = require('./assets/countries');
const { REV_CARDBRANDS } = require('./assets/card-brands');
const SIS_ERROR_CODES = require('./assets/sis-error-codes');
const RESPONSE_CODES = require('./assets/response-codes');
const TRANSACTION_TYPES = require('./assets/transaction-types');

const zeroPad = (smth, blocksize) => {
  const buf = Buffer.from(smth.toString(), 'utf8');
  const pad = Buffer.alloc((blocksize - (buf.length % blocksize)) % blocksize, 0);
  return Buffer.concat([buf, pad]);
};

const encryptOrder = (merchantKey, orderRef) => {
  const secretKey = Buffer.from(merchantKey, 'base64');
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv('des-ede3-cbc', secretKey, iv);
  cipher.setAutoPadding(false);
  const paddedStr = zeroPad(orderRef, 8);
  return cipher.update(paddedStr, 'utf8', 'base64') + cipher.final('base64');
};

exports.sha256Sign = (merchantKey, order, params) => {
  const orderKey = Buffer.from(encryptOrder(merchantKey, order), 'base64');
  return crypto.createHmac('sha256', orderKey).update(params).digest('base64');
};

exports.formatParams = paramsInput => {
  if (typeof paramsInput.amount !== 'string' && (!Number.isInteger(paramsInput.amount) || paramsInput.amount < 0)) {
    throw new Error('Invalid amount to charge');
  }
  if (!paramsInput.merchantCode) throw new Error('The merchant code is mandatory');
  if (!paramsInput.transactionType) throw new Error('The transaction type is mandatory');
  if (!paramsInput.order) throw new Error('No order reference provided.');

  const paramsObj = {
    DS_MERCHANT_ORDER: paramsInput.order,
    DS_MERCHANT_MERCHANTCODE: paramsInput.merchantCode,
    DS_MERCHANT_TRANSACTIONTYPE: paramsInput.transactionType,
    // Default to 1
    DS_MERCHANT_TERMINAL: paramsInput.terminal || '1'
  };

  // currency
  if (Number.isInteger(paramsInput.currencyInt) ||
    (paramsInput.currencyInt && typeof paramsInput.currencyInt === 'string')) {
    paramsObj.DS_MERCHANT_CURRENCY = String(paramsInput.currencyInt);
  } else {
    // Default to EUR
    const currencyCode = paramsInput.currency && paramsInput.currency.toUpperCase() || 'EUR';
    const currency = CURRENCIES[currencyCode];
    if (!currency || !currency.num) {
      throw new Error(`Unsupported currency ${paramsInput.currency}`);
    }

    paramsObj.DS_MERCHANT_CURRENCY = currency.num;
  }

  paramsObj.DS_MERCHANT_AMOUNT = String(paramsInput.amount);

  if (paramsObj.DS_MERCHANT_AMOUNT.length > 12) throw new Error('Amount to charge is too large');

  if (paramsInput.merchantName) paramsObj.DS_MERCHANT_MERCHANTNAME = paramsInput.merchantName;
  if (paramsInput.merchantURL) paramsObj.DS_MERCHANT_MERCHANTURL = paramsInput.merchantURL;
  if (paramsInput.merchantSignature) paramsObj.DS_MERCHANT_MERCHANTSIGNATURE = paramsInput.merchantSignature;
  if (paramsInput.successURL) paramsObj.DS_MERCHANT_URLOK = paramsInput.successURL;
  if (paramsInput.errorURL) paramsObj.DS_MERCHANT_URLKO = paramsInput.errorURL;
  if (paramsInput.dateFrecuency) paramsObj.DS_MERCHANT_DATEFRECUENCY = paramsInput.dateFrecuency;
  if (paramsInput.chargeExpiryDate) paramsObj.DS_MERCHANT_CHARGEEXPIRYDATE = paramsInput.chargeExpiryDate;
  if (paramsInput.sumTotal) paramsObj.DS_MERCHANT_SUMTOTAL = paramsInput.sumTotal;
  if (paramsInput.directPayment) paramsObj.DS_MERCHANT_DIRECTPAYMENT = paramsInput.directPayment;
  if (paramsInput.identifier) paramsObj.DS_MERCHANT_IDENTIFIER = paramsInput.identifier;
  if (paramsInput.group) paramsObj.DS_MERCHANT_GROUP = paramsInput.group;
  if (paramsInput.pan) paramsObj.DS_MERCHANT_PAN = paramsInput.pan;
  if (paramsInput.expiryDateInt) {
    paramsObj.DS_MERCHANT_EXPIRYDATE = paramsInput.expiryDateInt;
  } else if (paramsInput.expiryDate) {
    const stdFmt = paramsInput.expiryDate;
    if (stdFmt.length !== 4 || ! /^\d+$/.test(stdFmt)) {
      throw new Error('Invalid expiryDate');
    }
    const altFmt = `${stdFmt.slice(2, 4)}${stdFmt.slice(0, 2)}`;
    paramsObj.DS_MERCHANT_EXPIRYDATE = altFmt;
  } else if (paramsInput.expiryMonth && paramsInput.expiryYear) {
    if (paramsInput.expiryMonth.length !== 2) {
      throw new Error('Invalid expiryMonth');
    }
    if (paramsInput.expiryYear.length !== 2) {
      throw new Error('Invalid expiryYear');
    }
    paramsObj.DS_MERCHANT_EXPIRYDATE = `${paramsInput.expiryYear}${paramsInput.expiryMonth}`;
  }
  if (paramsInput.CVV2) paramsObj.DS_MERCHANT_CVV2 = paramsInput.CVV2;
  if (paramsInput.cardCountryInt) {
    paramsObj.DS_CARD_COUNTRY = String(paramsInput.cardCountryInt);
  } else if (paramsInput.cardCountry) {
    const countryInt = COUNTRIES[paramsInput.cardCountry.toLowerCase()];
    if (countryInt) {
      paramsObj.DS_CARD_COUNTRY = countryInt;
    }
  }
  // language
  if (paramsInput.langInt) {
    paramsObj.DS_MERCHANT_CONSUMERLANGUAGE = String(paramsInput.langInt);
  } else if (paramsInput.lang) {
    const langInt = LANGUAGES[paramsInput.lang];
    if (langInt) {
      paramsObj.DS_MERCHANT_CONSUMERLANGUAGE = langInt;
    }
  }
  if (paramsInput.merchantData) paramsObj.DS_MERCHANT_MERCHANTDATA = paramsInput.merchantData;
  if (paramsInput.clientIp) paramsObj.DS_MERCHANT_CLIENTIP = paramsInput.data;

  return paramsObj;
};

function formatResponse(params) {
  const obj = { raw: params };

  const hour = params.Ds_Hour || params.Hora;
  if (hour) obj.hour = hour;

  const date = params.Ds_Date || params.Fecha;
  // Transform to ISO format
  if (date) obj.date = date.split('/').reverse().join('-');
  if (obj.date && obj.hour) obj.timestamp = momentTz.tz(`${obj.date} ${obj.hour}`, 'YYYY-MM-DD HH:mm', true, 'Europe/Madrid').toDate();

  if (params.Ds_Currency) {
    obj.currencyInt = Number.parseInt(params.Ds_Currency);
    const currency = REV_CURRENCIES[obj.currencyInt];
    if (currency) {
      obj.currency = currency.code;
    }
  }

  if (params.Ds_Amount) {
    obj.amount = Number.parseInt(params.Ds_Amount);
  }

  if (params.Ds_Response) {
    // Remove leading zeros
    obj.response = Number.parseInt(params.Ds_Response);
  }

  if (params.Ds_Order) obj.order = params.Ds_Order;
  if (params.Ds_MerchantCode) obj.merchantCode = params.Ds_MerchantCode;
  if (params.Ds_Terminal) obj.terminal = params.Ds_Terminal;
  if (params.Ds_MerchantData) obj.merchantData = params.Ds_MerchantData;
  if (params.Ds_SecurePayment) obj.securePayment = params.Ds_SecurePayment;
  if (params.Ds_TransactionType) obj.transactionType = params.Ds_TransactionType;

  // Pago por referencia
  if (params.Ds_Merchant_Identifier) obj.identifier = params.Ds_Merchant_Identifier;
  // Is it received?
  //if (params.Ds_Merchant_Group) obj.merchantGroup = params.Ds_Merchant_Group;
  if (params.Ds_ExpiryDate) {
    obj.expiryDateInt = params.Ds_ExpiryDate;
    obj.expiryMonth = params.Ds_ExpiryDate.slice(2, 4);
    obj.expiryYear = params.Ds_ExpiryDate.slice(0, 2);
    obj.expiryDate = `${obj.expiryMonth}${obj.expiryYear}`;
  }

  // Optional
  if (params.Ds_CardNumber) obj.cardNumber = params.Ds_CardNumber;
  if (params.Ds_Card_Type) obj.cardType = params.Ds_Card_Type;
  if (params.Ds_AuthorisationCode) obj.authorisationCode = params.Ds_AuthorisationCode;
  if (params.Ds_ConsumerLanguage || params.Ds_Language) {
    obj.langInt = Number.parseInt(params.Ds_ConsumerLanguage || params.Ds_Language);
    const lang = REV_LANGUAGES[obj.langInt];
    if (lang) {
      obj.lang = lang;
    }
  }
  if (params.Ds_Card_Country) {
    obj.cardCountryInt = Number.parseInt(params.Ds_Card_Country);
    const cardCountry = REV_COUNTRIES[obj.cardCountryInt];
    if (cardCountry) {
      obj.cardCountry = cardCountry;
    }
  }

  if (params.Ds_Card_Brand) {
    obj.cardBrandInt = Number.parseInt(params.Ds_Card_Brand);
    const cardBrand = REV_CARDBRANDS[obj.cardBrandInt];
    if (cardBrand) {
      obj.cardBrand = cardBrand;
    }
  }

  return obj;
}

exports.formatResponse = formatResponse;

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
  const xml = str.replace(/&(lt|#60|gt|#62|quot|#34|amp|#38|apos|#39);/g, (match, p1) => {
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
        throw new Error(`Unknown xml escape character ${p1}`);
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
        throw new Error(`Unknown special xml character ${match}`);
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

  throw new Error('Not a valid SOAP request');
};

exports.mimicSoapNotificationReceiver = xml => {
  const regex = /<(?:\w+:)?XML(?: [^<>]+)?>([^<>]+)<\/(?:\w+:)?XML>/;

  const match = regex.exec(xml);
  if (!match || !match[1]) {
    throw new Error('Invalid notification');
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
