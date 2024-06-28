import {
  serializeJSONMerchantParams,
  deserializeJSONMerchantParams
} from './json-serialization';

import {
  redirectRequest,
  serializedRedirectRequest,
  serializedRestNotification,
  deserializedRestNotification
} from '../../test/fixtures/rest/redirect';

import {
  redirectWithIdentifierRequest,
  serializedRedirectWithIdentifierRequest
} from '../../test/fixtures/rest/redirect-identifier';

import {
  iniciaPeticionRequest as iniciaPeticionV1Request,
  serializedAndSignedIniciaPeticionRequest as serializedAndSignedIniciaPeticionV1Request,
  searializedInicaPeticionResponse as searializedInicaPeticionV1Response,
  deserializedIniciaPeticionResponse as deserializedIniciaPeticionV1Response
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
        serializedRestNotification.Ds_MerchantParameters
      )
    ).toEqual(deserializedRestNotification);

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

  it('correctly deserializes merchant params dates', () => {
    expect(
      deserializeJSONMerchantParams(
        Buffer.from(
          JSON.stringify({ Ds_Date: '23%2F06%2F2024', Ds_Hour: '12%3A30' })
        ).toString('base64')
      )
    ).toEqual({
      Ds_Date: '23/06/2024',
      Ds_Hour: '12:30'
    });
  });

  it('correctly deserializes merchant params with markup percentage', () => {
    expect(
      deserializeJSONMerchantParams(
        Buffer.from(
          JSON.stringify({
            Ds_Date: '23%2F06%2F2024',
            Ds_Hour: '12%3A30',
            Ds_Markup_DCC: '5.5%'
          })
        ).toString('base64')
      )
    ).toEqual({
      Ds_Date: '23/06/2024',
      Ds_Hour: '12:30',
      Ds_Markup_DCC: '5.5%'
    });
  });
});
