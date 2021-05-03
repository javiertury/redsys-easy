import {
  ParseError
} from '../errors';
import type {
  RawResponseParams,
  RawRequestParams
} from '../types/api';

export const parseJSONMerchantParams = (strPayload: string): RawResponseParams => {
  if (!strPayload) {
    throw new ParseError('Payload is empty');
  }

  if (typeof strPayload !== 'string') {
    throw new ParseError('Payload must be a base-64 encoded string');
  }
  const payload = JSON.parse(decodeURIComponent(Buffer.from(strPayload, 'base64').toString('utf8'))) as RawResponseParams | null | undefined;

  if (typeof payload !== 'object' || payload == null) {
    throw new ParseError('Cannot parse notification payload');
  }

  return payload;
};

export const serializeJSONMerchantParams = (rawRequestParams: RawRequestParams): string => {
  // Official redsys docs escape "/" because they use php json_encode. I think
  // this is wrong and it also works without escaping.
  return Buffer.from(JSON.stringify(rawRequestParams), 'utf8').toString('base64');
};
