import {
  createRedsysAPI,
  SANDBOX_URLS,
  PRODUCTION_URLS,
  // Create a new orderId
  randomTransactionId,
  // Utilities for 3DS forms
  create3DSMethodForm,
  create3DSv1ChallengeForm,
  create3DSv2ChallengeForm,
  deserializeThreeDSMethodData,
  deserializeCres
} from 'redsys-easy';

const {
  // REST integration
  restIniciaPeticion,
  restTrataPeticion,
  // Redirect integration
  createRedirectForm,
  processRestNotification,
  processSoapNotification,
  createSoapNotificationAnswer
}= createRedsysAPI({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS
});
