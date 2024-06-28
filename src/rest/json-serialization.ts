import { ParseError } from '../errors';

export const deserializeJSONMerchantParams = <
  DeserializedResponseParams = unknown
>(
  strPayload: string
): DeserializedResponseParams => {
  if (!strPayload) {
    throw new ParseError('Payload is empty');
  }

  if (typeof strPayload !== 'string') {
    throw new ParseError('Payload must be a base-64 encoded string');
  }
  const payload = JSON.parse(
    Buffer.from(strPayload, 'base64').toString('utf8')
  ) as DeserializedResponseParams | null | undefined;

  if (typeof payload !== 'object' || payload == null) {
    throw new ParseError('Cannot parse notification payload');
  }

  const payloadObj = payload as Record<string, unknown>;
  for (const key of Object.keys(payload)) {
    const value = payloadObj[key];
    if (typeof value !== 'string') continue;
    try {
      payloadObj[key] = decodeURIComponent(value);
    } catch (e) {}
  }

  return payload;
};

export const serializeJSONMerchantParams = (requestParams: unknown): string => {
  // Official redsys docs escape "/" because they use php json_encode. I think
  // this is wrong and it also works without escaping.
  return Buffer.from(JSON.stringify(requestParams), 'utf8').toString('base64');
};
