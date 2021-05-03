import { Client } from 'soap';
import {
  Redsys,
  RedsysConfig,
  SANDBOX_URLS
} from './client';
import {
  RedsysError,
  ParseError
} from './errors';

import { ResponseJSON } from './types/api';

import {
  defaultMerchantKey
} from '../test/fixtures/merchant-keys';

import {
  restNotificationMerchantKey,
  serializedRestNotification,
  formattedRestNotification
} from '../test/fixtures/formatters/rest-notification';

import {
  redirectMerchantKey,
  unformattedRedirectRequest,
  serializedAndSignedRedirectRequest
} from '../test/fixtures/formatters/rest-redirect';

import {
  webServiceRequestMerchantKey,
  unformattedWebServiceRequest,
  serializedWebServiceRequest
} from '../test/fixtures/formatters/web-service-request';

import {
  serializedWebServiceResponse,
  formattedWebServiceResponse
} from '../test/fixtures/formatters/web-service-response';

import {
  soapNotificationMerchantKey,
  formattedSoapNotification,
  serializedAndSignedSoapNotificationParams
} from '../test/fixtures/formatters/soap-notification';

import {
  serializedAndSignedAllowedNotificationResponseParams
} from '../test/fixtures/soap/allowed-notification-response';

import {
  serializedAndSignedDeniedNotificationResponseParams
} from '../test/fixtures/soap/denied-notification-response';

describe('Redsys Client', () => {
  it('should require a secretKey for construction', () => {
    expect(
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      () => new Redsys({ urls: SANDBOX_URLS } as RedsysConfig)
    ).toThrowError(new RedsysError('A secretKey key must be provided'));
  });

  it('should require urls for construction', () => {
    expect(
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      () => new Redsys({ secretKey: defaultMerchantKey } as RedsysConfig)
    ).toThrowError(new RedsysError('URLs must be provided'));

    expect(
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      () => new Redsys({ secretKey: defaultMerchantKey, urls: {} } as RedsysConfig)
    ).toThrowError(new RedsysError('URLs must be provided'));

    // Throw on incomplete URLs
    expect(
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      () => new Redsys({
        secretKey: defaultMerchantKey,
        urls: {
          redirect: SANDBOX_URLS.redirect
        }
      } as RedsysConfig)
    ).toThrowError(new RedsysError('URLs must be provided'));
  });

  describe('Redirections', () => {
    describe('redirectPetition', () => {
      it('should create signed merchant petitions', () => {
        const redsys = new Redsys({ secretKey: redirectMerchantKey, urls: SANDBOX_URLS });
        const petition = redsys.redirectPetition(unformattedRedirectRequest);

        expect(petition.url).toEqual('https://sis-t.redsys.es:25443/sis/realizarPago');
        expect(petition.body).toEqual(serializedAndSignedRedirectRequest);
      });
    });

    describe('processNotification', () => {
      const redsys = new Redsys({ secretKey: restNotificationMerchantKey, urls: SANDBOX_URLS });

      it('should process signed merchant notifications', () => {
        const params = redsys.processNotification(serializedRestNotification);
        expect(params).toEqual(formattedRestNotification);
      });

      it('should reject unsigned/forged merchant notifications', () => {
        expect(() =>
          redsys.processNotification({
            ...serializedRestNotification,
            Ds_Signature: '3TEI5WyvHf1D_whByt1ENgFH_HPIP9UFuB6LkCYgj-E='
          })
        ).toThrowError(new ParseError('Invalid signature'));

        expect(() =>
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          redsys.processNotification({
            Ds_MerchantParameters: serializedRestNotification.Ds_MerchantParameters
          } as ResponseJSON)
        ).toThrowError(new RedsysError('Unknown signature version: undefined'));
      });
    });
  });

  describe('Web Service', () => {
    const mockTrataPeticionAsync = jest.fn();

    const client = {
      trataPeticionAsync: mockTrataPeticionAsync
    };

    const redsys = new Redsys({
      secretKey: webServiceRequestMerchantKey,
      urls: SANDBOX_URLS
    });

    // @ts-expect-error Mocking internal property
    redsys.wsClient = Promise.resolve(client) as unknown as Promise<Client>;

    beforeEach(() => {
      // mockTrataPeticionAsync.mockClear();
      mockTrataPeticionAsync.mockReset();
      mockTrataPeticionAsync.mockResolvedValue(serializedWebServiceResponse);
    });

    describe('wsPetition', () => {
      it('should format, serialize and sign request data', async () => {
        try {
          await redsys.wsPetition(unformattedWebServiceRequest);
        } finally {
          expect(mockTrataPeticionAsync).toHaveBeenCalledWith(serializedWebServiceRequest);
        }
      });

      it('should parse and format response', async () => {
        return await expect(redsys.wsPetition(unformattedWebServiceRequest))
          .resolves.toEqual(formattedWebServiceResponse);
      });
    });
  });

  describe('SOAP Notification', () => {
    const redsys = new Redsys({
      secretKey: soapNotificationMerchantKey,
      urls: SANDBOX_URLS
    });

    describe('soapNotificationAnswer', () => {
      it('can produce signed OK answer', () => {
        expect(redsys.soapNotificationAnswer('165441', true))
          .toEqual(serializedAndSignedAllowedNotificationResponseParams);
      });

      it('can produce signed KO answer', () => {
        expect(redsys.soapNotificationAnswer('165441', false))
          .toEqual(serializedAndSignedDeniedNotificationResponseParams);
      });
    });

    describe('processSoapNotification', () => {
      it('should decode signed data', () => {
        expect(
          redsys.processSoapNotification(serializedAndSignedSoapNotificationParams)
        ).toEqual(formattedSoapNotification);
      });

      it('should not decode unsigned/forged data', () => {
        expect(
          () => redsys.processSoapNotification(
            serializedAndSignedSoapNotificationParams.replace(
              /<Signature>.*<\/Signature>/,
              'I3gacbQMEvUYN59YiHkiml-crEMwFAeo4I1rlLBDFiw='
            )
          )
        ).toThrowError(new ParseError('Invalid signature'));
      });
    });
  });
});
