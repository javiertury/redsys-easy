import base64url from 'base64url';
import { sha256Sign } from '../crypto';

import {
  extractAndAssertOrderFromRawRequestParams,
  extractAndAssertOrderFromRawResponseParams
} from '../utils';

import {
  RedsysError,
  ParseError
} from '../errors';

import type {
  ResponseJSON,
  RawResponseParams,
  RawRequestParams,
  SHA256SignedJSONParameters
} from '../types/api';

type VerifyJSONResponseFn = (
  merchantKey: string,
  response: ResponseJSON,
  rawResponseParams: RawResponseParams
) => void;

export const sha256VerifyJSONResponse: VerifyJSONResponseFn = (
  merchantKey,
  response,
  rawResponseParams
) => {
  if (response.Ds_SignatureVersion !== 'HMAC_SHA256_V1') {
    throw new RedsysError(`Unknown signature version: ${response.Ds_SignatureVersion}`);
  }

  const order: string = extractAndAssertOrderFromRawResponseParams(rawResponseParams);

  const signature: string | undefined = response.Ds_Signature;
  // Base64url with padding, only substitutes + and /
  const expSignature: string = sha256Sign(merchantKey,
    order, response.Ds_MerchantParameters);

  // Comparing different base64 encodings is messy. Make it foolproof by comparing buffers.
  if (!signature || !Buffer.from(expSignature, 'base64').equals(base64url.toBuffer(signature))) {
    throw new ParseError('Invalid signature');
  }
};

export const sha256SignJSONRequest = (
  merchantKey: string,
  serializedParams: string,
  rawRequestParams: RawRequestParams
): SHA256SignedJSONParameters => {
  const order: string = extractAndAssertOrderFromRawRequestParams(rawRequestParams);

  const signature: string = sha256Sign(merchantKey, order, serializedParams);
  return {
    Ds_SignatureVersion: 'HMAC_SHA256_V1',
    Ds_MerchantParameters: serializedParams,
    Ds_Signature: signature
  };
};
