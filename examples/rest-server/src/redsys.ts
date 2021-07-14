import { createRedsysAPI, SANDBOX_URLS } from 'redsys-easy';
import { PORT } from './config';

export const {
  restIniciaPeticion,
  restTrataPeticion
} = createRedsysAPI({
  urls: SANDBOX_URLS,
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7'
});

export const merchantInfo = {
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TERMINAL: '1'
} as const;

export const threeDSMethodUrl = `http://localhost:${PORT}/notification-3ds-method`;
export const challengeV1URL = `http://localhost:${PORT}/postchallenge-v1`;
export const challengeV2URL = `http://localhost:${PORT}/postchallenge-v2`;
