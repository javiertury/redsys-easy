import {
  serializeJSONMerchantParams,
  parseJSONMerchantParams
} from './json-serialization';

import {
  serializedRestNotification,
  parsedRestNotification
} from '../../test/fixtures/rest/notification';

import {
  redirectRequest,
  serializedRedirectRequest
} from '../../test/fixtures/rest/redirect';

import {
  jsonRequest,
  serializedJSONRequest
} from '../../test/fixtures/rest/json-request';

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
  });

  it('should parse merchant parameters', () => {
    expect(
      parseJSONMerchantParams(serializedRestNotification.Ds_MerchantParameters)
    ).toEqual(parsedRestNotification);

    expect(
      parseJSONMerchantParams(serializedJSONResponse.Ds_MerchantParameters)
    ).toEqual(parsedJSONResponse);
  });
});
