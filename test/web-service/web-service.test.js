'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);
const { expect } = chai;

const {
  Redsys,
  SANDBOX_URLS,
} = require('../../src');

const settings = require('../settings');

const request = require('./data/request.json');
const requestProcessed = require('./data/request-processed.json');

const response = require('./data/response.json');
const responseForged = require('./data/response-forged.json');
const responseNotSigned = require('./data/response-not-signed.json');
const responseProcessed = require('./data/response-processed.json');

describe('Redsys Web Service Requests and Responses', () => {
  before(function() {
    this.redsys = new Redsys({
      secretKey: settings.secretKey,
      urls: SANDBOX_URLS,
    });

    const client = { trataPeticionAsync() {} };
    this.clientStub = sinon.stub(client, 'trataPeticionAsync');

    this.redsys.wsClient = Promise.resolve(client);
  });

  beforeEach(function () {
    this.clientStub.resetHistory();

    this.clientStub.resetBehavior();
    this.clientStub.resolves(response);
  });

  describe('wsPetition', () => {

    it('should prepare request data', function() {
      const check = () => expect(this.clientStub).to.have.been.deep.calledWith(requestProcessed);
      return this.redsys.wsPetition(request).then(check).catch(check);
    });
 
    it('should process response', function() {
      const result = this.redsys.wsPetition(request);

      return expect(result).to.eventually.deep.equal(responseProcessed);
    });
 
    it('should throw if response signature is invalid', function() {
      this.clientStub.resolves(responseForged);
      const result = this.redsys.wsPetition(request);

      return expect(result).to.eventually.be.rejectedWith('Invalid signature');
    });
 
    it('should throw if response signature is invalid', function() {
      this.clientStub.resolves(responseNotSigned);
      const result = this.redsys.wsPetition(request);

      return expect(result).to.eventually.be.rejectedWith('Invalid signature');
    });
  });
});
