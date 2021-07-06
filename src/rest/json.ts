import type {
  ResponseJSON,
  CommonRawRequestParams,
  CommonRawResponseParams,
  SHA256SignedJSONParameters
} from '../types/api';

import {
  parseJSONMerchantParams,
  serializeJSONMerchantParams
} from './json-serialization';

import {
  sha256VerifyJSONResponse,
  sha256SignJSONRequest
} from './json-sha256-signature';

export const parseAndVerifyJSONResponse = <ResponseParams extends CommonRawResponseParams>(
  merchantKey: string,
  response: ResponseJSON
): ResponseParams => {
  const params = parseJSONMerchantParams<ResponseParams>(response.Ds_MerchantParameters);
  sha256VerifyJSONResponse(merchantKey, response, params);
  return params;
};

export const serializeAndSignJSONRequest = <RequestParams extends CommonRawRequestParams>(
  merchantKey: string,
  requestParams: RequestParams
): SHA256SignedJSONParameters => {
  const serializedParams: string = serializeJSONMerchantParams(requestParams);
  return sha256SignJSONRequest(merchantKey, serializedParams, requestParams);
};
