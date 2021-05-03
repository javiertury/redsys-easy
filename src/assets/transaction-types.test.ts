import { TransactionType, TRANSACTION_TYPES } from './transaction-types';

describe('Transaction types', () => {
  it('Typescript type definitions must match actual values', () => {
    /*
     * The goal is to check that TRANSACTION_TYPES implements all TransactionType
     * union members defined. This can't be done in pure typescript so it became
     * a unit test.
     *
     * The Record transaciontTypeToIndex makes sure that all TransactionType union
     * members are used as keys. Then at runtime we collect all transaction types
     * using Object.keys and check that they are all included as values in
     * TRANSACTION_TYPES.
     */

    const allTransactionTypeToNull: Record<TransactionType, null> = {
      0: null,
      1: null,
      2: null,
      3: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      O: null,
      F: null,
      P: null,
      Q: null,
      R: null,
      S: null,
      A: null,
      44: null
    };

    const allTransactionTypes = Object.keys(allTransactionTypeToNull);
    const implementedTransactionTypes = Object.values(TRANSACTION_TYPES);

    expect(implementedTransactionTypes).toEqual(expect.arrayContaining(allTransactionTypes));
  });
});
