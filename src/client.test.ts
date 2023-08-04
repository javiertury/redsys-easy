import { expectType } from 'ts-expect';
import type { TypeEqual } from 'ts-expect';

import type { UrlsConfig, SANDBOX_URLS, PRODUCTION_URLS } from './client';

describe('UrlsConfig', () => {
  it('should match type of default urls', () => {
    expectType<TypeEqual<UrlsConfig, typeof SANDBOX_URLS>>(true);

    expectType<TypeEqual<UrlsConfig, typeof PRODUCTION_URLS>>(true);
  });
});
