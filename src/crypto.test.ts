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
  serializedAndSignedRedirectRequest
} from '../test/fixtures/rest/redirect';

import {
  restNotificationMerchantKey,
  serializedRestNotification,
  parsedRestNotification,
  restNotification3DESOrder
} from '../test/fixtures/rest/notification';

import {
  jsonRequestMerchantKey,
  jsonRequest,
  jsonRequest3DESOrder,
  serializedAndSignedJSONRequest
} from '../test/fixtures/rest/json-request';

import {
  jsonResponseMerchantKey,
  parsedJSONResponse,
  serializedJSONResponse,
  jsonResponse3DESOrder
} from '../test/fixtures/rest/json-response';

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
  parsedSoapNotification,
  soapNotification3DESOrder
} from '../test/fixtures/soap/notification';

import {
  webServiceRequestMerchantKey,
  webServiceRequestParams,
  webServiceRequest3DESOrder,
  serializedWebServiceRequestParams,
  webServiceRequestSignature
} from '../test/fixtures/soap/web-service-request';

import {
  webServiceResponseMerchantKey,
  webServiceResponseSignedString,
  parsedWebServiceResponse,
  webServiceResponse3DESOrder
} from '../test/fixtures/soap/web-service-response';

import {
  webServiceResponseWithCCMerchantKey,
  webServiceResponseWithCCSignedString,
  parsedWebServiceResponseWithCC,
  webServiceResponseWithCC3DESOrder
} from '../test/fixtures/soap/web-service-response-with-cc';

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
        encrypt3DES(restNotificationMerchantKey, parsedRestNotification.Ds_Order)
      ).toEqual(Buffer.from(restNotification3DESOrder, 'base64'));

      expect(
        encrypt3DES(jsonRequestMerchantKey, jsonRequest.DS_MERCHANT_ORDER)
      ).toEqual(Buffer.from(jsonRequest3DESOrder, 'base64'));

      expect(
        encrypt3DES(jsonResponseMerchantKey, parsedJSONResponse.Ds_Order)
      ).toEqual(Buffer.from(jsonResponse3DESOrder, 'base64'));

      expect(
        encrypt3DES(allowedSoapNotificationResponseMerchantKey, allowedNotificationResponseParams.order)
      ).toEqual(Buffer.from(allowedNotificationResponse3DESOrder, 'base64'));

      expect(
        encrypt3DES(deniedSoapNotificationResponseMerchantKey, deniedNotificationResponseParams.order)
      ).toEqual(Buffer.from(deniedNotificationResponse3DESOrder, 'base64'));

      expect(
        encrypt3DES(soapNotificationMerchantKey, parsedSoapNotification.Request.Ds_Order)
      ).toEqual(Buffer.from(soapNotification3DESOrder, 'base64'));

      expect(
        encrypt3DES(webServiceRequestMerchantKey, webServiceRequestParams.DS_MERCHANT_ORDER)
      ).toEqual(Buffer.from(webServiceRequest3DESOrder, 'base64'));

      expect(
        encrypt3DES(webServiceResponseMerchantKey, parsedWebServiceResponse.OPERACION.Ds_Order)
      ).toEqual(Buffer.from(webServiceResponse3DESOrder, 'base64'));

      expect(
        encrypt3DES(webServiceResponseWithCCMerchantKey, parsedWebServiceResponseWithCC.OPERACION.Ds_Order)
      ).toEqual(Buffer.from(webServiceResponseWithCC3DESOrder, 'base64'));
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
          restNotificationMerchantKey,
          parsedRestNotification.Ds_Order,
          serializedRestNotification.Ds_MerchantParameters
        )
      // Redsys returns base64url encoded instead of regular base64
      ).toEqual(base64url.toBuffer(serializedRestNotification.Ds_Signature).toString('base64'));

      expect(
        sha256Sign(
          jsonRequestMerchantKey,
          jsonRequest.DS_MERCHANT_ORDER,
          serializedAndSignedJSONRequest.Ds_MerchantParameters
        )
      ).toEqual(serializedAndSignedJSONRequest.Ds_Signature);

      expect(
        sha256Sign(
          jsonResponseMerchantKey,
          parsedJSONResponse.Ds_Order,
          serializedJSONResponse.Ds_MerchantParameters
        )
      // Redsys returns base64url encoded instead of regular base64
      ).toEqual(base64url.toBuffer(serializedJSONResponse.Ds_Signature).toString('base64'));

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
          parsedSoapNotification.Request.Ds_Order,
          serializedSoapNotificationParams
        )
      ).toEqual(parsedSoapNotification.Signature);

      expect(
        sha256Sign(
          webServiceRequestMerchantKey,
          webServiceRequestParams.DS_MERCHANT_ORDER,
          serializedWebServiceRequestParams
        )
      ).toEqual(webServiceRequestSignature);

      expect(
        sha256Sign(
          webServiceResponseMerchantKey,
          parsedWebServiceResponse.OPERACION.Ds_Order,
          webServiceResponseSignedString
        )
      ).toEqual(parsedWebServiceResponse.OPERACION.Ds_Signature);

      expect(
        sha256Sign(
          webServiceResponseWithCCMerchantKey,
          parsedWebServiceResponseWithCC.OPERACION.Ds_Order,
          webServiceResponseWithCCSignedString
        )
      ).toEqual(parsedWebServiceResponseWithCC.OPERACION.Ds_Signature);
    });
  });
});
