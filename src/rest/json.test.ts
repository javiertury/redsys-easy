import {
  deserializeAndVerifyJSONResponse,
  serializeAndSignJSONRequest
} from './json';

import { ParseError, RedsysError } from '../errors';

import { incorrectMerchantKey } from '../../test/fixtures/merchant-keys';

import {
  redirectMerchantKey,
  redirectRequest,
  serializedAndSignedRedirectRequest,
  serializedRedirectRestNotification
} from '../../test/fixtures/rest/redirect';

import {
  restJsonMerchantKey,
  restJsonRequest,
  serializedAndSignedRestJsonRequest,
  serializedRestJsonResponse,
  deserializedRestJsonResponse
} from '../../test/fixtures/rest/rest-json';

import {
  threeDSv21MerchantKey,
  challengeResponseRequest,
  serializedAndSignedChallengeResponseRequest,
  serializedChallengeResponseResponse,
  deserializedChallengeResponseResponse
} from '../../test/fixtures/rest/3ds-v2.1-challenge';

import {
  serializedRestNotificationWithDcc,
  deserializedRestNotificationWithDcc,
} from '../../test/fixtures/rest/redirect-dcc';

import {
  redirectSha512MerchantKey,
  redirectSha512Request,
  serializedAndSignedRedirectSha512Request
} from '../../test/fixtures/rest/redirect-sha512';

import {
  restJsonSha512MerchantKey,
  restJsonSha512Request,
  serializedAndSignedRestJsonSha512Request,
  serializedRestJsonSha512Response,
  deserializedRestJsonSha512Response
} from '../../test/fixtures/rest/rest-json-sha512';

describe('REST JSON', () => {
  describe('SHA256', () => {
    it('should serialize and sign request', () => {
      expect(
        serializeAndSignJSONRequest(redirectMerchantKey, redirectRequest)
      ).toEqual(serializedAndSignedRedirectRequest);

      expect(
        serializeAndSignJSONRequest(restJsonMerchantKey, restJsonRequest)
      ).toEqual(serializedAndSignedRestJsonRequest);

      expect(
        serializeAndSignJSONRequest(
          threeDSv21MerchantKey,
          challengeResponseRequest
        )
      ).toEqual(serializedAndSignedChallengeResponseRequest);
    });

    it('should deserialize and verify response with legit signature', () => {
      expect(
        deserializeAndVerifyJSONResponse(
          redirectMerchantKey,
          serializedRestNotificationWithDcc
        )
      ).toEqual(deserializedRestNotificationWithDcc);

      expect(
        deserializeAndVerifyJSONResponse(
          restJsonMerchantKey,
          serializedRestJsonResponse
        )
      ).toEqual(deserializedRestJsonResponse);

      expect(
        deserializeAndVerifyJSONResponse(
          threeDSv21MerchantKey,
          serializedChallengeResponseResponse
        )
      ).toEqual(deserializedChallengeResponseResponse);
    });

    it('should fail to verify response if merchant key is incorrect', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(
          incorrectMerchantKey,
          serializedRedirectRestNotification
        )
      ).toThrow(new ParseError('Invalid signature'));

      expect(() =>
        deserializeAndVerifyJSONResponse(
          incorrectMerchantKey,
          serializedRestJsonResponse
        )
      ).toThrow(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature is forged', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(redirectMerchantKey, {
          ...serializedRedirectRestNotification,
          Ds_Signature: '7DVpRPAPoChZh2cgaWnLqlfFsKeXdRfAO_tz-UrxJcU='
        })
      ).toThrow(new ParseError('Invalid signature'));

      expect(() =>
        deserializeAndVerifyJSONResponse(restJsonMerchantKey, {
          ...serializedRestJsonResponse,
          Ds_Signature: '7DVpRPAPoChZh2cgaWnLqlfFsKeXdRfAO_tz-UrxJcU='
        })
      ).toThrow(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature version is unknown', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(redirectMerchantKey, {
          ...serializedRedirectRestNotification,
          Ds_SignatureVersion: 'None'
        })
      ).toThrow(new RedsysError('Unknown signature version: None'));

      expect(() =>
        deserializeAndVerifyJSONResponse(restJsonMerchantKey, {
          ...serializedRestJsonResponse,
          Ds_SignatureVersion: 'None'
        })
      ).toThrow(new RedsysError('Unknown signature version: None'));
    });
  });

  describe('SHA512', () => {
    it('should serialize and sign request', () => {
      expect(
        serializeAndSignJSONRequest(
          redirectSha512MerchantKey,
          redirectSha512Request,
          'HMAC_SHA512_V2'
        )
      ).toEqual(serializedAndSignedRedirectSha512Request);

      expect(
        serializeAndSignJSONRequest(
          restJsonSha512MerchantKey,
          restJsonSha512Request,
          'HMAC_SHA512_V2'
        )
      ).toEqual(serializedAndSignedRestJsonSha512Request);
    });

    it('should serialize merchant parameters as base64url without padding', () => {
      const { Ds_MerchantParameters: params } = serializeAndSignJSONRequest(
        redirectSha512MerchantKey,
        { ...redirectSha512Request, DS_MERCHANT_PRODUCTDESCRIPTION: '???>>>' },
        'HMAC_SHA512_V2'
      );

      expect(params).toMatch(/^[\w-]+$/);
    });

    it('should deserialize and verify response with legit signature', () => {
      expect(
        deserializeAndVerifyJSONResponse(
          restJsonSha512MerchantKey,
          serializedRestJsonSha512Response
        )
      ).toEqual(deserializedRestJsonSha512Response);
    });

    it('should fail to verify response if merchant key is incorrect', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(
          incorrectMerchantKey,
          serializedRestJsonSha512Response
        )
      ).toThrow(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature is forged', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(restJsonSha512MerchantKey, {
          ...serializedRestJsonSha512Response,
          Ds_Signature: serializedAndSignedRestJsonSha512Request.Ds_Signature
        })
      ).toThrow(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature version is changed', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(restJsonSha512MerchantKey, {
          ...serializedRestJsonSha512Response,
          Ds_SignatureVersion: 'HMAC_SHA256_V1'
        })
      ).toThrow(new ParseError('Invalid signature'));

      expect(() =>
        deserializeAndVerifyJSONResponse(redirectMerchantKey, {
          ...serializedRedirectRestNotification,
          Ds_SignatureVersion: 'HMAC_SHA512_V2'
        })
      ).toThrow(new ParseError('Invalid signature'));
    });
  });
});
