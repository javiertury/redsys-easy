import { sha256Sign } from '../crypto';

import type {
  ParsedSoapNotifiation,
  SoapNotificationResponse
} from '../types/api';

import { ParseError } from '../errors';

export const verifySoapNotification = (
  merchantKey: string,
  xml: string,
  msg: ParsedSoapNotifiation['Message']
): void => {
  const startToken = '<Request';
  const endToken = '</Request>';
  const startPos = xml.indexOf(startToken);
  const endPos = xml.indexOf(endToken);

  if (startPos < 0 || endPos < 0 || startPos > endPos) {
    throw new ParseError(
      'Cannot find payload of SOAP notification Request',
      xml
    );
  }

  const signedStr = xml.slice(startPos, endPos + endToken.length);

  const signature = msg.Signature;
  const order = msg.Request.Ds_Order;

  if (order == null || !order) {
    throw new ParseError('Invalid notification response');
  }

  const expSignature = sha256Sign(merchantKey, order, signedStr);

  if (!signature || signature !== expSignature) {
    throw new ParseError('Invalid signature', signature, xml);
  }
};

export const signSoapNotificationResponse = (
  merchantKey: string,
  serializedResponse: string,
  response: SoapNotificationResponse
) => {
  const signature = sha256Sign(merchantKey, response.order, serializedResponse);

  return `<Message>${serializedResponse}<Signature>${signature}</Signature></Message>`;
};
