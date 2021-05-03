import {
  formatOutput
} from './output-params';

import {
  parsedSoapNotification,
  formattedSoapNotification
} from '../../test/fixtures/formatters/soap-notification';

import {
  parsedRestNotification,
  formattedRestNotification
} from '../../test/fixtures/formatters/rest-notification';

import {
  parsedWebServiceResponseParams,
  formattedWebServiceResponse
} from '../../test/fixtures/formatters/web-service-response';

import {
  parsedWebServiceResponseWithCCParams,
  formattedWebServiceResponseWithCC
} from '../../test/fixtures/formatters/web-service-response-with-cc';

describe('Output parameters formatter', () => {
  describe('Scenarios', () => {
    it('should format soap notification', () => {
      const formattedParams = formatOutput(parsedSoapNotification.Request);
      expect(formattedParams).toEqual(formattedSoapNotification);
    });

    it('should format redirect response', () => {
      const formattedParams = formatOutput(parsedRestNotification);
      expect(formattedParams).toEqual(formattedRestNotification);
    });

    it('should format web service response', () => {
      const formattedParams = formatOutput(parsedWebServiceResponseParams);
      expect(formattedParams).toEqual(formattedWebServiceResponse);
    });

    it('should format web service response with credit card', () => {
      const formattedParams = formatOutput(parsedWebServiceResponseWithCCParams);
      expect(formattedParams).toEqual(formattedWebServiceResponseWithCC);
    });
  });
});
