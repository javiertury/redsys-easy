import {
  serializeWebServiceRequest,
  parseWebServiceResponse
} from './web-service-serialization';

import {
  webServiceRequestParams,
  serializedWebServiceRequestParams
} from '../../test/fixtures/soap/web-service-request';

import {
  serializedWebServiceResponseParams,
  parsedWebServiceResponse
} from '../../test/fixtures/soap/web-service-response';

import {
  serializedWebServiceErrorResponseParams,
  parsedWebServiceErrorResponse
} from '../../test/fixtures/soap/web-service-error-response';

describe('SOAP Web Service serialization', () => {
  it('should serialize merchant parameters', () => {
    const serializedParams = serializeWebServiceRequest(webServiceRequestParams);
    expect(serializedParams).toEqual(serializedWebServiceRequestParams);
  });

  it('should parse merchant parameters', () => {
    const parsedParams = parseWebServiceResponse(serializedWebServiceResponseParams);
    expect(parsedParams).toEqual(parsedWebServiceResponse);
  });

  it('should parse merchant parameters from an error response', () => {
    const parsedParams = parseWebServiceResponse(serializedWebServiceErrorResponseParams);
    expect(parsedParams).toEqual(parsedWebServiceErrorResponse);
  });
});
