'use strict';

const momentTz = require('moment-timezone');

const { REV_LANGUAGES } = require('./assets/lang-codes');
const { REV_CURRENCIES } = require('./assets/currencies');
const { REV_COUNTRIES } = require('./assets/countries');
const { REV_CARDBRANDS } = require('./assets/card-brands');

const hourFormatter = (obj, value) => {
  if (value) obj.hour = value;
};

const dateFormatter = (obj, value) => {
  // Transform to ISO format
  if (value) obj.date = value.split('/').reverse().join('-');
};

const langFormatter = (obj, value) => {
  const langInt = Number.parseInt(value);
  const lang = REV_LANGUAGES[langInt];
  if (lang) obj.lang = lang;
};

const responseParamFormatters = {
  DS_HOUR: hourFormatter,
  HORA: hourFormatter,
  DS_DATE: dateFormatter,
  FECHA: dateFormatter,
  DS_CURRENCY: (obj, value) => {
    const currencyInt = Number.parseInt(value);
    const currency = REV_CURRENCIES[currencyInt];
    if (currency) obj.currency = currency.code;
  },
  DS_AMOUNT: (obj, value) => {
    if (value) obj.amount = Number.parseInt(value);
  },
  DS_RESPONSE: (obj, value) => {
    // Remove leading zeros
    if (value) obj.response = Number.parseInt(value);
  },
  DS_ORDER: (obj, value) => {
    obj.order = value;
  },
  DS_MERCHANTCODE: (obj, value) => {
    obj.merchantCode = value;
  },
  DS_TERMINAL: (obj, value) => {
    obj.terminal = value;
  },
  DS_MERCHANTDATA: (obj, value) => {
    if (value) obj.merchantData = value;
  },
  DS_SECUREPAYMENT: (obj, value) => {
    obj.securePayment = value;
  },
  DS_TRANSACTIONTYPE: (obj, value) => {
    obj.transactionType = value;
  },
  // Pago por referencia
  DS_MERCHANT_IDENTIFIER: (obj, value) => {
    obj.identifier = value;
  },
  DS_MERCHANT_GROUP: (obj, value) => {
    obj.merchantGroup = value;
  },
  DS_EXPIRYDATE: (obj, value) => {
    obj.expiryMonth = value.slice(2, 4);
    obj.expiryYear = value.slice(0, 2);
    obj.expiryDate = `${obj.expiryMonth}${obj.expiryYear}`;
  },
  // Optional
  DS_CARDNUMBER: (obj, value) => {
    obj.cardNumber = value;
  },
  DS_CARD_TYPE: (obj, value) => {
    obj.cardType = value;
  },
  DS_AUTHORISATIONCODE: (obj, value) => {
    obj.authorisationCode = value;
  },
  DS_CONSUMERLANGUAGE: langFormatter,
  DS_LANGUAGE: langFormatter,
  DS_CARD_COUNTRY: (obj, value) => {
    const cardCountryInt = Number.parseInt(value);
    const cardCountry = REV_COUNTRIES[cardCountryInt];
    if (cardCountry) {
      obj.cardCountry = cardCountry;
    }
  },
  DS_CARD_BRAND: (obj, value) => {
    const cardBrandInt = Number.parseInt(value);
    const cardBrand = REV_CARDBRANDS[cardBrandInt];
    if (cardBrand) {
      obj.cardBrand = cardBrand;
    }
  }
};

exports.responseParamFormatters = responseParamFormatters;

exports.formatResponse = rawParams => {
  const obj = { raw: rawParams };

  for (const key in rawParams) {
    const formatter = responseParamFormatters[key.toUpperCase()];
    if (!formatter) continue;
    formatter(obj, rawParams[key]);
  }

  // Post formatting
  if (obj.date && obj.hour) obj.timestamp = momentTz.tz(`${obj.date} ${obj.hour}`, 'YYYY-MM-DD HH:mm', true, 'Europe/Madrid').toDate();

  return obj;
};
