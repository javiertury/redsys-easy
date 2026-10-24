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
  SHA512SignedJSONParameters
} from '../types/api';

export const sha512VerifyJSONResponse = (
  merchantKey: string,
  response: ResponseJSONSuccess,
  responseParams: CommonRawResponseParams
): void => {
  if (response.Ds_SignatureVersion !== 'HMAC_SHA512_V2') {
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

export const sha512SignJSONRequest = (
  merchantKey: string,
  serializedParams: string,
  requestParams: CommonRawRequestParams
): SHA512SignedJSONParameters => {
  const order: string = extractAndAssertOrderFromRequestParams(requestParams);

  const signature: string = sha512Sign(merchantKey, order, serializedParams);
  return {
    Ds_SignatureVersion: 'HMAC_SHA512_V2',
    Ds_MerchantParameters: serializedParams,
    Ds_Signature: signature
  };
};
