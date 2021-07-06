import {
  signSoapNotificationResponse,
  verifySoapNotification
} from './notification-signature';

import {
  ParseError
} from '../errors';

import {
  soapNotificationMerchantKey,
  serializedAndSignedSoapNotificationParams,
  parsedSoapNotification
} from '../../test/fixtures/soap/redirect-notification';

import {
  deniedSoapNotificationResponseMerchantKey as deniedResponseMerchantKey,
  deniedNotificationResponseParams,
  serializedDeniedNotificationResponseParams,
  serializedAndSignedDeniedNotificationResponseParams
} from '../../test/fixtures/soap/denied-notification-response';

import {
  allowedSoapNotificationResponseMerchantKey as allowedResponseMerchantKey,
  allowedNotificationResponseParams,
  serializedAllowedNotificationResponseParams,
  serializedAndSignedAllowedNotificationResponseParams
} from '../../test/fixtures/soap/allowed-notification-response';

import {
  incorrectMerchantKey
} from '../../test/fixtures/merchant-keys';

describe('SOAP Notification signature', () => {
  it('should sign "allowed" response', () => {
    const signedJSONRequest = signSoapNotificationResponse(
      allowedResponseMerchantKey,
      serializedAllowedNotificationResponseParams,
      allowedNotificationResponseParams
    );
    expect(signedJSONRequest).toEqual(serializedAndSignedAllowedNotificationResponseParams);
  });

  it('should sign "denied" response', () => {
    const signedJSONRequest = signSoapNotificationResponse(
      deniedResponseMerchantKey,
      serializedDeniedNotificationResponseParams,
      deniedNotificationResponseParams
    );
    expect(signedJSONRequest).toEqual(serializedAndSignedDeniedNotificationResponseParams);
  });

  it('should verify notification with legit signature', () => {
    expect(
      () => verifySoapNotification(
        soapNotificationMerchantKey,
        serializedAndSignedSoapNotificationParams,
        parsedSoapNotification
      )
    ).not.toThrowError();
  });

  it('should fail to verify notification if merchant key is incorrect', () => {
    expect(
      () => verifySoapNotification(
        incorrectMerchantKey,
        serializedAndSignedSoapNotificationParams,
        parsedSoapNotification
      )
    ).toThrowError(new ParseError('Invalid signature'));
  });

  it('should fail to verify notification if signature is forged', () => {
    const verify = () => verifySoapNotification(
      soapNotificationMerchantKey,
      serializedAndSignedSoapNotificationParams.replace(
        /<Signature>.*<\/Signature>/,
        '<Signature>SSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=</Signature>'
      ),
      {
        ...parsedSoapNotification,
        Signature: 'SSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok='
      }
    );
    expect(verify).toThrowError(new ParseError('Invalid signature'));
  });
});
