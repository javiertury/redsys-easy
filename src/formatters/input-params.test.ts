import {
  redirectInputFormatter,
  restIniciaPeticionInputFormatter,
  restTrataPeticionInputFormatter
} from './input-params';

import type { BaseInputParams } from '../types/input-params';

import type { BaseFormatterInput } from './types';

import TRANSACTION_TYPES from '../assets/transaction-types';

import {
  unformattedRedirectRequest,
  formattedRedirectRequest
} from '../../test/fixtures/formatters/rest-redirect';

import {
  unformattedRestJsonRequest,
  restJsonRequest
} from '../../test/fixtures/formatters/rest-json';

import {
  iniciaPeticionRequest as iniciaPeticionV1Request,
  unformattedIniciaPeticionRequest as unformattedIniciaPeticionV1Request,
  authDataRequest as authDataV1Request,
  unformattedAuthDataRequest as unformattedAuthDataV1Request,
  challengeResponseRequest as challengeResponseV1Request,
  unformattedChallengeResponseRequest as unformattedChallengeResponseV1Request
} from '../../test/fixtures/formatters/rest-3ds-v1';

import {
  iniciaPeticionRequest as iniciaPeticionV21Request,
  unformattedIniciaPeticionRequest as unformattedIniciaPeticionV21Request,
  authDataRequest as authDataV21Request,
  unformattedAuthDataRequest as unformattedAuthDataV21Request,
  challengeResponseRequest as challengeResponseV21Request,
  unformattedChallengeResponseRequest as unformattedChallengeResponseV21Request
} from '../../test/fixtures/formatters/rest-3ds-v2.1-challenge';

const baseSpec = (
  inputFormatter: <RawParams extends object>(
    input: BaseFormatterInput<RawParams>
  ) => BaseInputParams
) => {
  describe('Should format base input parameters', () => {
    it('should format decimal string currency unit to atomic unit', () => {
      const params = inputFormatter({
        amount: '49.99',
        currency: 'EUR',
        order: '0000Abc',
        merchantCode: '999008881',
        terminal: '1',
        transactionType: TRANSACTION_TYPES.AUTHORIZATION // '0'
      });

      expect(params).toEqual({
        DS_MERCHANT_AMOUNT: '4999',
        DS_MERCHANT_MERCHANTCODE: '999008881',
        DS_MERCHANT_ORDER: '0000Abc',
        DS_MERCHANT_TERMINAL: '1',
        DS_MERCHANT_TRANSACTIONTYPE: '0',
        DS_MERCHANT_CURRENCY: '978'
      });

      const defaultParams = inputFormatter({
        amount: 49.99 as unknown as string,
        currency: 'EUR',
        order: '0000Abc',
        merchantCode: '999008881',
        terminal: '1',
        transactionType: TRANSACTION_TYPES.AUTHORIZATION // '0'
      });

      expect(defaultParams).toEqual({
        DS_MERCHANT_AMOUNT: '4999',
        DS_MERCHANT_MERCHANTCODE: '999008881',
        DS_MERCHANT_ORDER: '0000Abc',
        DS_MERCHANT_TERMINAL: '1',
        DS_MERCHANT_TRANSACTIONTYPE: '0',
        DS_MERCHANT_CURRENCY: '978'
      });
    });

    it('should format currencies', () => {
      const params = inputFormatter({
        amount: '49.99',
        currency: 'EUR',
        order: '0000Abc',
        merchantCode: '999008881',
        terminal: '1',
        transactionType: TRANSACTION_TYPES.AUTHORIZATION // '0'
      });

      expect(params).toEqual({
        DS_MERCHANT_AMOUNT: '4999',
        DS_MERCHANT_MERCHANTCODE: '999008881',
        DS_MERCHANT_ORDER: '0000Abc',
        DS_MERCHANT_TERMINAL: '1',
        DS_MERCHANT_TRANSACTIONTYPE: '0',
        DS_MERCHANT_CURRENCY: '978'
      });
    });

    it('should format currencies, giving priority to internal format', () => {
      const params = inputFormatter({
        amount: '49.99',
        currency: 'EUR',
        order: '0000Abc',
        merchantCode: '999008881',
        terminal: '1',
        transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
        raw: {
          DS_MERCHANT_CURRENCY: '840' // USD
        }
      });

      expect(params).toEqual({
        DS_MERCHANT_AMOUNT: '4999',
        DS_MERCHANT_MERCHANTCODE: '999008881',
        DS_MERCHANT_ORDER: '0000Abc',
        DS_MERCHANT_TERMINAL: '1',
        DS_MERCHANT_TRANSACTIONTYPE: '0',
        DS_MERCHANT_CURRENCY: '840'
      });
    });

    it('should format expiry dates', () => {
      const params = inputFormatter({
        amount: '49.99',
        currency: 'EUR',
        order: '0000Abc',
        merchantCode: '999008881',
        terminal: '1',
        transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
        expiryMonth: '05',
        expiryYear: '20'
      });

      expect(params).toEqual({
        DS_MERCHANT_AMOUNT: '4999',
        DS_MERCHANT_MERCHANTCODE: '999008881',
        DS_MERCHANT_ORDER: '0000Abc',
        DS_MERCHANT_TERMINAL: '1',
        DS_MERCHANT_TRANSACTIONTYPE: '0',
        DS_MERCHANT_CURRENCY: '978',
        DS_MERCHANT_EXPIRYDATE: '2005'
      });
    });
  });
};

describe('redirectInputFormatter', () => {
  baseSpec(redirectInputFormatter);

  it('should format languages', () => {
    const params = redirectInputFormatter({
      amount: '49.99',
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      lang: 'es'
    });

    expect(params).toEqual({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_CONSUMERLANGUAGE: '1'
    });
  });

  it('should format languages, giving priority to internal format', () => {
    const params = redirectInputFormatter({
      amount: '49.99',
      currency: 'EUR',
      order: '0000Abc',
      merchantCode: '999008881',
      terminal: '1',
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      lang: 'es',
      raw: {
        DS_MERCHANT_CONSUMERLANGUAGE: '2' // en
      }
    });

    expect(params).toEqual({
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: '0000Abc',
      DS_MERCHANT_TERMINAL: '1',
      DS_MERCHANT_TRANSACTIONTYPE: '0',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_CONSUMERLANGUAGE: '2'
    });
  });

  it('should format redirect request', () => {
    const formattedParams = redirectInputFormatter(unformattedRedirectRequest);
    expect(formattedParams).toEqual(formattedRedirectRequest);
  });
});

describe('restIniciaPeticionInputFormatter', () => {
  baseSpec(restIniciaPeticionInputFormatter);

  it('should format a 3DS v1 iniciaPeticion request', () => {
    const params = restIniciaPeticionInputFormatter(
      unformattedIniciaPeticionV1Request
    );

    expect(params).toEqual(iniciaPeticionV1Request);
  });

  it('should format a 3DS v2.1 iniciaPeticion request', () => {
    const params = restIniciaPeticionInputFormatter(
      unformattedIniciaPeticionV21Request
    );

    expect(params).toEqual(iniciaPeticionV21Request);
  });
});

describe('restTrataPeticionInputFormatter', () => {
  baseSpec(restTrataPeticionInputFormatter);

  it('should format a json request', () => {
    const params = restTrataPeticionInputFormatter(unformattedRestJsonRequest);

    expect(params).toEqual(restJsonRequest);
  });

  it('should format a 3DS v1 authenticationData request', () => {
    const params = restTrataPeticionInputFormatter(
      unformattedAuthDataV1Request
    );

    expect(params).toEqual(authDataV1Request);
  });

  it('should format a 3DS v1 challengeResponse request', () => {
    const params = restTrataPeticionInputFormatter(
      unformattedChallengeResponseV1Request
    );

    expect(params).toEqual(challengeResponseV1Request);
  });

  it('should format a 3DS v2.1 authenticationData request', () => {
    const params = restTrataPeticionInputFormatter(
      unformattedAuthDataV21Request
    );

    expect(params).toEqual(authDataV21Request);
  });

  it('should format a 3DS v2.1 challengeResponse request', () => {
    const params = restTrataPeticionInputFormatter(
      unformattedChallengeResponseV21Request
    );

    expect(params).toEqual(challengeResponseV21Request);
  });
});
