import {
  signWebServiceRequest,
  verifyWebServiceResponse
} from './web-service-signature';

import {
  ParseError
} from '../errors';

import type {
  ResponseXMLInnerSuccess
} from '../types/api';

import {
  webServiceRequestMerchantKey,
  webServiceRequestParams,
  serializedWebServiceRequestParams,
  serializedAndSignedWebServiceRequestParams
} from '../../test/fixtures/soap/web-service-request';

import {
  webServiceResponseMerchantKey,
  deserializedWebServiceResponse
} from '../../test/fixtures/soap/web-service-response';

import {
  webServiceResponseWithCCMerchantKey,
  deserializedWebServiceResponseWithCC
} from '../../test/fixtures/soap/web-service-response-with-cc';

import {
  deserializedWebServiceErrorResponse
} from '../../test/fixtures/soap/web-service-error-response';

import {
  incorrectMerchantKey
} from '../../test/fixtures/merchant-keys';

const verifyWebServiceSuccessResponseSpec = ({
  merchantKey,
  deserializedResponse
}: {
  merchantKey: string
  deserializedResponse: ResponseXMLInnerSuccess
}): void => {
  it('should verify legit response signature', () => {
    expect(
      () => verifyWebServiceResponse(merchantKey, deserializedResponse)
    ).not.toThrowError();
  });

  it('should verify response if it contains an error code', () => {
    expect(
      () => verifyWebServiceResponse(merchantKey, deserializedWebServiceErrorResponse)
    ).not.toThrowError();

    expect(
      () => verifyWebServiceResponse(incorrectMerchantKey, deserializedWebServiceErrorResponse)
    ).not.toThrowError();
  });

  it('should fail to verify response if merchant key is incorrect', () => {
    expect(
      () => verifyWebServiceResponse(incorrectMerchantKey, deserializedResponse)
    ).toThrowError(new ParseError('Invalid signature'));
  });

  it('should fail to verify response if signature is forged', () => {
    const verify = () => verifyWebServiceResponse(
      merchantKey,
      {
        ...deserializedResponse,
        OPERACION: {
          ...deserializedResponse.OPERACION,
          Ds_Signature: 'RTcH98KdGhGJ3hTKsXJCvJFO9KjcIYgj1oxwSSC+yw0='
        }
      }
    );
    expect(verify).toThrowError(new ParseError('Invalid signature'));
  });
};

describe('SOAP WebService signature', () => {
  it('should sign request', () => {
    const signedJSONRequest = signWebServiceRequest(webServiceRequestMerchantKey, serializedWebServiceRequestParams, webServiceRequestParams);
    expect(signedJSONRequest).toEqual(serializedAndSignedWebServiceRequestParams);
  });

  it('should verify response if it contains an error code', () => {
    expect(
      () => verifyWebServiceResponse(webServiceResponseMerchantKey, deserializedWebServiceErrorResponse)
    ).not.toThrowError();

    expect(
      () => verifyWebServiceResponse(incorrectMerchantKey, deserializedWebServiceErrorResponse)
    ).not.toThrowError();
  });

  // With and without credit card(CC) because signature formula changes
  describe('Response without credit card data', () => {
    verifyWebServiceSuccessResponseSpec({
      merchantKey: webServiceResponseMerchantKey,
      deserializedResponse: deserializedWebServiceResponse
    });
  });

  describe('Response with credit card data', () => {
    verifyWebServiceSuccessResponseSpec({
      merchantKey: webServiceResponseWithCCMerchantKey,
      deserializedResponse: deserializedWebServiceResponseWithCC
    });
  });
});
