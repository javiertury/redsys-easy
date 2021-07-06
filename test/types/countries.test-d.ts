import { expectType } from 'tsd';

import { COUNTRIES, REV_COUNTRIES } from '../../src/assets/countries';
import type { Country } from '../../src/assets/countries';

expectType<Record<Country, string>>(COUNTRIES);

expectType<Record<string, Country>>(REV_COUNTRIES);
