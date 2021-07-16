import {
  serializeJSONMerchantParams,
  deserializeJSONMerchantParams
} from './json-serialization';

import {
  serializedRestNotification,
  deserializedRestNotification
} from '../../test/fixtures/rest/redirect-notification';

import {
  redirectRequest,
  serializedRedirectRequest
} from '../../test/fixtures/rest/redirect';

import {
  jsonRequest,
  serializedJSONRequest
} from '../../test/fixtures/rest/json-request';

import {
  iniciaPeticionRequest as iniciaPeticionV1Request,
  serializedAndSignedIniciaPeticionRequest as serializedAndSignedIniciaPeticionV1Request,
  searializedInicaPeticionResponse as searializedInicaPeticionV1Response,
  deserializedIniciaPeticionResponse as deserializedIniciaPeticionV1Response
} from '../../test/fixtures/rest/3ds-v1';

import {
  serializedJSONResponse,
  deserializedJSONResponse
} from '../../test/fixtures/rest/json-response';

describe('REST JSON serialization', () => {
  it('should serialize merchant parameters', () => {
    expect(
      serializeJSONMerchantParams(redirectRequest)
    ).toEqual(serializedRedirectRequest);

    expect(
      serializeJSONMerchantParams(jsonRequest)
    ).toEqual(serializedJSONRequest);

    expect(
      serializeJSONMerchantParams(iniciaPeticionV1Request)
    ).toEqual(serializedAndSignedIniciaPeticionV1Request.Ds_MerchantParameters);
  });

  it('should deserialize merchant parameters', () => {
    expect(
      deserializeJSONMerchantParams(serializedRestNotification.Ds_MerchantParameters)
    ).toEqual(deserializedRestNotification);

    expect(
      deserializeJSONMerchantParams(serializedJSONResponse.Ds_MerchantParameters)
    ).toEqual(deserializedJSONResponse);

    expect(
      deserializeJSONMerchantParams(searializedInicaPeticionV1Response.Ds_MerchantParameters)
    ).toEqual(deserializedIniciaPeticionV1Response);
  });
});
