import { expectType } from 'tsd';

import { UrlsConfig, SANDBOX_URLS, PRODUCTION_URLS } from '../../src';

expectType<UrlsConfig>(SANDBOX_URLS);
expectType<UrlsConfig>(PRODUCTION_URLS);
