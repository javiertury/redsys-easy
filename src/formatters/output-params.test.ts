import {
  restNotificationOutputFormatter,
  soapNotificationOutputFormatter,
  restIniciaPeticionOutputFormatter,
  restTrataPeticionOutputFormatter
} from './output-params';

import {
  deserializedSoapNotification,
  formattedSoapNotification
} from '../../test/fixtures/formatters/soap-notification';

import {
  deserializedRestNotification,
  formattedRestNotification
} from '../../test/fixtures/formatters/rest-notification';

import {
  deserializedRestJsonResponse,
  formattedRestJsonResponse
} from '../../test/fixtures/formatters/rest-json';

import {
  deserializedIniciaPeticionResponse as deserializedIniciaPeticionV1Response,
  formattedIniciaPeticionResponse as formattedIniciaPeticionV1Response,
  deserializedAuthDataResponse as deserializedAuthDataV1Response,
  formattedAuthDataResponse as formattedAuthDataV1Response,
  deserializedChallengeResponseResponse as deserializedChallengeResponseV1Response,
  formattedChallengeResponseResponse as formattedChallengeResponseV1Response
} from '../../test/fixtures/formatters/rest-3ds-v1';

import {
  deserializedIniciaPeticionResponse,
  formattedIniciaPeticionResponse,
  deserializedAuthDataResponse,
  formattedAuthDataResponse,
  deserializedChallengeResponseResponse,
  formattedChallengeResponseResponse
} from '../../test/fixtures/formatters/rest-3ds-v2.1-challenge';

describe('soapNotificationOutputFormatter', () => {
  it('should format a soap notification', () => {
    const formattedParams = soapNotificationOutputFormatter(deserializedSoapNotification.Request);
    expect(formattedParams).toEqual(formattedSoapNotification);
  });
});

describe('restNotificationOutputFormatter', () => {
  it('should format a redirect notification', () => {
    const formattedParams = restNotificationOutputFormatter(deserializedRestNotification);
    expect(formattedParams).toEqual(formattedRestNotification);
  });
});

describe('restIniciaPeticionOutputFormatter', () => {
  it('should format a 3DS v1 iniciaPeticion response', () => {
    const formattedParams = restIniciaPeticionOutputFormatter(deserializedIniciaPeticionV1Response);
    expect(formattedParams).toEqual(formattedIniciaPeticionV1Response);
  });

  it('should format a 3DS v2.1 iniciaPeticion response', () => {
    const formattedParams = restIniciaPeticionOutputFormatter(deserializedIniciaPeticionResponse);
    expect(formattedParams).toEqual(formattedIniciaPeticionResponse);
  });
});

describe('restTrataPeticionOutputFormatter', () => {
  it('should format a json response', () => {
    const formattedParams = restTrataPeticionOutputFormatter(deserializedRestJsonResponse);
    expect(formattedParams).toEqual(formattedRestJsonResponse);
  });

  it('should format a 3DS v1 authenticationData response', () => {
    const formattedParams = restTrataPeticionOutputFormatter(deserializedAuthDataV1Response);
    expect(formattedParams).toEqual(formattedAuthDataV1Response);
  });

  it('should format a 3DS v1 challengeResponse response', () => {
    const formattedParams = restTrataPeticionOutputFormatter(deserializedChallengeResponseV1Response);
    expect(formattedParams).toEqual(formattedChallengeResponseV1Response);
  });

  it('should format a 3DS v2.1 authenticationData response', () => {
    const formattedParams = restTrataPeticionOutputFormatter(deserializedAuthDataResponse);
    expect(formattedParams).toEqual(formattedAuthDataResponse);
  });

  it('should format a 3DS v2.1 challengeResponse response', () => {
    const formattedParams = restTrataPeticionOutputFormatter(deserializedChallengeResponseResponse);
    expect(formattedParams).toEqual(formattedChallengeResponseResponse);
  });
});
