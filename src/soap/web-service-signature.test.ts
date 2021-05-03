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
  parsedWebServiceResponse
} from '../../test/fixtures/soap/web-service-response';

import {
  webServiceResponseWithCCMerchantKey,
  parsedWebServiceResponseWithCC
} from '../../test/fixtures/soap/web-service-response-with-cc';

import {
  parsedWebServiceErrorResponse
} from '../../test/fixtures/soap/web-service-error-response';

import {
  incorrectMerchantKey
} from '../../test/fixtures/merchant-keys';

const verifyWebServiceSuccessResponseSpec = ({
  merchantKey,
  parsedResponse
}: {
  merchantKey: string
  parsedResponse: ResponseXMLInnerSuccess
}): void => {
  it('should verify legit response signature', () => {
    expect(
      () => verifyWebServiceResponse(merchantKey, parsedResponse)
    ).not.toThrowError();
  });

  it('should verify response if it contains an error code', () => {
    expect(
      () => verifyWebServiceResponse(merchantKey, parsedWebServiceErrorResponse)
    ).not.toThrowError();

    expect(
      () => verifyWebServiceResponse(incorrectMerchantKey, parsedWebServiceErrorResponse)
    ).not.toThrowError();
  });

  it('should fail to verify response if merchant key is incorrect', () => {
    expect(
      () => verifyWebServiceResponse(incorrectMerchantKey, parsedResponse)
    ).toThrowError(new ParseError('Invalid signature'));
  });

  it('should fail to verify response if signature is forged', () => {
    const verify = () => verifyWebServiceResponse(
      merchantKey,
      {
        ...parsedResponse,
        OPERACION: {
          ...parsedResponse.OPERACION,
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
      () => verifyWebServiceResponse(webServiceResponseMerchantKey, parsedWebServiceErrorResponse)
    ).not.toThrowError();

    expect(
      () => verifyWebServiceResponse(incorrectMerchantKey, parsedWebServiceErrorResponse)
    ).not.toThrowError();
  });

  // With and without credit card(CC) because signature formula changes
  describe('Response without credit card data', () => {
    verifyWebServiceSuccessResponseSpec({
      merchantKey: webServiceResponseMerchantKey,
      parsedResponse: parsedWebServiceResponse
    });
  });

  describe('Response with credit card data', () => {
    verifyWebServiceSuccessResponseSpec({
      merchantKey: webServiceResponseWithCCMerchantKey,
      parsedResponse: parsedWebServiceResponseWithCC
    });
  });
});
