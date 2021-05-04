import fetch from 'node-fetch';

import {
  GatewayError,
  HTTPError
} from '../errors';

import type {
  RawRequestParams,
  RawResponseParams,
  ResponseJSON,
  ResponseJSONError
} from '../types/api';

import {
  serializeAndSignJSONRequest,
  parseAndVerifyJSONResponse
} from './json';

export const jsonRequest = async (
  url: string,
  merchantKey: string,
  rawRequestParams: RawRequestParams
): Promise<RawResponseParams> => {
  const payload = serializeAndSignJSONRequest(merchantKey, rawRequestParams);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const responseData = await (response.json() as Promise<ResponseJSON | ResponseJSONError>);
  if (!response.ok) {
    throw new HTTPError('Request failed', response.status);
  }

  if ('errorCode' in responseData) {
    throw new GatewayError('Request failed', responseData.errorCode, response);
  }

  return parseAndVerifyJSONResponse(merchantKey, responseData);
};
