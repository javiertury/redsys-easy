import {
  serializeJSONMerchantParams,
  deserializeJSONMerchantParams
} from './json-serialization';

import {
  redirectRequest,
  serializedRedirectRequest,
} from '../../test/fixtures/rest/redirect';

import {
  redirectWithIdentifierRequest,
  serializedRedirectWithIdentifierRequest
} from '../../test/fixtures/rest/redirect-identifier';

import {
  serializedRestNotificationWithDcc,
  deserializedRestNotificationWithDcc,
} from '../../test/fixtures/rest/redirect-dcc';

import {
  iniciaPeticionRequest as iniciaPeticionV1Request,
  serializedAndSignedIniciaPeticionRequest as serializedAndSignedIniciaPeticionV1Request,
  searializedInicaPeticionResponse as searializedInicaPeticionV1Response,
  deserializedIniciaPeticionResponse as deserializedIniciaPeticionV1Response,
  serializedAuthDataResponse as searializedAuthDataV1Response,
  deserializedAuthDataResponse as deserializedAuthDataV1Response
} from '../../test/fixtures/rest/3ds-v1';

import {
  restJsonRequest,
  serializedRestJsonRequest,
  serializedRestJsonResponse,
  deserializedRestJsonResponse
} from '../../test/fixtures/rest/rest-json';

describe('REST JSON serialization', () => {
  it('should serialize merchant parameters', () => {
    expect(serializeJSONMerchantParams(redirectRequest)).toEqual(
      serializedRedirectRequest
    );

    expect(serializeJSONMerchantParams(redirectWithIdentifierRequest)).toEqual(
      serializedRedirectWithIdentifierRequest
    );

    expect(serializeJSONMerchantParams(restJsonRequest)).toEqual(
      serializedRestJsonRequest
    );

    expect(serializeJSONMerchantParams(iniciaPeticionV1Request)).toEqual(
      serializedAndSignedIniciaPeticionV1Request.Ds_MerchantParameters
    );
  });

  it('should deserialize merchant parameters', () => {
    expect(
      deserializeJSONMerchantParams(
        serializedRestNotificationWithDcc.Ds_MerchantParameters
      )
    ).toEqual(deserializedRestNotificationWithDcc);

    expect(
      deserializeJSONMerchantParams(
        serializedRestJsonResponse.Ds_MerchantParameters
      )
    ).toEqual(deserializedRestJsonResponse);

    expect(
      deserializeJSONMerchantParams(
        searializedInicaPeticionV1Response.Ds_MerchantParameters
      )
    ).toEqual(deserializedIniciaPeticionV1Response);
  });

  it('should decode auth data', () => {
    expect(
      deserializeJSONMerchantParams(
        searializedAuthDataV1Response.Ds_MerchantParameters
      )
    ).toEqual(deserializedAuthDataV1Response);
  });
});
