import {
  parseSoapNotification,
  serializeSoapNotificationResponse
} from './notification-serialization';

import type {
  RawResponseParams,
  SoapNotificationResponse
} from '../types/api';

import {
  verifySoapNotification,
  signSoapNotificationResponse
} from './notification-signature';

export const serializeAndSignSoapNotificationResponse = (
  merchantKey: string,
  response: SoapNotificationResponse
): string => {
  const serializedResponse = serializeSoapNotificationResponse(response);
  return signSoapNotificationResponse(merchantKey, serializedResponse, response);
};

export const parseAndVerifySoapNotification = (
  merchantKey: string,
  xml: string
): RawResponseParams => {
  const msg = parseSoapNotification(xml);
  verifySoapNotification(merchantKey, xml, msg);

  // Return only parameters. Signature is useless after verification
  return msg.Request;
};
