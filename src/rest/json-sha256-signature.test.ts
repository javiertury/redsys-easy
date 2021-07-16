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
  jsonRequestMerchantKey,
  jsonRequest,
  serializedJSONRequest,
  serializedAndSignedJSONRequest
} from '../../test/fixtures/rest/json-request';

import {
  jsonResponseMerchantKey,
  serializedJSONResponse,
  deserializedJSONResponse
} from '../../test/fixtures/rest/json-response';

describe('REST JSON SHA256 signature', () => {
  it('should sign request', () => {
    expect(
      sha256SignJSONRequest(redirectMerchantKey, serializedRedirectRequest, redirectRequest)
    ).toEqual(serializedAndSignedRedirectRequest);

    expect(
      sha256SignJSONRequest(jsonRequestMerchantKey, serializedJSONRequest, jsonRequest)
    ).toEqual(serializedAndSignedJSONRequest);
  });

  it('should verify response with legit signature', () => {
    expect(
      () => sha256VerifyJSONResponse(restNotificationMerchantKey, serializedRestNotification, deserializedRestNotification)
    ).not.toThrowError();

    expect(
      () => sha256VerifyJSONResponse(jsonResponseMerchantKey, serializedJSONResponse, deserializedJSONResponse)
    ).not.toThrowError();
  });

  it('should fail to verify response if merchant key is incorrect', () => {
    expect(
      () => sha256VerifyJSONResponse(incorrectMerchantKey, serializedRestNotification, deserializedRestNotification)
    ).toThrowError(new ParseError('Invalid signature'));

    expect(
      () => sha256VerifyJSONResponse(incorrectMerchantKey, serializedJSONResponse, deserializedJSONResponse)
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
        jsonResponseMerchantKey,
        {
          ...serializedJSONResponse,
          Ds_Signature: '7DVpRPAPoChZh2cgaWnLqlfFsKeXdRfAO_tz-UrxJcU='
        },
        deserializedJSONResponse
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
        jsonResponseMerchantKey,
        {
          ...serializedJSONResponse,
          Ds_SignatureVersion: 'None'
        },
        deserializedJSONResponse
      )
    ).toThrowError(new RedsysError('Unknown signature version: None'));
  });
});
