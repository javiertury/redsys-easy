/**
 * Node JS client and utilities for implementing a redsys payment gateway
 *
 * @packageDocumentation
 */

export { createRedsysAPI, PRODUCTION_URLS, SANDBOX_URLS } from './client';

export type {
  UrlsConfig,
  RedsysConfig,
  RedsysAPI,
  RestIniciaPeticion,
  RestTrataPeticion,
  CreateRedirectForm,
  ProcessRestNotification,
  ProcessSoapNotification,
  CreateSoapNotificationAnswer
} from './client';

export {
  randomTransactionId,
  assertSuccessfulResponseCode,
  assertSuccessfulResponse,
  isResponseCodeOk
} from './utils/misc';

export { getResponseCodeMessage, getSISErrorCodeMessage } from './utils/codes';

export {
  RedsysError,
  ValidationError,
  ParseError,
  HTTPError,
  GatewayError,
  ResponseError
} from './errors';

export type {
  RedirectInputParams,
  RestIniciaPeticionInputParams,
  RestTrataPeticionInputParams
} from './types/input-params';

export type {
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  RestNotificationOutputParams,
  SoapNotificationOutputParams
} from './types/output-params';

export type {
  ResponseJSONSuccess,
  RedirectForm,
  ThreeDSv2MethodNotificationBody,
  ThreeDSv1ChallengeNotificationBody,
  ThreeDSv2ChallengeNotificationBody
} from './types/api';

// 3DS

export {
  create3DSMethodForm,
  create3DSv1ChallengeForm,
  create3DSv2ChallengeForm,
  deserializeThreeDSMethodData,
  deserializeCres
} from './rest/3ds';

export type {
  ThreeDSBrowserClientInfo,
  ThreeDSMethodForm,
  ThreeDSv1ChallengeForm,
  ThreeDSv2ChallengeForm,
  ThreeDSMethodData,
  ThreeDSCres
} from './types/3ds-params';

// Misc

export {
  detectSoapVersion,
  mimicSoapNotificationReceiver,
  mimicSoap11NotificationResponse,
  mimicSoap12NotificationResponse
} from './soap/utils';

export { CURRENCIES, REV_CURRENCIES } from './assets/currencies';
export type { Currency, CurrencyNum } from './assets/currencies';
export { LANGUAGES, REV_LANGUAGES } from './assets/lang-codes';
export type { Language, LanguageNum } from './assets/lang-codes';
export { COUNTRIES, REV_COUNTRIES } from './assets/countries';
export type { Country, CountryNum } from './assets/countries';
export { CARDBRANDS, REV_CARDBRANDS } from './assets/card-brands';
export type { CardBrand, CardBrandNum } from './assets/card-brands';
export { default as TRANSACTION_TYPES } from './assets/transaction-types';
export type { TransactionType } from './assets/transaction-types';

// Formatters

export {
  useSingleInputFormatter,
  useOutputFormatter,
  usePromiseOutputFormatter
} from './formatter-utils';

export {
  redirectInputFormatter,
  restIniciaPeticionInputFormatter,
  restTrataPeticionInputFormatter
} from './formatters/input-params';

export {
  restNotificationOutputFormatter,
  soapNotificationOutputFormatter,
  restIniciaPeticionOutputFormatter,
  restTrataPeticionOutputFormatter
} from './formatters/output-params';

export type {
  RedirectFormatterInput,
  RestIniciaPeticionFormatterInput,
  RestTrataPeticionFormatterInput,
  NotificationFormatterOutput,
  RestIniciaPeticionFormatterOutput,
  RestTrataPeticionFormatterOutput
} from './formatters/types';
