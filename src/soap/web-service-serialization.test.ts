import {
  serializeWebServiceRequest,
  deserializeWebServiceResponse
} from './web-service-serialization';

import {
  webServiceRequestParams,
  serializedWebServiceRequestParams
} from '../../test/fixtures/soap/web-service-request';

import {
  serializedWebServiceResponseParams,
  deserializedWebServiceResponse
} from '../../test/fixtures/soap/web-service-response';

import {
  serializedWebServiceErrorResponseParams,
  deserializedWebServiceErrorResponse
} from '../../test/fixtures/soap/web-service-error-response';

describe('SOAP Web Service serialization', () => {
  it('should serialize merchant parameters', () => {
    const serializedParams = serializeWebServiceRequest(webServiceRequestParams);
    expect(serializedParams).toEqual(serializedWebServiceRequestParams);
  });

  it('should deserialize merchant parameters', () => {
    const deserializedParams = deserializeWebServiceResponse(serializedWebServiceResponseParams);
    expect(deserializedParams).toEqual(deserializedWebServiceResponse);
  });

  it('should deserialize merchant parameters from an error response', () => {
    const deserializedParams = deserializeWebServiceResponse(serializedWebServiceErrorResponseParams);
    expect(deserializedParams).toEqual(deserializedWebServiceErrorResponse);
  });
});
