import type { TransactionType } from '../assets/transaction-types';
import type { CardBrand } from '../assets/card-brands';
import type { Country } from '../assets/countries';
import type { Currency } from '../assets/currencies';
import type { Language } from '../assets/lang-codes';

import type {
  BaseInputParams,
  RedirectInputParams,
  RequestInputParams,
  RestIniciaPeticionInputParams,
  RestTrataPeticionInputParams
} from '../types/input-params';

import type {
  BaseOutputParams,
  NotificationOutputParams,
  RequestOutputParams,
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams
} from '../types/output-params';

/*
 * Input
 */

export interface BaseFormatterInput<
  RawInputParams extends Partial<BaseInputParams>
> {
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_MERCHANTCODE}
   */
  merchantCode: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_TRANSACTIONTYPE}
   */
  transactionType: TransactionType;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_ORDER}
   */
  order: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_TERMINAL}
   */
  terminal: string;
  /**
   * Amount designated as a decimal string currency unit
   *
   * @example
   * `'1.99'` (1.99 EUR)
   *
   * @remarks
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_AMOUNT}
   */
  amount?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_CURRENCY}
   */
  currency?: Currency;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_PAN}
   */
  pan?: string;
  /**
   * Card expiry year, YY
   *
   * @remarks
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_EXPIRYDATE}
   */
  expiryYear?: string;
  /**
   * Card expiry month, MM
   *
   * @remarks
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_EXPIRYDATE}
   */
  expiryMonth?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_CVV2}
   */
  cvv?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_MERCHANTNAME}
   */
  merchantName?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_IDENTIFIER}
   */
  identifier?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_GROUP}
   */
  group?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_DIRECTPAYMENT}
   */
  directPayment?: BaseInputParams['DS_MERCHANT_DIRECTPAYMENT'];
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_MERCHANTDATA}
   */
  merchantData?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_IDOPER}
   */
  operationId?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_PRODUCTDESCRIPTION}
   */
  productDescription?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_TAX_REFERENCE}
   */
  taxReference?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_TRANSACTIONDATE}
   */
  transactionDate?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_TITULAR}
   */
  cardHolder?: string;

  /**
   * @see {@link RestTrataPeticionInputParams}
   */
  raw?: RawInputParams;
}

/**
 * Input parameters for the redirect input formatter
 *
 * @public
 */
export interface RedirectFormatterInput<
  RawInputParams extends Partial<RedirectInputParams>
> extends BaseFormatterInput<RawInputParams> {
  /**
   * @see {@link RedirectInputParams.DS_MERCHANT_MERCHANTURL}
   */
  merchantURL?: string;
  /**
   * @see {@link RedirectInputParams.DS_MERCHANT_URLOK}
   */
  successURL?: string;
  /**
   * @see {@link RedirectInputParams.DS_MERCHANT_URLKO}
   */
  errorURL?: string;
  /**
   * @see {@link RedirectInputParams.DS_MERCHANT_PAYMETHODS}
   */
  payMethods?: string;
  /**
   * @see {@link RedirectInputParams.DS_MERCHANT_CONSUMERLANGUAGE}
   */
  lang?: Language;
}

export interface RequestFormatterInput<
  RawInputParams extends Partial<RequestInputParams>
> extends BaseFormatterInput<RawInputParams> {
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_CUSTOMER_MOBILE}
   */
  customerMobile?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_CUSTOMER_MAIL}
   */
  customerMail?: string;
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_CUSTOMER_SMS_TEXT}
   */
  smsTemplate?: string;
}

/**
 * Input parameters for the REST iniciaPeticion input formatter
 *
 * @public
 */
export interface RestIniciaPeticionFormatterInput<
  RawInputParams extends Partial<RestIniciaPeticionInputParams>
> extends RequestFormatterInput<RawInputParams> {
  /**
   * @see {@link RestIniciaPeticionInputParams.DS_MERCHANT_EMV3DS}
   */
  emv3ds?: RestIniciaPeticionInputParams['DS_MERCHANT_EMV3DS'];
}

/**
 * Input parameters for the REST trataPeticion input formatter
 *
 * @public
 */
export interface RestTrataPeticionFormatterInput<
  RawInputParams extends Partial<RestTrataPeticionInputParams>
> extends RequestFormatterInput<RawInputParams> {
  /**
   * @see {@link RestTrataPeticionInputParams.DS_MERCHANT_EMV3DS}
   */
  emv3ds?: RestTrataPeticionInputParams['DS_MERCHANT_EMV3DS'];
}

/*
 * Output
 */

export interface BaseFormatterOutput<RawOutputParams extends BaseOutputParams> {
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_MerchantCode}
   */
  merchantCode: string;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Terminal}
   */
  terminal: string;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Order}
   */
  order: string;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_TransactionType}
   */
  transactionType: TransactionType;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_SecurePayment}
   */
  securePayment?: boolean;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Card_Country}
   */
  cardCountry?: Country;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Card_Brand}
   */
  cardBrand?: CardBrand;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Card_PSD2}
   */
  cardPSD2?: boolean;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_MerchantData}
   */
  merchantData?: string;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_AuthorisationCode}
   */
  authorisationCode?: string;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Card_Type}
   */
  cardType?: BaseOutputParams['Ds_Card_Type'];

  raw: RawOutputParams;
}

export interface ResolvedTransactionTraitFormatterOutput {
  /**
   * Amount designated as a decimal string currency unit.
   *
   * @example
   * `'1.99'` (1.99 EUR)
   *
   * @remarks
   * @see {@link RestTrataPeticionOutputParams.Ds_Amount}
   */
  amount: string;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Currency}
   */
  currency: Currency;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Response}
   */
  response: number;
}

/**
 * Ouput parameters for the notification output formatter
 *
 * @public
 */
export interface NotificationFormatterOutput<
  RawOutputParams extends NotificationOutputParams
> extends BaseFormatterOutput<RawOutputParams>,
    ResolvedTransactionTraitFormatterOutput {
  /**
   * @see {@link RestNotificationOutputParams.Ds_Date}
   */
  date: string;
  /**
   * @see {@link RestNotificationOutputParams.Ds_Hour}
   */
  time: string;
  /**
   * Timestamp of transaction
   */
  timestamp: Date;
  /**
   * @see {@link RestNotificationOutputParams.Ds_ConsumerLanguage}
   */
  lang?: Language;
}

export interface RequestFormatterOutput<
  RawOutputParams extends RequestOutputParams
> extends BaseFormatterOutput<RawOutputParams> {
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Merchant_Identifier}
   */
  identifier?: string;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Card_Number}
   */
  cardNumber?: string;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_UrlPago2Fases}
   */
  payURL?: string;
  /**
   * Card expiry year, YY
   *
   * @remarks
   * @see {@link RestTrataPeticionOutputParams.Ds_ExpiryDate}
   */
  expiryYear?: string;
  /**
   * Card expiry month, MM
   *
   * @remarks
   * @see {@link RestTrataPeticionOutputParams.Ds_ExpiryDate}
   */
  expiryMonth?: string;
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Language}
   */
  lang?: Language;
}

/**
 * Ouput parameters for the REST iniciaPeticion output formatter
 *
 * @public
 */
export interface RestIniciaPeticionFormatterOutput<
  RawOutputParams extends RestIniciaPeticionOutputParams
> extends RequestFormatterOutput<RawOutputParams> {
  /**
   * @see {@link RestIniciaPeticionOutputParams.Ds_EMV3DS}
   */
  emv3ds?: RestIniciaPeticionOutputParams['Ds_EMV3DS'];
}

/**
 * Ouput parameters for the REST trataPeticion output formatter
 *
 * @public
 */
export interface RestTrataPeticionFormatterOutput<
  RawOutputParams extends RestTrataPeticionOutputParams
> extends RequestFormatterOutput<RawOutputParams>,
    Omit<ResolvedTransactionTraitFormatterOutput, 'response'> {
  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_Response}
   */
  response?: number;

  /**
   * @see {@link RestTrataPeticionOutputParams.Ds_EMV3DS}
   */
  emv3ds?: RestTrataPeticionOutputParams['Ds_EMV3DS'];
}
