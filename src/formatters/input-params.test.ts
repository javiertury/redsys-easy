import {
  createRedirectInputFormatter,
  createRequestInputFormatter
} from './input-params';

import type {
  FormatterOptions
} from './input-params';

import type {
  BaseInputParams
} from '../types/input-params';

import type {
  BaseFormattedInput
} from './types';

import TRANSACTION_TYPES from '../assets/transaction-types';

import {
  unformattedRedirectRequest,
  formattedRedirectRequest
} from '../../test/fixtures/formatters/rest-redirect';

import {
  unformattedWebServiceRequest,
  formattedWebServiceRequest
} from '../../test/fixtures/formatters/web-service-request';

const baseSpec = (
  createFormatter: (opts?: FormatterOptions) => (
    <RawParams extends object>(input: BaseFormattedInput<RawParams>) => BaseInputParams
  )
) => {
  describe('Should format base input parameters', () => {
    it('should format atomic amount by default', () => {
      const formatInputAtomic = createFormatter({ amountType: 'atomic' });
      const params = formatInputAtomic({
        amount: 4999,
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

      const formatInputDefault = createFormatter();
      const defaultParams = formatInputDefault({
        amount: 4999,
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

    it('should allow format float amount', () => {
      const formatInput = createFormatter({ amountType: 'float' });
      const params = formatInput({
        amount: 49.99,
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

    it('should format currencies', () => {
      const formatInput = createFormatter();
      const params = formatInput({
        amount: 4999,
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
      const formatInput = createFormatter();
      const params = formatInput({
        amount: 4999,
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
      const formatInput = createFormatter();
      const params = formatInput({
        amount: 4999,
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

describe('createRedirectInputFormatter', () => {
  baseSpec(createRedirectInputFormatter);

  it('should format languages', () => {
    const formatInput = createRedirectInputFormatter();
    const params = formatInput({
      amount: 4999,
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
    const formatInput = createRedirectInputFormatter();
    const params = formatInput({
      amount: 4999,
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
    const formatInput = createRedirectInputFormatter();
    const formattedParams = formatInput(unformattedRedirectRequest);
    expect(formattedParams).toEqual(formattedRedirectRequest);
  });
});

describe('createRequestInputFormatter', () => {
  baseSpec(createRequestInputFormatter);

  it('should format web service request', () => {
    const formatInput = createRequestInputFormatter();
    const formattedParams = formatInput(unformattedWebServiceRequest);
    expect(formattedParams).toEqual(formattedWebServiceRequest);
  });
});
