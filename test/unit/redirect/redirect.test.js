'use strict';

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const {
  Redsys,
} = require('../../../src');

const settings = require('../settings');
const response = require('./data/response.json');
const responseParams = require('./data/response-decoded-params');

const requestInput = require('./data/request-input');
const requestEncodedParams = fs.readFileSync(path.resolve(__dirname, 'data/request-encoded-params.txt'), 'utf8').trim();

describe('Redsys Redirections', () => {
  before(function() {
    this.redsys = new Redsys({
      secretKey: settings.secretKey,
      urls: settings.urls,
    });
  });

  describe('redirectPetitionParameters', () => {

    it('should create petition parameters', function() {
      const params = this.redsys.redirectPetitionParameters(requestInput);
      expect(params).to.equal(requestEncodedParams);
    });

  });

  describe('redirectPetition', () => {

    it('should create signed merchant petitions', function() {
      const petition = this.redsys.redirectPetition(requestInput);
      const expectedAlg = 'HMAC_SHA256_V1';
      const expectedSig = 'dqrJtEY8gxkkqxgvcdagVIHNWAYbLnoR5ShE8jHmkcc=';

      expect(petition.url).to.equal('https://sis-t.redsys.es:25443/sis/realizarPago');
      expect(petition.body.Ds_MerchantParameters).to.equal(requestEncodedParams);
      expect(petition.body.Ds_SignatureVersion).to.equal(expectedAlg);
      expect(petition.body.Ds_Signature).to.equal(expectedSig);
    });

  });

  describe('processNotificationParameters', () => {
    it('should decode notification parameters', function() {
      expect(this.redsys.processNotificationParameters(response.Ds_MerchantParameters))
      .to.deep.equal(responseParams.raw);
    });
  });

  describe('processNotification', () => {

    it('should process signed merchant notifications', function() {
      const params = this.redsys.processNotification(response);
      expect(params).to.deep.equal(responseParams);
    });

    it('should reject unsigned/forged merchant notifications', function() {
      expect(() =>
        this.redsys.processNotification(Object.assign({}, response, {
          Ds_Signature: '3TEI5WyvHf1D_whByt1ENgFH_HPIP9UFuB6LkCYgj-E=',
        }))
      ).to.throw('Invalid signature');

      expect(() =>
        this.redsys.processNotification({
          Ds_MerchantParameters: response.Ds_MerchantParameters,
        })
      ).to.throw('Invalid signature');
    });

  });
});
