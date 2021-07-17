import { expectType } from 'ts-expect';
import type { TypeEqual } from 'ts-expect';

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

import type {
  // Formatter params
  RedirectFormatterInput,
  RestIniciaPeticionFormatterInput,
  RestTrataPeticionFormatterInput,
  NotificationFormatterOutput,
  RestIniciaPeticionFormatterOutput,
  RestTrataPeticionFormatterOutput,
  // Input params
  RedirectInputParams,
  RestIniciaPeticionInputParams,
  RestTrataPeticionInputParams,
  // Output params
  RestNotificationOutputParams,
  SoapNotificationOutputParams,
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  // API
  RedirectForm,
  ResponseJSONSuccess
} from 'redsys-easy';

const {
  restIniciaPeticion,
  restTrataPeticion,
  createRedirectForm,
  processRestNotification,
  processSoapNotification
} = createRedsysAPI({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS
});

/* eslint-disable @typescript-eslint/indent */
describe('Formatter utils interfaces', () => {
  it('should work with redirect formatter', () => {
    const wrappedFormatter = useSingleInputFormatter(createRedirectForm, redirectInputFormatter);

    expectType<TypeEqual<
      (input: RedirectFormatterInput<Partial<RedirectInputParams>>) => RedirectForm,
      typeof wrappedFormatter
    >>(true);
  });

  it('should work with rest iniciaPeticion formatters', () => {
    const wrappedFormatter = useSingleInputFormatter(
      usePromiseOutputFormatter(restIniciaPeticion, restIniciaPeticionOutputFormatter),
      restIniciaPeticionInputFormatter
    );

    expectType<TypeEqual<
      (
        input: RestIniciaPeticionFormatterInput<Partial<RestIniciaPeticionInputParams>>
      ) => Promise<RestIniciaPeticionFormatterOutput<RestIniciaPeticionOutputParams>>,
      typeof wrappedFormatter
    >>(true);
  });

  it('should work with rest trataPeticion formatters', () => {
    const wrappedFormatter = useSingleInputFormatter(
      usePromiseOutputFormatter(restTrataPeticion, restTrataPeticionOutputFormatter),
      restTrataPeticionInputFormatter
    );

    expectType<TypeEqual<
      (
        input: RestTrataPeticionFormatterInput<Partial<RestTrataPeticionInputParams>>
      ) => Promise<RestTrataPeticionFormatterOutput<RestTrataPeticionOutputParams>>,
      typeof wrappedFormatter
    >>(true);
  });

  it('should work with rest notification formatters', () => {
    const wrappedFormatter = useOutputFormatter(processRestNotification, restNotificationOutputFormatter);

    expectType<TypeEqual<
      (input: ResponseJSONSuccess) => NotificationFormatterOutput<RestNotificationOutputParams>,
      typeof wrappedFormatter
    >>(true);
  });

  it('should work with soap notification formatters', () => {
    const wrappedFormatter = useOutputFormatter(processSoapNotification, soapNotificationOutputFormatter);

    expectType<TypeEqual<
      (input: string) => NotificationFormatterOutput<SoapNotificationOutputParams>,
      typeof wrappedFormatter
    >>(true);
  });
});
/* eslint-enable @typescript-eslint/indent */
