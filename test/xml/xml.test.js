'use strict';

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const {
  Redsys,
  SANDBOX_URLS,
} = require('../../src');

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
  before(function() {
    this.redsys = new Redsys({
      secretKey: settings.secretKey,
      urls: SANDBOX_URLS,
    });
  });

  describe('xmlPetitionParameters', () => {

    it('should prepare data', function() {
      expect(this.redsys.xmlPetitionParameters(requestInput))
      .to.equal(requestData);
    });

  });

  describe('xmlPetitionSignedData', () => {

    it('should create signed petitions', function() {
      expect(this.redsys.xmlPetitionSignedData(requestInput)).to.equal(request);
    });

  });

  describe('processXMLResponseData', () => {

    it('should decode data', function() {
      expect(this.redsys.processXMLResponseData(responseCC))
      .to.deep.equal(responseCCDecoded);

      expect(this.redsys.processXMLResponseData(response))
      .to.deep.equal(responseDecoded);
    });

  });

  describe('processXMLResponse', () => {

    it('should decode throw on response error', function() {
      expect(() => this.redsys.processXMLResponse(responseError))
      .to.throw('Redsys error SIS0051');
    });

  });

  describe('processXMLPetitionResponse', () => {

    it('should decode signed data', function() {
      // With and without credit card(CC) because signature formula changes
      expect(this.redsys.processXMLPetitionResponse(response))
      .to.deep.equal(responseFormatted);

      expect(this.redsys.processXMLPetitionResponse(responseCC))
      .to.deep.equal(responseCCFormatted);
    });

    it('should not decode unsigned/forged data', function() {
      // With and without credit card(CC) because signature formula changes
      expect(() => this.redsys.processXMLPetitionResponse(responseForged))
      .to.throw('Invalid signature');

      expect(() => this.redsys.processXMLPetitionResponse(responseCCForged))
      .to.throw('Invalid signature');
    });

  });
});
