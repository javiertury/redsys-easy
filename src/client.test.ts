import { expectType } from 'ts-expect';
import type { TypeEqual } from 'ts-expect';

import type { UrlsConfig, PRODUCTION_URLS } from './client';
import { createRedsysAPI, SANDBOX_URLS } from './client';

import {
  redirectWithDccMerchantKey,
  serializedRestNotificationWithDcc,
  deserializedRestNotificationWithDcc,
  serializedRedirectNotificationWithDcc,
  deserializedRedirectNotificationWithDcc
} from '../test/fixtures/rest/redirect-dcc';

describe('UrlsConfig', () => {
  it('should match type of default urls', () => {
    expectType<TypeEqual<UrlsConfig, typeof SANDBOX_URLS>>(true);

    expectType<TypeEqual<UrlsConfig, typeof PRODUCTION_URLS>>(true);
  });
});

describe('processRedirectNotification', () => {

  it('should decode x-www-form-urlencoded characters', () => {
    const {
      processRedirectNotification: processRedirectRestNotification
    } = createRedsysAPI({
      secretKey: redirectWithDccMerchantKey,
      urls: SANDBOX_URLS
    });

    expect(
      processRedirectRestNotification(serializedRedirectNotificationWithDcc)
    ).toEqual(deserializedRedirectNotificationWithDcc);
  });
});

describe('processDirectRestNotification', () => {

  it('should decode DCC notification', () => {
    const {
      processDirectRestNotification
    } = createRedsysAPI({
      secretKey: redirectWithDccMerchantKey,
      urls: SANDBOX_URLS
    });

    expect(
      processDirectRestNotification(serializedRestNotificationWithDcc)
    ).toEqual(deserializedRestNotificationWithDcc);
  });

});

describe('processRestNotification', () => {

  it('should process both direct and redirect notifications', () => {
    const {
      processRestNotification
    } = createRedsysAPI({
      secretKey: redirectWithDccMerchantKey,
      urls: SANDBOX_URLS
    });

    expect(
      processRestNotification(serializedRestNotificationWithDcc)
    ).toEqual(deserializedRestNotificationWithDcc);

    expect(
      processRestNotification(serializedRedirectNotificationWithDcc)
    ).toEqual(deserializedRedirectNotificationWithDcc);
  });

});
