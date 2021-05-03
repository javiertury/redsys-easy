import { ParseError, RedsysError } from './errors';
import type {
  RawRequestParams,
  RawResponseParams
} from './types/api';

/**
 * Discrete uniform distribution with domain (0 to *max*)
 */
const drawPositiveDiscreteUniform = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const randomTransactionId = () => {
  // Random 4 digit number between 0 and 9999
  const num = drawPositiveDiscreteUniform(9999);
  const numStr = num.toString().padStart(4, '0');
  // Random 8 letter alphanumeric sequence
  const alphanum = new Array(8);

  for (let idx = 0; idx < 8; idx++) {
    alphanum[idx] = alphanumeric[drawPositiveDiscreteUniform(alphanumeric.length - 1)];
  }

  const alphanumStr = alphanum.join('');
  return `${numStr}${alphanumStr}`;
};

export const extractAndAssertOrderFromRawRequestParams = (rawRequestParams: RawRequestParams): string => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  const order = rawRequestParams['DS_MERCHANT_ORDER'] || rawRequestParams['Ds_Merchant_Order'];

  if (typeof order !== 'string' || !order) {
    throw new RedsysError('Missing order number');
  }

  return order;
};

export const extractAndAssertOrderFromRawResponseParams = (rawResponseParams: RawResponseParams): string => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  const order = rawResponseParams['Ds_Order'] || rawResponseParams['DS_ORDER'];

  if (typeof order !== 'string' || !order) {
    throw new ParseError('Missing order number');
  }

  return order;
};

export const extractAndAssertResponseCodeFromRawResponseParams = (
  rawResponseParams: RawResponseParams
): number => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  const codeStr = rawResponseParams['Ds_Response'] || rawResponseParams['DS_RESPONSE'];

  const code = typeof codeStr === 'string' && codeStr.length > 0
    ? Number.parseInt(codeStr)
    : undefined;

  if (!Number.isFinite(code)) {
    throw new ParseError('Missing response code');
  }

  return code as number;
};
