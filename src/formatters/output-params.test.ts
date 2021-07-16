import {
  restNotificationOutputFormatter,
  soapNotificationOutputFormatter,
  websocketOutputFormatter
} from './output-params';

import {
  deserializedSoapNotification,
  formattedSoapNotification
} from '../../test/fixtures/formatters/soap-notification';

import {
  deserializedRestNotification,
  formattedRestNotification
} from '../../test/fixtures/formatters/rest-notification';

import {
  deserializedWebServiceResponseParams,
  formattedWebServiceResponse
} from '../../test/fixtures/formatters/web-service-response';

import {
  deserializedWebServiceResponseWithCCParams,
  formattedWebServiceResponseWithCC
} from '../../test/fixtures/formatters/web-service-response-with-cc';

describe('Output parameters formatter', () => {
  describe('Scenarios', () => {
    it('should format soap notification', () => {
      const formattedParams = soapNotificationOutputFormatter(deserializedSoapNotification.Request);
      expect(formattedParams).toEqual(formattedSoapNotification);
    });

    it('should format redirect response', () => {
      const formattedParams = restNotificationOutputFormatter(deserializedRestNotification);
      expect(formattedParams).toEqual(formattedRestNotification);
    });

    it('should format web service response', () => {
      const formattedParams = websocketOutputFormatter(deserializedWebServiceResponseParams);
      expect(formattedParams).toEqual(formattedWebServiceResponse);
    });

    it('should format web service response with credit card', () => {
      const formattedParams = websocketOutputFormatter(deserializedWebServiceResponseWithCCParams);
      expect(formattedParams).toEqual(formattedWebServiceResponseWithCC);
    });
  });
});
