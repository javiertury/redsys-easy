import type { Client } from 'soap';
import type {
  ResponseXML,
  ResponseXMLInnerSuccess,
  WebServiceTrataPeticionTrait
} from '../types/api';

import type {
  WebserviceOutputParams
} from '../types/output-params';

import type {
  WebserviceInputParams
} from '../types/input-params';

import {
  assertSuccessfulResponseCode
} from '../utils/misc';

import {
  GatewayError,
  RedsysError
} from '../errors';

import {
  serializeWebServiceRequest,
  parseWebServiceResponse
} from './web-service-serialization';

import {
  verifyWebServiceResponse,
  signWebServiceRequest
} from './web-service-signature';

export const parseAndVerifyWebServiceResponse = (
  merchantKey: string,
  xmlResponse: string
): ResponseXML['RETORNOXML'] => {
  const data = parseWebServiceResponse(xmlResponse);
  verifyWebServiceResponse(merchantKey, data);
  return data;
};

export const serializeAndSignWebServiceRequest = (
  merchantKey: string,
  requestParams: WebserviceInputParams
): string => {
  const serializedParams: string = serializeWebServiceRequest(requestParams);
  return signWebServiceRequest(merchantKey, serializedParams, requestParams);
};

export const isWebServiceResponseSuccess = (
  parsedResponse: ResponseXML['RETORNOXML']
): parsedResponse is ResponseXMLInnerSuccess => {
  return parsedResponse.CODIGO === '0';
};

export const assertSoapClientHasTrataPeticion: (
  client: Client & Partial<WebServiceTrataPeticionTrait>
) => asserts client is Client & WebServiceTrataPeticionTrait = (
  client
) => {
  if (!client.trataPeticionAsync) {
    throw new RedsysError('Client does not support trataPeticion service');
  }
};

export const webServiceTrataPeticionRequest = async (
  client: Client & WebServiceTrataPeticionTrait,
  merchantKey: string,
  requestParams: WebserviceInputParams
): Promise<WebserviceOutputParams> => {
  const peticion = serializeAndSignWebServiceRequest(merchantKey, requestParams);
  const response = await client.trataPeticionAsync({ datoEntrada: peticion });

  const result: string = response[0].trataPeticionReturn;
  const data = parseAndVerifyWebServiceResponse(merchantKey, result);

  if (!isWebServiceResponseSuccess(data)) {
    // Can't access data.OPERACION, only data.RECIBIDO
    // However data.RECIBIDO may contain sensitive information
    throw new GatewayError('Request failed', data.CODIGO, data);
  }

  assertSuccessfulResponseCode(data.OPERACION);

  return data.OPERACION;
};
