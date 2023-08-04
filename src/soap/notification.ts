import {
  deserializeSoapNotification,
  serializeSoapNotificationResponse
} from './notification-serialization';

import type { SoapNotificationResponse } from '../types/api';

import type { SoapNotificationOutputParams } from '../types/output-params';

import {
  verifySoapNotification,
  signSoapNotificationResponse
} from './notification-signature';

export const serializeAndSignSoapNotificationResponse = (
  merchantKey: string,
  response: SoapNotificationResponse
): string => {
  const serializedResponse = serializeSoapNotificationResponse(response);
  return signSoapNotificationResponse(
    merchantKey,
    serializedResponse,
    response
  );
};

export const deserializeAndVerifySoapNotification = (
  merchantKey: string,
  xml: string
): SoapNotificationOutputParams => {
  const msg = deserializeSoapNotification(xml);
  verifySoapNotification(merchantKey, xml, msg);

  // Return only parameters. Signature is useless after verification
  return msg.Request;
};
