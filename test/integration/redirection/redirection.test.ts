import Koa from 'koa';
import type { Context as KoaContext } from 'koa';
import bodyParser from 'koa-bodyparser';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import url from 'url';
import type { Server } from 'http';

import {
  createRedsysAPI,
  TRANSACTION_TYPES,
  randomTransactionId,
  SANDBOX_URLS
} from 'redsys-easy';

import { noThreeDS } from '../../fixtures/cards';
import { clientPostHeaders } from '../../fixtures/client';
import cardParams from './data/card-params.json';
import settings from '../settings';
import type { ResponseJSONSuccess } from 'redsys-easy';
import {
  encodePostParams,
  wait
} from '../utils';

const {
  redirectData,
  notificationServer: serverSettings
} = settings;

const {
  secretKey,
  merchantData,
  card
} = noThreeDS;

const { URL } = url;

const {
  createRedirectForm,
  processRestNotification
} = createRedsysAPI({
  urls: SANDBOX_URLS,
  secretKey
});

interface TestContext {
  server?: Server
  referer?: string
  cookie?: string
  nextPostUrl?: string
  nextParams?: Record<string, string | undefined>
}

describe('Redirect Integration', () => {
  const ctx: TestContext = {};

  const serverHandler = jest.fn();

  beforeAll(() => {
    const app = new Koa();
    app.use(bodyParser());
    app.use(async (serverCtx, next) => {
      serverHandler(serverCtx);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await next();
    });

    ctx.server = app.listen(serverSettings.port);
  });

  it('should redirect to payment portal', async () => {
    const obj = {
      DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      DS_MERCHANT_ORDER: randomTransactionId(),
      DS_MERCHANT_MERCHANTCODE: merchantData.merchantCode,
      DS_MERCHANT_TERMINAL: merchantData.terminal,
      // amount in smallest currency unit(cents)
      // 49.99€
      DS_MERCHANT_AMOUNT: '4999',
      DS_MERCHANT_CURRENCY: '978',
      DS_MERCHANT_MERCHANTNAME: 'MI COMERCIO',
      DS_MERCHANT_MERCHANTURL: redirectData.merchantURL,
      DS_MERCHANT_URLOK: redirectData.successURL,
      DS_MERCHANT_URLKO: redirectData.errorURL
    } as const;

    const form = createRedirectForm(obj);

    // Fetch payment page
    const res = await fetch(form.url, {
      method: 'POST',
      body: encodePostParams(form.body),
      headers: clientPostHeaders
    });

    expect(res.ok).toEqual(true);
    ctx.referer = res.url;
    ctx.cookie = res.headers.get('set-cookie') ?? undefined;
    expect(typeof ctx.cookie).toBe('string');
    expect(ctx.cookie).not.toEqual('');

    const text = await res.text();
    const $ = cheerio.load(text);

    const nextPostPath = $('form[name=formTarjeta]').attr('action');
    expect(typeof nextPostPath).toBe('string');
    expect(nextPostPath).not.toEqual('');

    ctx.nextPostUrl = (new URL(nextPostPath as string, res.url)).toString();
  });

  it('should post card data successfully', async () => {
    // Here a user inputs credit card data
    // This step is only necessary to continue the payment process

    const formParams = {
      ...cardParams,
      Sis_Numero_Tarjeta: card.pan,
      Sis_Caducidad_Tarjeta_Mes: card.expiryMonth,
      Sis_Caducidad_Tarjeta_Anno: card.expiryYear,
      Sis_Tarjeta_CVV2: card.cvv
    };

    // Post payment data
    const res = await fetch(ctx.nextPostUrl as string, {
      method: 'POST',
      body: encodePostParams(formParams),
      headers: {
        ...clientPostHeaders,
        Cookie: ctx.cookie as string,
        Origin: (new URL(ctx.referer as string).origin).toString(),
        Referer: ctx.referer as string
      }
    });

    expect(res.ok).toEqual(true);
    ctx.referer = res.url;
    const newCookie = res.headers.get('set-cookie') ?? undefined;
    if (newCookie != null && newCookie) {
      ctx.cookie = newCookie;
    }

    const text = await res.text();
    const $ = cheerio.load(text);

    const params: Record<string, string | undefined> = {};
    params.PaReq = $('input[name=PaReq]').attr('value');
    expect(typeof params.PaReq).toBe('string');
    expect(params.PaReq).not.toEqual('');
    params.TermUrl = $('input[name=TermUrl]').attr('value');
    expect(typeof params.TermUrl).toBe('string');
    expect(params.TermUrl).not.toEqual('');
    params.MD = $('input[name=MD]').attr('value');

    ctx.nextPostUrl = $('form[name=datos]').attr('action');
    expect(typeof ctx.nextPostUrl).toBe('string');
    expect(ctx.nextPostUrl).not.toEqual('');

    // Fetch next page: 3D Secure page
    const res2 = await fetch(ctx.nextPostUrl as string, {
      method: 'POST',
      body: encodePostParams(params),
      headers: {
        ...clientPostHeaders,
        Cookie: ctx.cookie as string,
        Origin: (new URL(ctx.referer).origin).toString(),
        Referer: ctx.referer
      }
    });

    expect(res2.ok).toEqual(true);
    ctx.referer = res2.url;
    const newCookie2 = res2.headers.get('set-cookie') ?? undefined;
    if (newCookie2 != null && newCookie2) {
      ctx.cookie = newCookie2;
    }

    const text2 = await res2.text();
    const $2 = cheerio.load(text2);

    const params2: Record<string, string | undefined> = {};
    params2.paReq = $2('input[name=paReq]').attr('value');
    expect(typeof params2.paReq).toBe('string');
    expect(params2.paReq).not.toEqual('');
    params2.md = $2('input[name=md]').attr('value');
    params2.termUrl = $2('input[name=termUrl]').attr('value');

    const nextPostPath = $2('form[name=formulario]').attr('action');
    expect(typeof nextPostPath).toBe('string');
    expect(nextPostPath).not.toEqual('');

    ctx.nextPostUrl = (new URL(nextPostPath as string, res2.url)).toString();
    ctx.nextParams = params2;
  });

  it('should post 3D Secure data successfully', async () => {
    const formParams = {
      ...ctx.nextParams,
      status: 'Y'
    };

    // Post 3D Secure data
    const res = await fetch(ctx.nextPostUrl as string, {
      method: 'POST',
      body: encodePostParams(formParams),
      headers: {
        ...clientPostHeaders,
        Cookie: ctx.cookie as string,
        Origin: (new URL(ctx.referer as string).origin).toString(),
        Referer: ctx.referer as string
      }
    });

    expect(res.ok).toEqual(true);
    ctx.referer = res.url;
    const newCookie = res.headers.get('set-cookie');
    if (newCookie != null && newCookie) {
      ctx.cookie = newCookie;
    }

    const text = await res.text();
    const $ = cheerio.load(text);

    const params: Record<string, string | undefined> = {};
    params.PaRes = $('input[name=PaRes]').attr('value');
    expect(typeof params.PaRes).toBe('string');
    expect(params.PaRes).not.toEqual('');
    params.MD = $('input[name=MD]').attr('value');

    ctx.nextPostUrl = $('form[name=formulario]').attr('action');
    expect(typeof ctx.nextPostUrl).toBe('string');
    expect(ctx.nextPostUrl).not.toEqual('');

    // Fetch next page: redirection page
    const res2 = await fetch(ctx.nextPostUrl as string, {
      method: 'POST',
      body: encodePostParams(params),
      headers: {
        ...clientPostHeaders,
        Cookie: ctx.cookie as string,
        Origin: (new URL(ctx.referer).origin).toString(),
        Referer: ctx.referer
      }
    });

    expect(res2.ok).toEqual(true);
    ctx.referer = res2.url;

    const text2 = await res2.text();
    const $2 = cheerio.load(text2);

    // Check that it redirects to our page
    const formAction1 = $2('form[name="formCuenta"]').attr('action') as string;
    expect(formAction1).toContain(redirectData.successURL);
  });

  /*
   * This test may fail if your ip is not public and the port is not open
   *
   * See <projectFolder>/integration-settings.sample.js
   */
  it('should receive a success notification', async () => {
    await wait(2000);

    expect(serverHandler).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const serverCtx = serverHandler.mock.calls[0][0] as KoaContext;
    expect(typeof serverCtx).toBe('object');
    expect(serverCtx).not.toBeNull();
    expect(serverCtx.method).toEqual('POST');

    const body = serverCtx.request.body as unknown as ResponseJSONSuccess;
    expect(typeof body).toBe('object');
    expect(body).not.toBeNull();
    expect(serverCtx.href).toEqual(redirectData.merchantURL);

    const params = processRestNotification(body);
    expect(params.Ds_Response).toEqual('0000');
  });

  afterAll(() => {
    if (ctx.server) return ctx.server.close();
  });
});
