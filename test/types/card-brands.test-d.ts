import { expectType } from 'tsd';

import { CardBrand, CARDBRANDS, REV_CARDBRANDS } from '../../src/assets/card-brands';

expectType<Record<CardBrand, string>>(CARDBRANDS);
expectType<Record<string, CardBrand>>(REV_CARDBRANDS);
