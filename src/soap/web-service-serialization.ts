import xmlParser, { j2xParser as J2xParser } from 'fast-xml-parser';
import {
  ParseError
} from '../errors';
import type {
  ResponseXML
} from '../types/api';

const js2xml = new J2xParser({});

export const serializeWebServiceRequest = (requestParams: unknown): string => {
  const datosEntrada = { DATOSENTRADA: requestParams };
  return js2xml.parse(datosEntrada) as string;
};

export const deserializeWebServiceResponse = (xmlResponse: string): ResponseXML['RETORNOXML'] => {
  const deserializedResponse = xmlParser.parse(xmlResponse, { parseNodeValue: false }) as ResponseXML | null | undefined;
  if (typeof deserializedResponse !== 'object' || deserializedResponse == null) {
    throw new ParseError('Cannot parse notification payload');
  }
  return deserializedResponse.RETORNOXML;
};
