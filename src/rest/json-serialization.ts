import {
  ParseError
} from '../errors';

export const deserializeJSONMerchantParams = <DeserializedResponseParams = unknown>(
  strPayload: string
): DeserializedResponseParams => {
  if (!strPayload) {
    throw new ParseError('Payload is empty');
  }

  if (typeof strPayload !== 'string') {
    throw new ParseError('Payload must be a base-64 encoded string');
  }
  const payload = JSON.parse(decodeURIComponent(Buffer.from(strPayload, 'base64').toString('utf8'))) as DeserializedResponseParams | null | undefined;

  if (typeof payload !== 'object' || payload == null) {
    throw new ParseError('Cannot parse notification payload');
  }

  return payload;
};

export const serializeJSONMerchantParams = (
  requestParams: unknown
): string => {
  // Official redsys docs escape "/" because they use php json_encode. I think
  // this is wrong and it also works without escaping.
  return Buffer.from(JSON.stringify(requestParams), 'utf8').toString('base64');
};
