import type { TransactionType } from '../assets/transaction-types';
import type { CardBrand } from '../assets/card-brands';
import type { Country } from '../assets/countries';
import type { Currency } from '../assets/currencies';
import type { Language } from '../assets/lang-codes';

export type RawResponseParams = Record<string, string>;
export type RawRequestParams = Record<string, string>;

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
  cardPSD2?: boolean
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

export interface ParsedSoapNotifiation {
  Message: {
    Signature: string
    Request: RawResponseParams
  }
}

export interface ResponseXMLInnerSuccess {
  CODIGO: '0'
  OPERACION: RawResponseParams
}

export interface ResponseXMLInnerFailure {
  CODIGO: string
  RECIBIDO: {
    trataPeticion: {
      datoEntrada: string
    }
  }
}

export interface ResponseXML {
  RETORNOXML: ResponseXMLInnerSuccess | ResponseXMLInnerFailure
}

export interface ResponseJSON {
  Ds_SignatureVersion: string
  Ds_Signature: string
  Ds_MerchantParameters: string
}

export interface ResponseJSONError {
  errorCode: string
}

/**
 * SHA256 signed JSON request parameters
 */
export interface SHA256SignedJSONParameters {
  Ds_SignatureVersion: 'HMAC_SHA256_V1'
  Ds_MerchantParameters: string
  Ds_Signature: string
}

export interface SoapNotificationResponse {
  order: string
  allow: boolean
}

export interface WebServiceTrataPeticionTrait {
  trataPeticionAsync: (input: { datoEntrada: string }) => Promise<[{
    trataPeticionReturn: string
  }]>
}
