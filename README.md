Redsys Easy 
---

Node JS client and utilities for implementing a redsys payment gateway

## Install

```js
npm install redsys-easy
```

## API documentation

Checkout the [api documentation](./docs/redsys-easy.md) to explore the utilities exported by this package.

## Usage

These are the most important utilities that redsys-easy provides.

<!-- doc-gen CODE src="./examples/__readme__/usage.ts" -->
```ts
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
```
<!-- end-doc-gen -->

## Examples

Despite the name, a redsys payment gateway with 3DS support is quite complex. Don't despair, these examples show how it can be implemented.
  - [INSITE client](./examples/insite-client) implemented using a [solid](https://github.com/solidjs/solid) web app.
  - [REST 3DS server](./examples/rest-3ds-server) implemented using a [koa](https://koajs.com/) http server.

Redirection is much simpler but less customizable
  - [Redirection integration](./examples/redirection)

## Formatters

By default, the main functions exported by this package use the API specified by redsys. To smooth out the corners of this API, it's also possible to wrap them with custom formatters.

As an example, redsys-easy provides some basic typescript-ready formatters.

> :warning: **Format has changed**: Previous versions of redsys-easy used a different format, particularly the `amount` field.

<!-- doc-gen CODE src="./examples/__readme__/formatters.ts" -->
```ts
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
```
<!-- end-doc-gen -->

## FAQ

### How should I format the amount?

Redsys API uses expects amounts denominated in the smallest unit of a currency. The exported core functions of redsys-easy also follows this convention. The smallest unit of a currency is the smallest integer amount of said currency. For euros, it is cents. So 1.99 EUR would be 199 of the smallest unit.

However you are free to wrap these core functions with a custom formatter. Particularly, redsys-easy optional formatters expect the amount to be formatted as a decimal string currency unit. For euros, it would be '1.99'.

## Acknowledgments

Based on previous work

* [redsys-pay](https://github.com/warlock/redsys-pay) by Josep Subils
* [redsys-pos](https://github.com/TvrboPro/redsys-pos) by Jordi Moraleda and Joel Moreno
* [node-redsys-api](https://github.com/santiperez/node-redsys-api) by Santi Perez
