import {
  RedsysError
} from './errors';

import {
  deserializeAndVerifyJSONResponse,
  serializeAndSignJSONRequest
} from './rest/json';

import {
  deserializeAndVerifySoapNotification,
  serializeAndSignSoapNotificationResponse
} from './soap/notification';

import {
  jsonRequest
} from './rest/requests';

import type {
  ResponseJSONSuccess,
  RedirectForm
} from './types/api';

import type {
  RestIniciaPeticionInputParams,
  RestTrataPeticionInputParams,
  RedirectInputParams
} from './types/input-params';

import type {
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  RestNotificationOutputParams,
  SoapNotificationOutputParams
} from './types/output-params';

/**
 * URLs to configure the API
 *
 * @public
 */
export interface UrlsConfig {
  redirect: string
  restTrataPeticion: string
  restIniciaPeticion: string
}

/**
 * Redsys production urls
 *
 * @public
 */
export const PRODUCTION_URLS: UrlsConfig = {
  redirect: 'https://sis.redsys.es/sis/realizarPago',
  restTrataPeticion: 'https://sis.redsys.es/sis/rest/trataPeticionREST',
  restIniciaPeticion: 'https://sis.redsys.es/sis/rest/iniciaPeticionREST'
};

/**
 * Redsys sandbox urls
 *
 * @public
 */
export const SANDBOX_URLS: UrlsConfig = {
  redirect: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  restTrataPeticion: 'https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST',
  restIniciaPeticion: 'https://sis-t.redsys.es:25443/sis/rest/iniciaPeticionREST'
};

/**
 * Redsys API settings
 *
 * @public
 */
export interface RedsysConfig {
  secretKey: string
  urls: UrlsConfig
}

/**
 * Creates Redsys API functions
 *
 * @remarks
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
    !config.urls.redirect
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
   * Creates the parameters needed for a redirect form
   */
  const createRedirectForm = (
    paramsInput: RedirectInputParams
  ): RedirectForm => {
    const body = serializeAndSignJSONRequest(config.secretKey, paramsInput);

    return {
      url: config.urls.redirect,
      body
    };
  };

  /**
   * Processes a JSON REST notification
   */
  const processRestNotification = (
    /** Body of JSON notification, as a POJO (Plain Old Javascript Object) */
    body: ResponseJSONSuccess
  ): RestNotificationOutputParams => {
    // A notification can't contain a gateway error, it didn't initiate the request
    return deserializeAndVerifyJSONResponse<RestNotificationOutputParams>(config.secretKey, body);
  };

  /**
   * Parses and verifies the body of a SOAP notification
   */
  const processSoapNotification = (
    /** SOAP notification as a XML string */
    xml: string
  ): SoapNotificationOutputParams => {
    return deserializeAndVerifySoapNotification(config.secretKey, xml);
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
    processRestNotification,
    processSoapNotification,
    createSoapNotificationAnswer
  };
};
