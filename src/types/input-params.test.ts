import { expectType } from 'ts-expect';
import type { TypeOf } from 'ts-expect';

import type {
  RestIniciaPeticionInputParams,
  RestTrataPeticionInputParams,
  RedirectInputParams
} from '../../src/types/input-params';

import type {
  restJsonRequest
} from '../../test/fixtures/rest/rest-json';

import type {
  redirectRequest
} from '../../test/fixtures/rest/redirect';

import type {
  redirectWithIdentifierRequest
} from '../../test/fixtures/rest/redirect-identifier';

import type {
  iniciaPeticionRequest as iniciaPeticionV1Request,
  authDataRequest as authDataV1Request,
  challengeResponseRequest as challengeResponseV1Request
} from '../../test/fixtures/rest/3ds-v1';

import type {
  iniciaPeticionRequest as iniciaPeticionV21Request,
  authDataRequest as authDataV21Request,
  challengeResponseRequest as challengeResponseV21Request
} from '../../test/fixtures/rest/3ds-v2.1-challenge';

/*
 * Inicia peticion
 */
describe('RestIniciaPeticionInputParams', () => {
  it('should match real data', () => {
    expectType<TypeOf<
      RestIniciaPeticionInputParams,
      typeof iniciaPeticionV1Request
    >>(true);

    expectType<TypeOf<
      RestIniciaPeticionInputParams,
      typeof iniciaPeticionV21Request
    >>(true);
  });
});

/*
 * Trata peticion
 */
describe('RestTrataPeticionInputParams', () => {
  it('should match real data', () => {
    expectType<TypeOf<
      RestTrataPeticionInputParams,
      typeof restJsonRequest
    >>(true);

    expectType<TypeOf<
      RestTrataPeticionInputParams,
      typeof authDataV1Request
    >>(true);

    expectType<TypeOf<
      RestTrataPeticionInputParams,
      typeof challengeResponseV1Request
    >>(true);

    expectType<TypeOf<
      RestTrataPeticionInputParams,
      typeof authDataV21Request
    >>(true);

    expectType<TypeOf<
      RestTrataPeticionInputParams,
      typeof challengeResponseV21Request
    >>(true);
  });
});

/*
 * Redirect
 */
describe('RestTrataPeticionInputParams', () => {
  it('should match real data', () => {
    expectType<TypeOf<
      RedirectInputParams,
      typeof redirectRequest
    >>(true);

    expectType<TypeOf<
      RedirectInputParams,
      typeof redirectWithIdentifierRequest
    >>(true);
  });
});
