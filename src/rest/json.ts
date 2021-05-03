import type {
  ResponseJSON,
  RawResponseParams,
  RawRequestParams,
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

export const parseAndVerifyJSONResponse = (
  merchantKey: string,
  response: ResponseJSON
): RawResponseParams => {
  const params = parseJSONMerchantParams(response.Ds_MerchantParameters);
  sha256VerifyJSONResponse(merchantKey, response, params);
  return params;
};

export const serializeAndSignJSONRequest = (
  merchantKey: string,
  rawRequestParams: RawRequestParams
): SHA256SignedJSONParameters => {
  const serializedParams: string = serializeJSONMerchantParams(rawRequestParams);
  return sha256SignJSONRequest(merchantKey, serializedParams, rawRequestParams);
};
