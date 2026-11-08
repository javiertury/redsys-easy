import type { fetch as Fetch } from 'undici';

import { HTTPError, GatewayError } from '../errors';

import type {
  CommonRawRequestParams,
  CommonRawResponseParams,
  ResponseJSONSuccess,
  ResponseJSONError,
  SignatureVersion
} from '../types/api';

import {
  serializeAndSignJSONRequest,
  deserializeAndVerifyJSONResponse
} from './json';

export const jsonRequest = async <
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- allow restricting input type
  RequestParams extends CommonRawRequestParams,
  ResponseParams extends CommonRawResponseParams
>({
  fetch,
  url,
  merchantKey,
  rawRequestParams,
  signatureVersions
}: {
  fetch: typeof Fetch;
  url: string;
  merchantKey: string;
  rawRequestParams: RequestParams;
  signatureVersions: readonly [SignatureVersion, ...SignatureVersion[]];
}): Promise<ResponseParams> => {
  const payload = serializeAndSignJSONRequest(
    merchantKey,
    rawRequestParams,
    signatureVersions[0]
  );

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- assume correct format
  const responseData = await (response.json() as Promise<
    ResponseJSONSuccess | ResponseJSONError
  >);

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

  return deserializeAndVerifyJSONResponse<ResponseParams>(
    merchantKey,
    responseData,
    signatureVersions
  );
};
