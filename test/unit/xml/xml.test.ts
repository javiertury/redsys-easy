import fs from 'fs';
import path from 'path';

import {
  Redsys
} from '../../../src';

import settings from '../settings';

import requestInput from './data/request-input';
import responseDecoded from './data/response-decoded';
import responseFormatted from './data/response-formatted.json';
import responseCCDecoded from './data/response-cc-decoded.json';
import responseCCFormatted from './data/response-cc-formatted.json';
import { ParseError } from '../../../src/errors';

const requestData = fs.readFileSync(path.resolve(__dirname, 'data/request-data.xml'), 'utf8').trim();
const request = fs.readFileSync(path.resolve(__dirname, 'data/request.xml'), 'utf8').trim();

const responseError = fs.readFileSync(path.resolve(__dirname, 'data/response-error.xml'), 'utf8');
const response = fs.readFileSync(path.resolve(__dirname, 'data/response.xml'), 'utf8');
const responseForged = fs.readFileSync(path.resolve(__dirname, 'data/response-forged.xml'), 'utf8');
const responseCC = fs.readFileSync(path.resolve(__dirname, 'data/response-cc.xml'), 'utf8');
const responseCCForged = fs.readFileSync(path.resolve(__dirname, 'data/response-cc-forged.xml'), 'utf8');

describe('Redsys XML Requests and Responses', () => {
  const redsys = new Redsys({
    secretKey: settings.secretKey,
    urls: settings.urls
  });

  describe('xmlPetitionParameters', () => {
    it('should prepare data', () => {
      expect(redsys.xmlPetitionParameters(requestInput))
        .toEqual(requestData);
    });
  });

  describe('xmlPetitionSignedData', () => {
    it('should create signed petitions', () => {
      expect(redsys.xmlPetitionSignedData(requestInput)).toEqual(request);
    });
  });

  describe('processXMLResponseData', () => {
    it('should decode data', () => {
      expect(redsys.processXMLResponseData(responseCC))
        .toEqual(responseCCDecoded);

      expect(redsys.processXMLResponseData(response))
        .toEqual(responseDecoded);
    });
  });

  describe('processXMLResponse', () => {
    it('should decode throw on response error', () => {
      expect(() => redsys.processXMLResponse(responseError))
        .toThrowError(new ParseError('Redsys error SIS0051'));
    });
  });

  describe('processXMLPetitionResponse', () => {
    it('should decode signed data', () => {
      // With and without credit card(CC) because signature formula changes
      expect(redsys.processXMLPetitionResponse(response))
        .toEqual(responseFormatted);

      expect(redsys.processXMLPetitionResponse(responseCC))
        .toEqual(responseCCFormatted);
    });

    it('should not decode unsigned/forged data', () => {
      // With and without credit card(CC) because signature formula changes
      expect(() => redsys.processXMLPetitionResponse(responseForged))
        .toThrowError(new ParseError('Invalid signature'));

      expect(() => redsys.processXMLPetitionResponse(responseCCForged))
        .toThrowError(new ParseError('Invalid signature'));
    });
  });
});
