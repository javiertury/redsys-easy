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
});
