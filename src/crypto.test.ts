import base64url from 'base64url';

import {
  zeroPad,
  encrypt3DES,
  sha256Sign
} from './crypto';

import {
  redirectMerchantKey,
  redirectRequest,
  redirectRequest3DESOrder,
  serializedAndSignedRedirectRequest,
  serializedRestNotification,
  deserializedRestNotification
} from '../test/fixtures/rest/redirect';

import {
  redirectWithIdentifierMerchantKey,
  redirectWithIdentifierRequest,
  redirectWithIdentifier3DESOrder,
  deserializedRestNotificationWithIdentifier
} from '../test/fixtures/rest/redirect-identifier';

import {
  restJsonMerchantKey,
  restJsonRequest,
  serializedAndSignedRestJsonRequest,
  serializedRestJsonResponse,
  deserializedRestJsonResponse,
  restJson3DESOrder
} from '../test/fixtures/rest/rest-json';

import {
  allowedSoapNotificationResponseMerchantKey,
  allowedNotificationResponseParams,
  serializedAllowedNotificationResponseParams,
  allowedNotificationResponseParamsSignature,
  allowedNotificationResponse3DESOrder
} from '../test/fixtures/soap/allowed-notification-response';

import {
  deniedSoapNotificationResponseMerchantKey,
  deniedNotificationResponseParams,
  serializedDeniedNotificationResponseParams,
  deniedNotificationResponseParamsSignature,
  deniedNotificationResponse3DESOrder
} from '../test/fixtures/soap/denied-notification-response';

import {
  soapNotificationMerchantKey,
  serializedSoapNotificationParams,
  deserializedSoapNotification,
  soapNotification3DESOrder
} from '../test/fixtures/soap/redirect-notification';

describe('Crypto', () => {
  describe('zeroPad', () => {
    it('should pad buffer if not already aligned', () => {
      expect(
        zeroPad(Buffer.from('A0', 'hex'), 2)
      ).toEqual(Buffer.from('A000', 'hex'));

      expect(
        zeroPad(Buffer.from('A077', 'hex'), 4)
      ).toEqual(Buffer.from('A0770000', 'hex'));

      expect(
        zeroPad(Buffer.from('A077', 'hex'), 8)
      ).toEqual(Buffer.from('A077000000000000', 'hex'));

      expect(
        zeroPad(Buffer.from('A077', 'hex'), 16)
      ).toEqual(Buffer.from('A0770000000000000000000000000000', 'hex'));
    });

    it('should not pad buffer if already aligned', () => {
      expect(
        zeroPad(Buffer.from('A077', 'hex'), 2)
      ).toEqual(Buffer.from('A077', 'hex'));

      expect(
        zeroPad(Buffer.from('A07712F0', 'hex'), 4)
      ).toEqual(Buffer.from('A07712F0', 'hex'));

      expect(
        zeroPad(Buffer.from('A07712F0FF4CD8FF', 'hex'), 8)
      ).toEqual(Buffer.from('A07712F0FF4CD8FF', 'hex'));

      expect(
        zeroPad(Buffer.from('A07712F0FF4CD8FFA07712F0FF4CD8FF', 'hex'), 16)
      ).toEqual(Buffer.from('A07712F0FF4CD8FFA07712F0FF4CD8FF', 'hex'));
    });
  });

  describe('encrypt3DES', () => {
    it('should should encrypt message', () => {
      expect(
        encrypt3DES('sq7HjrUOBfKmC576ILgskD5srU870gJ7', '012345678')
      ).toEqual(Buffer.from('ub0/L8+E9+9ITQJwk3SvHA==', 'base64'));

      expect(
        encrypt3DES(redirectMerchantKey, redirectRequest.DS_MERCHANT_ORDER)
      ).toEqual(Buffer.from(redirectRequest3DESOrder, 'base64'));

      expect(
        encrypt3DES(redirectWithIdentifierMerchantKey, redirectWithIdentifierRequest.DS_MERCHANT_ORDER)
      ).toEqual(Buffer.from(redirectWithIdentifier3DESOrder, 'base64'));

      expect(
        encrypt3DES(redirectMerchantKey, deserializedRestNotification.Ds_Order)
      ).toEqual(Buffer.from(redirectRequest3DESOrder, 'base64'));

      expect(
        encrypt3DES(redirectWithIdentifierMerchantKey, deserializedRestNotificationWithIdentifier.Ds_Order)
      ).toEqual(Buffer.from(redirectWithIdentifier3DESOrder, 'base64'));

      expect(
        encrypt3DES(restJsonMerchantKey, restJsonRequest.DS_MERCHANT_ORDER)
      ).toEqual(Buffer.from(restJson3DESOrder, 'base64'));

      expect(
        encrypt3DES(restJsonMerchantKey, deserializedRestJsonResponse.Ds_Order)
      ).toEqual(Buffer.from(restJson3DESOrder, 'base64'));

      expect(
        encrypt3DES(allowedSoapNotificationResponseMerchantKey, allowedNotificationResponseParams.order)
      ).toEqual(Buffer.from(allowedNotificationResponse3DESOrder, 'base64'));

      expect(
        encrypt3DES(deniedSoapNotificationResponseMerchantKey, deniedNotificationResponseParams.order)
      ).toEqual(Buffer.from(deniedNotificationResponse3DESOrder, 'base64'));

      expect(
        encrypt3DES(soapNotificationMerchantKey, deserializedSoapNotification.Request.Ds_Order)
      ).toEqual(Buffer.from(soapNotification3DESOrder, 'base64'));
    });

    it('should throw if key length is not 8 bytes', () => {
      expect(
        () => encrypt3DES('ky', 'abcd')
      ).toThrow('Invalid key length');

      expect(
        () => encrypt3DES('oHcS8P9M2P+g', 'abcd')
      ).toThrow('Invalid key length');

      expect(
        () => encrypt3DES('oHcS8P9M2P+gdxLw/0zY/w==', 'abcd')
      ).toThrow('Invalid key length');
    });
  });

  describe('sha256Sign', () => {
    it('should should sign message', () => {
      expect(
        sha256Sign(
          redirectMerchantKey,
          redirectRequest.DS_MERCHANT_ORDER,
          serializedAndSignedRedirectRequest.Ds_MerchantParameters
        )
      ).toEqual(serializedAndSignedRedirectRequest.Ds_Signature);

      expect(
        sha256Sign(
          redirectMerchantKey,
          deserializedRestNotification.Ds_Order,
          serializedRestNotification.Ds_MerchantParameters
        )
      // Redsys returns base64url encoded instead of regular base64
      ).toEqual(base64url.toBuffer(serializedRestNotification.Ds_Signature).toString('base64'));

      expect(
        sha256Sign(
          restJsonMerchantKey,
          restJsonRequest.DS_MERCHANT_ORDER,
          serializedAndSignedRestJsonRequest.Ds_MerchantParameters
        )
      ).toEqual(serializedAndSignedRestJsonRequest.Ds_Signature);

      expect(
        sha256Sign(
          restJsonMerchantKey,
          deserializedRestJsonResponse.Ds_Order,
          serializedRestJsonResponse.Ds_MerchantParameters
        )
      // Redsys returns base64url encoded instead of regular base64
      ).toEqual(base64url.toBuffer(serializedRestJsonResponse.Ds_Signature).toString('base64'));

      expect(
        sha256Sign(
          allowedSoapNotificationResponseMerchantKey,
          allowedNotificationResponseParams.order,
          serializedAllowedNotificationResponseParams
        )
      ).toEqual(allowedNotificationResponseParamsSignature);

      expect(
        sha256Sign(
          deniedSoapNotificationResponseMerchantKey,
          deniedNotificationResponseParams.order,
          serializedDeniedNotificationResponseParams
        )
      ).toEqual(deniedNotificationResponseParamsSignature);

      expect(
        sha256Sign(
          soapNotificationMerchantKey,
          deserializedSoapNotification.Request.Ds_Order,
          serializedSoapNotificationParams
        )
      ).toEqual(deserializedSoapNotification.Signature);
    });
  });
});
