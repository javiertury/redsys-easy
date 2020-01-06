'use strict';

const {
  Redsys,
  TRANSACTION_TYPES,
  randomTransactionId
} = require('../../src/index.js');
const settings = require('./settings');

const redsys = new Redsys({
  secretKey: settings.secretKey,
  urls: settings.urls,
});

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');

const endpoint = 'http://my-remote-server.com';
const localHost = 'localhost';
const localPort = 3000;

const initChargePath = '/';
const successPath = '/success';
const errorPath = '/error';
const notificationPath = '/notification';

const app = new Koa();
app.use(bodyParser());
const router = new Router();

router
.get(initChargePath, ctx => {
  console.log('initiating charge');

  const obj = {
    // amount in smallest currency unit(cents)
    // 49.99€
    amount: 4999,
    currency: 'EUR',
    order: randomTransactionId(),
    //order: 'abc',
    merchantName: 'MI COMERCIO',
    merchantCode: '999008881',
    terminal: '1',
    transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
    merchantURL: `${endpoint}${notificationPath}`,
    successURL: `${endpoint}${successPath}`,
    errorURL: `${endpoint}${errorPath}`
  };

  const form = redsys.redirectPetition(obj);

  ctx.type = 'text/html; charset=utf-8';
  ctx.body = `
    <form action="${form.url}" method="post" target="_blank">
      <input type="text" id="Ds_SignatureVersion" name="Ds_SignatureVersion" value="${form.body.Ds_SignatureVersion}" />
      <input type="text" id="Ds_MerchantParameters" name="Ds_MerchantParameters" value="${form.body.Ds_MerchantParameters}" />
      <input type="text" id="Ds_Signature" name="Ds_Signature" value="${form.body.Ds_Signature}"/>
      <input type="submit" value="Realizar Pago" />
    </form>`;
})
.get(successPath, ctx => {
  console.log('Success path');
  const response = {
    status: 'SUCCESS',
    query: ctx.query,
    params: redsys.processNotification(ctx.query),
  };

  console.log(JSON.stringify(response));
  ctx.body = response;
})
.get(errorPath, ctx => {
  console.log('Error path');
  const response = {
    status: 'ERROR',
    query: ctx.query,
    params: redsys.processNotification(ctx.query),
  };

  console.log(JSON.stringify(response));
  ctx.body = response;
})
.post(notificationPath, ctx => {
  console.log('Notification path');

  try {
    console.log(JSON.stringify({
      status: 'NOTIFICATION',
      body: ctx.request.body,
      params: redsys.processNotification(ctx.request.body),
    }));
  } catch (err) {
    console.log(JSON.stringify({
      status: 'NOTIFICATION',
      body: ctx.request.body,
    }));
    console.error(err);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(ctx => {
  console.log(JSON.stringify({
    status: 'UNKNOWN',
    method: ctx.method,
    url: ctx.url,
    query: ctx.query,
    body: ctx.request.body,
  }));
});

app.listen(localPort);
console.log(`Serving on ${localHost}:${localPort} for ${endpoint}`);
