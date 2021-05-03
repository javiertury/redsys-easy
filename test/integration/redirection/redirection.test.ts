import Koa, { Context as KoaContext } from 'koa';
import bodyParser from 'koa-bodyparser';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import url from 'url';
import type { Server } from 'http';

import {
  Redsys,
  TRANSACTION_TYPES,
  randomTransactionId
} from '../../../src';

import requestHeaders from './data/headers.json';
import cardParams from './data/card-params.json';
import settings from '../settings';
import { ResponseJSON } from '../../../src/types/api';

const {
  instanceSettings,
  merchantData,
  cardData,
  redirectData,
  notificationServer: serverSettings
} = settings;

const { URL } = url;

const redsys = new Redsys(instanceSettings);

const fixedEncodeURIComponent = (str: string) => {
  return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, '%2A');
};

type PropsToMaybeString <T extends object> = {
  [K in keyof T]?: string
};

const encodePostParams = <T extends object>(params: PropsToMaybeString<T>) =>
  Object.entries(params)
    .filter((entry): entry is [string, string] => {
      return entry[1] != null;
    })
    .map(([key, value]) => {
      return `${fixedEncodeURIComponent(key)}=${fixedEncodeURIComponent(value)}`;
    }).join('&');

const wait = async (time = 1000) => {
  await new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

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
      // amount in smallest currency unit(cents)
      // 49.99€
      amount: 4999,
      currency: 'EUR',
      order: randomTransactionId(),
      // order: 'abc',
      merchantName: 'MI COMERCIO',
      merchantCode: merchantData.merchantCode,
      terminal: merchantData.terminal,
      transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
      merchantURL: redirectData.merchantURL,
      successURL: redirectData.successURL,
      errorURL: redirectData.errorURL
    } as const;

    const form = redsys.redirectPetition(obj);

    // Fetch payment page
    const res = await fetch(form.url, {
      method: 'POST',
      body: encodePostParams(form.body),
      headers: requestHeaders
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
    const formParams = Object.assign({}, cardParams, {
      Sis_Numero_Tarjeta: cardData.pan,
      Sis_Caducidad_Tarjeta_Mes: cardData.expiryMonth,
      Sis_Caducidad_Tarjeta_Anno: cardData.expiryYear,
      Sis_Tarjeta_CVV2: cardData.cvv
    });

    // Post payment data
    const res = await fetch(ctx.nextPostUrl as string, {
      method: 'POST',
      body: encodePostParams(formParams),
      headers: {
        ...requestHeaders,
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
        ...requestHeaders,
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
        ...requestHeaders,
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
        ...requestHeaders,
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
    const redirectionCode = $2('body').attr('onload') as string;
    const redirectionURL = redirectionCode.split('unescape(\'')[1]?.slice(0, -3);
    expect(redirectionURL).toContain(redirectData.successURL);
  });

  it('should receive a success notification', async () => {
    await wait(2000);

    expect(serverHandler).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const serverCtx = serverHandler.mock.calls[0][0] as KoaContext;
    expect(typeof serverCtx).toBe('object');
    expect(serverCtx).not.toBeNull();
    expect(serverCtx.method).toEqual('POST');

    const body = serverCtx.request.body as ResponseJSON;
    expect(typeof body).toBe('object');
    expect(body).not.toBeNull();
    expect(serverCtx.href).toEqual(redirectData.merchantURL);

    const params = redsys.processNotification(body);
    expect(params.response).toEqual(0);
  });

  afterAll(() => {
    if (ctx.server) return ctx.server.close();
  });
});
