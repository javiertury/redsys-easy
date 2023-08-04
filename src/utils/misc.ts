import { ParseError, ResponseError } from '../errors';
import type {
  CommonRawRequestParams,
  CommonRawResponseParams
} from '../types/api';

/**
 * Discrete uniform distribution with domain (0 to *max*)
 */
const drawPositiveDiscreteUniform = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

const alphanumeric =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Generates a random order ID following redsys requirements
 *
 * @public
 */
export const randomTransactionId = () => {
  // Random 4 digit number between 0 and 9999
  const num = drawPositiveDiscreteUniform(9999);
  const numStr = num.toString().padStart(4, '0');
  // Random 8 letter alphanumeric sequence
  const alphanum = new Array(8);

  for (let idx = 0; idx < 8; idx++) {
    alphanum[idx] =
      alphanumeric[drawPositiveDiscreteUniform(alphanumeric.length - 1)];
  }

  const alphanumStr = alphanum.join('');
  return `${numStr}${alphanumStr}`;
};

export const extractAndAssertOrderFromRequestParams = (
  requestParams: CommonRawRequestParams
): string => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  const order =
    requestParams['DS_MERCHANT_ORDER'] ||
    (requestParams as Record<string, string>)['Ds_Merchant_Order'];

  if (typeof order !== 'string' || !order) {
    throw new ParseError('Missing order number');
  }

  return order;
};

export const extractAndAssertOrderFromResponseParams = (
  responseParams: CommonRawResponseParams
): string => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  const order =
    responseParams['Ds_Order'] ||
    (responseParams as Record<string, string>)['DS_ORDER'];

  if (typeof order !== 'string' || !order) {
    throw new ParseError('Missing order number');
  }

  return order;
};

/**
 * Indicates if a response code signals success
 *
 * @public
 */
export const isResponseCodeOk = (responseCode: string): boolean => {
  const numResCode = Number.parseInt(responseCode);
  return (
    Number.isFinite(numResCode) &&
    ((numResCode >= 0 && numResCode < 100) ||
      numResCode === 400 || // Transaction cancellation authorized
      numResCode === 900) // Refund authorized
  );
};

/**
 * Asserts that response has a code that indicates success
 *
 * @public
 */
export const assertSuccessfulResponseCode = (responseParams: {
  Ds_Response?: string;
}) => {
  const { Ds_Response: resCode } = responseParams;

  if (resCode == null) {
    throw new ParseError('Missing response code');
  }

  if (!isResponseCodeOk(resCode)) {
    throw new ResponseError({
      code: Number.parseInt(resCode),
      response: responseParams
    });
  }
};

export const isStringNotEmpty = <T extends string>(
  str: T | undefined
): str is T => str != null && str.length > 0;
