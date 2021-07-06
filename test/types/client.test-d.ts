import { expectType } from 'tsd';

import { SANDBOX_URLS, PRODUCTION_URLS } from '../../src/client';
import type { UrlsConfig } from '../../src/client';

expectType<UrlsConfig>(SANDBOX_URLS);
expectType<UrlsConfig>(PRODUCTION_URLS);
