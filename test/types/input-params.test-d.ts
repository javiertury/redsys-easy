import { expectAssignable } from 'tsd';

import type {
  RestIniciaPeticionInputParams,
  RestTrataPeticionInputParams,
  RedirectInputParams,
  WebserviceInputParams
} from '../../src/types/input-params';

import {
  jsonRequest
} from '../fixtures/rest/json-request';

import {
  redirectRequest
} from '../fixtures/rest/redirect';

import {
  iniciaPeticionRequest as iniciaPeticionV1Request,
  threeDSChallengeRequest as threeDSv1ChallengeRequest,
  challengeResponseRequest as challengeResponsev1Request
} from '../fixtures/rest/3ds-v1';

import {
  iniciaPeticionRequest as iniciaPeticionV21Request,
  threeDSMethodRequest,
  challengeResponseRequest as challengeResponseV2Request
} from '../fixtures/rest/3ds-v2.1-challenge';

import {
  webServiceRequestParams
} from '../fixtures/soap/web-service-request';

/*
 * Inicia peticion
 */
expectAssignable<RestIniciaPeticionInputParams>(iniciaPeticionV1Request);
expectAssignable<RestIniciaPeticionInputParams>(iniciaPeticionV21Request);

/*
 * Trata peticion
 */
expectAssignable<RestTrataPeticionInputParams>(jsonRequest);
expectAssignable<RestTrataPeticionInputParams>(threeDSv1ChallengeRequest);
expectAssignable<RestTrataPeticionInputParams>(challengeResponsev1Request);
expectAssignable<RestTrataPeticionInputParams>(threeDSMethodRequest);
expectAssignable<RestTrataPeticionInputParams>(challengeResponseV2Request);

/*
 * Redirect
 */
expectAssignable<RedirectInputParams>(redirectRequest);

/*
 * Webservice
 */
expectAssignable<WebserviceInputParams>(webServiceRequestParams);
