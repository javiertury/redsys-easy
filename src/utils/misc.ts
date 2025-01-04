import { randomInt } from 'node:crypto';
import { ParseError, ResponseError } from '../errors';
import type {
  CommonRawRequestParams,
  CommonRawResponseParams
} from '../types/api';

/**
 * Discrete uniform distribution with domain (0 to *max*)
 */
const drawPositiveDiscreteUniform = (max: number): number => randomInt(max + 1);

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
export const isResponseCodeOk = (responseCode: string | number): boolean => {
  const numResCode =
    typeof responseCode === 'string'
      ? Number.parseInt(responseCode)
      : responseCode;
  return (
    Number.isFinite(numResCode) &&
    ((numResCode >= 0 && numResCode < 100) ||
      numResCode === 400 || // Transaction cancellation authorized
      numResCode === 900) // Refund authorized
  );
};

/**
 * Asserts that a response code indicates success
 *
 * @public
 */
export const assertSuccessfulResponseCode = (
  responseCode: string | number | undefined
) => {
  if (responseCode == null) {
    throw new ParseError('Missing response code');
  }

  if (!isResponseCodeOk(responseCode)) {
    throw new ResponseError({
      code:
        typeof responseCode === 'string'
          ? Number.parseInt(responseCode)
          : responseCode
    });
  }
};

/**
 * Asserts that response has a code indicating success
 *
 * @public
 */
export const assertSuccessfulResponse = (responseParams: {
  Ds_Response?: string | undefined;
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

/**
 * Map over maybe monad
 *
 * If value is defined apply function and return output, otherwise return undefined.
 */
export const mapMaybeMonad = <V, Out>(
  value: V | undefined,
  fn: (value: V) => Out
): Out | undefined => (value !== undefined ? fn(value) : undefined);
