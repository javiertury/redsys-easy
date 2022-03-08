import { XMLParser } from 'fast-xml-parser';

import type {
  ParsedSoapNotifiation,
  SoapNotificationResponse
} from '../types/api';

export const serializeSoapNotificationResponse = ({ allow: allowOperation }: SoapNotificationResponse): string => {
  const answer = allowOperation ? 'OK' : 'KO';
  return `<Response Ds_Version="0.0"><Ds_Response_Merchant>${answer}</Ds_Response_Merchant></Response>`;
};

const xmlParser = new XMLParser({ parseTagValue: false });

export const deserializeSoapNotification = (xml: string): ParsedSoapNotifiation['Message'] => {
  return (xmlParser.parse(xml) as ParsedSoapNotifiation).Message;
};
