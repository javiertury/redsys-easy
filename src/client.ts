import type { fetch as Fetch } from 'undici';
import { fetch as defaultFetch } from 'undici';

import { RedsysError } from './errors';

import {
  deserializeAndVerifyJSONResponse,
  serializeAndSignJSONRequest
} from './rest/json';

import { decodeUrlEntries } from './rest/utils';

import {
  deserializeAndVerifySoapNotification,
  serializeAndSignSoapNotificationResponse
} from './soap/notification';

import { jsonRequest } from './rest/requests';

import type { ResponseJSONSuccess, RedirectForm } from './types/api';

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
  redirect: string;
  restTrataPeticion: string;
  restIniciaPeticion: string;
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
  restIniciaPeticion:
    'https://sis-t.redsys.es:25443/sis/rest/iniciaPeticionREST'
};

/**
 * Redsys API settings
 *
 * @public
 */
export interface RedsysConfig {
  fetch?: typeof Fetch | undefined;
  secretKey: string;
  urls: UrlsConfig;
}

/**
 * Sends a iniciaPeticion request using REST interface
 *
 * @public
 */
export type RestIniciaPeticion = (
  paramsInput: RestIniciaPeticionInputParams
) => Promise<RestIniciaPeticionOutputParams>;

/**
 * Sends a trataPeticion request using REST interface
 *
 * @public
 */
export type RestTrataPeticion = (
  paramsInput: RestTrataPeticionInputParams
) => Promise<RestTrataPeticionOutputParams>;

/**
 * Creates the parameters needed for a redirect form
 *
 * @public
 */
export type CreateRedirectForm = (
  paramsInput: RedirectInputParams
) => RedirectForm;

/**
 * Processes a JSON REST notification
 *
 * @public
 */
export type ProcessRestNotification = (
  /** Body of JSON notification, as a POJO (Plain Old Javascript Object) */
  body: ResponseJSONSuccess
) => RestNotificationOutputParams;

/**
 * Parses and verifies the body of a SOAP notification
 *
 * @public
 */
export type ProcessSoapNotification = (
  /** SOAP notification as a XML string */
  xml: string
) => SoapNotificationOutputParams;

/**
 * Creates an answer for a SOAP notification, serializes and signs it
 *
 * @public
 */
export type CreateSoapNotificationAnswer = (
  /** Order identifier */
  order: string,
  /** Indicates if the payment is allowed to proceed */
  allow: boolean
) => string;

/**
 * Redsys API
 *
 * @public
 */
export interface RedsysAPI {
  restIniciaPeticion: RestIniciaPeticion;
  restTrataPeticion: RestTrataPeticion;
  createRedirectForm: CreateRedirectForm;
  processRedirectNotification: ProcessRestNotification;
  processDirectRestNotification: ProcessRestNotification;
  processRestNotification: ProcessRestNotification;
  processSoapNotification: ProcessSoapNotification;
  createSoapNotificationAnswer: CreateSoapNotificationAnswer;
}

/**
 * Creates Redsys API functions
 *
 * @remarks
 * These API functions are anonymous and can be wrapped by formatters and processors
 *
 * @public
 */
export const createRedsysAPI = (config: RedsysConfig): RedsysAPI => {
  const fetch: typeof Fetch = config.fetch ?? defaultFetch;

  if (!config.secretKey || typeof config.secretKey !== 'string') {
    throw new RedsysError('A secretKey key must be provided');
  }

  if (
    typeof config.urls !== 'object' ||
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain, @typescript-eslint/no-unnecessary-condition -- robustness
    config.urls == null ||
    !config.urls.restIniciaPeticion ||
    !config.urls.restTrataPeticion ||
    !config.urls.redirect
  ) {
    throw new RedsysError('URLs must be provided');
  }

  /**
   * Sends a iniciaPeticion request using REST interface
   */
  const restIniciaPeticion = async (
    paramsInput: RestIniciaPeticionInputParams
  ): Promise<RestIniciaPeticionOutputParams> =>
    await jsonRequest<
      RestIniciaPeticionInputParams,
      RestIniciaPeticionOutputParams
    >({
      fetch,
      url: config.urls.restIniciaPeticion,
      merchantKey: config.secretKey,
      rawRequestParams: paramsInput
    });

  /**
   * Sends a trataPeticion request using REST interface
   */
  const restTrataPeticion = async (
    paramsInput: RestTrataPeticionInputParams
  ): Promise<RestTrataPeticionOutputParams> => {
    const result = await jsonRequest<
      RestTrataPeticionInputParams,
      RestTrataPeticionOutputParams
    >({
      fetch,
      url: config.urls.restTrataPeticion,
      merchantKey: config.secretKey,
      rawRequestParams: paramsInput
    });

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
   * Processes a URLOK/URLKO query notification
   */
  const processRedirectNotification = (
    /** Body of JSON notification, as a POJO (Plain Old Javascript Object) */
    body: ResponseJSONSuccess
  ): RestNotificationOutputParams => {
    // A notification can't contain a gateway error, it didn't initiate the request
    const params =
      deserializeAndVerifyJSONResponse<RestNotificationOutputParams>(
        config.secretKey,
        body
      );

    return decodeUrlEntries(params);
  };

  /**
   * Processes a direct JSON REST notification
   */
  const processDirectRestNotification = (
    /** Body of JSON notification, as a POJO (Plain Old Javascript Object) */
    body: ResponseJSONSuccess
  ): RestNotificationOutputParams =>
    // A notification can't contain a gateway error, it didn't initiate the request
    deserializeAndVerifyJSONResponse<RestNotificationOutputParams>(
      config.secretKey,
      body
    );

  /**
   * Processes either a URLOK/URLKO query or a JSON REST notification
   *
   * @remarks
   * This utility exists only for backwards compatibility. Users are adviced
   * not to rely on the autodetection of this tool and use specific functions
   * @see {@link processRedirectNotification}
   * @see {@link processDirectRestNotification}
   *
   * @deprecated
   */
  const processRestNotification = (
    /** Body of JSON notification, as a POJO (Plain Old Javascript Object) */
    body: ResponseJSONSuccess
  ): RestNotificationOutputParams => {
    // A notification can't contain a gateway error, it didn't initiate the request
    const params =
      deserializeAndVerifyJSONResponse<RestNotificationOutputParams>(
        config.secretKey,
        body
      );

    return typeof params.Ds_Date === 'string' && params.Ds_Date.includes('%2F')
      ? decodeUrlEntries(params)
      : params;
  };

  /**
   * Parses and verifies the body of a SOAP notification
   */
  const processSoapNotification = (
    /** SOAP notification as a XML string */
    xml: string
  ): SoapNotificationOutputParams =>
    deserializeAndVerifySoapNotification(config.secretKey, xml);

  /**
   * Creates an answer for a SOAP notification, serializes and signs it
   */
  const createSoapNotificationAnswer = (
    /** Order identifier */
    order: string,
    /** Indicates if the payment is allowed to proceed */
    allow: boolean
  ): string =>
    serializeAndSignSoapNotificationResponse(config.secretKey, {
      order,
      allow
    });

  return {
    restIniciaPeticion,
    restTrataPeticion,
    createRedirectForm,
    processRedirectNotification,
    processDirectRestNotification,
    processRestNotification,
    processSoapNotification,
    createSoapNotificationAnswer
  };
};
