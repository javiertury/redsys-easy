import type { Middleware, DefaultState, DefaultContext } from 'koa';
import type { db } from '../db';

export interface AppState extends DefaultState {}

export interface AppContext extends DefaultContext {
  db: typeof db
}

export type AppMiddleware = Middleware<AppState, AppContext>;
