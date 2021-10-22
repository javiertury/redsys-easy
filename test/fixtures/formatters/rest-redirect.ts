export {
  redirectMerchantKey,
  redirectRequest as formattedRedirectRequest,
  serializedAndSignedRedirectRequest
} from '../rest/redirect';

export const unformattedRedirectRequest = {
  order: '0726qI3H7sZx',
  merchantCode: '999008881',
  transactionType: '0',
  terminal: '1',
  currency: 'EUR',
  amount: '49.99',
  merchantURL: 'http://www.prueba.com/urlNotificacion.php',
  successURL: 'http://www.prueba.com/urlOK.php',
  errorURL: 'http://www.prueba.com/urlKO.php'
} as const;
