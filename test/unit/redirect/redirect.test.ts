import fs from 'fs';
import path from 'path';

import {
  Redsys
} from '../../../src';

import settings from '../settings';
import response from './data/response.json';
import responseParams from './data/response-decoded-params';

import requestInput from './data/request-input';
import { RawNotificationBody } from '../../../src/types/api';
import { ParseError } from '../../../src/errors';
const requestEncodedParams = fs.readFileSync(path.resolve(__dirname, 'data/request-encoded-params.txt'), 'utf8').trim();

describe('Redsys Redirections', () => {
  const ctx = {
    redsys: new Redsys({
      secretKey: settings.secretKey,
      urls: settings.urls
    })
  };

  describe('redirectPetitionParameters', () => {
    it('should create petition parameters', () => {
      const params = ctx.redsys.redirectPetitionParameters(requestInput);
      expect(params).toEqual(requestEncodedParams);
    });
  });

  describe('redirectPetition', () => {
    it('should create signed merchant petitions', () => {
      const petition = ctx.redsys.redirectPetition(requestInput);
      const expectedAlg = 'HMAC_SHA256_V1';
      const expectedSig = '0bqWhAFUE0KDF9z1NpXV33xDDAHiyMDeEsRJENxs3E0=';

      expect(petition.url).toEqual('https://sis-t.redsys.es:25443/sis/realizarPago');
      expect(petition.body.Ds_MerchantParameters).toEqual(requestEncodedParams);
      expect(petition.body.Ds_SignatureVersion).toEqual(expectedAlg);
      expect(petition.body.Ds_Signature).toEqual(expectedSig);
    });
  });

  describe('processNotificationParameters', () => {
    it('should decode notification parameters', () => {
      expect(ctx.redsys.processNotificationParameters(response.Ds_MerchantParameters))
        .toEqual(responseParams.raw);
    });
  });

  describe('processNotification', () => {
    it('should process signed merchant notifications', () => {
      const params = ctx.redsys.processNotification(response);
      expect(params).toEqual(responseParams);
    });

    it('should reject unsigned/forged merchant notifications', () => {
      expect(() =>
        ctx.redsys.processNotification({
          ...response,
          Ds_Signature: '3TEI5WyvHf1D_whByt1ENgFH_HPIP9UFuB6LkCYgj-E='
        })
      ).toThrowError(new ParseError('Invalid signature'));

      expect(() =>
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        ctx.redsys.processNotification({
          Ds_MerchantParameters: response.Ds_MerchantParameters
        } as RawNotificationBody)
      ).toThrowError(new ParseError('Invalid signature'));
    });
  });
});
