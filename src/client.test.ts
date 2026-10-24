import { expectType } from 'ts-expect';
import type { TypeEqual } from 'ts-expect';

import type { UrlsConfig, PRODUCTION_URLS } from './client';
import { createRedsysAPI, SANDBOX_URLS } from './client';
import { sha512Sign } from './crypto';
import { RedsysError } from './errors';

import {
  redirectMerchantKey,
  redirectRequest,
  serializedAndSignedRedirectRequest,
  serializedRedirectRestNotification,
  deserializedRedirectRestNotification
} from '../test/fixtures/rest/redirect';

import {
  redirectSha512MerchantKey,
  redirectSha512Request,
  serializedAndSignedRedirectSha512Request
} from '../test/fixtures/rest/redirect-sha512';

import {
  restJsonSha512MerchantKey,
  restJsonSha512Request,
  serializedAndSignedRestJsonSha512Request,
  serializedRestJsonSha512Response,
  deserializedRestJsonSha512Response
} from '../test/fixtures/rest/rest-json-sha512';

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

describe('signatureVersion', () => {
  it('should sign redirect forms with HMAC_SHA256_V1 by default', () => {
    const { createRedirectForm } = createRedsysAPI({
      secretKey: redirectMerchantKey,
      urls: SANDBOX_URLS
    });

    expect(createRedirectForm(redirectRequest)).toEqual({
      url: SANDBOX_URLS.redirect,
      body: serializedAndSignedRedirectRequest
    });
  });

  it('should sign redirect forms with HMAC_SHA512_V2', () => {
    const { createRedirectForm } = createRedsysAPI({
      secretKey: redirectSha512MerchantKey,
      urls: SANDBOX_URLS,
      signatureVersion: 'HMAC_SHA512_V2'
    });

    expect(createRedirectForm(redirectSha512Request)).toEqual({
      url: SANDBOX_URLS.redirect,
      body: serializedAndSignedRedirectSha512Request
    });
  });

  it('should sign REST requests with HMAC_SHA512_V2 and verify the response', async () => {
    const fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify(serializedRestJsonSha512Response))
    );

    const { restIniciaPeticion } = createRedsysAPI({
      secretKey: restJsonSha512MerchantKey,
      urls: SANDBOX_URLS,
      signatureVersion: 'HMAC_SHA512_V2',
      fetch
    });

    await expect(restIniciaPeticion(restJsonSha512Request)).resolves.toEqual(
      deserializedRestJsonSha512Response
    );

    expect(fetch).toHaveBeenCalledWith(
      SANDBOX_URLS.restIniciaPeticion,
      expect.objectContaining({
        body: JSON.stringify(serializedAndSignedRestJsonSha512Request)
      })
    );
  });

  it('should verify notifications with the version they declare', () => {
    const { processRedirectNotification } = createRedsysAPI({
      secretKey: redirectMerchantKey,
      urls: SANDBOX_URLS
    });

    // Same notification, signed with HMAC_SHA512_V2
    const params = Buffer.from(
      serializedRedirectRestNotification.Ds_MerchantParameters,
      'base64'
    ).toString('base64url');

    expect(
      processRedirectNotification({
        Ds_SignatureVersion: 'HMAC_SHA512_V2',
        Ds_MerchantParameters: params,
        Ds_Signature: sha512Sign(
          redirectMerchantKey,
          deserializedRedirectRestNotification.Ds_Order,
          params
        )
      })
    ).toEqual(deserializedRedirectRestNotification);

    expect(
      processRedirectNotification(serializedRedirectRestNotification)
    ).toEqual(deserializedRedirectRestNotification);
  });

  it('should throw if signature version is unknown', () => {
    expect(() =>
      createRedsysAPI({
        secretKey: redirectMerchantKey,
        urls: SANDBOX_URLS,
        signatureVersion: 'HMAC_SHA512_V1' as 'HMAC_SHA512_V2'
      })
    ).toThrow(new RedsysError('Unknown signature version: HMAC_SHA512_V1'));
  });
});
