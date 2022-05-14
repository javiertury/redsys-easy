import type { TransactionType } from '../assets/transaction-types';
import type { CountryNum } from '../assets/countries';
import type { CardBrandNum } from '../assets/card-brands';
import type { CurrencyNum } from '../assets/currencies';
import type { LanguageNum } from '../assets/lang-codes';

import type {
  ThreeDSv1PreAuthOutputParams,
  ThreeDSv2PreAuthOutputParams,
  ThreeDSv1ChallengeOutputParams,
  ThreeDSv2ChallengeOutputParams
} from './3ds-params';

/**
 * Common output parameters
 */
export interface BaseOutputParams {
  /** Order identifier */
  Ds_Order: string

  /** Merchant code number */
  Ds_MerchantCode: string

  /** Terminal number */
  Ds_Terminal: string

  /** Transaction type */
  Ds_TransactionType: TransactionType

  /** Secure payment indicator */
  Ds_SecurePayment?: '0' | '1' | '2'

  /** Card country */
  Ds_Card_Country?: CountryNum

  /** Authorization transaction code, refunds */
  Ds_AuthorisationCode?: string

  /** Card type */
  Ds_Card_Type?: 'C' | 'D'

  /** Merchant data */
  Ds_MerchantData?: string

  /** Card brand */
  Ds_Card_Brand?: CardBrandNum

  /** Card is under PSD2 */
  Ds_Card_PSD2?: 'Y' | 'N'

  /**
   * PDS2 exemptions
   *
   * @example
   * `'LWV;TRA[30.0];COR;MIT;ATD;WHL'`
   */
  Ds_Excep_SCA?: string

  /** Payment method number */
  Ds_ProcessedPayMethod?: string

  /** Credential On File transaction identifier */
  Ds_Merchant_Cof_Txnid?: string

  /**
   * Card number with some digits replaced with asterisks
   * @deprecated
   */
  Ds_CardNumber?: string

  /** Card number with some digits replaced with asterisks */
  Ds_Card_Number?: string

  /** Card expiry date, YYmm */
  Ds_ExpiryDate?: string

  /** Stored payment method reference number */
  Ds_Merchant_Identifier?: string
}

/**
 * Common output parameters of resolved requests or notifications
 */
export interface ResolvedTransactionTrait {
  /**
   * Amount designated as an integer in the smallest currency division
   *
   * @example
   * `'199'` (1.99 EUR)
   */
  Ds_Amount: string

  /** Currency number, ISO-4217 */
  Ds_Currency: CurrencyNum

  /** Response code */
  Ds_Response: string
}

/**
 * Common output parameters of a all requests
 */
export interface RequestOutputParams extends BaseOutputParams {
  /** Payment link, paygold */
  Ds_UrlPago2Fases?: string

  /** Language */
  Ds_Language?: LanguageNum
}

/**
 * Output parameters of a IniciaPeticion HTTP request
 *
 * @public
 */
export interface RestIniciaPeticionOutputParams extends RequestOutputParams {
  /** EMV3DS data in json format */
  Ds_EMV3DS?: ThreeDSv1PreAuthOutputParams | ThreeDSv2PreAuthOutputParams

  /** Dynamic Currency Conversion data, json */
  Ds_DCC?: {
    InfoMonedaTarjeta: {
      /** Card currency number, ISO-4217 */
      monedaDCC: string
      /** Card currency name */
      litMonedaDCC: string
      /** Card currency 3-letter code */
      litMonedaRDCC: string
      /** Amount in card currency, decimal number */
      importeDCC: string
      /** Exchange rate, decimal number */
      cambioDCC: string
      /** Exchange date, YYYY-MM-DD */
      fechaCambioDCC: string
      /** Markup, decimal number */
      markUp: number
    }
    InfoMonedaComercio: {
      /** Currency number, ISO-4217 */
      monedaCome: string
      /** Currency 3-letter code */
      litMonedaCome: string
      /** Amount, decimal number */
      importeCome: string
    }
  }
}

/**
 * Output parameters of a TrataPeticion HTTP request
 *
 * @public
 */
export interface RestTrataPeticionOutputParams extends RequestOutputParams, Omit<ResolvedTransactionTrait, 'Ds_Response'> {
  /** Response code */
  Ds_Response?: ResolvedTransactionTrait['Ds_Response']

  /** EMV3DS data in json format */
  Ds_EMV3DS?:
  | ThreeDSv1ChallengeOutputParams
  | ThreeDSv2ChallengeOutputParams
}

/**
 * Common parameters for notifications
 */
export interface NotificationOutputParams extends BaseOutputParams, ResolvedTransactionTrait {
  /** Language */
  Ds_ConsumerLanguage?: LanguageNum

  /** Error code */
  Ds_ErrorCode?: string
}

/**
 * Parameters of a redsys REST notification
 *
 * @public
 */
export interface RestNotificationOutputParams extends NotificationOutputParams {
  /** Transaction date, DD/MM/YYYY */
  Ds_Date: string

  /** Transaction time, hh:mm */
  Ds_Hour: string
}

/**
 * Parameters of a redsys SOAP notification
 *
 * @public
 */
export interface SoapNotificationOutputParams extends NotificationOutputParams {
  /** Transaction date, DD/MM/YYYY */
  Fecha: string

  /** Transaction time, hh:mm */
  Hora: string
}
