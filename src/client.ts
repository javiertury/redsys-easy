import { createClientAsync, Client } from 'soap';

import {
  RedsysError
} from './errors';
import { formatInput, FormatterOptions } from './formatters/input-params';
import { formatOutput } from './formatters/output-params';

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

import type {
  FormattedResponse,
  ResponseJSON,
  RequestInput,
  SHA256SignedJSONParameters
} from './types/api';

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
  body: SHA256SignedJSONParameters
}

/**
 * Redsys client
 */
export class Redsys {
  protected secretKey: string;
  protected urls: UrlsConfig;
  protected wsClient: Promise<Client> | undefined;

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

  redirectPetition (paramsInput: RequestInput, options?: FormatterOptions): RedirectPetition {
    const formattedInput = formatInput(paramsInput, options);
    const body = serializeAndSignJSONRequest(this.secretKey, formattedInput);

    return {
      url: this.urls.redirect,
      body
    };
  }

  processNotification (body: ResponseJSON): FormattedResponse {
    const parsedResponse = parseAndVerifyJSONResponse(this.secretKey, body);
    return formatOutput(parsedResponse);
  }

  // Good idea unless sessions are used
  protected async getWSClient (): Promise<Client> {
    if (!this.wsClient) {
      this.wsClient = createClientAsync(this.urls.ws, {});
    }

    // Promise
    return await this.wsClient;
  }

  async wsPetition (paramsInput: RequestInput, options?: FormatterOptions): Promise<FormattedResponse> {
    const formattedParams = formatInput(paramsInput, options);
    const client = await this.getWSClient();
    assertSoapClientHasTrataPeticion(client);

    const unformattedOutput = await webServiceTrataPeticionRequest(
      client, this.secretKey, formattedParams
    );
    return formatOutput(unformattedOutput);
  }

  processSoapNotification (xml: string): FormattedResponse {
    const rawResponseParams = parseAndVerifySoapNotification(this.secretKey, xml);

    return formatOutput(rawResponseParams);
  }

  soapNotificationAnswer (order: string, bool: boolean): string {
    return serializeAndSignSoapNotificationResponse(this.secretKey, {
      order,
      allow: bool
    });
  }
}
