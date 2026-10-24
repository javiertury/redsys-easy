import type { BaseInputParams } from './input-params';
import type {
  BaseOutputParams,
  SoapNotificationOutputParams
} from './output-params';

export type CommonRawResponseParams = Pick<BaseOutputParams, 'Ds_Order'>;
export type CommonRawRequestParams = Pick<BaseInputParams, 'DS_MERCHANT_ORDER'>;

export interface ParsedSoapNotifiation {
  Message: {
    Signature: string;
    Request: SoapNotificationOutputParams;
  };
}

/**
 * Body of a 3DS v1 challenge completion notification
 *
 * @public
 */
export interface ThreeDSv1ChallengeNotificationBody {
  /** Payment authentication Request, XML that is gzip compressed and base64 encoded */
  PaRes: string;
  /** Merchant data, random generated identifier hex encoded? */
  MD: string;
}

/**
 * Body of a 3DS v2 method completion notification
 *
 * @public
 */
export interface ThreeDSv2MethodNotificationBody {
  threeDSMethodData: string;
}

/**
 * Body of a 3DS v2 challenge completion notification
 *
 * @public
 */
export interface ThreeDSv2ChallengeNotificationBody {
  /** Challenge response, JSON that is base64 encoded */
  cres: string;
  threeDSSessionData: string;
}

/**
 * Body of a successful redsys JSON HTTP response or notification
 *
 * @public
 */
export interface ResponseJSONSuccess {
  Ds_SignatureVersion: string;
  Ds_Signature: string;
  Ds_MerchantParameters: string;
}

/**
 * Body of a failed redsys JSON HTTP response
 */
export interface ResponseJSONError {
  errorCode: string;
}

/**
 * Body of a redsys JSON HTTP response
 */
export type ResponseJSON = ResponseJSONSuccess | ResponseJSONError;

/**
 * Signature versions supported by redsys-easy
 *
 * @public
 */
export type SignatureVersion = 'HMAC_SHA256_V1' | 'HMAC_SHA512_V2';

/**
 * SHA256 signed JSON request parameters
 */
export interface SHA256SignedJSONParameters {
  Ds_SignatureVersion: 'HMAC_SHA256_V1';
  Ds_MerchantParameters: string;
  Ds_Signature: string;
}

/**
 * SHA512 signed JSON request parameters
 */
export interface SHA512SignedJSONParameters {
  Ds_SignatureVersion: 'HMAC_SHA512_V2';
  Ds_MerchantParameters: string;
  Ds_Signature: string;
}

/**
 * Signed JSON request parameters
 */
export type SignedJSONParameters =
  | SHA256SignedJSONParameters
  | SHA512SignedJSONParameters;

export interface SoapNotificationResponse {
  order: string;
  allow: boolean;
}

/**
 * Redirect form
 *
 * @public
 */
export interface RedirectForm {
  url: string;
  body: SignedJSONParameters;
}
