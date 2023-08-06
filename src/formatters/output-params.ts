import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Decimal from 'decimal.js';

import { ParseError } from '../errors';
import { REV_LANGUAGES } from '../assets/lang-codes';
import type { Language, LanguageNum } from '../assets/lang-codes';
import type { CurrencyNum } from '../assets/currencies';
import { REV_CURRENCIES } from '../assets/currencies';
import { REV_COUNTRIES } from '../assets/countries';
import type { Country, CountryNum } from '../assets/countries';
import { REV_CARDBRANDS } from '../assets/card-brands';
import type { CardBrand, CardBrandNum } from '../assets/card-brands';
import type {
  BaseOutputParams,
  NotificationOutputParams,
  RestNotificationOutputParams,
  SoapNotificationOutputParams,
  RequestOutputParams,
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  ResolvedTransactionTrait
} from '../types/output-params';
import type {
  BaseFormatterOutput,
  NotificationFormatterOutput,
  RequestFormatterOutput,
  RestIniciaPeticionFormatterOutput,
  RestTrataPeticionFormatterOutput,
  ResolvedTransactionTraitFormatterOutput
} from './types';

import { isStringNotEmpty, mapMaybeMonad } from '../utils/misc';

dayjs.extend(timezone);
dayjs.extend(utc);

const formatCountry = (rawCountry: CountryNum): Country | undefined => {
  const countryInt = Number.parseInt(rawCountry).toString() as CountryNum;
  return REV_COUNTRIES[countryInt];
};

const formatCardBrand = (rawCardBrand: CardBrandNum): CardBrand | undefined => {
  const cardBrandInt = Number.parseInt(rawCardBrand).toString() as CardBrandNum;
  return REV_CARDBRANDS[cardBrandInt];
};

const formatResponse = (rawResponse: string): number =>
  Number.parseInt(rawResponse);

export const baseOutputFormatter = <RawOutputParams extends BaseOutputParams>(
  raw: RawOutputParams
): BaseFormatterOutput<RawOutputParams> => {
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
    transactionType,
    ...(rawSecurePayment != null && rawSecurePayment.length > 0
      ? { securePayment: rawSecurePayment === '1' || rawSecurePayment === '2' }
      : undefined),
    ...(isStringNotEmpty(rawCardCountry)
      ? mapMaybeMonad(formatCountry(rawCardCountry), cardCountry => ({ cardCountry }))
      : undefined),
    ...(isStringNotEmpty(rawCardBrand)
      ? mapMaybeMonad(formatCardBrand(rawCardBrand), cardBrand => ({ cardBrand }))
      : undefined),
    ...(isStringNotEmpty(rawCardPSD2)
      ? { cardPSD2: rawCardPSD2 === 'Y' }
      : undefined),
    ...(isStringNotEmpty(merchantData) ? { merchantData } : undefined),
    ...(isStringNotEmpty(cardType) ? { cardType } : undefined),
    ...(isStringNotEmpty(authorisationCode) ? { authorisationCode } : undefined)
  };
};

export const formatPrice = (
  params: Omit<ResolvedTransactionTrait, 'Ds_Response'>
): Omit<ResolvedTransactionTraitFormatterOutput, 'response'> => {
  const { Ds_Amount: rawAmount, Ds_Currency: rawCurrency } = params;

  const currencyInt = Number.parseInt(rawCurrency).toString() as CurrencyNum;
  const currencyInfo = REV_CURRENCIES[currencyInt];

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!currencyInfo) {
    throw new ParseError('Unknown currency', rawCurrency);
  }

  const currency = currencyInfo.code;
  const amount = new Decimal(rawAmount)
    .dividedBy(Math.pow(10, currencyInfo.decimals))
    .toFixed();

  return {
    amount,
    currency
  };
};

const formatLang = (rawLang: LanguageNum): Language | undefined => {
  const langInt = Number.parseInt(rawLang).toString() as LanguageNum;
  return REV_LANGUAGES[langInt];
};

const notificationOutputFormatter = <
  RawOutputParams extends NotificationOutputParams
>(
  raw: RawOutputParams
): Omit<
  NotificationFormatterOutput<RawOutputParams>,
  'date' | 'time' | 'timestamp'
> => {
  const { Ds_ConsumerLanguage: rawConsumerLanguage, Ds_Response: rawResponse } =
    raw;

  return {
    ...baseOutputFormatter(raw),
    ...formatPrice(raw),
    response: formatResponse(rawResponse),
    ...(isStringNotEmpty(rawConsumerLanguage)
      ? mapMaybeMonad(formatLang(rawConsumerLanguage), lang => ({ lang }))
      : undefined)
  };
};

/**
 * REST notification formatter
 *
 * @public
 */
export const restNotificationOutputFormatter = <
  RawOutputParams extends
    RestNotificationOutputParams = RestNotificationOutputParams
>(
  raw: RawOutputParams
): NotificationFormatterOutput<RawOutputParams> => {
  const { Ds_Hour: hour, Ds_Date: rawDate } = raw;

  const date = rawDate.split('/').reverse().join('-');

  return {
    ...notificationOutputFormatter(raw),
    time: hour,
    date,
    timestamp: dayjs
      .tz(`${date}T${hour}`, 'YYYY-MM-DDTHH:mm', 'Europe/Madrid')
      .toDate()
  };
};

/**
 * SOAP notification formatter
 *
 * @public
 */
export const soapNotificationOutputFormatter = <
  RawOutputParams extends
    SoapNotificationOutputParams = SoapNotificationOutputParams
>(
  raw: RawOutputParams
): NotificationFormatterOutput<RawOutputParams> => {
  const { Hora: hour, Fecha: rawDate } = raw;

  const date = rawDate.split('/').reverse().join('-');

  return {
    ...notificationOutputFormatter(raw),
    time: hour,
    date,
    timestamp: dayjs
      .tz(`${date}T${hour}`, 'YYYY-MM-DDTHH:mm', 'Europe/Madrid')
      .toDate()
  };
};

export const requestOutputFormatter = <
  RawOutputParams extends RequestOutputParams
>(
  raw: RawOutputParams
): RequestFormatterOutput<RawOutputParams> => {
  const {
    Ds_CardNumber: deprecatedCardNumber,
    Ds_Card_Number: newCardNumber,
    Ds_Merchant_Identifier: identifier,
    Ds_ExpiryDate: rawExpiryDate,
    Ds_UrlPago2Fases: payURL,
    Ds_Language: rawLang
  } = raw;
  const cardNumber = newCardNumber ?? deprecatedCardNumber;

  return {
    ...baseOutputFormatter(raw),
    ...(isStringNotEmpty(cardNumber) ? { cardNumber } : undefined),
    ...(isStringNotEmpty(identifier) ? { identifier } : undefined),
    ...(isStringNotEmpty(payURL) ? { payURL } : undefined),
    ...(isStringNotEmpty(rawExpiryDate)
      ? {
          expiryYear: rawExpiryDate.slice(0, 2),
          expiryMonth: rawExpiryDate.slice(2, 4)
        }
      : undefined),
    ...(isStringNotEmpty(rawLang)
      ? mapMaybeMonad(formatLang(rawLang), lang => ({ lang }))
      : undefined
    )
  };
};

/**
 * REST iniciaPeticion output formatter
 *
 * @public
 */
export const restIniciaPeticionOutputFormatter = <
  RawOutputParams extends
    RestIniciaPeticionOutputParams = RestIniciaPeticionOutputParams
>(
  raw: RawOutputParams
): RestIniciaPeticionFormatterOutput<RawOutputParams> => {
  const { Ds_EMV3DS: emv3ds } = raw;

  return {
    ...requestOutputFormatter(raw),
    ...(emv3ds != null ? { emv3ds } : undefined)
  };
};

/**
 * REST trataPeticion output formatter
 *
 * @public
 */
export const restTrataPeticionOutputFormatter = <
  RawOutputParams extends
    RestTrataPeticionOutputParams = RestTrataPeticionOutputParams
>(
  raw: RawOutputParams
): RestTrataPeticionFormatterOutput<RawOutputParams> => {
  const { Ds_Response: rawResponse, Ds_EMV3DS: emv3ds } = raw;

  return {
    ...requestOutputFormatter(raw),
    ...formatPrice(raw),
    ...(emv3ds != null ? { emv3ds } : undefined),
    ...(rawResponse != null
      ? { response: Number.parseInt(rawResponse) }
      : undefined)
  };
};
