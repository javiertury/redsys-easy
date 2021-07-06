import Decimal from 'decimal.js';
import { ValidationError } from '../errors';
import { LANGUAGES } from '../assets/lang-codes';
import type { Language } from '../assets/lang-codes';
import { CURRENCIES } from '../assets/currencies';
import type { Currency } from '../assets/currencies';
import type {
  BaseInputParams,
  RedirectInputParams,
  RequestInputParams
} from '../types/input-params';
import type {
  BaseFormattedInput,
  RedirectFormattedInput,
  RequestFormattedInput
} from './types';

import { isStringNotEmpty } from '../utils/misc';

export interface FormatterOptions {
  amountType: 'float' | 'atomic'
}

const formatInputCurrency = (input: Currency): string => {
  const currencyData = CURRENCIES[input];
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!currencyData || !currencyData.num) {
    throw new ValidationError('Unsupported currency', { currency: input });
  }

  return currencyData.num.padStart(3, '0');
};

const formatExpiryDate = ({ expiryYear, expiryMonth }: { expiryYear?: string, expiryMonth?: string }): string => {
  if (expiryMonth?.length !== 2) {
    throw new ValidationError('Invalid expiryMonth', { expiryMonth: expiryMonth });
  }
  if (expiryYear?.length !== 2) {
    throw new ValidationError('Invalid expiryYear', { expiryYear: expiryYear });
  }

  return `${expiryYear}${expiryMonth}`;
};

/*
 * Experimental feature!!!
 *
 * The feature amountType='float' may be removed any time.
 * If you like this feature or have any comment please open an issue
 *
 * amountType can be atomic or float.
 * - atomic: amount represents the smallest currency unit. 1130 (EUR) -> 11.30 EUR
 * - float: amount is rounded to last decimal precision. 11.299999999 (EUR) -> 11.30 EUR
 *
 * Float amount can lead to losing precision, specially after doing
 * operations. Atomic is more precise for monetary amount, no lost cents,
 * better for accounting.
 */
const formatAmount = (
  value: string | number,
  context: { currency?: Currency },
  options?: Pick<FormatterOptions, 'amountType'>
): string => {
  // atomic by default
  let rawValue: string = value.toString();

  if (options?.amountType == null || options.amountType === 'atomic') {
    rawValue = value.toString();
  } else if (options.amountType === 'float') {
    const { currency } = context;

    if (!currency) {
      throw new ValidationError('Missing currency', { currency: currency });
    }

    const currencyData = CURRENCIES[currency];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!currencyData || !currencyData.decimals) {
      throw new ValidationError('Unsupported currency', { currency: currency });
    }

    rawValue = typeof value === 'number'
      ? Math.round(value * Math.pow(10, currencyData.decimals)).toString()
      : new Decimal(value).mul(Math.pow(10, currencyData.decimals)).round().toFixed(0);
  } else {
    throw new ValidationError('Unknown format', { amountType: options.amountType });
  }

  if (rawValue.length > 12) {
    throw new ValidationError('Amount to charge is too large', { amount: value });
  }

  return rawValue;
};

const formatLang = (value: Language): string => {
  const langInt = LANGUAGES[value];
  if (langInt == null) {
    throw new ValidationError('Invalid lang code', { lang: value });
  }
  return langInt;
};

const baseInputParamsFormatter = <
  RawInputParams extends object
>(
  input: BaseFormattedInput<RawInputParams>,
  options?: FormatterOptions
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
    raw,
    ...unknownInput
  } = input;

  if (Object.keys(unknownInput).length > 0) {
    throw new ValidationError('Unknown parameters', unknownInput);
  }

  return {
    DS_MERCHANT_ORDER: order,
    DS_MERCHANT_MERCHANTCODE: merchantCode,
    DS_MERCHANT_TRANSACTIONTYPE: transactionType,
    DS_MERCHANT_TERMINAL: terminal,
    ...(amount != null ? { DS_MERCHANT_AMOUNT: formatAmount(amount, { currency }, options) } : undefined),
    ...(isStringNotEmpty(currency) ? { DS_MERCHANT_CURRENCY: formatInputCurrency(currency) } : undefined),
    ...(isStringNotEmpty(merchantName) ? { DS_MERCHANT_MERCHANTNAME: merchantName } : undefined),
    ...(isStringNotEmpty(identifier) ? { DS_MERCHANT_IDENTIFIER: identifier } : undefined),
    ...(isStringNotEmpty(group) ? { DS_MERCHANT_GROUP: group } : undefined),
    ...(isStringNotEmpty(expiryYear) || isStringNotEmpty(expiryMonth) ? { DS_MERCHANT_EXPIRYDATE: formatExpiryDate({ expiryYear, expiryMonth }) } : undefined),
    ...(isStringNotEmpty(pan) ? { DS_MERCHANT_PAN: pan } : undefined),
    ...(isStringNotEmpty(cvv) ? { DS_MERCHANT_CVV2: cvv } : undefined),
    ...(isStringNotEmpty(directPayment) ? { DS_MERCHANT_DIRECTPAYMENT: directPayment } : undefined),
    ...(isStringNotEmpty(merchantData) ? { DS_MERCHANT_MERCHANTDATA: merchantData } : undefined),
    ...(isStringNotEmpty(operationId) ? { DS_MERCHANT_IDOPER: operationId } : undefined),
    ...(isStringNotEmpty(productDescription) ? { DS_MERCHANT_PRODUCTDESCRIPTION: productDescription } : undefined),
    ...(isStringNotEmpty(taxReference) ? { DS_MERCHANT_TAX_REFERENCE: taxReference } : undefined),
    ...(isStringNotEmpty(transactionDate) ? { DS_MERCHANT_TRANSACTIONDATE: transactionDate } : undefined),
    ...(isStringNotEmpty(cardHolder) ? { DS_MERCHANT_TITULAR: cardHolder } : undefined),
    ...raw
  };
};

export const formatRedirectInputParams = <
  RawInputParams extends object
>(
  input: RedirectFormattedInput<RawInputParams>,
  options?: FormatterOptions
): RedirectInputParams => {
  const {
    merchantURL,
    successURL,
    errorURL,
    payMethods,
    lang,
    ...baseInput
  } = input;

  return {
    ...baseInputParamsFormatter(baseInput, options),
    ...(isStringNotEmpty(merchantURL) ? { DS_MERCHANT_MERCHANTURL: merchantURL } : undefined),
    ...(isStringNotEmpty(successURL) ? { DS_MERCHANT_URLOK: successURL } : undefined),
    ...(isStringNotEmpty(errorURL) ? { DS_MERCHANT_URLKO: errorURL } : undefined),
    ...(isStringNotEmpty(payMethods) ? { DS_MERCHANT_PAYMETHODS: payMethods } : undefined),
    ...(isStringNotEmpty(lang) ? { DS_MERCHANT_CONSUMERLANGUAGE: formatLang(lang) } : undefined),
    // Overwrite formatted parameters
    ...baseInput.raw
  };
};

export const formatRequestInputParams = <
  RawInputParams extends object
>(
  input: RequestFormattedInput<RawInputParams>,
  options?: FormatterOptions
): RequestInputParams => {
  const {
    customerMail,
    customerMobile,
    smsTemplate,
    ...baseInput
  } = input;

  return {
    ...baseInputParamsFormatter(baseInput, options),
    ...(isStringNotEmpty(customerMobile) ? { DS_MERCHANT_CUSTOMER_MOBILE: customerMobile } : undefined),
    ...(isStringNotEmpty(customerMail) ? { DS_MERCHANT_CUSTOMER_MAIL: customerMail } : undefined),
    ...(isStringNotEmpty(smsTemplate) ? { DS_MERCHANT_CUSTOMER_SMS_TEXT: smsTemplate } : undefined),
    // Overwrite formatted parameters
    ...baseInput.raw
  };
};

export const createRedirectInputFormatter = (
  options?: FormatterOptions
): (<RawParams extends object>(input: RedirectFormattedInput<RawParams>) => RedirectInputParams) => {
  return input => formatRedirectInputParams(input, options);
};

export const createRequestInputFormatter = (
  options?: FormatterOptions
): (<RawParams extends object>(input: RequestFormattedInput<RawParams>) => RequestInputParams) => {
  return input => formatRequestInputParams(input, options);
};
