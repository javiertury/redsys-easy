import {
  createRedsysAPI,
  SANDBOX_URLS,
  // Formatter utils
  useSingleInputFormatter,
  useOutputFormatter,
  usePromiseOutputFormatter,
  // Input formatters
  redirectInputFormatter,
  restIniciaPeticionInputFormatter,
  restTrataPeticionInputFormatter,
  // Output formatters
  restNotificationOutputFormatter,
  soapNotificationOutputFormatter,
  restIniciaPeticionOutputFormatter,
  restTrataPeticionOutputFormatter
} from 'redsys-easy';

const {
  restIniciaPeticion: baseRestIniciaPeticion,
  restTrataPeticion: baseRestTrataPeticion,
  createRedirectForm: baseCreateRedirectForm,
  processRestNotification: baseProcessRestNotification,
  processSoapNotification: baseProcessSoapNotification
} = createRedsysAPI({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS
});

/*
 *            External      Internal
 * amount      '33.5'  <->   '3350'
 * currency    'EUR'   <->   '978'
 *
 * expiryYear  '34'
 * expiryMonth '12'
 *                     <->   '3412'
 *
 * lang        'es'    <->   '1'
 * cardBrand   'VISA'  <-    '1'
 * cardCountry 'es'    <-    '724'
 */
export const createRedirectForm = useSingleInputFormatter(baseCreateRedirectForm, redirectInputFormatter);
export const restIniciaPeticion = useSingleInputFormatter(
  usePromiseOutputFormatter(baseRestIniciaPeticion, restIniciaPeticionOutputFormatter),
  restIniciaPeticionInputFormatter
)
export const restTrataPeticion = useSingleInputFormatter(
  usePromiseOutputFormatter(baseRestTrataPeticion, restTrataPeticionOutputFormatter),
  restTrataPeticionInputFormatter
)
export const processRestNotification = useOutputFormatter(baseProcessRestNotification, restNotificationOutputFormatter);
export const processSoapNotification = useOutputFormatter(baseProcessSoapNotification, soapNotificationOutputFormatter);
