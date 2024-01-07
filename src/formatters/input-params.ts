import Decimal from 'decimal.js';
import { ValidationError } from '../errors';
import { LANGUAGES } from '../assets/lang-codes';
import type { Language, LanguageNum } from '../assets/lang-codes';
import { CURRENCIES } from '../assets/currencies';
import type { Currency, CurrencyNum } from '../assets/currencies';
import type {
  BaseInputParams,
  RedirectInputParams,
  RequestInputParams,
  RestIniciaPeticionInputParams,
  RestTrataPeticionInputParams
} from '../types/input-params';
import type {
  BaseFormatterInput,
  RedirectFormatterInput,
  RequestFormatterInput,
  RestIniciaPeticionFormatterInput,
  RestTrataPeticionFormatterInput
} from './types';

import { isStringNotEmpty } from '../utils/misc';

const formatInputCurrency = (input: Currency): CurrencyNum => {
  const currencyData = CURRENCIES[input];
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!currencyData?.num) {
    throw new ValidationError('Unsupported currency', { currency: input });
  }

  return currencyData.num;
};

const formatExpiryDate = ({
  expiryYear,
  expiryMonth
}: {
  expiryYear?: string | undefined;
  expiryMonth?: string | undefined;
}): string => {
  if (expiryMonth?.length !== 2) {
    throw new ValidationError('Invalid expiryMonth', { expiryMonth });
  }
  if (expiryYear?.length !== 2) {
    throw new ValidationError('Invalid expiryYear', { expiryYear });
  }

  return `${expiryYear}${expiryMonth}`;
};

/**
 * Converts a monetary amount from a decimal string currency unit to the atomic currency unit
 */
const formatAmount = (
  value: string | number,
  context: { currency?: Currency | undefined }
): string => {
  const { currency } = context;

  if (!currency) {
    throw new ValidationError('Missing currency', { currency });
  }

  const currencyData = CURRENCIES[currency];
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!currencyData?.decimals) {
    throw new ValidationError('Unsupported currency', { currency });
  }

  const rawValue =
    typeof value === 'number'
      ? Math.round(value * Math.pow(10, currencyData.decimals)).toString()
      : new Decimal(value)
          .mul(Math.pow(10, currencyData.decimals))
          .round()
          .toFixed(0);

  if (rawValue.length > 12) {
    throw new ValidationError('Amount to charge is too large', {
      amount: value
    });
  }

  return rawValue;
};

const formatLang = (value: Language): LanguageNum => {
  const langInt = LANGUAGES[value];
  if (langInt == null) {
    throw new ValidationError('Invalid lang code', { lang: value });
  }
  return langInt;
};

const baseInputFormatter = <RawInputParams extends Partial<BaseInputParams>>(
  input: BaseFormatterInput<RawInputParams>
): BaseInputParams => {
  const {
    order,
    merchantCode,
    transactionType,
    terminal,
    amount,
    currency,
    merchantName,
    identifier,
    group,
    expiryYear,
    expiryMonth,
    pan,
    cvv,
    directPayment,
    merchantData,
    operationId,
    productDescription,
    taxReference,
    transactionDate,
    cardHolder,
    merchantURL,
    successURL,
    errorURL,
    payMethods,
    lang, 
    raw,
    ...unknownInput
  } = input;

  const unknownKeys = Object.keys(unknownInput);
  if (unknownKeys.length > 0) {
    throw new ValidationError(
      [
        `Unknown parameters: ${unknownKeys.join(', ')}`,
        'To pass raw parameters, use "raw"'
      ].join('\n'),
      unknownInput
    );
  }

  return {
    DS_MERCHANT_ORDER: order,
    DS_MERCHANT_MERCHANTCODE: merchantCode,
    DS_MERCHANT_TRANSACTIONTYPE: transactionType,
    DS_MERCHANT_TERMINAL: terminal,
    ...(amount != null
      ? { DS_MERCHANT_AMOUNT: formatAmount(amount, { currency }) }
      : undefined),
    ...(isStringNotEmpty(currency)
      ? { DS_MERCHANT_CURRENCY: formatInputCurrency(currency) }
      : undefined),
    ...(isStringNotEmpty(merchantName)
      ? { DS_MERCHANT_MERCHANTNAME: merchantName }
      : undefined),
    ...(isStringNotEmpty(identifier)
      ? { DS_MERCHANT_IDENTIFIER: identifier }
      : undefined),
    ...(isStringNotEmpty(group) ? { DS_MERCHANT_GROUP: group } : undefined),
    ...(isStringNotEmpty(expiryYear) || isStringNotEmpty(expiryMonth)
      ? {
          DS_MERCHANT_EXPIRYDATE: formatExpiryDate({ expiryYear, expiryMonth })
        }
      : undefined),
    ...(isStringNotEmpty(pan) ? { DS_MERCHANT_PAN: pan } : undefined),
    ...(isStringNotEmpty(cvv) ? { DS_MERCHANT_CVV2: cvv } : undefined),
    ...(isStringNotEmpty(directPayment)
      ? { DS_MERCHANT_DIRECTPAYMENT: directPayment }
      : undefined),
    ...(isStringNotEmpty(merchantData)
      ? { DS_MERCHANT_MERCHANTDATA: merchantData }
      : undefined),
    ...(isStringNotEmpty(operationId)
      ? { DS_MERCHANT_IDOPER: operationId }
      : undefined),
    ...(isStringNotEmpty(productDescription)
      ? { DS_MERCHANT_PRODUCTDESCRIPTION: productDescription }
      : undefined),
    ...(isStringNotEmpty(taxReference)
      ? { DS_MERCHANT_TAX_REFERENCE: taxReference }
      : undefined),
    ...(isStringNotEmpty(transactionDate)
      ? { DS_MERCHANT_TRANSACTIONDATE: transactionDate }
      : undefined),
    ...(isStringNotEmpty(cardHolder)
      ? { DS_MERCHANT_TITULAR: cardHolder }
      : undefined),
    ...(isStringNotEmpty(merchantURL)
      ? { DS_MERCHANT_MERCHANTURL: merchantURL }
      : undefined),
    ...(isStringNotEmpty(successURL)
      ? { DS_MERCHANT_URLOK: successURL }
      : undefined),
    ...(isStringNotEmpty(errorURL)
      ? { DS_MERCHANT_URLKO: errorURL }
      : undefined),
    ...(isStringNotEmpty(payMethods)
      ? { DS_MERCHANT_PAYMETHODS: payMethods }
      : undefined),
    ...(isStringNotEmpty(lang)
      ? { DS_MERCHANT_CONSUMERLANGUAGE: formatLang(lang) }
      : undefined),
    ...raw
  };
};

/**
 * Redirection input formatter
 *
 * @public
 */
export const redirectInputFormatter = <
  RawInputParams extends
    Partial<RedirectInputParams> = Partial<RedirectInputParams>
>(
  input: RedirectFormatterInput<RawInputParams>
): RedirectInputParams => {
  const { ...baseInput } =
    input;

  return {
    ...baseInputFormatter(baseInput),
    // Overwrite formatted parameters
    ...baseInput.raw
  };
};

export const requestInputFormatter = <
  RawInputParams extends Partial<RequestInputParams>
>(
  input: RequestFormatterInput<RawInputParams>
): RequestInputParams => {
  const { customerMail, customerMobile, smsTemplate, ...baseInput } = input;

  return {
    ...baseInputFormatter(baseInput),
    ...(isStringNotEmpty(customerMobile)
      ? { DS_MERCHANT_CUSTOMER_MOBILE: customerMobile }
      : undefined),
    ...(isStringNotEmpty(customerMail)
      ? { DS_MERCHANT_CUSTOMER_MAIL: customerMail }
      : undefined),
    ...(isStringNotEmpty(smsTemplate)
      ? { DS_MERCHANT_CUSTOMER_SMS_TEXT: smsTemplate }
      : undefined),
    // Overwrite formatted parameters
    ...baseInput.raw
  };
};

/**
 * REST iniciaPeticion input formatter
 *
 * @public
 */
export const restIniciaPeticionInputFormatter = <
  RawInputParams extends
    Partial<RestIniciaPeticionInputParams> = Partial<RestIniciaPeticionInputParams>
>(
  raw: RestIniciaPeticionFormatterInput<RawInputParams>
): RestIniciaPeticionInputParams => {
  const { emv3ds, ...requestInput } = raw;

  return {
    ...requestInputFormatter(requestInput),
    ...(emv3ds != null ? { DS_MERCHANT_EMV3DS: emv3ds } : undefined),
    // Overwrite formatted parameters
    ...requestInput.raw
  };
};

/**
 * REST trataPeticion input formatter
 *
 * @public
 */
export const restTrataPeticionInputFormatter = <
  RawInputParams extends
    Partial<RestTrataPeticionInputParams> = Partial<RestTrataPeticionInputParams>
>(
  raw: RestTrataPeticionFormatterInput<RawInputParams>
): RestTrataPeticionInputParams => {
  const { emv3ds, ...requestInput } = raw;

  return {
    ...requestInputFormatter(requestInput),
    ...(emv3ds != null ? { DS_MERCHANT_EMV3DS: emv3ds } : undefined),
    // Overwrite formatted parameters
    ...requestInput.raw
  };
};
