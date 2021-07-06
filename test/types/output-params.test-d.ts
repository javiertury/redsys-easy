import { expectAssignable } from 'tsd';

import type {
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  RestNotificationOutputParams,
  WebserviceOutputParams,
  SoapNotificationOutputParams
} from '../../src/types/output-params';

import {
  parsedJSONResponse
} from '../fixtures/rest/json-response';

import {
  parsedRestNotification
} from '../fixtures/rest/redirect-notification';

import {
  parsedIniciaPeticionResponse as parsedIniciaPeticionV1Response,
  parsedThreeDSChallengeResponse as parsedThreeDSv1ChallengeResponse,
  parsedChallengeResponseResponse as parsedChallengeResponsev1Response
} from '../fixtures/rest/3ds-v1';

import {
  parsedIniciaPeticionResponse as parsedIniciaPeticionV21Response,
  parsed3DSMethodResponse,
  parsedChallengeResponseResponse as parsedChallengeResponseV2Response
} from '../fixtures/rest/3ds-v2.1-challenge';

import {
  parsedWebServiceResponseParams
} from '../fixtures/soap/web-service-response';

import {
  parsedWebServiceResponseWithCCParams
} from '../fixtures/soap/web-service-response-with-cc';

import {
  parsedSoapNotification
} from '../fixtures/soap/redirect-notification';

/*
 * Inicia peticion
 */
expectAssignable<RestIniciaPeticionOutputParams>(parsedIniciaPeticionV1Response);
expectAssignable<RestIniciaPeticionOutputParams>(parsedIniciaPeticionV21Response);

/*
 * Trata peticion
 */
expectAssignable<RestTrataPeticionOutputParams>(parsedJSONResponse);
expectAssignable<RestTrataPeticionOutputParams>(parsedThreeDSv1ChallengeResponse);
expectAssignable<RestTrataPeticionOutputParams>(parsedChallengeResponsev1Response);
expectAssignable<RestTrataPeticionOutputParams>(parsed3DSMethodResponse);
expectAssignable<RestTrataPeticionOutputParams>(parsedChallengeResponseV2Response);

/*
 * Rest Notification
 */
expectAssignable<RestNotificationOutputParams>(parsedRestNotification);

/*
 * Webservice
 */
expectAssignable<WebserviceOutputParams>(parsedWebServiceResponseParams);
expectAssignable<WebserviceOutputParams>(parsedWebServiceResponseWithCCParams);

/*
 * Soap Notification
 */
expectAssignable<SoapNotificationOutputParams>(parsedSoapNotification.Request);
