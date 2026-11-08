import { describe, test as it, expect } from 'vitest';
import {
  sha512VerifyJSONResponse,
  sha512V2SignJSONRequest,
  sha512V1SignJSONRequest
} from './json-sha512-signature';

import { ParseError, RedsysError } from '../errors';

import { incorrectMerchantKey } from '../../test/fixtures/merchant-keys';

import {
  redirectSha512MerchantKey,
  redirectSha512Request,
  serializedRedirectSha512Request,
  serializedAndSignedRedirectSha512Request
} from '../../test/fixtures/rest/redirect-sha512';

import {
  restJsonSha512MerchantKey,
  restJsonSha512Request,
  serializedAndSignedRestJsonSha512Request,
  serializedRestJsonSha512Response,
  deserializedRestJsonSha512Response
} from '../../test/fixtures/rest/rest-json-sha512';

import {
  restJsonSha512V1MerchantKey,
  restJsonSha512V1Request,
  serializedAndSignedRestJsonSha512V1Request,
  serializedRestJsonSha512V1Response,
  deserializedRestJsonSha512V1Response
} from '../../test/fixtures/rest/rest-json-sha512v1';

describe('REST JSON SHA512 signature', () => {
  it('should sign request', () => {
    expect(
      sha512V2SignJSONRequest(
        redirectSha512MerchantKey,
        serializedRedirectSha512Request,
        redirectSha512Request
      )
    ).toEqual(serializedAndSignedRedirectSha512Request);

    expect(
      sha512V2SignJSONRequest(
        restJsonSha512MerchantKey,
        serializedAndSignedRestJsonSha512Request.Ds_MerchantParameters,
        restJsonSha512Request
      )
    ).toEqual(serializedAndSignedRestJsonSha512Request);
  });

  it('should verify response with legit signature', () => {
    expect(() =>
      sha512VerifyJSONResponse(
        restJsonSha512MerchantKey,
        serializedRestJsonSha512Response,
        deserializedRestJsonSha512Response
      )
    ).not.toThrow();
  });

  it('should fail to verify response if merchant key is incorrect', () => {
    expect(() =>
      sha512VerifyJSONResponse(
        incorrectMerchantKey,
        serializedRestJsonSha512Response,
        deserializedRestJsonSha512Response
      )
    ).toThrow(new ParseError('Invalid signature'));
  });

  it('should fail to verify response if signature is forged', () => {
    expect(() =>
      sha512VerifyJSONResponse(
        restJsonSha512MerchantKey,
        {
          ...serializedRestJsonSha512Response,
          Ds_Signature: serializedAndSignedRestJsonSha512Request.Ds_Signature
        },
        deserializedRestJsonSha512Response
      )
    ).toThrow(new ParseError('Invalid signature'));
  });

  it('should fail to verify response if parameters are tampered', () => {
    expect(() =>
      sha512VerifyJSONResponse(
        restJsonSha512MerchantKey,
        {
          ...serializedRestJsonSha512Response,
          Ds_MerchantParameters: Buffer.from(
            JSON.stringify({ ...deserializedRestJsonSha512Response, Ds_Card_PSD2: 'N' })
          ).toString('base64url')
        },
        deserializedRestJsonSha512Response
      )
    ).toThrow(new ParseError('Invalid signature'));
  });

  it('should fail to verify response if signature version is unknown', () => {
    expect(() =>
      sha512VerifyJSONResponse(
        restJsonSha512MerchantKey,
        {
          ...serializedRestJsonSha512Response,
          Ds_SignatureVersion: 'HMAC_SHA256_V1'
        },
        deserializedRestJsonSha512Response
      )
    ).toThrow(new RedsysError('Unknown signature version: HMAC_SHA256_V1'));
  });

  it('should sign HMAC_SHA512_V1 request', () => {
    expect(
      sha512V1SignJSONRequest(
        restJsonSha512V1MerchantKey,
        serializedAndSignedRestJsonSha512V1Request.Ds_MerchantParameters,
        restJsonSha512V1Request
      )
    ).toEqual(serializedAndSignedRestJsonSha512V1Request);
  });

  it('should verify HMAC_SHA512_V1 response with legit signature', () => {
    expect(() =>
      sha512VerifyJSONResponse(
        restJsonSha512V1MerchantKey,
        serializedRestJsonSha512V1Response,
        deserializedRestJsonSha512V1Response
      )
    ).not.toThrow();
  });
});
