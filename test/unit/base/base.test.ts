import {
  Redsys, RedsysConfig
} from '../../../src';
import { RedsysError } from '../../../src/errors';

import settings from '../settings';

describe('Redsys Base', () => {
  const ctx = {
    redsys: new Redsys({
      secretKey: settings.secretKey,
      urls: settings.urls
    })
  };

  it('should require a secretKey for construction', () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    expect(() => new Redsys({ urls: settings.urls } as RedsysConfig))
      .toThrowError(new RedsysError('A secretKey key must be provided'));
  });

  it('should require urls for construction', () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    expect(() => new Redsys({ secretKey: settings.secretKey } as RedsysConfig))
      .toThrowError(new RedsysError('URLs must be provided'));

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    expect(() => new Redsys({ secretKey: settings.secretKey, urls: {} } as RedsysConfig))
      .toThrowError(new RedsysError('URLs must be provided'));

    // Throw on incomplete URLs
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    expect(() => new Redsys({
      secretKey: settings.secretKey,
      urls: {
        redirect: settings.urls.redirect
      }
    } as RedsysConfig)).toThrowError(new RedsysError('URLs must be provided'));
  });

  it('should sign with 3DES encrypted order and SHA256', () => {
    const params = 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIxNDUiLCJEU19NRVJDSEFOVF9PU' +
    'kRFUiI6IjEiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NR' +
    'VJDSEFOVF9DVVJSRU5DWSI6Ijk3OCIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6I' +
    'jAiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6Ijg3MSIsIkRTX01FUkNIQU5UX01FUkNIQU5UV' +
    'VJMIjoiIiwiRFNfTUVSQ0hBTlRfVVJMT0siOiIiLCJEU19NRVJDSEFOVF9VUkxLTyI6IiJ9';

    interface DecodedParams {
      DS_MERCHANT_ORDER: string
    }

    const obj = JSON.parse(Buffer.from(params, 'base64').toString('utf8')) as DecodedParams;
    const orderId = obj.DS_MERCHANT_ORDER;
    const signature = '3TEI5WyvHf1D/whByt1ENgFH/HPIP9UFuB6LkCYgj+E=';

    expect(ctx.redsys.signOrderText(orderId, params)).toEqual(signature);
  });
});
