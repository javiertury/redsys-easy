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

import {
  restJsonSha512V1MerchantKey,
  restJsonSha512V1Request,
  serializedAndSignedRestJsonSha512V1Request,
  serializedRestJsonSha512V1Response,
  deserializedRestJsonSha512V1Response
} from '../../test/fixtures/rest/rest-json-sha512v1';

describe('REST JSON', () => {
  describe('SHA256', () => {
    it('should serialize and sign request', () => {
      expect(
        serializeAndSignJSONRequest(redirectMerchantKey, redirectRequest, 'HMAC_SHA256_V1')
      ).toEqual(serializedAndSignedRedirectRequest);

      expect(
        serializeAndSignJSONRequest(restJsonMerchantKey, restJsonRequest, 'HMAC_SHA256_V1')
      ).toEqual(serializedAndSignedRestJsonRequest);

      expect(
        serializeAndSignJSONRequest(
          threeDSv21MerchantKey,
          challengeResponseRequest,
          'HMAC_SHA256_V1'
        )
      ).toEqual(serializedAndSignedChallengeResponseRequest);
    });

    it('should deserialize and verify response with legit signature', () => {
      expect(
        deserializeAndVerifyJSONResponse(
          redirectMerchantKey,
          serializedRestNotificationWithDcc,
          ["HMAC_SHA512_V2", "HMAC_SHA256_V1"]
        )
      ).toEqual(deserializedRestNotificationWithDcc);

      expect(
        deserializeAndVerifyJSONResponse(
          restJsonMerchantKey,
          serializedRestJsonResponse,
          ["HMAC_SHA512_V2", "HMAC_SHA256_V1"]
        )
      ).toEqual(deserializedRestJsonResponse);

      expect(
        deserializeAndVerifyJSONResponse(
          threeDSv21MerchantKey,
          serializedChallengeResponseResponse,
          ["HMAC_SHA512_V2", "HMAC_SHA256_V1"]
        )
      ).toEqual(deserializedChallengeResponseResponse);
    });

    it('should fail to verify response if merchant key is incorrect', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(
          incorrectMerchantKey,
          serializedRedirectRestNotification,
          ["HMAC_SHA512_V2", "HMAC_SHA256_V1"]
        )
      ).toThrow(new ParseError('Invalid signature'));

      expect(() =>
        deserializeAndVerifyJSONResponse(
          incorrectMerchantKey,
          serializedRestJsonResponse,
          ["HMAC_SHA512_V2", "HMAC_SHA256_V1"]
        )
      ).toThrow(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature is forged', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(redirectMerchantKey, {
          ...serializedRedirectRestNotification,
          Ds_Signature: '7DVpRPAPoChZh2cgaWnLqlfFsKeXdRfAO_tz-UrxJcU='
        },
        ["HMAC_SHA512_V2", "HMAC_SHA256_V1"])
      ).toThrow(new ParseError('Invalid signature'));

      expect(() =>
        deserializeAndVerifyJSONResponse(restJsonMerchantKey, {
          ...serializedRestJsonResponse,
          Ds_Signature: '7DVpRPAPoChZh2cgaWnLqlfFsKeXdRfAO_tz-UrxJcU='
        },
        ["HMAC_SHA512_V2", "HMAC_SHA256_V1"])
      ).toThrow(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature version is unknown', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(redirectMerchantKey, {
          ...serializedRedirectRestNotification,
          Ds_SignatureVersion: 'None'
        },
        ["HMAC_SHA512_V2", "HMAC_SHA256_V1"])
      ).toThrow(new RedsysError('Unknown signature version: None'));

      expect(() =>
        deserializeAndVerifyJSONResponse(restJsonMerchantKey, {
          ...serializedRestJsonResponse,
          Ds_SignatureVersion: 'None'
        },
        ["HMAC_SHA512_V2", "HMAC_SHA256_V1"])
      ).toThrow(new RedsysError('Unknown signature version: None'));
    });

    it('should fail if response signature is not allowed', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(
          redirectMerchantKey,
          serializedRestNotificationWithDcc,
          ["HMAC_SHA512_V2"]
        )
      ).toThrow(new RedsysError('Signature version not allowed: HMAC_SHA256_V1'));

      expect(() =>
        deserializeAndVerifyJSONResponse(
          restJsonMerchantKey,
          serializedRestJsonResponse,
          ["HMAC_SHA512_V2"]
        )
      ).toThrow(new RedsysError('Signature version not allowed: HMAC_SHA256_V1'));

      expect(() =>
        deserializeAndVerifyJSONResponse(
          threeDSv21MerchantKey,
          serializedChallengeResponseResponse,
          ["HMAC_SHA512_V2"]
        )
      ).toThrow(new RedsysError('Signature version not allowed: HMAC_SHA256_V1'));
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
          serializedRestJsonSha512Response,
          ["HMAC_SHA512_V2", "HMAC_SHA256_V1"]
        )
      ).toEqual(deserializedRestJsonSha512Response);
    });

    it('should fail to verify response if merchant key is incorrect', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(
          incorrectMerchantKey,
          serializedRestJsonSha512Response,
          ["HMAC_SHA512_V2", "HMAC_SHA256_V1"]
        )
      ).toThrow(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature is forged', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(restJsonSha512MerchantKey, {
          ...serializedRestJsonSha512Response,
          Ds_Signature: serializedAndSignedRestJsonSha512Request.Ds_Signature
        }, ["HMAC_SHA512_V2", "HMAC_SHA256_V1"])
      ).toThrow(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature version is changed', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(restJsonSha512MerchantKey, {
          ...serializedRestJsonSha512Response,
          Ds_SignatureVersion: 'HMAC_SHA256_V1'
        }, ["HMAC_SHA256_V1"])
      ).toThrow(new ParseError('Invalid signature'));

      expect(() =>
        deserializeAndVerifyJSONResponse(redirectMerchantKey, {
          ...serializedRedirectRestNotification,
          Ds_SignatureVersion: 'HMAC_SHA512_V2'
        }, ["HMAC_SHA512_V2"])
      ).toThrow(new ParseError('Invalid signature'));
    });

    it('should fail if response signature is not allowed', () => {
      expect(() =>
        deserializeAndVerifyJSONResponse(
          restJsonSha512MerchantKey,
          serializedRestJsonSha512Response,
          ["HMAC_SHA256_V1"]
        )
      ).toThrow(new RedsysError('Signature version not allowed: HMAC_SHA512_V2'));
    });

    it('should serialize and sign HMAC_SHA512_V1 request', () => {
      expect(
        serializeAndSignJSONRequest(
          restJsonSha512V1MerchantKey,
          restJsonSha512V1Request,
          'HMAC_SHA512_V1'
        )
      ).toEqual(serializedAndSignedRestJsonSha512V1Request);
    });

    it('should deserialize and verify HMAC_SHA512_V1 response with legit signature', () => {
      expect(
        deserializeAndVerifyJSONResponse(
          restJsonSha512V1MerchantKey,
          serializedRestJsonSha512V1Response,
          ["HMAC_SHA512_V2", "HMAC_SHA512_V1"]
        )
      ).toEqual(deserializedRestJsonSha512V1Response);
    });
  });
});
