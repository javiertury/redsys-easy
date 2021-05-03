import xmlParser, { j2xParser as J2xParser } from 'fast-xml-parser';
import {
  ParseError
} from '../errors';
import type {
  RawRequestParams,
  ResponseXML
} from '../types/api';

const js2xml = new J2xParser({});

export const serializeWebServiceRequest = (rawRequestParams: RawRequestParams): string => {
  const datosEntrada = { DATOSENTRADA: rawRequestParams };
  return js2xml.parse(datosEntrada) as string;
};

export const parseWebServiceResponse = (xmlResponse: string): ResponseXML['RETORNOXML'] => {
  const parsedResponse = xmlParser.parse(xmlResponse, { parseNodeValue: false }) as ResponseXML | null | undefined;
  if (typeof parsedResponse !== 'object' || parsedResponse == null) {
    throw new ParseError('Cannot parse notification payload');
  }
  return parsedResponse.RETORNOXML;
};
