import type { TransactionType } from '../assets/transaction-types';
import type { CurrencyNum } from '../assets/currencies';
import type { LanguageNum } from '../assets/lang-codes';

import type {
  ThreeDSPreAuthInputParams,
  ThreeDSv1AuthDataInputParams,
  ThreeDSv2AuthDataInputParams,
  ThreeDSv1ChallengeResponseInputParams,
  ThreeDSv2ChallengeResponseInputParams,
  ThreeDSRedirectInputParams
} from './3ds-params';

/**
 * Common input parameters
 */
export interface BaseInputParams {
  /** Transaction type */
  DS_MERCHANT_TRANSACTIONTYPE: TransactionType;

  /** Merchant code number */
  DS_MERCHANT_MERCHANTCODE: string;

  /** Order identifier */
  DS_MERCHANT_ORDER: string;

  /** Terminal number */
  DS_MERCHANT_TERMINAL: string;

  /** Stored payment method reference number */
  DS_MERCHANT_IDENTIFIER?: string;

  /** Merchant group number */
  DS_MERCHANT_GROUP?: string;

  /**
   * Amount designated as an integer in the smallest currency division
   *
   * @example
   * `'199'` (1.99 EUR)
   */
  DS_MERCHANT_AMOUNT?: string;

  /** Currency number, ISO-4217 */
  DS_MERCHANT_CURRENCY?: CurrencyNum;

  /** Card PAN, number */
  DS_MERCHANT_PAN?: string;

  /** Card expiry date, YYMM */
  DS_MERCHANT_EXPIRYDATE?: string;

  /** Card CVV2 code */
  DS_MERCHANT_CVV2?: string;

  /** PDS2 exemptions */
  DS_MERCHANT_EXCEP_SCA?: string;

  /** Merchant data */
  DS_MERCHANT_MERCHANTDATA?: string;

  /** Merchant name */
  DS_MERCHANT_MERCHANTNAME?: string;

  /** Product description */
  DS_MERCHANT_PRODUCTDESCRIPTION?: string;

  /** Cardholder name and surname */
  DS_MERCHANT_TITULAR?: string;

  /** Authorization transaction code, refunds */
  DS_MERCHANT_AUTHORISATIONCODE?: string;

  /** Transaction date, YYYY-MM-DD */
  DS_MERCHANT_TRANSACTIONDATE?: string;

  /** Direct payment */
  DS_MERCHANT_DIRECTPAYMENT?: 'true' | 'moto';

  /** INSITE operation identifier */
  DS_MERCHANT_IDOPER?: string;

  /** Tax code number */
  DS_MERCHANT_TAX_REFERENCE?: string;

  /** Online Travel Agency indicator */
  DS_MERCHANT_OTA?: 'S';

  /** Initial Credential On File transaction indicator */
  DS_MERCHANT_COF_INI?: 'S' | 'N';

  /** Credential On File transaction identifier */
  DS_MERCHANT_COF_TXNID?: string;

  /** Credential On File transaction type */
  DS_MERCHANT_COF_TYPE?: 'I' | 'R' | 'H' | 'E' | 'D' | 'M' | 'N' | 'C';
}

/**
 * Input parameters for a redsys redirect request
 *
 * @public
 */
export interface RedirectInputParams extends BaseInputParams {
  /** EMV3DS data in json format */
  DS_MERCHANT_EMV3DS?: ThreeDSRedirectInputParams;

  /** Notification url */
  DS_MERCHANT_MERCHANTURL?: string;

  /** Success redirection url */
  DS_MERCHANT_URLOK?: string;

  /** Failure redirection url */
  DS_MERCHANT_URLKO?: string;

  /** Language */
  DS_MERCHANT_CONSUMERLANGUAGE?: LanguageNum;

  /** Payment methods */
  DS_MERCHANT_PAYMETHODS?: string;

  /** Customization code number */
  DS_MERCHANT_PERSOCODE?: string;

  /** Obtain paypal address */
  DS_MERCHANT_SHIPPINGADDRESSPYP?: 'S' | 'N';
}

/**
 * Common input parameters for redsys request
 *
 * @public
 */
export interface RequestInputParams extends BaseInputParams {
  /** xPay data, hex */
  DS_XPAYDATA?: string;

  /** xPay origin */
  DS_XPAYORIGEN?: 'Google' | 'Apple';

  /** xPay type */
  DS_XPAYTYPE?: 'WEB' | 'InApp';

  /** PUC identifier, number */
  DS_ACQUIRER_IDENTIFIER?: string;

  /** Matching data */
  DS_MERCHANT_MATCHINGDATA?: string;

  /** Customer phone, paygold */
  DS_MERCHANT_CUSTOMER_MOBILE?: string;

  /** Customer email address, paygold */
  DS_MERCHANT_CUSTOMER_MAIL?: string;

  /** Expiration date for paygold links, YYYY-MM-DD-hh:mm:ss.sss or number of minutes */
  DS_MERCHANT_P2F_EXPIRYDATE?: string;

  /**
   * SMS text content, paygold
   *
   * Parameters: @URL@, @COMERCIO@, @IMPORTE@ and @MONEDA@
   */
  DS_MERCHANT_CUSTOMER_SMS_TEXT?: string;

  /**
   * Email text content, paygold
   *
   * Parameters: nombreComprador, direccionComprador and textoLibre1.
   */
  DS_MERCHANT_P2F_XMLDATA?: string;
}

export interface CommonRestInputParams extends RequestInputParams {
  /** MPI External parameters, json */
  DS_MERCHANT_MPIEXTERNAL?: {
    /** Authenticator identifier, base64 */
    TXID: string;

    /** CAVV, base64 */
    CAVV: string;

    /** ECI, number */
    ECI: '5' | '6' | '7';

    /** Eci, number */
    Eci: string;

    /** 3DSecure transaction identifier */
    threeDSServerTransID: string;

    /** DS identifier */
    dsTransID: string;

    /** CAVV, base64 */
    authenticationValue: string;

    /** 3DSecure version */
    ProtocolVersion: '2.1.0';

    /** Authentication Method */
    authenticationMethod: string;

    /** Authentication type */
    authenticationType: string;

    /** Authentication flow */
    authenticationFlow: 'F' | 'C';
  };
}

/**
 * Input parameters for a IniciaPeticion HTTP request
 *
 * @public
 */
export interface RestIniciaPeticionInputParams extends CommonRestInputParams {
  /** EMV3DS data in json format */
  DS_MERCHANT_EMV3DS?: ThreeDSPreAuthInputParams;

  /** Dynamic Currency Conversion data, json */
  DS_MERCHANT_DCC?: 'Y' | 'N';
}

/**
 * Input parameters for a TrataPeticion Peticion HTTP request
 *
 * @public
 */
export interface RestTrataPeticionInputParams extends CommonRestInputParams {
  /** EMV3DS data in json format */
  DS_MERCHANT_EMV3DS?:
    | ThreeDSv1AuthDataInputParams
    | ThreeDSv2AuthDataInputParams
    | ThreeDSv1ChallengeResponseInputParams
    | ThreeDSv2ChallengeResponseInputParams;

  /** Dynamic Currency Conversion data, json */
  DS_MERCHANT_DCC?: {
    /** Card currency number, ISO-4217 */
    monedaDCC: string;
    /** Amount in card currency, decimal number */
    importeDCC: string;
  };
}
