'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const fetch = require('node-fetch');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const cheerio = require('cheerio');
const url = require('url');
const crypto = require('crypto');

const {
  Redsys,
  TRANSACTION_TYPES,
  randomTransactionId
} = require('../../../src/index.js');

const requestHeaders = require('./data/headers');
const cardParams = require('./data/card-params');
const {
  instanceSettings,
  merchantData,
  cardData,
  redirectData,
  notificationServer: serverSettings,
} = require('../settings');

chai.use(sinonChai);
const { URL } = url;
const { expect } = chai;

const redsys = new Redsys(instanceSettings);

const fixedEncodeURIComponent = str => {
  return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, '%2A');
};

const encodePostParams = params => Object.entries(params).map(([key, value]) => {
  return `${fixedEncodeURIComponent(key)}=${fixedEncodeURIComponent(value)}`;
}).join('&');

const hash = (str, algo = 'sha1', output = 'hex') => {
  const hashObj = crypto.createHash(algo);
  hashObj.update(str.toString());
  return hashObj.digest(output);
};

const wait = (time = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

describe('Redirect Integration', () => {
  const ctx = {
    serverHandler: sinon.fake(),
  };

  before(() => {
    const app = new Koa();
    app.use(bodyParser());
    app.use((serverCtx, next) => {
      ctx.serverHandler(serverCtx); 
      return next();
    });

    ctx.server = app.listen(serverSettings.port);
  });

  it('should redirect to payment portal', () => {
    const obj = {
      // amount in smallest currency unit(cents)
      // 49.99€
      amount: 4999,
      currency: 'EUR',
      order: randomTransactionId(),
      //order: 'abc',
      merchantName: 'MI COMERCIO',
      merchantCode: merchantData.merchantCode,
      terminal: merchantData.terminal,
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      merchantURL: redirectData.merchantURL,
      successURL: redirectData.successURL,
      errorURL: redirectData.errorURL
    };

    const form = redsys.redirectPetition(obj);

    return fetch(form.url, {
      method: 'POST',
      body: encodePostParams(form.body),
      headers: requestHeaders,
    }).then(res => {
      expect(res.ok).to.equal(true);
      ctx.referer = res.url;
      ctx.cookie = res.headers.get('set-cookie');
      expect(ctx.cookie).to.not.be.empty;

      return res.text().then(text => {
        const $ = cheerio.load(text);
        const nextPostPath = $('form[name=formTarjeta]').attr('action');
        expect(nextPostPath).to.not.be.empty;

        ctx.nextPostUrl = (new URL(nextPostPath, res.url)).toString();
      });
    });
  });

  it('should post card data successfully', () => {
    const formParams = Object.assign({}, cardParams, {
      Sis_Numero_Tarjeta: cardData.pan,
      Sis_Caducidad_Tarjeta_Mes: cardData.expiryMonth,
      Sis_Caducidad_Tarjeta_Anno: cardData.expiryYear,
      Sis_Tarjeta_CVV2: cardData.CVV2,
    });

    return fetch(ctx.nextPostUrl, {
      method: 'POST',
      body: encodePostParams(formParams),
      headers: Object.assign({}, requestHeaders, {
        Cookie: ctx.cookie,
        Origin: (new URL(ctx.referer).origin).toString(),
        Referer: ctx.referer,
      }),
    }).then(res => {
      expect(res.ok).to.equal(true);
      ctx.referer = res.url;
      const newCookie = res.headers.get('set-cookie');
      if (newCookie) ctx.cookie = newCookie;

      return res.text().then(text => {
        const $ = cheerio.load(text);
        const params = {};
        params.PaReq = $('input[name=PaReq]').attr('value');
        expect(params.PaReq).to.not.be.empty;
        params.TermUrl = $('input[name=TermUrl]').attr('value');
        expect(params.TermUrl).to.not.be.empty;
        params.MD = $('input[name=MD]').attr('value');

        ctx.nextPostUrl = $('form[name=datos]').attr('action');
        expect(ctx.nextPostUrl).to.not.be.empty;

        return fetch(ctx.nextPostUrl, {
          method: 'POST',
          body: encodePostParams(params),
          headers: Object.assign({}, requestHeaders, {
            Cookie: ctx.cookie,
            Origin: (new URL(ctx.referer).origin).toString(),
            Referer: ctx.referer,
          }),
        }).then(res => {
          return res.text().then(text => {
            const $ = cheerio.load(text);
            const nextPostPath = $('form[name=cip]').attr('action');
            expect(nextPostPath).to.not.be.empty;

            ctx.nextPostUrl = (new URL(nextPostPath, res.url)).toString();
          });
        });
      });
    });
  });

  it('should post CIP successfully', () => {
    const formParams = {
      cip: hash(cardData.cip, 'sha1', 'hex'),
    };

    return fetch(ctx.nextPostUrl, {
      method: 'POST',
      body: encodePostParams(formParams),
      headers: Object.assign({}, requestHeaders, {
        Cookie: ctx.cookie,
        Origin: (new URL(ctx.referer).origin).toString(),
        Referer: ctx.referer,
      }),
    }).then(res => {
      expect(res.ok).to.equal(true);
      ctx.referer = res.url;
      const newCookie = res.headers.get('set-cookie');
      if (newCookie) ctx.cookie = newCookie;

      return res.text().then(text => {
        const $ = cheerio.load(text);

        const params = {};
        params.PaRes = $('input[name=PaRes]').attr('value');
        expect(params.PaRes).to.not.be.empty;
        params.MD = $('input[name=MD]').attr('value');

        ctx.nextPostUrl = $('form[name=respuesta]').attr('action');
        expect(ctx.nextPostUrl).to.not.be.empty;

        return fetch(ctx.nextPostUrl, {
          method: 'POST',
          body: encodePostParams(params),
          headers: Object.assign({}, requestHeaders, {
            Cookie: ctx.cookie,
            Origin: (new URL(ctx.referer).origin).toString(),
            Referer: ctx.referer,
          }),
        }).then(res => {
          expect(res.ok).to.equal(true);

          return res.text().then(text => {
            ctx.referer = res.url;
            const $ = cheerio.load(text);
            const redirectionCode = $('input[lngid=continuar]').attr('onclick');
            const redirectionURL = redirectionCode.split('unescape(')[1].slice(0, -3);
            expect(redirectionURL).to.include(redirectData.successURL);
          });
        });
      });
    });
  });

  it('should send the server a notification', () => {
    return wait(2000).then(() => {
      expect(ctx.serverHandler.callCount).to.equal(1);
      const serverCtx = ctx.serverHandler.args[0][0];
      expect(serverCtx).to.be.not.empty;
      expect(serverCtx.method).to.equal('POST');

      const body = serverCtx.request.body;
      expect(body).to.be.not.empty;
      expect(serverCtx.href).to.equal(redirectData.merchantURL);
      const params = redsys.processNotification(body);

      expect(params.response).to.equal(0);
    });
  });

  after(() => {
    if (ctx.server) return ctx.server.close();
  });
});
