import {
  sha512VerifyJSONResponse,
  sha512SignJSONRequest
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

describe('REST JSON SHA512 signature', () => {
  it('should sign request', () => {
    expect(
      sha512SignJSONRequest(
        redirectSha512MerchantKey,
        serializedRedirectSha512Request,
        redirectSha512Request
      )
    ).toEqual(serializedAndSignedRedirectSha512Request);

    expect(
      sha512SignJSONRequest(
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
});
