'use strict';

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const {
  Redsys,
  detectSoapVersion,
  mimicSoapNotificationReceiver,
  mimicSoap11NotificationResponse,
  mimicSoap12NotificationResponse,
} = require('../../../src');

const settings = require('../settings');

const notification11 = require('./data/notification-1.1.json');
const notification12 = require('./data/notification-1.2.json');
const notificationInner = fs.readFileSync(path.resolve(__dirname, './data/notification-inner.xml'), 'utf8').trim();
const notificationInnerForged = fs.readFileSync(path.resolve(__dirname, './data/notification-inner-forged.xml'), 'utf8').trim();
const notificationInnerDecoded = require('./data/notification-inner-decoded');

const responseInnerOk = fs.readFileSync(path.resolve(__dirname, 'data/response-inner-ok.xml'), 'utf8').trim();
const responseInnerKo = fs.readFileSync(path.resolve(__dirname, 'data/response-inner-ko.xml'), 'utf8').trim();

const responseOk11 = fs.readFileSync(path.resolve(__dirname, 'data/response-ok-1.1.xml'), 'utf8').trim();
const responseOk12 = fs.readFileSync(path.resolve(__dirname, 'data/response-ok-1.2.xml'), 'utf8').trim();
const responseKo11 = fs.readFileSync(path.resolve(__dirname, 'data/response-ko-1.1.xml'), 'utf8').trim();
const responseKo12 = fs.readFileSync(path.resolve(__dirname, 'data/response-ko-1.2.xml'), 'utf8').trim();

describe('Redsys SOAP Notification', () => {
  before(function() {
    this.redsys = new Redsys({
      secretKey: settings.secretKey,
      urls: settings.urls,
    });
  });

  describe('SOAP Notification Server Mimicking', () => {
    describe('detectSoapVersion', () => {

      it('should detect soap version from headers', function() {
        // SOAP 1.1 and SOAP 1.2
        expect(detectSoapVersion({ headers: notification11.headers }))
        .to.equal('1.1');
        expect(detectSoapVersion({ headers: notification12.headers }))
        .to.equal('1.2');
      });

      it('should detect soap version from body', function() {
        // SOAP 1.1 and SOAP 1.2
        expect(detectSoapVersion({ body: notification11.body }))
        .to.equal('1.1');
        expect(detectSoapVersion({ body: notification12.body }))
        .to.equal('1.2');
      });

    });

    describe('mimicSoapNotificationReceiver', () => {

      it('should receive data payload', function() {
        // SOAP 1.1 and SOAP 1.2
        expect(mimicSoapNotificationReceiver(notification11.body))
        .to.equal(notificationInner);
        expect(mimicSoapNotificationReceiver(notification12.body))
        .to.equal(notificationInner);
      });

    });

    describe('mimicSoap11NotificationResponse', () => {

      it('should mimic full SOAP 1.1 response', function() {
        expect(mimicSoap11NotificationResponse(responseInnerOk))
        .to.deep.equal(responseOk11);
        expect(mimicSoap11NotificationResponse(responseInnerKo))
        .to.deep.equal(responseKo11);
      });

    });

    describe('mimicSoap12NotificationResponse', () => {

      it('should mimic full SOAP 1.2 response', function() {
        expect(mimicSoap12NotificationResponse(responseInnerOk))
        .to.deep.equal(responseOk12);
        expect(mimicSoap12NotificationResponse(responseInnerKo))
        .to.deep.equal(responseKo12);
      });

    });
  });

  describe('soapNotificationAnswer', () => {

    it('can produce signed OK answer', function() {
      expect(this.redsys.soapNotificationAnswer('165441', true))
      .to.equal(responseInnerOk);
    });

    it('can produce signed KO answer', function() {
      expect(this.redsys.soapNotificationAnswer('165441', false))
      .to.equal(responseInnerKo);
    });

  });

  describe('processSoapNotification', () => {

    it('should decode signed data', function() {
      expect(this.redsys.processSoapNotification(notificationInner))
      .to.deep.equal(notificationInnerDecoded);
    });

    it('should not decode unsigned/forged data', function() {
      expect(() => this.redsys.processSoapNotification(notificationInnerForged))
      .to.throw('Invalid signature');
    });

  });
});
