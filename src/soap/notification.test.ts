import {
  parseAndVerifySoapNotification,
  serializeAndSignSoapNotificationResponse
} from './notification';

import {
  ParseError
} from '../errors';

import {
  incorrectMerchantKey
} from '../../test/fixtures/merchant-keys';

import {
  soapNotificationMerchantKey,
  serializedAndSignedSoapNotificationParams,
  parsedSoapNotification
} from '../../test/fixtures/soap/redirect-notification';

import {
  deniedSoapNotificationResponseMerchantKey as deniedResponseMerchantKey,
  deniedNotificationResponseParams,
  serializedAndSignedDeniedNotificationResponseParams
} from '../../test/fixtures/soap/denied-notification-response';

import {
  allowedSoapNotificationResponseMerchantKey as allowedResponseMerchantKey,
  allowedNotificationResponseParams,
  serializedAndSignedAllowedNotificationResponseParams
} from '../../test/fixtures/soap/allowed-notification-response';

describe('SOAP Notification', () => {
  it('should serialize and sign "allowed" response', () => {
    const serializedAndSignedResponse = serializeAndSignSoapNotificationResponse(
      allowedResponseMerchantKey,
      allowedNotificationResponseParams
    );
    expect(serializedAndSignedResponse).toEqual(serializedAndSignedAllowedNotificationResponseParams);
  });

  it('should serialize and sign "denied" response', () => {
    const serializedAndSignedResponse = serializeAndSignSoapNotificationResponse(
      deniedResponseMerchantKey,
      deniedNotificationResponseParams
    );
    expect(serializedAndSignedResponse).toEqual(serializedAndSignedDeniedNotificationResponseParams);
  });

  it('should parse and verify legit notification', () => {
    const verify = () => parseAndVerifySoapNotification(soapNotificationMerchantKey, serializedAndSignedSoapNotificationParams);
    expect(verify).not.toThrowError();

    const parsedRequest = parseAndVerifySoapNotification(soapNotificationMerchantKey, serializedAndSignedSoapNotificationParams);
    expect(parsedRequest).toEqual(parsedSoapNotification.Request);
  });

  it('should fail to verify notification if merchant key is incorrect', () => {
    const verify = () => parseAndVerifySoapNotification(incorrectMerchantKey, serializedAndSignedSoapNotificationParams);
    expect(verify).toThrowError(new ParseError('Invalid signature'));
  });

  it('should fail to verify notification if signature is forged', () => {
    const verify = () => parseAndVerifySoapNotification(
      soapNotificationMerchantKey,
      serializedAndSignedSoapNotificationParams.replace(
        /<Signature>.*<\/Signature>/,
        '<Signature>SSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=</Signature>'
      )
    );
    expect(verify).toThrowError(new ParseError('Invalid signature'));
  });
});
