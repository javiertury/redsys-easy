import {
  restNotificationOutputFormatter,
  soapNotificationOutputFormatter
} from './output-params';

import {
  deserializedSoapNotification,
  formattedSoapNotification
} from '../../test/fixtures/formatters/soap-notification';

import {
  deserializedRestNotification,
  formattedRestNotification
} from '../../test/fixtures/formatters/rest-notification';

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
  });
});
