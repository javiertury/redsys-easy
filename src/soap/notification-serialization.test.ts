import {
  serializeSoapNotificationResponse,
  deserializeSoapNotification
} from './notification-serialization';

import {
  serializedAndSignedSoapNotificationParams,
  deserializedSoapNotification
} from '../../test/fixtures/soap/redirect-notification';

import {
  serializedAllowedNotificationResponseParams,
  allowedNotificationResponseParams
} from '../../test/fixtures/soap/allowed-notification-response';

import {
  serializedDeniedNotificationResponseParams,
  deniedNotificationResponseParams
} from '../../test/fixtures/soap/denied-notification-response';

describe('SOAP Notification serialization', () => {
  it('should serialize "allowed" response', () => {
    const serializedParams = serializeSoapNotificationResponse(allowedNotificationResponseParams);
    expect(serializedParams).toEqual(serializedAllowedNotificationResponseParams);
  });

  it('should serialize "denied" response', () => {
    const serializedParams = serializeSoapNotificationResponse(deniedNotificationResponseParams);
    expect(serializedParams).toEqual(serializedDeniedNotificationResponseParams);
  });

  it('should deserialize notification', () => {
    const deserializedParams = deserializeSoapNotification(serializedAndSignedSoapNotificationParams);
    expect(deserializedParams).toEqual(deserializedSoapNotification);
  });
});
