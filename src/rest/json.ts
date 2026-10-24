import type {
  ResponseJSONSuccess,
  CommonRawRequestParams,
  CommonRawResponseParams,
  SignedJSONParameters,
  SignatureVersion
} from '../types/api';

import {
  deserializeJSONMerchantParams,
  serializeJSONMerchantParams
} from './json-serialization';

import {
  sha256VerifyJSONResponse,
  sha256SignJSONRequest
} from './json-sha256-signature';

import {
  sha512VerifyJSONResponse,
  sha512SignJSONRequest
} from './json-sha512-signature';

export const deserializeAndVerifyJSONResponse = <
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- allows restricting the type
  ResponseParams extends CommonRawResponseParams
>(
  merchantKey: string,
  response: ResponseJSONSuccess
): ResponseParams => {
  const params = deserializeJSONMerchantParams<ResponseParams>(
    response.Ds_MerchantParameters
  );
  // Verify with the version declared by the response
  if (response.Ds_SignatureVersion === 'HMAC_SHA512_V2') {
    sha512VerifyJSONResponse(merchantKey, response, params);
  } else {
    sha256VerifyJSONResponse(merchantKey, response, params);
  }
  return params;
};

export const serializeAndSignJSONRequest = <
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- allows restricting the type
  RequestParams extends CommonRawRequestParams
>(
  merchantKey: string,
  requestParams: RequestParams,
  signatureVersion: SignatureVersion = 'HMAC_SHA256_V1'
): SignedJSONParameters => {
  if (signatureVersion === 'HMAC_SHA512_V2') {
    const serializedParams: string = serializeJSONMerchantParams(requestParams, 'base64url');
    return sha512SignJSONRequest(merchantKey, serializedParams, requestParams);
  }

  const serializedParams: string = serializeJSONMerchantParams(requestParams);
  return sha256SignJSONRequest(merchantKey, serializedParams, requestParams);
};
