import {
  parseAndVerifyJSONResponse,
  serializeAndSignJSONRequest
} from './json';

import {
  ParseError,
  RedsysError
} from '../errors';

import {
  incorrectMerchantKey
} from '../../test/fixtures/merchant-keys';

import {
  restNotificationMerchantKey,
  serializedRestNotification,
  parsedRestNotification
} from '../../test/fixtures/rest/redirect-notification';

import {
  redirectMerchantKey,
  redirectRequest,
  serializedAndSignedRedirectRequest
} from '../../test/fixtures/rest/redirect';

import {
  jsonRequestMerchantKey,
  jsonRequest,
  serializedAndSignedJSONRequest
} from '../../test/fixtures/rest/json-request';

import {
  jsonResponseMerchantKey,
  serializedJSONResponse,
  parsedJSONResponse
} from '../../test/fixtures/rest/json-response';

import {
  threeDSv21MerchantKey,
  challengeResponseRequest,
  serializedAndSignedChallengeResponseRequest,
  serializedChallengeResponseResponse,
  parsedChallengeResponseResponse
} from '../../test/fixtures/rest/3ds-v2.1-challenge';

describe('REST JSON', () => {
  describe('SHA256', () => {
    it('should serialize and sign request', () => {
      expect(
        serializeAndSignJSONRequest(redirectMerchantKey, redirectRequest)
      ).toEqual(serializedAndSignedRedirectRequest);

      expect(
        serializeAndSignJSONRequest(jsonRequestMerchantKey, jsonRequest)
      ).toEqual(serializedAndSignedJSONRequest);

      expect(
        serializeAndSignJSONRequest(threeDSv21MerchantKey, challengeResponseRequest)
      ).toEqual(serializedAndSignedChallengeResponseRequest);
    });

    it('should parse and verify response with legit signature', () => {
      expect(
        parseAndVerifyJSONResponse(restNotificationMerchantKey, serializedRestNotification)
      ).toEqual(parsedRestNotification);

      expect(
        parseAndVerifyJSONResponse(jsonResponseMerchantKey, serializedJSONResponse)
      ).toEqual(parsedJSONResponse);

      expect(
        parseAndVerifyJSONResponse(threeDSv21MerchantKey, serializedChallengeResponseResponse)
      ).toEqual(parsedChallengeResponseResponse);
    });

    it('should fail to verify response if merchant key is incorrect', () => {
      expect(
        () => parseAndVerifyJSONResponse(incorrectMerchantKey, serializedRestNotification)
      ).toThrowError(new ParseError('Invalid signature'));

      expect(
        () => parseAndVerifyJSONResponse(incorrectMerchantKey, serializedJSONResponse)
      ).toThrowError(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature is forged', () => {
      expect(
        () => parseAndVerifyJSONResponse(
          restNotificationMerchantKey,
          {
            ...serializedRestNotification,
            Ds_Signature: '7DVpRPAPoChZh2cgaWnLqlfFsKeXdRfAO_tz-UrxJcU='
          }
        )
      ).toThrowError(new ParseError('Invalid signature'));

      expect(
        () => parseAndVerifyJSONResponse(
          jsonResponseMerchantKey,
          {
            ...serializedJSONResponse,
            Ds_Signature: '7DVpRPAPoChZh2cgaWnLqlfFsKeXdRfAO_tz-UrxJcU='
          }
        )
      ).toThrowError(new ParseError('Invalid signature'));
    });

    it('should fail to verify response if signature version is unknown', () => {
      expect(
        () => parseAndVerifyJSONResponse(
          restNotificationMerchantKey,
          {
            ...serializedRestNotification,
            Ds_SignatureVersion: 'None'
          }
        )
      ).toThrowError(new RedsysError('Unknown signature version: None'));

      expect(
        () => parseAndVerifyJSONResponse(
          jsonResponseMerchantKey,
          {
            ...serializedJSONResponse,
            Ds_SignatureVersion: 'None'
          }
        )
      ).toThrowError(new RedsysError('Unknown signature version: None'));
    });
  });
});
