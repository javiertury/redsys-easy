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
  DS_MERCHANT_IDENTIFIER?: string | undefined;

  /** Merchant group number */
  DS_MERCHANT_GROUP?: string | undefined;

  /**
   * Amount designated as an integer in the smallest currency division
   *
   * @example
   * `'199'` (1.99 EUR)
   */
  DS_MERCHANT_AMOUNT?: string | undefined;

  /** Currency number, ISO-4217 */
  DS_MERCHANT_CURRENCY?: CurrencyNum | undefined;

  /** Card PAN, number */
  DS_MERCHANT_PAN?: string | undefined;

  /** Card expiry date, YYMM */
  DS_MERCHANT_EXPIRYDATE?: string | undefined;

  /** Card CVV2 code */
  DS_MERCHANT_CVV2?: string | undefined;

  /** PDS2 exemptions */
  DS_MERCHANT_EXCEP_SCA?: string | undefined;

  /** Merchant data */
  DS_MERCHANT_MERCHANTDATA?: string | undefined;

  /** Merchant name */
  DS_MERCHANT_MERCHANTNAME?: string | undefined;

  /** Product description */
  DS_MERCHANT_PRODUCTDESCRIPTION?: string | undefined;

  /** Cardholder name and surname */
  DS_MERCHANT_TITULAR?: string | undefined;

  /** Authorization transaction code, refunds */
  DS_MERCHANT_AUTHORISATIONCODE?: string | undefined;

  /** Transaction date, YYYY-MM-DD */
  DS_MERCHANT_TRANSACTIONDATE?: string | undefined;

  /** Direct payment */
  DS_MERCHANT_DIRECTPAYMENT?: 'true' | 'moto' | undefined;

  /** INSITE operation identifier */
  DS_MERCHANT_IDOPER?: string | undefined;

  /** Tax code number */
  DS_MERCHANT_TAX_REFERENCE?: string | undefined;

  /** Online Travel Agency indicator */
  DS_MERCHANT_OTA?: 'S' | undefined;

  /** Initial Credential On File transaction indicator */
  DS_MERCHANT_COF_INI?: 'S' | 'N' | undefined;

  /** Credential On File transaction identifier */
  DS_MERCHANT_COF_TXNID?: string | undefined;

  /** Credential On File transaction type */
  DS_MERCHANT_COF_TYPE?:
    | 'I'
    | 'R'
    | 'H'
    | 'E'
    | 'D'
    | 'M'
    | 'N'
    | 'C'
    | undefined;
}

/**
 * Input parameters for a redsys redirect request
 *
 * @public
 */
export interface RedirectInputParams extends BaseInputParams {
  /** EMV3DS data in json format */
  DS_MERCHANT_EMV3DS?: ThreeDSRedirectInputParams | undefined;

  /** Notification url */
  DS_MERCHANT_MERCHANTURL?: string | undefined;

  /** Success redirection url */
  DS_MERCHANT_URLOK?: string | undefined;

  /** Failure redirection url */
  DS_MERCHANT_URLKO?: string | undefined;

  /** Language */
  DS_MERCHANT_CONSUMERLANGUAGE?: LanguageNum | undefined;

  /** Payment methods */
  DS_MERCHANT_PAYMETHODS?: string | undefined;

  /** Customization code number */
  DS_MERCHANT_PERSOCODE?: string | undefined;

  /** Obtain paypal address */
  DS_MERCHANT_SHIPPINGADDRESSPYP?: 'S' | 'N' | undefined;
}

/**
 * Common input parameters for redsys request
 *
 * @public
 */
export interface RequestInputParams
  extends BaseInputParams,
    // Paygold uses some redirection input parameters
    // although this is not properly documented in the official Redsys manual
    Pick<
      RedirectInputParams,
      | 'DS_MERCHANT_MERCHANTURL'
      | 'DS_MERCHANT_URLOK'
      | 'DS_MERCHANT_URLKO'
      | 'DS_MERCHANT_CONSUMERLANGUAGE'
      | 'DS_MERCHANT_PAYMETHODS'
      | 'DS_MERCHANT_PERSOCODE'
      | 'DS_MERCHANT_SHIPPINGADDRESSPYP'
    > {
  /** xPay data, hex */
  DS_XPAYDATA?: string | undefined;

  /** xPay origin */
  DS_XPAYORIGEN?: 'Google' | 'Apple' | undefined;

  /** xPay type */
  DS_XPAYTYPE?: 'WEB' | 'InApp' | undefined;

  /** PUC identifier, number */
  DS_ACQUIRER_IDENTIFIER?: string | undefined;

  /** Matching data */
  DS_MERCHANT_MATCHINGDATA?: string | undefined;

  /** Customer phone, paygold */
  DS_MERCHANT_CUSTOMER_MOBILE?: string | undefined;

  /** Customer email address, paygold */
  DS_MERCHANT_CUSTOMER_MAIL?: string | undefined;

  /** Expiration date for paygold links, YYYY-MM-DD-hh:mm:ss.sss or number of minutes */
  DS_MERCHANT_P2F_EXPIRYDATE?: string | undefined;

  /**
   * SMS text content, paygold
   *
   * Parameters: @URL@, @COMERCIO@, @IMPORTE@ and @MONEDA@
   */
  DS_MERCHANT_CUSTOMER_SMS_TEXT?: string | undefined;

  /**
   * Email text content, paygold
   *
   * Parameters: nombreComprador, direccionComprador and textoLibre1.
   */
  DS_MERCHANT_P2F_XMLDATA?: string | undefined;
}

export interface CommonRestInputParams extends RequestInputParams {
  /** MPI External parameters, json */
  DS_MERCHANT_MPIEXTERNAL?:
    | {
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
      }
    | undefined;
}

/**
 * Input parameters for a IniciaPeticion HTTP request
 *
 * @public
 */
export interface RestIniciaPeticionInputParams extends CommonRestInputParams {
  /** EMV3DS data in json format */
  DS_MERCHANT_EMV3DS?: ThreeDSPreAuthInputParams | undefined;

  /** Dynamic Currency Conversion data, json */
  DS_MERCHANT_DCC?: 'Y' | 'N' | undefined;
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
    | ThreeDSv2ChallengeResponseInputParams
    | undefined;

  /** Dynamic Currency Conversion data, json */
  DS_MERCHANT_DCC?:
    | {
        /** Card currency number, ISO-4217 */
        monedaDCC: string;
        /** Amount in card currency, decimal number */
        importeDCC: string;
      }
    | undefined;
}
