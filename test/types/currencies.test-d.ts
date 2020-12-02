import { expectType } from 'tsd';

import { Currency, CURRENCIES, REV_CURRENCIES } from '../../src/assets/currencies';

expectType<Record<Currency, {
  num: string
  decimals: number
}>>(CURRENCIES);

expectType<Record<string, {
  code: Currency
  decimals: number
}>>(REV_CURRENCIES);
