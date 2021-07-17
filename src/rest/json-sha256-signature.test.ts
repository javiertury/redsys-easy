import {
  sha256VerifyJSONResponse,
  sha256SignJSONRequest
} from './json-sha256-signature';

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
  deserializedRestNotification
} from '../../test/fixtures/rest/redirect-notification';

import {
  redirectMerchantKey,
  redirectRequest,
  serializedRedirectRequest,
  serializedAndSignedRedirectRequest
} from '../../test/fixtures/rest/redirect';

import {
  restJsonRequest,
  serializedRestJsonRequest,
  serializedAndSignedRestJsonRequest,
  restJsonMerchantKey,
  serializedRestJsonResponse,
  deserializedRestJsonResponse
} from '../../test/fixtures/rest/rest-json';

describe('REST JSON SHA256 signature', () => {
  it('should sign request', () => {
    expect(
      sha256SignJSONRequest(redirectMerchantKey, serializedRedirectRequest, redirectRequest)
    ).toEqual(serializedAndSignedRedirectRequest);

    expect(
      sha256SignJSONRequest(restJsonMerchantKey, serializedRestJsonRequest, restJsonRequest)
    ).toEqual(serializedAndSignedRestJsonRequest);
  });

  it('should verify response with legit signature', () => {
    expect(
      () => sha256VerifyJSONResponse(restNotificationMerchantKey, serializedRestNotification, deserializedRestNotification)
    ).not.toThrowError();

    expect(
      () => sha256VerifyJSONResponse(restJsonMerchantKey, serializedRestJsonResponse, deserializedRestJsonResponse)
    ).not.toThrowError();
  });

  it('should fail to verify response if merchant key is incorrect', () => {
    expect(
      () => sha256VerifyJSONResponse(incorrectMerchantKey, serializedRestNotification, deserializedRestNotification)
    ).toThrowError(new ParseError('Invalid signature'));

    expect(
      () => sha256VerifyJSONResponse(incorrectMerchantKey, serializedRestJsonResponse, deserializedRestJsonResponse)
    ).toThrowError(new ParseError('Invalid signature'));
  });

  it('should fail to verify response if signature is forged', () => {
    expect(
      () => sha256VerifyJSONResponse(
        restNotificationMerchantKey,
        {
          ...serializedRestNotification,
          Ds_Signature: '7DVpRPAPoChZh2cgaWnLqlfFsKeXdRfAO_tz-UrxJcU='
        },
        deserializedRestNotification
      )
    ).toThrowError(new ParseError('Invalid signature'));

    expect(
      () => sha256VerifyJSONResponse(
        restJsonMerchantKey,
        {
          ...serializedRestJsonResponse,
          Ds_Signature: '7DVpRPAPoChZh2cgaWnLqlfFsKeXdRfAO_tz-UrxJcU='
        },
        deserializedRestJsonResponse
      )
    ).toThrowError(new ParseError('Invalid signature'));
  });

  it('should fail to verify response if signature version is unknown', () => {
    expect(
      () => sha256VerifyJSONResponse(
        restNotificationMerchantKey,
        {
          ...serializedRestNotification,
          Ds_SignatureVersion: 'None'
        },
        deserializedRestNotification
      )
    ).toThrowError(new RedsysError('Unknown signature version: None'));

    expect(
      () => sha256VerifyJSONResponse(
        restJsonMerchantKey,
        {
          ...serializedRestJsonResponse,
          Ds_SignatureVersion: 'None'
        },
        deserializedRestJsonResponse
      )
    ).toThrowError(new RedsysError('Unknown signature version: None'));
  });
});
