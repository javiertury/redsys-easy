import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { REV_LANGUAGES } from '../assets/lang-codes';
import { REV_CURRENCIES } from '../assets/currencies';
import { REV_COUNTRIES } from '../assets/countries';
import { REV_CARDBRANDS } from '../assets/card-brands';
import { FormattedResponse, RawResponseParams } from '../types/api';

dayjs.extend(timezone);
dayjs.extend(utc);

const hourFormatter = (obj: FormattedResponse, value: string) => {
  if (value) obj.hour = value;
};

const dateFormatter = (obj: FormattedResponse, value: string) => {
  // Transform to ISO format
  if (value) obj.date = value.split('/').reverse().join('-');
};

const langFormatter = (obj: FormattedResponse, value: string) => {
  const langInt = Number.parseInt(value);
  const lang = REV_LANGUAGES[langInt];
  if (lang != null && lang) obj.lang = lang;
};

type OutputFormatter = (obj: FormattedResponse, value: string) => void;

export const outputFormatters: Record<string, OutputFormatter> = {
  DS_HOUR: hourFormatter,
  HORA: hourFormatter,
  DS_DATE: dateFormatter,
  FECHA: dateFormatter,
  DS_CURRENCY: (obj: FormattedResponse, value: string) => {
    const currencyInt = Number.parseInt(value);
    const currency = REV_CURRENCIES[currencyInt];
    if (currency) obj.currency = currency.code;
  },
  DS_AMOUNT: (obj: FormattedResponse, value: string) => {
    if (value) obj.amount = Number.parseInt(value);
  },
  DS_RESPONSE: (obj: FormattedResponse, value: string) => {
    // Remove leading zeros
    if (value) obj.response = Number.parseInt(value);
  },
  DS_ORDER: (obj: FormattedResponse, value: string) => {
    obj.order = value;
  },
  DS_MERCHANTCODE: (obj: FormattedResponse, value: string) => {
    obj.merchantCode = value;
  },
  DS_TERMINAL: (obj: FormattedResponse, value: string) => {
    obj.terminal = value;
  },
  DS_MERCHANTDATA: (obj: FormattedResponse, value: string) => {
    if (value) obj.merchantData = value;
  },
  DS_SECUREPAYMENT: (obj: FormattedResponse, value: string) => {
    obj.securePayment = value === '1';
  },
  DS_TRANSACTIONTYPE: (obj: FormattedResponse, value: string) => {
    obj.transactionType = value;
  },
  // Pago por referencia
  DS_MERCHANT_IDENTIFIER: (obj: FormattedResponse, value: string) => {
    obj.identifier = value;
  },
  DS_MERCHANT_GROUP: (obj: FormattedResponse, value: string) => {
    obj.merchantGroup = value;
  },
  DS_EXPIRYDATE: (obj: FormattedResponse, value: string) => {
    obj.expiryMonth = value.slice(2, 4);
    obj.expiryYear = value.slice(0, 2);
    obj.expiryDate = `${obj.expiryMonth}${obj.expiryYear}`;
  },
  // Optional
  DS_CARDNUMBER: (obj: FormattedResponse, value: string) => {
    obj.cardNumber = value;
  },
  DS_CARD_TYPE: (obj: FormattedResponse, value: string) => {
    obj.cardType = value;
  },
  DS_AUTHORISATIONCODE: (obj: FormattedResponse, value: string) => {
    obj.authorisationCode = value;
  },
  DS_CONSUMERLANGUAGE: langFormatter,
  DS_LANGUAGE: langFormatter,
  DS_CARD_COUNTRY: (obj: FormattedResponse, value: string) => {
    const cardCountryInt = Number.parseInt(value);
    const cardCountry = REV_COUNTRIES[cardCountryInt];
    if (cardCountry != null && cardCountry) {
      obj.cardCountry = cardCountry;
    }
  },
  DS_CARD_BRAND: (obj: FormattedResponse, value: string) => {
    const cardBrandInt = Number.parseInt(value);
    const cardBrand = REV_CARDBRANDS[cardBrandInt];
    if (cardBrand != null && cardBrand) {
      obj.cardBrand = cardBrand;
    }
  },
  DS_URLPAGO2FASES: (obj: FormattedResponse, value: string) => {
    obj.payURL = value;
  },
  DS_CARD_PSD2: (obj: FormattedResponse, value: string) => {
    obj.cardPSD2 = value === 'Y';
  }
};

export const formatOutput = (rawParams: RawResponseParams): FormattedResponse => {
  const obj: FormattedResponse = { raw: rawParams };

  for (const [key, value] of Object.entries(rawParams)) {
    const formatter = outputFormatters[key.toUpperCase()];
    if (!formatter) continue;
    formatter(obj, value);
  }

  // Post formatting
  if (obj.date != null && obj.date && obj.hour != null && obj.hour) {
    obj.timestamp = dayjs.tz(`${obj.date} ${obj.hour}`, 'YYYY-MM-DD HH:mm', 'Europe/Madrid').toDate();
  }

  return obj;
};
