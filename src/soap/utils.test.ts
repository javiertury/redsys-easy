import {
  detectSoapVersion,
  mimicSoapNotificationReceiver,
  mimicSoap11NotificationResponse,
  mimicSoap12NotificationResponse
} from './utils';

import {
  serializedSoapNotification11,
  serializedSoapNotification12,
  serializedAndSignedSoapNotificationParams
} from '../../test/fixtures/soap/redirect-notification';

import {
  serializedAndSignedAllowedNotificationResponseParams,
  serializedAllowedNotificationResponse11,
  serializedAllowedNotificationResponse12
} from '../../test/fixtures/soap/allowed-notification-response';

import {
  serializedAndSignedDeniedNotificationResponseParams,
  serializedDeniedNotificationResponse11,
  serializedDeniedNotificationResponse12
} from '../../test/fixtures/soap/denied-notification-response';

describe('SOAP Notification Server Mimicking', () => {
  describe('detectSoapVersion', () => {
    it('should detect soap version from headers', () => {
      // SOAP 1.1 and SOAP 1.2
      expect(
        detectSoapVersion({ headers: serializedSoapNotification11.headers })
      ).toEqual('1.1');

      expect(
        detectSoapVersion({ headers: serializedSoapNotification12.headers })
      ).toEqual('1.2');
    });

    it('should detect soap version from body', () => {
      // SOAP 1.1 and SOAP 1.2
      expect(
        detectSoapVersion({ body: serializedSoapNotification11.body })
      ).toEqual('1.1');

      expect(
        detectSoapVersion({ body: serializedSoapNotification12.body })
      ).toEqual('1.2');
    });
  });

  describe('mimicSoapNotificationReceiver', () => {
    it('should receive data payload', () => {
      // SOAP 1.1 and SOAP 1.2
      expect(
        mimicSoapNotificationReceiver(serializedSoapNotification11.body)
      ).toEqual(serializedAndSignedSoapNotificationParams);

      expect(
        mimicSoapNotificationReceiver(serializedSoapNotification12.body)
      ).toEqual(serializedAndSignedSoapNotificationParams);
    });
  });

  describe('mimicSoap11NotificationResponse', () => {
    it('should mimic full SOAP 1.1 response', () => {
      expect(
        mimicSoap11NotificationResponse(
          serializedAndSignedAllowedNotificationResponseParams
        )
      ).toEqual(serializedAllowedNotificationResponse11);

      expect(
        mimicSoap11NotificationResponse(
          serializedAndSignedDeniedNotificationResponseParams
        )
      ).toEqual(serializedDeniedNotificationResponse11);
    });
  });

  describe('mimicSoap12NotificationResponse', () => {
    it('should mimic full SOAP 1.2 response', () => {
      expect(
        mimicSoap12NotificationResponse(
          serializedAndSignedAllowedNotificationResponseParams
        )
      ).toEqual(serializedAllowedNotificationResponse12);

      expect(
        mimicSoap12NotificationResponse(
          serializedAndSignedDeniedNotificationResponseParams
        )
      ).toEqual(serializedDeniedNotificationResponse12);
    });
  });
});
