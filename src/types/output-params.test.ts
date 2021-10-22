import { expectType } from 'ts-expect';
import type { TypeOf } from 'ts-expect';

import type {
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  RestNotificationOutputParams,
  SoapNotificationOutputParams
} from './output-params';

import type {
  deserializedRestJsonResponse
} from '../../test/fixtures/rest/rest-json';

import type {
  deserializedRestNotification
} from '../../test/fixtures/rest/redirect';

import type {
  deserializedRestNotificationWithIdentifier
} from '../../test/fixtures/rest/redirect-identifier';

import type {
  deserializedIniciaPeticionResponse as deserializedIniciaPeticionV1Response,
  deserializedAuthDataResponse as deserializedAuthDataV1Response,
  deserializedChallengeResponseResponse as deserializedChallengeResponseV1Response
} from '../../test/fixtures/rest/3ds-v1';

import type {
  deserializedIniciaPeticionResponse as deserializedIniciaPeticionV21Response,
  deserializedAuthDataResponse as deserializedAuthDataV21Response,
  deserializedChallengeResponseResponse as deserializedChallengeResponseV21Response
} from '../../test/fixtures/rest/3ds-v2.1-challenge';

import type {
  deserializedSoapNotification
} from '../../test/fixtures/soap/redirect-notification';

/*
 * Inicia peticion
 */
describe('RestIniciaPeticionOutputParams', () => {
  it('should match real data', () => {
    expectType<TypeOf<
      RestIniciaPeticionOutputParams,
      typeof deserializedIniciaPeticionV1Response
    >>(true);

    expectType<TypeOf<
      RestIniciaPeticionOutputParams,
      typeof deserializedIniciaPeticionV21Response
    >>(true);
  });
});

/*
 * Trata peticion
 */
describe('RestTrataPeticionOutputParams', () => {
  it('should match real data', () => {
    expectType<TypeOf<
      RestTrataPeticionOutputParams,
      typeof deserializedRestJsonResponse
    >>(true);

    expectType<TypeOf<
      RestTrataPeticionOutputParams,
      typeof deserializedAuthDataV1Response
    >>(true);

    expectType<TypeOf<
      RestTrataPeticionOutputParams,
      typeof deserializedChallengeResponseV1Response
    >>(true);

    expectType<TypeOf<
      RestTrataPeticionOutputParams,
      typeof deserializedAuthDataV21Response
    >>(true);

    expectType<TypeOf<
      RestTrataPeticionOutputParams,
      typeof deserializedChallengeResponseV21Response
    >>(true);
  });
});

/*
 * Rest Notification
 */
describe('RestNotificationOutputParams', () => {
  it('should match real data', () => {
    expectType<TypeOf<
      RestNotificationOutputParams,
      typeof deserializedRestNotification
    >>(true);

    expectType<TypeOf<
      RestNotificationOutputParams,
      typeof deserializedRestNotificationWithIdentifier
    >>(true);
  });
});

/*
 * Soap Notification
 */
describe('SoapNotificationOutputParams', () => {
  it('should match real data', () => {
    expectType<TypeOf<
      SoapNotificationOutputParams,
      (typeof deserializedSoapNotification)['Request']
    >>(true);
  });
});
