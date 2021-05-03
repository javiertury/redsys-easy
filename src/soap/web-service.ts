import type { Client } from 'soap';
import type {
  RawRequestParams,
  RawResponseParams,
  ResponseXML,
  ResponseXMLInnerSuccess,
  WebServiceTrataPeticionTrait
} from '../types/api';

import {
  extractAndAssertResponseCodeFromRawResponseParams
} from '../utils';

import {
  ResponseError,
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
  rawRequestParams: RawRequestParams
): string => {
  const serializedParams: string = serializeWebServiceRequest(rawRequestParams);
  return signWebServiceRequest(merchantKey, serializedParams, rawRequestParams);
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
  rawRequestParams: RawRequestParams
): Promise<RawResponseParams> => {
  const peticion = serializeAndSignWebServiceRequest(merchantKey, rawRequestParams);
  const response = await client.trataPeticionAsync({ datoEntrada: peticion });

  const result: string = response[0].trataPeticionReturn;
  const data = parseAndVerifyWebServiceResponse(merchantKey, result);

  if (!isWebServiceResponseSuccess(data)) {
    // Can't access data.OPERACION, only data.RECIBIDO
    // However data.RECIBIDO may contain sensitive information
    throw new GatewayError('Request failed', data.CODIGO);
  }

  const resCode = extractAndAssertResponseCodeFromRawResponseParams(data.OPERACION);

  if (resCode != null && resCode > 100 && resCode !== 400 && resCode !== 600) {
    throw new ResponseError('Error in web service request', resCode, response);
  }

  return data.OPERACION;
};
