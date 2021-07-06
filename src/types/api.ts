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

export interface ThreeDSv1ChallengeNotificationBody {
  /** Payment authentication Request, XML that is gzip compressed and base64 encoded */
  PaRes: string
  /** Merchant data, random generated identifier hex encoded? */
  MD: string
}

export interface ThreeDSv2MethodNotificationBody {
  threeDSMethodData: string
}

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
