/*
 * Example REST server to process 3DS payments
 */
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { db } from './db';
import type { AppState, AppContext } from './types/app';
import { PORT } from './config';

import { router } from './router';

/** Minimal app server */
const app = new Koa<AppState, AppContext>();

app.context.db = db;

// Error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.status = 500;
  }
});
app.use(cors({
  origin: 'http://localhost:8080',
  // Explicit whitelist content-type. By default content-type is only
  // allowed for simple mime types
  allowHeaders: 'content-type, *',
  exposeHeaders: '*',
  credentials: true
}));

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));
