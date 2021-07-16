import xmlParser from 'fast-xml-parser';

import type {
  ParsedSoapNotifiation,
  SoapNotificationResponse
} from '../types/api';

export const serializeSoapNotificationResponse = ({ allow: allowOperation }: SoapNotificationResponse): string => {
  const answer = allowOperation ? 'OK' : 'KO';
  return `<Response Ds_Version="0.0"><Ds_Response_Merchant>${answer}</Ds_Response_Merchant></Response>`;
};

export const deserializeSoapNotification = (xml: string): ParsedSoapNotifiation['Message'] => {
  return (xmlParser.parse(xml, { parseNodeValue: false }) as ParsedSoapNotifiation).Message;
};
