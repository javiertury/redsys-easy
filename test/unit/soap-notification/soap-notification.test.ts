import fs from 'fs';
import path from 'path';

import {
  Redsys,
  detectSoapVersion,
  mimicSoapNotificationReceiver,
  mimicSoap11NotificationResponse,
  mimicSoap12NotificationResponse
} from '../../../src';
import { ParseError } from '../../../src/errors';

import settings from '../settings';

import notification11 from './data/notification-1.1.json';
import notification12 from './data/notification-1.2.json';
import notificationInnerDecoded from './data/notification-inner-decoded';

const notificationInner = fs.readFileSync(path.resolve(__dirname, './data/notification-inner.xml'), 'utf8').trim();
const notificationInnerForged = fs.readFileSync(path.resolve(__dirname, './data/notification-inner-forged.xml'), 'utf8').trim();

const responseInnerOk = fs.readFileSync(path.resolve(__dirname, 'data/response-inner-ok.xml'), 'utf8').trim();
const responseInnerKo = fs.readFileSync(path.resolve(__dirname, 'data/response-inner-ko.xml'), 'utf8').trim();

const responseOk11 = fs.readFileSync(path.resolve(__dirname, 'data/response-ok-1.1.xml'), 'utf8').trim();
const responseOk12 = fs.readFileSync(path.resolve(__dirname, 'data/response-ok-1.2.xml'), 'utf8').trim();
const responseKo11 = fs.readFileSync(path.resolve(__dirname, 'data/response-ko-1.1.xml'), 'utf8').trim();
const responseKo12 = fs.readFileSync(path.resolve(__dirname, 'data/response-ko-1.2.xml'), 'utf8').trim();

describe('Redsys SOAP Notification', () => {
  const ctx = {
    redsys: new Redsys({
      secretKey: settings.secretKey,
      urls: settings.urls
    })
  };

  describe('SOAP Notification Server Mimicking', () => {
    describe('detectSoapVersion', () => {
      it('should detect soap version from headers', () => {
        // SOAP 1.1 and SOAP 1.2
        expect(detectSoapVersion({ headers: notification11.headers }))
          .toEqual('1.1');
        expect(detectSoapVersion({ headers: notification12.headers }))
          .toEqual('1.2');
      });

      it('should detect soap version from body', () => {
        // SOAP 1.1 and SOAP 1.2
        expect(detectSoapVersion({ body: notification11.body }))
          .toEqual('1.1');
        expect(detectSoapVersion({ body: notification12.body }))
          .toEqual('1.2');
      });
    });

    describe('mimicSoapNotificationReceiver', () => {
      it('should receive data payload', () => {
        // SOAP 1.1 and SOAP 1.2
        expect(mimicSoapNotificationReceiver(notification11.body))
          .toEqual(notificationInner);
        expect(mimicSoapNotificationReceiver(notification12.body))
          .toEqual(notificationInner);
      });
    });

    describe('mimicSoap11NotificationResponse', () => {
      it('should mimic full SOAP 1.1 response', () => {
        expect(mimicSoap11NotificationResponse(responseInnerOk))
          .toEqual(responseOk11);
        expect(mimicSoap11NotificationResponse(responseInnerKo))
          .toEqual(responseKo11);
      });
    });

    describe('mimicSoap12NotificationResponse', () => {
      it('should mimic full SOAP 1.2 response', () => {
        expect(mimicSoap12NotificationResponse(responseInnerOk))
          .toEqual(responseOk12);
        expect(mimicSoap12NotificationResponse(responseInnerKo))
          .toEqual(responseKo12);
      });
    });
  });

  describe('soapNotificationAnswer', () => {
    it('can produce signed OK answer', () => {
      expect(ctx.redsys.soapNotificationAnswer('165441', true))
        .toEqual(responseInnerOk);
    });

    it('can produce signed KO answer', () => {
      expect(ctx.redsys.soapNotificationAnswer('165441', false))
        .toEqual(responseInnerKo);
    });
  });

  describe('processSoapNotification', () => {
    it('should decode signed data', () => {
      expect(ctx.redsys.processSoapNotification(notificationInner))
        .toEqual(notificationInnerDecoded);
    });

    it('should not decode unsigned/forged data', () => {
      expect(() => ctx.redsys.processSoapNotification(notificationInnerForged))
        .toThrowError(new ParseError('Invalid signature'));
    });
  });
});
