import { expectType } from 'ts-expect';
import type { TypeEqual } from 'ts-expect';

import { TRANSACTION_TYPES } from './transaction-types';
import type { TransactionType } from './transaction-types';

describe('TRANSACTION_TYPES', () => {
  it('should use the TransactionType interface', () => {
    expectType<TypeEqual<
      TransactionType,
      (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES]
    >>(true);
  });

  it('should have a key for each TransactionType', () => {
    /*
     * The Record key makes sure that all members of the key union type are defined.
     * Then at runtime we collect all keys and compare them to the values of the enum
     * to checkout that all of them are implemented
     */

    const allTransactionTypeObj: Record<TransactionType, true> = {
      0: true,
      1: true,
      2: true,
      3: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      15: true,
      17: true,
      34: true,
      37: true,
      44: true,
      O: true,
      F: true,
      P: true,
      Q: true,
      R: true,
      S: true,
      A: true
    };

    const allTransactionTypes = Object.keys(allTransactionTypeObj).sort();
    const implementedTransactionTypes = Object.values(TRANSACTION_TYPES).sort();

    expect(implementedTransactionTypes).toEqual(allTransactionTypes);
  });
});
