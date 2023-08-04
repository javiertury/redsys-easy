import type {
  ResponseJSONSuccess,
  CommonRawRequestParams,
  CommonRawResponseParams,
  SHA256SignedJSONParameters
} from '../types/api';

import {
  deserializeJSONMerchantParams,
  serializeJSONMerchantParams
} from './json-serialization';

import {
  sha256VerifyJSONResponse,
  sha256SignJSONRequest
} from './json-sha256-signature';

export const deserializeAndVerifyJSONResponse = <
  ResponseParams extends CommonRawResponseParams
>(
  merchantKey: string,
  response: ResponseJSONSuccess
): ResponseParams => {
  const params = deserializeJSONMerchantParams<ResponseParams>(
    response.Ds_MerchantParameters
  );
  sha256VerifyJSONResponse(merchantKey, response, params);
  return params;
};

export const serializeAndSignJSONRequest = <
  RequestParams extends CommonRawRequestParams
>(
  merchantKey: string,
  requestParams: RequestParams
): SHA256SignedJSONParameters => {
  const serializedParams: string = serializeJSONMerchantParams(requestParams);
  return sha256SignJSONRequest(merchantKey, serializedParams, requestParams);
};
