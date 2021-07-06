import { expectType } from 'tsd';

import { TRANSACTION_TYPES } from '../../src/assets/transaction-types';
import type { TransactionType } from '../../src/assets/transaction-types';

expectType<TransactionType[]>(Object.values(TRANSACTION_TYPES));
