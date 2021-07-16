import type {
  BaseInputParams
} from './input-params';
import type {
  BaseOutputParams,
  WebserviceOutputParams,
  SoapNotificationOutputParams
} from './output-params';

export type CommonRawResponseParams = Pick<BaseOutputParams, 'Ds_Order'>;
export type CommonRawRequestParams = Pick<BaseInputParams, 'DS_MERCHANT_ORDER'>;

export interface ParsedSoapNotifiation {
  Message: {
    Signature: string
    Request: SoapNotificationOutputParams
  }
}

/**
 * Body of a 3DS v1 challenge completion notification
 *
 * @public
 */
export interface ThreeDSv1ChallengeNotificationBody {
  /** Payment authentication Request, XML that is gzip compressed and base64 encoded */
  PaRes: string
  /** Merchant data, random generated identifier hex encoded? */
  MD: string
}

/**
 * Body of a 3DS v2 method completion notification
 *
 * @public
 */
export interface ThreeDSv2MethodNotificationBody {
  threeDSMethodData: string
}

/**
 * Body of a 3DS v2 challenge completion notification
 *
 * @public
 */
export interface ThreeDSv2ChallengeNotificationBody {
  /** Challenge response, JSON that is base64 encoded */
  cres: string
  threeDSSessionData: string
}

export interface ResponseXMLInnerSuccess {
  CODIGO: '0'
  OPERACION: WebserviceOutputParams
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

/**
 * Body of a successful redsys JSON HTTP response or notification
 *
 * @public
 */
export interface ResponseJSONSuccess {
  Ds_SignatureVersion: string
  Ds_Signature: string
  Ds_MerchantParameters: string
}

/**
 * Body of a failed redsys JSON HTTP response
 */
export interface ResponseJSONError {
  errorCode: string
}

/**
 * Body of a redsys JSON HTTP response
 */
export type ResponseJSON = ResponseJSONSuccess | ResponseJSONError;

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

export interface WebServiceIniciaPeticionTrait {
  iniciaPeticionAsync: (input: { datoEntrada: string }) => Promise<[{
    iniciaPeticionReturn: string
  }]>
}

export interface WebServiceTrataPeticionTrait {
  trataPeticionAsync: (input: { datoEntrada: string }) => Promise<[{
    trataPeticionReturn: string
  }]>
}

/**
 * Redirect form
 *
 * @public
 */
export interface RedirectForm {
  url: string
  body: SHA256SignedJSONParameters
}
