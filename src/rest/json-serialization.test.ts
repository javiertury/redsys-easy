import {
  serializeJSONMerchantParams,
  parseJSONMerchantParams
} from './json-serialization';

import {
  serializedRestNotification,
  parsedRestNotification
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
  parsedIniciaPeticionResponse as parsedIniciaPeticionV1Response
} from '../../test/fixtures/rest/3ds-v1';

import {
  serializedJSONResponse,
  parsedJSONResponse
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

  it('should parse merchant parameters', () => {
    expect(
      parseJSONMerchantParams(serializedRestNotification.Ds_MerchantParameters)
    ).toEqual(parsedRestNotification);

    expect(
      parseJSONMerchantParams(serializedJSONResponse.Ds_MerchantParameters)
    ).toEqual(parsedJSONResponse);

    expect(
      parseJSONMerchantParams(searializedInicaPeticionV1Response.Ds_MerchantParameters)
    ).toEqual(parsedIniciaPeticionV1Response);
  });
});
