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
} = require('../../../src');

const settings = require('../settings');

const request = require('./data/request.json');
const requestProcessed = require('./data/request-processed.json');

const response = require('./data/response.json');
const responseForged = require('./data/response-forged.json');
const responseNotSigned = require('./data/response-not-signed.json');
const responseProcessed = require('./data/response-processed.json');

describe('Redsys Web Service Requests and Responses', () => {
  const ctx = {};

  beforeAll(() => {
    ctx.redsys = new Redsys({
      secretKey: settings.secretKey,
      urls: settings.urls,
    });

    const client = { trataPeticionAsync() {} };
    ctx.clientStub = sinon.stub(client, 'trataPeticionAsync');

    ctx.redsys.wsClient = Promise.resolve(client);
  });

  beforeEach(() => {
    ctx.clientStub.resetHistory();

    ctx.clientStub.resetBehavior();
    ctx.clientStub.resolves(response);
  });

  describe('wsPetition', () => {

    it('should prepare request data', () => {
      const check = () => expect(ctx.clientStub).to.have.been.deep.calledWith(requestProcessed);
      return ctx.redsys.wsPetition(request).then(check).catch(check);
    });
 
    it('should process response', () => {
      const result = ctx.redsys.wsPetition(request);

      return expect(result).to.eventually.deep.equal(responseProcessed);
    });
 
    it('should throw if response signature is invalid', () => {
      ctx.clientStub.resolves(responseForged);
      const result = ctx.redsys.wsPetition(request);

      return expect(result).to.eventually.be.rejectedWith('Invalid signature');
    });
 
    it('should throw if response signature is invalid', () => {
      ctx.clientStub.resolves(responseNotSigned);
      const result = ctx.redsys.wsPetition(request);

      return expect(result).to.eventually.be.rejectedWith('Invalid signature');
    });
  });
});
