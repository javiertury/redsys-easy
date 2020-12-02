import { expectType } from 'tsd';

import { Language, LANGUAGES, REV_LANGUAGES } from '../../src/assets/lang-codes';

expectType<Record<Language, string>>(LANGUAGES);
expectType<Record<string, Language>>(REV_LANGUAGES);
