'use strict';

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const {
  Redsys,
} = require('../../../src');

const settings = require('../settings');

const requestInput = require('./data/request-input.json');
const requestData = fs.readFileSync(path.resolve(__dirname, 'data/request-data.xml'), 'utf8').trim();
const request = fs.readFileSync(path.resolve(__dirname, 'data/request.xml'), 'utf8').trim();

const responseError = fs.readFileSync(path.resolve(__dirname, 'data/response-error.xml'), 'utf8');
const response = fs.readFileSync(path.resolve(__dirname, 'data/response.xml'), 'utf8');
const responseDecoded = require('./data/response-decoded.json');
const responseFormatted = require('./data/response-formatted.json');
const responseForged = fs.readFileSync(path.resolve(__dirname, 'data/response-forged.xml'), 'utf8');
const responseCC = fs.readFileSync(path.resolve(__dirname, 'data/response-cc.xml'), 'utf8');
const responseCCDecoded = require('./data/response-cc-decoded.json');
const responseCCFormatted = require('./data/response-cc-formatted.json');
const responseCCForged = fs.readFileSync(path.resolve(__dirname, 'data/response-cc-forged.xml'), 'utf8');

describe('Redsys XML Requests and Responses', () => {
  const ctx = {};

  beforeAll(() => {
    ctx.redsys = new Redsys({
      secretKey: settings.secretKey,
      urls: settings.urls,
    });
  });

  describe('xmlPetitionParameters', () => {

    it('should prepare data', () => {
      expect(ctx.redsys.xmlPetitionParameters(requestInput))
      .to.equal(requestData);
    });

  });

  describe('xmlPetitionSignedData', () => {

    it('should create signed petitions', () => {
      expect(ctx.redsys.xmlPetitionSignedData(requestInput)).to.equal(request);
    });

  });

  describe('processXMLResponseData', () => {

    it('should decode data', () => {
      expect(ctx.redsys.processXMLResponseData(responseCC))
      .to.deep.equal(responseCCDecoded);

      expect(ctx.redsys.processXMLResponseData(response))
      .to.deep.equal(responseDecoded);
    });

  });

  describe('processXMLResponse', () => {

    it('should decode throw on response error', () => {
      expect(() => ctx.redsys.processXMLResponse(responseError))
      .to.throw('Redsys error SIS0051');
    });

  });

  describe('processXMLPetitionResponse', () => {

    it('should decode signed data', () => {
      // With and without credit card(CC) because signature formula changes
      expect(ctx.redsys.processXMLPetitionResponse(response))
      .to.deep.equal(responseFormatted);

      expect(ctx.redsys.processXMLPetitionResponse(responseCC))
      .to.deep.equal(responseCCFormatted);
    });

    it('should not decode unsigned/forged data', () => {
      // With and without credit card(CC) because signature formula changes
      expect(() => ctx.redsys.processXMLPetitionResponse(responseForged))
      .to.throw('Invalid signature');

      expect(() => ctx.redsys.processXMLPetitionResponse(responseCCForged))
      .to.throw('Invalid signature');
    });

  });
});
