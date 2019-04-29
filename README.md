Redsys Easy 
---

Node JS interface for Redsys payment gateway

## Install

```
npm install redsys-easy
```

## Usage

When creating a `Redsys` instance, you are required to pass some options. `secretKey` is your Redsys key. The `urls` property should be an Object with the urls of Redsys endpoints.

```js
const {
  SANDBOX_URLS,
  PRODUCTION_URLS,
  Redsys
} = require('redsys-easy')

const redsys = new Redsys({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS,
});

// PRODUCTION_URLS
{
  redirect: 'https://sis.redsys.es/sis/realizarPago',
  ws: 'https://sis.redsys.es/sis/services/SerClsWSEntrada/wsdl/SerClsWSEntrada.wsdl'
}
```

### Redirection Requests

Generate the parameters to create a transaction:

```js
const {
  Redsys,
  SANDBOX_URLS,
  PRODUCTION_URLS,
  TRANSACTION_TYPES
} = require('redsys-easy')

const redsys = new Redsys({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS, // Also PRODUCTION_URLS
});

const obj = {
  amount: 49.99,
  currency: 'EUR',
  order: '123123',
  merchantName: 'MI COMERCIO',
  merchantCode: '123123123',
  transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
  terminal: '1',
  merchantURL: 'http://micomercio.com/payments/redsys/notification',
  successURL: 'http://micomercio.com/compra/success',
  errorURL: 'http://micomercio.com/compra/error'
}

const form = redsys.redirectPetition(obj)
console.log(form);
```

The above will produce the following object

```js
{
  url: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  body: {
    Ds_MerchantParameters: 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIxMDAiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjE1MDg0MjgzNjAiLCJEU19NRVJDSEFOVF9NRVJDSEFOVE5BTUUiOiJUZXN0aW5nIFNob3AiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiIzMjcyMzQ2ODgiLCJEU19NRVJDSEFOVF9DVVJSRU5DWSI6Ijk3OCIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9NRVJDSEFOVFVSTCI6IiIsIkRTX01FUkNIQU5UX1VSTE9LIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3N1Y2Nlc3MiLCJEU19NRVJDSEFOVF9VUkxLTyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9lcnJvciJ9',
    Ds_SignatureVersion: 'HMAC_SHA256_V1',
    Ds_Signature: 'qkMJMWR6Dq32xwbQuguTv39OvXv4KdD1Xg7pZ8phGZI='
  }
}
```

Which can be used to create a payment form

### Process Notifications

```js
const {
  Redsys,
  SANDBOX_URLS,
  PRODUCTION_URLS,
  TRANSACTION_TYPES
} = require('redsys-easy')

const redsys = new Redsys({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS, // Also PRODUCTION_URLS
});

const result = redsys.processNotification(req.body)
console.log(result)
```

If the signature is not correct, it will throw an error. Otherwise it will return an object like this.

```js
{
  Ds_Date: '20/10/2017',
  Ds_Hour: '18:20',
  Ds_SecurePayment: '1',
  Ds_Amount: '100',
  Ds_Currency: '978',
  Ds_Order: '00007921799',
  Ds_MerchantCode: '327234688',
  Ds_Terminal: '001',
  Ds_Response: '0000',
  Ds_TransactionType: '0',
  Ds_MerchantData: '',
  Ds_AuthorisationCode: '678746',
  Ds_ConsumerLanguage: '1',
  Ds_Card_Country: '724',
  Ds_Card_Brand: '1'
}
```

### Checking a response code

```js
const { getResponseCodeMessage } = require('redsys-easy')

getResponseCodeMessage('0180')
// 'Operación no permitida para ese tipo de tarjeta.'

getResponseCodeMessage('xyz')
// null
```

### Web Service Requests

```js
const {
  Redsys,
  TRANSACTION_TYPES,
  SANDBOX_URLS,
  PRODUCTION_URLS
} = require('redsys-easy')

const redsys = new Redsys({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7'
  urls: SANDBOX_URLS, // Also PRODUCTION_URLS
});

const params = {
  amount: 33.50,
  order: '000123',
  merchantCode: '132132132',
  currency: 'EUR',
  expiryDate: '1220', // MMYY format
  transactionType: TRANSACTION_TYPES.NO_AUTHENTICATION,
  terminal: '1',
  identifier: '18550bc2358294ddfdb50f74d149a31eecebb9d36'
}

redsys.wsPetition(dataparams).then(result => {
  console.log(result);
})
```

Redsys SIS errors will raise errors in Node JS, but failed transactions will not. You can check the transaction status in this way.

```js
const {
  getResponseCodeMessage,
} = require('redsys-easy')

// Get response code
result.OPERACION.Ds_Response

// Get code message
getResponseCodeMessage(result.OPERACION.Ds_Response);
```


### Accepted parameters for redirectPetition and wsPetition

Numbers

* amount

Strings

* order
* merchantCode
* currency
* transactionType
* terminal
* merchantName
* merchantURL
* errorURL
* successURL
* dateFrecuency
* chargeExpiryDate
* sumTotal
* directPayment
* identifier
* group
* pan
* expiryDate
* CVV2
* partialPayment
* cardCountry
* merchantData
* clientIp

`expiryDate` should be formatted "MMYY"

### Transaction Types:

* AUTHORIZATION: "0"
* PRE_AUTHORIZATION: "1"
* CONFIRMATION: "2"
* AUTO_REFUND: "3"
* RECURRING_TRANSACTION: "5"
* SUCCESSIVE_TRANSACTION: "6"
* PRE_AUTHENTICATION: "7"
* PRE_AUTHENTICATION_CONFIRMATION: "8"
* PRE_AUTHORIZATION_CANCEL: "9"
* DEFERRED_AUTHORIZATION: "O"
* DEFERRED_AUTHORIZATION_CONFIRMATION: "P"
* DEFERRED_AUTHORIZATION_CANCEL: "Q"
* DEFERRED_INITIAL_FEE: "R"
* DEFERRED_SUCCESSIVE_FEE: "S"
* NO_AUTHENTICATION: "A"
* DELETE_REFERENCE: "44"

### Supported Currencies

* EUR
* USD
* GBP
* JPY
* RUB

## Acknowledgments

Based on previous work

[redsys-pay](https://github.com/warlock/redsys-pay) by Josep Subils
[redsys-pos](https://github.com/TvrboPro/redsys-pos) by Jordi Moraleda and Joel Moreno
[node-redsys-api](https://github.com/santiperez/node-redsys-api) by Santi Perez
