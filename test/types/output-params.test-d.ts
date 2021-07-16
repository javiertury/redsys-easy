import { expectAssignable } from 'tsd';

import type {
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  RestNotificationOutputParams,
  WebserviceOutputParams,
  SoapNotificationOutputParams
} from '../../src/types/output-params';

import {
  deserializedJSONResponse
} from '../fixtures/rest/json-response';

import {
  deserializedRestNotification
} from '../fixtures/rest/redirect-notification';

import {
  deserializedIniciaPeticionResponse as deserializedIniciaPeticionV1Response,
  deserializedThreeDSChallengeResponse as deserializedThreeDSv1ChallengeResponse,
  deserializedChallengeResponseResponse as deserializedChallengeResponsev1Response
} from '../fixtures/rest/3ds-v1';

import {
  deserializedIniciaPeticionResponse as deserializedIniciaPeticionV21Response,
  deserialized3DSMethodResponse,
  deserializedChallengeResponseResponse as deserializedChallengeResponseV2Response
} from '../fixtures/rest/3ds-v2.1-challenge';

import {
  deserializedWebServiceResponseParams
} from '../fixtures/soap/web-service-response';

import {
  deserializedWebServiceResponseWithCCParams
} from '../fixtures/soap/web-service-response-with-cc';

import {
  deserializedSoapNotification
} from '../fixtures/soap/redirect-notification';

/*
 * Inicia peticion
 */
expectAssignable<RestIniciaPeticionOutputParams>(deserializedIniciaPeticionV1Response);
expectAssignable<RestIniciaPeticionOutputParams>(deserializedIniciaPeticionV21Response);

/*
 * Trata peticion
 */
expectAssignable<RestTrataPeticionOutputParams>(deserializedJSONResponse);
expectAssignable<RestTrataPeticionOutputParams>(deserializedThreeDSv1ChallengeResponse);
expectAssignable<RestTrataPeticionOutputParams>(deserializedChallengeResponsev1Response);
expectAssignable<RestTrataPeticionOutputParams>(deserialized3DSMethodResponse);
expectAssignable<RestTrataPeticionOutputParams>(deserializedChallengeResponseV2Response);

/*
 * Rest Notification
 */
expectAssignable<RestNotificationOutputParams>(deserializedRestNotification);

/*
 * Webservice
 */
expectAssignable<WebserviceOutputParams>(deserializedWebServiceResponseParams);
expectAssignable<WebserviceOutputParams>(deserializedWebServiceResponseWithCCParams);

/*
 * Soap Notification
 */
expectAssignable<SoapNotificationOutputParams>(deserializedSoapNotification.Request);
