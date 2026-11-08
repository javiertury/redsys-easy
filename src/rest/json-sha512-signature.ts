import { sha512Sign, isSignatureEqual } from '../crypto';

import {
  extractAndAssertOrderFromRequestParams,
  extractAndAssertOrderFromResponseParams
} from '../utils/misc';

import { RedsysError, ParseError } from '../errors';

import type {
  ResponseJSONSuccess,
  CommonRawRequestParams,
  CommonRawResponseParams,
  SHA512V1SignedJSONParameters,
  SHA512V2SignedJSONParameters,
  SignatureVersion
} from '../types/api';

const sha512SignatureVersions: readonly SignatureVersion[] = ['HMAC_SHA512_V2', 'HMAC_SHA512_V1'];

export const sha512VerifyJSONResponse = (
  merchantKey: string,
  response: ResponseJSONSuccess,
  responseParams: CommonRawResponseParams
): void => {
  if (!(sha512SignatureVersions as readonly unknown[]).includes(response.Ds_SignatureVersion)) {
    throw new RedsysError(
      `Unknown signature version: ${response.Ds_SignatureVersion}`
    );
  }

  const order: string = extractAndAssertOrderFromResponseParams(responseParams);

  const signature: string | undefined = response.Ds_Signature;
  // Signs the merchant parameters as received
  const expSignature: string = sha512Sign(
    merchantKey,
    order,
    response.Ds_MerchantParameters
  );

  if (!signature || !isSignatureEqual(expSignature, signature)) {
    throw new ParseError('Invalid signature');
  }
};

export const sha512V2SignJSONRequest = (
  merchantKey: string,
  serializedParams: string,
  requestParams: CommonRawRequestParams
): SHA512V2SignedJSONParameters => {
  const order: string = extractAndAssertOrderFromRequestParams(requestParams);

  const signature: string = sha512Sign(merchantKey, order, serializedParams);
  return {
    Ds_SignatureVersion: 'HMAC_SHA512_V2',
    Ds_MerchantParameters: serializedParams,
    Ds_Signature: signature
  };
};

export const sha512V1SignJSONRequest = (
  merchantKey: string,
  serializedParams: string,
  requestParams: CommonRawRequestParams
): SHA512V1SignedJSONParameters => {
  const order: string = extractAndAssertOrderFromRequestParams(requestParams);

  const signature: string = sha512Sign(merchantKey, order, serializedParams);
  return {
    Ds_SignatureVersion: 'HMAC_SHA512_V1',
    Ds_MerchantParameters: serializedParams,
    Ds_Signature: Buffer.from(signature, 'base64url').toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
  };
};
