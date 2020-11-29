import { TransactionType } from '../assets/transaction-types';
import { CardBrand } from '../assets/card-brands';
import { Country } from '../assets/countries';
import { Currency } from '../assets/currencies';
import { Language } from '../assets/lang-codes';

export type RawResponseParams = Record<string, string>;
export type RawRequestParams = Record<string, string>;

export interface ParsedSoapNotifiation {
  Message: {
    Signature: string
    Request: RawResponseParams
  }
}

export interface FormattedResponse {
  raw: RawResponseParams
  date?: string
  hour?: string
  timestamp?: Date
  currency?: Currency
  amount?: number
  response?: number
  order?: string
  merchantCode?: string
  terminal?: string
  merchantData?: string
  securePayment?: boolean
  transactionType?: string
  identifier?: string
  merchantGroup?: string
  expiryYear?: string
  expiryMonth?: string
  expiryDate?: string
  cardNumber?: string
  cardType?: string
  authorisationCode?: string
  lang?: Language
  cardCountry?: Country
  cardBrand?: CardBrand
  payURL?: string
}

export interface RequestInput {
  amount: string | number
  currency: Currency
  merchantCode: string
  transactionType: TransactionType
  order: string
  expiryYear?: string
  expiryMonth?: string
  expiryDate?: string
  terminal?: string
  cvv?: string
  merchantName?: string
  merchantURL?: string
  merchantSignature?: string
  successURL?: string
  errorURL?: string
  dateFrequency?: string
  chargeExpiryDate?: string
  sumTotal?: string
  directPayment?: string
  identifier?: string
  group?: string
  pan?: string
  cardCountry?: Country
  lang?: Language
  merchantData?: string
  clientIp?: string
  operationId?: string
  payMethods?: string
  productDescription?: string
  taxReference?: string
  transactionDate?: string
  merchantDescriptor?: string
  customerMobile?: string
  customerMail?: string
  cardHolder?: string
  smsTemplate?: string

  raw?: RawRequestParams
}

export interface ResponseXML {
  RETORNOXML: {
    CODIGO: string
    OPERACION: RawResponseParams
  }
}

export interface RawNotificationBody {
  Ds_Signature: string
  Ds_MerchantParameters: string
}
