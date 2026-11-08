import { describe, test as it, expect } from 'vitest';
import {
  deserializeAndVerifySoapNotification,
  serializeAndSignSoapNotificationResponse
} from './notification';

import { ParseError } from '../errors';

import { incorrectMerchantKey } from '../../test/fixtures/merchant-keys';

import {
  soapNotificationMerchantKey,
  serializedAndSignedSoapNotificationParams,
  deserializedSoapNotification
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
    const serializedAndSignedResponse =
      serializeAndSignSoapNotificationResponse(
        allowedResponseMerchantKey,
        allowedNotificationResponseParams
      );
    expect(serializedAndSignedResponse).toEqual(
      serializedAndSignedAllowedNotificationResponseParams
    );
  });

  it('should serialize and sign "denied" response', () => {
    const serializedAndSignedResponse =
      serializeAndSignSoapNotificationResponse(
        deniedResponseMerchantKey,
        deniedNotificationResponseParams
      );
    expect(serializedAndSignedResponse).toEqual(
      serializedAndSignedDeniedNotificationResponseParams
    );
  });

  it('should deserialize and verify legit notification', () => {
    const verify = () =>
      deserializeAndVerifySoapNotification(
        soapNotificationMerchantKey,
        serializedAndSignedSoapNotificationParams
      );
    expect(verify).not.toThrow();

    const deserializedRequest = deserializeAndVerifySoapNotification(
      soapNotificationMerchantKey,
      serializedAndSignedSoapNotificationParams
    );
    expect(deserializedRequest).toEqual(deserializedSoapNotification.Request);
  });

  it('should fail to verify notification if merchant key is incorrect', () => {
    const verify = () =>
      deserializeAndVerifySoapNotification(
        incorrectMerchantKey,
        serializedAndSignedSoapNotificationParams
      );
    expect(verify).toThrow(new ParseError(
      'Invalid signature',
      'RSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=',
      '<Message><Request Ds_Version="0.0"><Fecha>01/04/2003</Fecha><Hora>16:57</Hora><Ds_SecurePayment>1</Ds_SecurePayment><Ds_Amount>345</Ds_Amount><Ds_Currency>978</Ds_Currency><Ds_Order>165446</Ds_Order><Ds_Card_Type>C</Ds_Card_Type><Ds_MerchantCode>999008881</Ds_MerchantCode><Ds_Terminal>001</Ds_Terminal><Ds_Card_Country>724</Ds_Card_Country><Ds_Response>0000</Ds_Response><Ds_MerchantData>Alfombrilla para raton</Ds_MerchantData><Ds_TransactionType>1</Ds_TransactionType><Ds_ConsumerLanguage>1</Ds_ConsumerLanguage></Request><Signature>RSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=</Signature></Message>'
    ));
  });

  it('should fail to verify notification if signature is forged', () => {
    const verify = () =>
      deserializeAndVerifySoapNotification(
        soapNotificationMerchantKey,
        serializedAndSignedSoapNotificationParams.replace(
          /<Signature>.*<\/Signature>/,
          '<Signature>SSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=</Signature>'
        )
      );
    expect(verify).toThrow(new ParseError(
      'Invalid signature',
      'SSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=',
      '<Message><Request Ds_Version="0.0"><Fecha>01/04/2003</Fecha><Hora>16:57</Hora><Ds_SecurePayment>1</Ds_SecurePayment><Ds_Amount>345</Ds_Amount><Ds_Currency>978</Ds_Currency><Ds_Order>165446</Ds_Order><Ds_Card_Type>C</Ds_Card_Type><Ds_MerchantCode>999008881</Ds_MerchantCode><Ds_Terminal>001</Ds_Terminal><Ds_Card_Country>724</Ds_Card_Country><Ds_Response>0000</Ds_Response><Ds_MerchantData>Alfombrilla para raton</Ds_MerchantData><Ds_TransactionType>1</Ds_TransactionType><Ds_ConsumerLanguage>1</Ds_ConsumerLanguage></Request><Signature>SSOw0q6VSNrs4IOS2sS261JDAOMGeSPR9rGdPaxw+ok=</Signature></Message>'
    ));
  });
});
