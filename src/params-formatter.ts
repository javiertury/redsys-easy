import { ValidationError } from './errors';
import { LANGUAGES } from './assets/lang-codes';
import { CURRENCIES } from './assets/currencies';
import { COUNTRIES } from './assets/countries';
import { RawRequestParams, RequestInput } from './types/api';

export interface FormatterOptions {
  amountType: 'float' | 'atomic'
}

const isStringNotEmpty = (str: string | undefined): str is string => str != null && str.length > 0;

const inputParamsFormatter = (
  input: RequestInput,
  options?: FormatterOptions
): RawRequestParams => {
  const obj: RawRequestParams = {};

  for (const key of Object.keys(input) as ReadonlyArray<keyof RequestInput>) {
    switch (key) {
      case 'expiryMonth':
      case 'expiryYear':
      case 'raw':
        continue;

      case 'order':
        obj.DS_MERCHANT_ORDER = input[key];
        break;

      case 'merchantCode':
        obj.DS_MERCHANT_MERCHANTCODE = input[key];
        break;

      case 'transactionType':
        obj.DS_MERCHANT_TRANSACTIONTYPE = input.transactionType;
        break;

      case 'terminal': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_TERMINAL = value;
        break;
      }

      case 'currency': {
        const value = input.currency;
        if (!isStringNotEmpty(value)) continue;

        const currencyData = CURRENCIES[value];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!currencyData || !currencyData.num) {
          throw new ValidationError('Unsupported currency', value, 'currency');
        }

        obj.DS_MERCHANT_CURRENCY = currencyData.num.padStart(3, '0');
        break;
      }

      case 'amount': {
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
         *
         */

        const value = input[key];

        // atomic by default
        let rawValue: string = value.toString();

        if (options?.amountType != null) {
          if (options.amountType === 'float') {
            const currencyData = CURRENCIES[input.currency];
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!currencyData || !currencyData.decimals) {
              throw new ValidationError('Unsupported currency', input.currency, 'currency');
            }

            const numericValue = typeof value === 'number' ? value : Number.parseFloat(value);

            if (!Number.isFinite(numericValue)) {
              throw new ValidationError('Invalid amount', value, 'amount');
            }

            rawValue = Math.round(numericValue * Math.pow(10, currencyData.decimals)).toString();
          } else if (options.amountType !== 'atomic') {
            throw new ValidationError('Unknown format', options.amountType, 'amountType');
          }
        }

        if (rawValue.length > 12) {
          throw new ValidationError('Amount to charge is too large', value, 'amount');
        }

        obj.DS_MERCHANT_AMOUNT = rawValue;
        break;
      }

      case 'merchantName': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_MERCHANTNAME = value;
        break;
      }

      case 'merchantURL': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_MERCHANTURL = value;
        break;
      }

      case 'merchantSignature': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_MERCHANTSIGNATURE = value;
        break;
      }

      case 'successURL': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_URLOK = value;
        break;
      }

      case 'errorURL': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_URLKO = value;
        break;
      }

      case 'dateFrequency': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_DATEFRECUENCY = value;
        break;
      }

      case 'chargeExpiryDate': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_CHARGEEXPIRYDATE = value;
        break;
      }

      case 'sumTotal': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_SUMTOTAL = value;
        break;
      }

      case 'directPayment': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_DIRECTPAYMENT = value;
        break;
      }

      case 'identifier': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_IDENTIFIER = value;
        break;
      }

      case 'group': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_GROUP = value;
        break;
      }

      case 'pan': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_PAN = value;
        break;
      }

      case 'expiryDate': {
        const stdFmt = input[key];
        if (!isStringNotEmpty(stdFmt)) continue;

        if (stdFmt.length !== 4 || !/^\d+$/.test(stdFmt)) {
          throw new ValidationError('Invalid expiryDate', stdFmt, 'expiryDate');
        }
        const altFmt = `${stdFmt.slice(2, 4)}${stdFmt.slice(0, 2)}`;
        obj.DS_MERCHANT_EXPIRYDATE = altFmt;
        break;
      }

      case 'cvv': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;
        obj.DS_MERCHANT_CVV2 = value;
        break;
      }

      case 'cardCountry': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        const countryInt = COUNTRIES[value];
        if (countryInt != null && countryInt) {
          obj.DS_CARD_COUNTRY = countryInt;
        }
        break;
      }

      case 'lang': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        const langInt = LANGUAGES[value];
        if (langInt != null && langInt) {
          obj.DS_MERCHANT_CONSUMERLANGUAGE = langInt;
        }
        break;
      }

      case 'merchantData': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_MERCHANTDATA = value;
        break;
      }

      case 'clientIp': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_CLIENTIP = value;
        break;
      }

      case 'operationId': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_IDOPER = value;
        break;
      }

      case 'payMethods': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_PAYMETHODS = value;
        break;
      }

      case 'productDescription': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_PRODUCTDESCRIPTION = value;
        break;
      }

      case 'taxReference': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_TAX_REFERENCE = value;
        break;
      }

      case 'transactionDate': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_TRANSACTIONDATE = value;
        break;
      }

      case 'merchantDescriptor': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_MERCHANTDESCRIPTOR = value;
        break;
      }

      case 'customerMobile': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_CUSTOMER_MOBILE = value;
        break;
      }

      case 'customerMail': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_CUSTOMER_MAIL = value;
        break;
      }

      case 'cardHolder': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_TITULAR = value;
        break;
      }

      case 'smsTemplate': {
        const value = input[key];
        if (!isStringNotEmpty(value)) continue;

        obj.DS_MERCHANT_CUSTOMER_SMS_TEXT = value;
        break;
      }

      default:
        throw new ValidationError('Unknown parameter', undefined, key);
    }
  }

  return obj;
};

export const formatParams = (paramsInput: RequestInput, options?: FormatterOptions) => {
  // Pre processing
  const {
    amount,
    currency,
    merchantCode,
    transactionType,
    order,
    expiryYear,
    expiryMonth,
    expiryDate
  } = paramsInput;

  if (
    (typeof amount !== 'string' || !amount) &&
    (typeof amount !== 'number' || amount < 0)
  ) {
    // An amount of 0 is valid, it may be used for obtaining a credit card reference(tokenization)
    throw new ValidationError('Invalid amount', amount, 'amount');
  }

  if (!currency) {
    throw new ValidationError('No currency provided', currency, 'currency');
  }

  if (!merchantCode) {
    throw new ValidationError('The merchant code is mandatory', merchantCode, 'merchantCode');
  }

  if (!transactionType) {
    throw new ValidationError('The transaction type is mandatory', transactionType, 'transactionType');
  }

  if (!order) {
    throw new ValidationError('No order reference provided', order, 'order');
  }

  if (
    (expiryDate == null || !expiryDate) &&
    (expiryMonth != null && expiryMonth) &&
    (expiryYear != null && expiryYear)
  ) {
    if (expiryMonth.length !== 2) {
      throw new ValidationError('Invalid expiryMonth', expiryMonth, 'expiryMonth');
    }
    if (expiryYear.length !== 2) {
      throw new ValidationError('Invalid expiryYear', expiryYear, 'expiryYear');
    }
    paramsInput.expiryDate = `${expiryMonth}${expiryYear}`;
  }

  // Defaults
  if (paramsInput.terminal == null || !paramsInput.terminal) paramsInput.terminal = '1';

  const paramsObj = inputParamsFormatter(paramsInput, options);

  return {
    ...paramsObj,
    // Last, so raw doesn't get overwritten
    ...paramsInput.raw
  };
};
