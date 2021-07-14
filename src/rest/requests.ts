import fetch from 'node-fetch';

import {
  HTTPError,
  GatewayError
} from '../errors';

import type {
  CommonRawRequestParams,
  CommonRawResponseParams,
  ResponseJSON,
  ResponseJSONError
} from '../types/api';

import {
  serializeAndSignJSONRequest,
  parseAndVerifyJSONResponse
} from './json';

export const jsonRequest = async <
  RequestParams extends CommonRawRequestParams,
  ResponseParams extends CommonRawResponseParams
>(
  url: string,
  merchantKey: string,
  rawRequestParams: RequestParams
): Promise<ResponseParams> => {
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
    throw new HTTPError({
      code: response.status,
      response: responseData
    });
  }

  if ('errorCode' in responseData) {
    throw new GatewayError({
      code: responseData.errorCode,
      response: responseData
    });
  }

  return parseAndVerifyJSONResponse<ResponseParams>(merchantKey, responseData);
};
