import { expectType } from 'tsd';

import { Country, COUNTRIES, REV_COUNTRIES } from '../../src/assets/countries';

expectType<Record<Country, string>>(COUNTRIES);

expectType<Record<string, Country>>(REV_COUNTRIES);
