import type { TransactionType } from '../assets/transaction-types';
import type { CardBrand } from '../assets/card-brands';
import type { Country } from '../assets/countries';
import type { Currency } from '../assets/currencies';
import type { Language } from '../assets/lang-codes';

import type { BaseInputParams } from '../types/input-params';
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

export interface BaseFormattedInput <RawInputParams extends object> {
  merchantCode: string
  transactionType: TransactionType
  order: string
  terminal: string
  amount?: string | number
  currency?: Currency
  expiryYear?: string
  expiryMonth?: string
  cvv?: string
  merchantName?: string
  identifier?: string
  group?: string
  pan?: string
  directPayment?: BaseInputParams['DS_MERCHANT_DIRECTPAYMENT']
  merchantData?: string
  operationId?: string
  productDescription?: string
  taxReference?: string
  transactionDate?: string
  cardHolder?: string

  raw?: RawInputParams
}

export interface RedirectFormattedInput <
  RawInputParams extends object
> extends BaseFormattedInput<RawInputParams> {
  merchantURL?: string
  successURL?: string
  errorURL?: string
  payMethods?: string
  lang?: Language
}

export interface RequestFormattedInput <
  RawInputParams extends object
> extends BaseFormattedInput<RawInputParams> {
  customerMobile?: string
  customerMail?: string
  smsTemplate?: string
}

/*
 * Output
 */

export interface BaseFormattedOutput <
  RawOutputParams extends BaseOutputParams
> {
  merchantCode: string
  terminal: string
  order: string
  securePayment: boolean
  transactionType: TransactionType
  cardCountry?: Country
  cardBrand?: CardBrand
  cardPSD2?: boolean
  merchantData?: string
  authorisationCode?: string
  cardType?: BaseOutputParams['Ds_Card_Type']

  raw: RawOutputParams
}

export interface ResolvedTransactionTraitFormattedOutput {
  amount: string
  currency: Currency
  response: number
}

export interface NotificationFormattedOutput <
  RawOutputParams extends NotificationOutputParams
> extends BaseFormattedOutput<RawOutputParams>,
  ResolvedTransactionTraitFormattedOutput {
  date: string
  time: string
  timestamp: Date
  lang?: Language
}

export interface RequestFormattedOutput <
  RawOutputParams extends RequestOutputParams
> extends BaseFormattedOutput<RawOutputParams> {
  identifier?: string
  cardNumber?: string
  payURL?: string
  expiryYear?: string
  expiryMonth?: string
  lang?: Language
}

export interface RestIniciaPeticionFormattedOutput <
  RawOutputParams extends RestIniciaPeticionOutputParams
> extends RequestFormattedOutput<RawOutputParams> {
}

export interface RestTrataPeticionFormattedOutput <
  RawOutputParams extends RestTrataPeticionOutputParams
> extends RequestFormattedOutput<RawOutputParams>,
  Omit<ResolvedTransactionTraitFormattedOutput, 'response'> {
  response?: number
}
