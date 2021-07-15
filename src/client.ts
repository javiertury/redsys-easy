import { createClientAsync } from 'soap';
import type { Client } from 'soap';

import {
  RedsysError
} from './errors';

import {
  parseAndVerifyJSONResponse,
  serializeAndSignJSONRequest
} from './rest/json';

import {
  webServiceTrataPeticionRequest,
  assertSoapClientHasTrataPeticion
} from './soap/web-service';

import {
  parseAndVerifySoapNotification,
  serializeAndSignSoapNotificationResponse
} from './soap/notification';

import {
  jsonRequest
} from './rest/requests';

import type {
  ResponseJSON,
  SHA256SignedJSONParameters
} from './types/api';

import type {
  RestIniciaPeticionInputParams,
  RestTrataPeticionInputParams,
  RedirectInputParams,
  WebserviceInputParams
} from './types/input-params';

import type {
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  RestNotificationOutputParams,
  WebserviceOutputParams,
  SoapNotificationOutputParams
} from './types/output-params';

export interface UrlsConfig {
  redirect: string
  webserviceV2: string
  restTrataPeticion: string
  restIniciaPeticion: string
}

export const PRODUCTION_URLS: UrlsConfig = {
  redirect: 'https://sis.redsys.es/sis/realizarPago',
  webserviceV2: 'https://sis.redsys.es/sis/services/SerClsWSEntradaV2/wsdl/SerClsWSEntradaV2.wsdl',
  restTrataPeticion: 'https://sis.redsys.es/sis/rest/trataPeticionREST',
  restIniciaPeticion: 'https://sis.redsys.es/sis/rest/iniciaPeticionREST'
};

export const SANDBOX_URLS: UrlsConfig = {
  redirect: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  webserviceV2: 'https://sis-t.redsys.es:25443/sis/services/SerClsWSEntradaV2/wsdl/SerClsWSEntradaV2.wsdl',
  restTrataPeticion: 'https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST',
  restIniciaPeticion: 'https://sis-t.redsys.es:25443/sis/rest/iniciaPeticionREST'
};

export interface RedsysConfig {
  secretKey: string
  urls: UrlsConfig
}

export interface RedirectPetition {
  url: string
  body: SHA256SignedJSONParameters
}

/**
 * Creates Redsys API functions
 *
 * These API functions are anonymous and can be wrapped by formatters and processors
 *
 * @public
 */
export const createRedsysAPI = (config: RedsysConfig) => {
  if (!config.secretKey || typeof config.secretKey !== 'string') {
    throw new RedsysError('A secretKey key must be provided');
  }

  if (
    typeof config.urls !== 'object' || config.urls == null ||
    !config.urls.restIniciaPeticion || !config.urls.restTrataPeticion ||
    !config.urls.webserviceV2 || !config.urls.redirect
  ) {
    throw new RedsysError('URLs must be provided');
  }

  /**
   * Sends a iniciaPeticion request using REST interface
   */
  const restIniciaPeticion = async (
    paramsInput: RestIniciaPeticionInputParams
  ): Promise<RestIniciaPeticionOutputParams> => {
    return await jsonRequest<RestIniciaPeticionInputParams, RestIniciaPeticionOutputParams>(
      config.urls.restIniciaPeticion, config.secretKey, paramsInput
    );
  };

  /**
   * Sends a trataPeticion request using REST interface
   */
  const restTrataPeticion = async (
    paramsInput: RestTrataPeticionInputParams
  ): Promise<RestTrataPeticionOutputParams> => {
    const result = await jsonRequest<RestTrataPeticionInputParams, RestTrataPeticionOutputParams>(
      config.urls.restTrataPeticion, config.secretKey, paramsInput
    );

    return result;
  };

  /**
   * Creates the parameters needed for a redirection
   */
  const createRedirectForm = (
    paramsInput: RedirectInputParams
  ): RedirectPetition => {
    const body = serializeAndSignJSONRequest(config.secretKey, paramsInput);

    return {
      url: config.urls.redirect,
      body
    };
  };

  /**
   * Processes a JSON notification
   */
  const processNotification = (
    /** Body of JSON notification, as a POJO (Plain Old Javascript Object) */
    body: ResponseJSON
  ): RestNotificationOutputParams => {
    return parseAndVerifyJSONResponse<RestNotificationOutputParams>(config.secretKey, body);
  };

  let wsClientPromise: Promise<Client> | undefined;

  const getWSClient = async (): Promise<Client> => {
    if (!wsClientPromise) {
      wsClientPromise = createClientAsync(config.urls.webserviceV2, {});
    }

    // Promise
    return await wsClientPromise;
  };

  /**
   * Executes a query agains Redsys Web Service V2
   */
  const wsPetition = async (
    paramsInput: WebserviceInputParams
  ): Promise<WebserviceOutputParams> => {
    const client = await getWSClient();
    assertSoapClientHasTrataPeticion(client);

    return await webServiceTrataPeticionRequest(
      client, config.secretKey, paramsInput
    );
  };

  /**
   * Parses and verifies a SOAP notification
   */
  const processSoapNotification = (
    /** SOAP notification as a XML string */
    xml: string
  ): SoapNotificationOutputParams => {
    return parseAndVerifySoapNotification(config.secretKey, xml);
  };

  /**
   * Creates an answer for a SOAP notification, serializes and signs it
   */
  const createSoapNotificationAnswer = (
    /** Order identifier */
    order: string,
    /** Indicates if the payment is allowed to proceed */
    allow: boolean
  ): string => {
    return serializeAndSignSoapNotificationResponse(config.secretKey, {
      order,
      allow
    });
  };

  return {
    restIniciaPeticion,
    restTrataPeticion,
    createRedirectForm,
    processNotification,
    wsPetition,
    processSoapNotification,
    createSoapNotificationAnswer
  };
};
