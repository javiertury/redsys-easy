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
  sha512V2SignJSONRequest,
  sha512V1SignJSONRequest
} from './json-sha512-signature';

import { RedsysError } from '../errors';
import { assetIsSignatureVersion } from '../utils/signatures';

export const deserializeAndVerifyJSONResponse = <
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- allows restricting the type
  ResponseParams extends CommonRawResponseParams
>(
  merchantKey: string,
  response: ResponseJSONSuccess,
  signatureVersions: readonly SignatureVersion[]
): ResponseParams => {
  const params = deserializeJSONMerchantParams<ResponseParams>(
    response.Ds_MerchantParameters
  );

  assetIsSignatureVersion(response.Ds_SignatureVersion)

  if (
    !signatureVersions.includes(response.Ds_SignatureVersion)
  ) {
    throw new RedsysError(
      `Signature version not allowed: ${response.Ds_SignatureVersion}`
    );
  }

  // Verify with the version declared by the response
  switch (response.Ds_SignatureVersion) {
    case 'HMAC_SHA512_V2': {
      sha512VerifyJSONResponse(merchantKey, response, params);
      return params;
    }
    case 'HMAC_SHA512_V1': {
      sha512VerifyJSONResponse(merchantKey, response, params);
      return params;
    }
    case 'HMAC_SHA256_V1': {
      sha256VerifyJSONResponse(merchantKey, response, params);
      return params;
    }
  }

  throw new RedsysError(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `Signature version not implemented: ${response.Ds_SignatureVersion}`
  );
};

export const serializeAndSignJSONRequest = <
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- allows restricting the type
  RequestParams extends CommonRawRequestParams
>(
  merchantKey: string,
  requestParams: RequestParams,
  signatureVersion: SignatureVersion
): SignedJSONParameters => {
  switch (signatureVersion) {
    case 'HMAC_SHA512_V2': {
      const serializedParams: string = serializeJSONMerchantParams(requestParams, 'base64url');
      return sha512V2SignJSONRequest(merchantKey, serializedParams, requestParams);
    }
    case 'HMAC_SHA512_V1': {
      const serializedParams: string = serializeJSONMerchantParams(requestParams, 'base64url');
      return sha512V1SignJSONRequest(merchantKey, serializedParams, requestParams);
    }
    case 'HMAC_SHA256_V1': {
      const serializedParams: string = serializeJSONMerchantParams(requestParams, 'base64');
      return sha256SignJSONRequest(merchantKey, serializedParams, requestParams);
    }
  }

  throw new RedsysError(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `Signature version not implemented: ${signatureVersion}`
  );
};
