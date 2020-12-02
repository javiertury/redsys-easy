import { expectType } from 'tsd';

import { TransactionType, TRANSACTION_TYPES } from '../../src/assets/transaction-types';

expectType<TransactionType[]>(Object.values(TRANSACTION_TYPES));
