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

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/__readme__/usage.ts) -->
<!-- The below code snippet is automatically added from ./examples/__readme__/usage.ts -->
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
<!-- AUTO-GENERATED-CONTENT:END -->

## Examples

Despite the name, a redsys payment gateway with 3DS support is quite complex. Don't despair, these examples show how it can be implemented.
  - [INSITE client](./examples/insite-client) implemented using a [solid](https://github.com/solidjs/solid) web app.
  - [REST server](./examples/rest-server) implemented using a [koa](https://koajs.com/) http server.

Redirection is much simpler but less customizable
  - [Redirection integration](./examples/redirection)

## FAQ

### What is the smallest unit of a currency?

The smallest unit of a currency, is the smallest integer amount of said currency. For euros, it is cents. So 1.99 EUR would be 199 of the smallest unit.

## Acknowledgments

Based on previous work

* [redsys-pay](https://github.com/warlock/redsys-pay) by Josep Subils
* [redsys-pos](https://github.com/TvrboPro/redsys-pos) by Jordi Moraleda and Joel Moreno
* [node-redsys-api](https://github.com/santiperez/node-redsys-api) by Santi Perez
