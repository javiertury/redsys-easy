import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Decimal from 'decimal.js';

import { ParseError } from '../errors';
import { REV_LANGUAGES } from '../assets/lang-codes';
import type { Language } from '../assets/lang-codes';
import { REV_CURRENCIES } from '../assets/currencies';
import { REV_COUNTRIES } from '../assets/countries';
import type { Country } from '../assets/countries';
import { REV_CARDBRANDS } from '../assets/card-brands';
import type { CardBrand } from '../assets/card-brands';
import type {
  BaseOutputParams,
  NotificationOutputParams,
  RestNotificationOutputParams,
  SoapNotificationOutputParams,
  RequestOutputParams,
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  ResolvedTransactionTrait,
  WebserviceOutputParams
} from '../types/output-params';
import type {
  BaseFormattedOutput,
  NotificationFormattedOutput,
  RequestFormattedOutput,
  RestIniciaPeticionFormattedOutput,
  RestTrataPeticionFormattedOutput,
  ResolvedTransactionTraitFormattedOutput,
  WebserviceFormattedOutput
} from './types';

import { isStringNotEmpty } from '../utils/misc';

dayjs.extend(timezone);
dayjs.extend(utc);

const formatCountry = (rawCountry: string): Country | undefined => {
  const countryInt = Number.parseInt(rawCountry);
  return REV_COUNTRIES[countryInt];
};

const formatCardBrand = (rawCardBrand: string): CardBrand | undefined => {
  const cardBrandInt = Number.parseInt(rawCardBrand);
  return REV_CARDBRANDS[cardBrandInt];
};

const formatResponse = (rawResponse: string): number => Number.parseInt(rawResponse);

export const baseOutputFormatter = <
  RawOutputParams extends BaseOutputParams
>(
  raw: RawOutputParams
): BaseFormattedOutput<RawOutputParams> => {
  const {
    Ds_MerchantCode: merchantCode,
    Ds_Terminal: terminal,
    Ds_Order: order,
    Ds_SecurePayment: rawSecurePayment,
    Ds_TransactionType: transactionType,
    Ds_Card_Country: rawCardCountry,
    Ds_Card_Brand: rawCardBrand,
    Ds_Card_PSD2: rawCardPSD2,
    Ds_MerchantData: merchantData,
    Ds_Card_Type: cardType,
    Ds_AuthorisationCode: authorisationCode
  } = raw;

  return {
    raw,

    merchantCode,
    terminal,
    order,
    securePayment: rawSecurePayment === '1',
    transactionType,
    ...(isStringNotEmpty(rawCardCountry) ? { cardCountry: formatCountry(rawCardCountry) } : undefined),
    ...(isStringNotEmpty(rawCardBrand) ? { cardBrand: formatCardBrand(rawCardBrand) } : undefined),
    ...(isStringNotEmpty(rawCardPSD2) ? { cardPSD2: rawCardPSD2 === 'Y' } : undefined),
    ...(isStringNotEmpty(merchantData) ? { merchantData } : undefined),
    ...(isStringNotEmpty(cardType) ? { cardType } : undefined),
    ...(isStringNotEmpty(authorisationCode) ? { authorisationCode } : undefined)
  };
};

export const formatPrice = (
  params: Omit<ResolvedTransactionTrait, 'Ds_Response'>
): Omit<ResolvedTransactionTraitFormattedOutput, 'response'> => {
  const {
    Ds_Amount: rawAmount,
    Ds_Currency: rawCurrency
  } = params;

  const currencyInt = Number.parseInt(rawCurrency);
  const currencyInfo = REV_CURRENCIES[currencyInt];

  if (!currencyInfo) {
    throw new ParseError('Unknown currency', rawCurrency);
  }

  const currency = currencyInfo.code;
  const amount = new Decimal(rawAmount).dividedBy(Math.pow(10, currencyInfo.decimals)).toFixed();

  return {
    amount,
    currency
  };
};

const formatLang = (rawLang: string): Language | undefined => {
  const langInt = Number.parseInt(rawLang);
  return REV_LANGUAGES[langInt];
};

const notificationOutputFormatter = <
  RawOutputParams extends NotificationOutputParams
>(
  raw: RawOutputParams
): Omit<NotificationFormattedOutput<RawOutputParams>, 'date' | 'time' | 'timestamp'> => {
  const {
    Ds_ConsumerLanguage: rawConsumerLanguage,
    Ds_Response: rawResponse
  } = raw;

  return {
    ...baseOutputFormatter(raw),
    ...formatPrice(raw),
    response: formatResponse(rawResponse),
    ...(isStringNotEmpty(rawConsumerLanguage) ? { lang: formatLang(rawConsumerLanguage) } : undefined)
  };
};

export const restNotificationOutputFormatter = <
  RawOutputParams extends RestNotificationOutputParams
>(
  raw: RawOutputParams
): NotificationFormattedOutput<RawOutputParams> => {
  const {
    Ds_Hour: hour,
    Ds_Date: rawDate
  } = raw;

  const date = rawDate.split('/').reverse().join('-');

  return {
    ...notificationOutputFormatter(raw),
    time: hour,
    date,
    timestamp: dayjs.tz(`${date}T${hour}`, 'YYYY-MM-DDTHH:mm', 'Europe/Madrid').toDate()
  };
};

export const soapNotificationOutputFormatter = <
  RawOutputParams extends SoapNotificationOutputParams
>(
  raw: RawOutputParams
): NotificationFormattedOutput<RawOutputParams> => {
  const {
    Hora: hour,
    Fecha: rawDate
  } = raw;

  const date = rawDate.split('/').reverse().join('-');

  return {
    ...notificationOutputFormatter(raw),
    time: hour,
    date,
    timestamp: dayjs.tz(`${date}T${hour}`, 'YYYY-MM-DDTHH:mm', 'Europe/Madrid').toDate()
  };
};

export const requestOutputFormatter = <
  RawOutputParams extends RequestOutputParams
>(
  raw: RawOutputParams
): RequestFormattedOutput<RawOutputParams> => {
  const {
    Ds_CardNumber: cardNumber,
    Ds_Merchant_Identifier: identifier,
    Ds_ExpiryDate: rawExpiryDate,
    Ds_UrlPago2Fases: payURL,
    Ds_Language: rawLang
  } = raw;

  return {
    ...baseOutputFormatter(raw),
    ...(isStringNotEmpty(cardNumber) ? { cardNumber } : undefined),
    ...(isStringNotEmpty(identifier) ? { identifier } : undefined),
    ...(isStringNotEmpty(payURL) ? { payURL } : undefined),
    ...(isStringNotEmpty(rawExpiryDate)
      ? { expiryYear: rawExpiryDate.slice(0, 2), expiryMonth: rawExpiryDate.slice(2, 4) }
      : undefined
    ),
    ...(isStringNotEmpty(rawLang) ? { lang: formatLang(rawLang) } : undefined)
  };
};

export const restIniciaPeticionOutputFormatter = <
  RawOutputParams extends RestIniciaPeticionOutputParams
>(
  raw: RawOutputParams
): RestIniciaPeticionFormattedOutput<RawOutputParams> => {
  return {
    ...requestOutputFormatter(raw)
  };
};

export const restTrataPeticionOutputFormatter = <
  RawOutputParams extends RestTrataPeticionOutputParams
>(
  raw: RawOutputParams
): RestTrataPeticionFormattedOutput<RawOutputParams> => {
  const {
    Ds_Response: rawResponse
  } = raw;

  return {
    ...requestOutputFormatter(raw),
    ...formatPrice(raw),
    ...(rawResponse != null ? { response: Number.parseInt(rawResponse) } : undefined)
  };
};

export const websocketOutputFormatter = <
  RawOutputParams extends WebserviceOutputParams
>(
  raw: RawOutputParams
): WebserviceFormattedOutput<RawOutputParams> => {
  const {
    Ds_Response: rawResponse
  } = raw;

  return {
    ...requestOutputFormatter(raw),
    ...formatPrice(raw),
    response: formatResponse(rawResponse),
    ...(rawResponse != null ? { response: Number.parseInt(rawResponse) } : undefined)
  };
};
