import base64url from 'base64url';
import xmlParser, { j2xParser as J2xParser } from 'fast-xml-parser';
import { createClientAsync, Client } from 'soap';

import {
  TRANSACTION_TYPES,
  getResponseCodeMessage,
  getSISErrorCodeMessage,
  signedFieldsXMLResponse,
  sha256Sign,
  detectSoapVersion,
  mimicSoapNotificationReceiver,
  mimicSoap11NotificationResponse,
  mimicSoap12NotificationResponse,
  randomTransactionId
} from './utils';

import {
  RedsysError,
  ParseError,
  GatewayError
} from './errors';
import { formatParams, FormatterOptions } from './params-formatter';
import { formatResponse } from './response-formatter';

import type {
  FormattedResponse,
  ParsedSoapNotifiation,
  RawNotificationBody,
  RawRequestParams,
  RawResponseParams,
  RequestInput,
  ResponseXML
} from './types/api';
import type { Currency } from './assets/currencies';
import type { Language } from './assets/lang-codes';
import type { Country } from './assets/countries';
import type { CardBrand } from './assets/card-brands';
import type { TransactionType } from './assets/transaction-types';

const js2xml = new J2xParser({});

export {
  getResponseCodeMessage,
  getSISErrorCodeMessage,
  TRANSACTION_TYPES,
  detectSoapVersion,
  mimicSoapNotificationReceiver,
  mimicSoap11NotificationResponse,
  mimicSoap12NotificationResponse,
  randomTransactionId
};

export type {
  FormattedResponse,
  RequestInput,
  RawNotificationBody,
  TransactionType,
  RawRequestParams,
  CardBrand,
  Country,
  Currency,
  Language
};

export interface UrlsConfig {
  redirect: string
  ws: string
}

export const PRODUCTION_URLS = {
  redirect: 'https://sis.redsys.es/sis/realizarPago',
  ws: 'https://sis.redsys.es/sis/services/SerClsWSEntrada/wsdl/SerClsWSEntrada.wsdl'
};

export const SANDBOX_URLS = {
  redirect: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  ws: 'https://sis-t.redsys.es:25443/sis/services/SerClsWSEntrada/wsdl/SerClsWSEntrada.wsdl'
};

export interface RedsysConfig {
  secretKey: string
  urls: UrlsConfig
}

export interface RedirectPetition {
  url: string
  body: {
    Ds_SignatureVersion: 'HMAC_SHA256_V1'
    Ds_MerchantParameters: string
    Ds_Signature: string
  }
}

interface RedsysWSClient extends Client {
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  trataPeticionAsync? (input: { datoEntrada: string }): Promise<[{
    trataPeticionReturn: string
  }]>
}

export class Redsys {
  secretKey: string;
  urls: UrlsConfig;
  wsClient: Promise<Client> | undefined;

  constructor (options: RedsysConfig) {
    if (!options.secretKey || typeof options.secretKey !== 'string') {
      throw new RedsysError('A secretKey key must be provided');
    }

    if (
      typeof options.urls !== 'object' || options.urls == null ||
      !options.urls.ws || !options.urls.redirect
    ) {
      throw new RedsysError('URLs must be provided');
    }

    this.secretKey = options.secretKey;
    this.urls = options.urls;
  }

  signOrderText (order: string, text: string): string {
    return sha256Sign(this.secretKey, order, text);
  }

  redirectPetitionParameters (paramsInput: RequestInput, options?: FormatterOptions): string {
    const paramsObj = formatParams(paramsInput, options);
    // Docs escape "/" but we don't, this JSON won't get placed in a script tag
    return Buffer.from(JSON.stringify(paramsObj), 'utf8').toString('base64');
  }

  redirectPetition (paramsInput: RequestInput, options?: FormatterOptions): RedirectPetition {
    const paramsString = this.redirectPetitionParameters(paramsInput, options);
    const signature: string = sha256Sign(this.secretKey, paramsInput.order, paramsString);

    return {
      url: this.urls.redirect,
      body: {
        Ds_SignatureVersion: 'HMAC_SHA256_V1',
        Ds_MerchantParameters: paramsString,
        Ds_Signature: signature
      }
    };
  }

  processNotificationParameters (strPayload: string): RawResponseParams {
    if (!strPayload) {
      throw new ParseError('Payload is required');
    }

    if (typeof strPayload !== 'string') {
      throw new ParseError('Payload must be a base-64 encoded string');
    }
    const payload = JSON.parse(decodeURIComponent(Buffer.from(strPayload, 'base64').toString('utf8'))) as RawResponseParams | null | undefined;

    if (typeof payload !== 'object' || payload == null) {
      throw new ParseError('Cannot parse notification payload');
    }

    return payload;
  }

  processNotification (body: RawNotificationBody): FormattedResponse {
    const params = this.processNotificationParameters(body.Ds_MerchantParameters);

    const order = params.Ds_Order;
    if (order == null || !order) {
      throw new ParseError('Invalid notification parameters');
    }

    const signature = body.Ds_Signature;
    // Base64url with padding, only substitutes + and /
    const expSignature = sha256Sign(this.secretKey,
      order, body.Ds_MerchantParameters);

    // Comparing different base64 encodings is messy. Foolproof, compare buffers.
    if (!signature || !Buffer.from(expSignature, 'base64').equals(base64url.toBuffer(signature))) {
      throw new ParseError('Invalid signature');
    }

    return formatResponse(params);
  }

  processXMLResponseData (xmlData: string): ResponseXML['RETORNOXML'] {
    const parsedResponse = xmlParser.parse(xmlData, { parseNodeValue: false }) as ResponseXML | null | undefined;
    if (typeof parsedResponse !== 'object' || parsedResponse == null) {
      throw new ParseError('Cannot parse notification payload');
    }
    return parsedResponse.RETORNOXML;
  }

  // Generic Processor for Web Service Responses
  processXMLResponse (xmlData: string): ResponseXML['RETORNOXML'] {
    const data = this.processXMLResponseData(xmlData);
    if (data.CODIGO !== '0') {
      const err = new ParseError(`Redsys error ${data.CODIGO}`);
      err.code = data.CODIGO;
      err.description = getSISErrorCodeMessage(data.CODIGO);

      // Can't access data.OPERACION, only data.RECIBIDO
      // However data.RECIBIDO may contain sensitive information
      throw err;
    }

    return data;
  }

  assertXMLPetitionResponseSignature (data: ResponseXML['RETORNOXML']) {
    const operationData = data.OPERACION;

    const signedValues = [];
    for (const field of signedFieldsXMLResponse) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
      const value = operationData[field] || operationData[field.toUpperCase()];
      if (value != null && value) {
        signedValues.push(value);
      }
    }
    const signedString = signedValues.join('');

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
    const orderId = operationData.Ds_Order || operationData.DS_ORDER;

    if (orderId == null || !orderId) {
      throw new ParseError('Invalid signature');
    }

    const signature = operationData.Ds_Signature;
    const expSignature = sha256Sign(this.secretKey, orderId, signedString);

    if (signature == null || !signature || signature !== expSignature) {
      throw new ParseError('Invalid signature');
    }
  }

  // Processes Web Service Petitions Responses
  processXMLPetitionResponse (xml: string): FormattedResponse {
    const data = this.processXMLResponse(xml);
    this.assertXMLPetitionResponseSignature(data);

    return formatResponse(data.OPERACION);
  }

  xmlPetitionParameters (paramsInput: RequestInput, options?: FormatterOptions): string {
    const datosEntrada = { DATOSENTRADA: formatParams(paramsInput, options) };
    return js2xml.parse(datosEntrada) as string;
  }

  xmlPetitionSignedData (paramsInput: RequestInput, options?: FormatterOptions): string {
    const datosEntradaXML = this.xmlPetitionParameters(paramsInput, options);
    const signature = sha256Sign(this.secretKey, paramsInput.order, datosEntradaXML);

    return `<REQUEST>${datosEntradaXML}<DS_SIGNATUREVERSION>HMAC_SHA256_V1</DS_SIGNATUREVERSION><DS_SIGNATURE>${signature}</DS_SIGNATURE></REQUEST>`;
  }

  // Good idea unless sessions are used
  async getWSClient (): Promise<Client> {
    if (!this.wsClient) {
      this.wsClient = createClientAsync(this.urls.ws, {});
    }

    // Promise
    return await this.wsClient;
  }

  async wsPetition (paramsInput: RequestInput, options?: FormatterOptions): Promise<FormattedResponse> {
    const peticion = this.xmlPetitionSignedData(paramsInput, options);

    const client: RedsysWSClient = await this.getWSClient();

    if (!client.trataPeticionAsync) {
      throw new GatewayError('Cannot obtain client');
    }

    const res = await client.trataPeticionAsync({ datoEntrada: peticion });

    const result: string = res[0].trataPeticionReturn;

    const parsedResponse = this.processXMLPetitionResponse(result);
    const resCode = parsedResponse.response;
    if (resCode != null && resCode > 100 && resCode !== 400 && resCode !== 600) {
      throw new GatewayError('Error in webservice petition', resCode, res);
    }
    return parsedResponse;
  }

  processSoapNotification (xml: string): FormattedResponse {
    const startToken = '<Request';
    const endToken = '</Request>';
    const startPos = xml.indexOf(startToken);
    const endPos = xml.indexOf(endToken);

    if (startPos < 0 || endPos < 0 || startPos > endPos) {
      throw new ParseError('Cannot find payload of SOAP notification Request', xml);
    }

    const signedStr = xml.slice(startPos, endPos + endToken.length);
    const msg = (xmlParser.parse(xml, { parseNodeValue: false }) as ParsedSoapNotifiation).Message;
    const signature = msg.Signature;
    const order = msg.Request.Ds_Order;

    if (order == null || !order) {
      throw new ParseError('Invalid notification response');
    }

    const expSignature = sha256Sign(this.secretKey, order, signedStr);

    if (!signature || signature !== expSignature) {
      throw new ParseError('Invalid signature', signature, xml);
    }

    return formatResponse(msg.Request);
  }

  soapNotificationAnswer (order: string, bool: boolean): string {
    const answer = bool ? 'OK' : 'KO';
    const response = `<Response Ds_Version="0.0"><Ds_Response_Merchant>${answer}</Ds_Response_Merchant></Response>`;
    const signature = sha256Sign(this.secretKey, order, response);

    return `<Message>${response}<Signature>${signature}</Signature></Message>`;
  }
}
