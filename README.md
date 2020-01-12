Redsys Easy 
---

Node JS interface for Redsys payment gateway

## Install

```js
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
  TRANSACTION_TYPES,
  randomTransactionId
} = require('redsys-easy')

const redsys = new Redsys({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS, // Also PRODUCTION_URLS
});

const obj = {
  // amount in smallest currency unit(cents)
  // 49.99€
  amount: 4999,
  currency: 'EUR',
  order: randomTransactionId(),
  merchantName: 'MI COMERCIO',
  merchantCode: '999008881',
  terminal: '1',
  transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
  merchantURL: 'http://micomercio.com/payments/redsys/notification',
  successURL: 'http://micomercio.com/compra/success',
  errorURL: 'http://micomercio.com/compra/error',
  // Raw parameters
  raw: {
    // merchantData
    DS_MERCHANT_MERCHANTDATA: 'foo',
  },
}

const form = redsys.redirectPetition(obj)
console.log(form);
```

The above will produce an object similar to

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

### Process REST Notifications

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
  date: '2017-10-20',
  hour: '18:20',
  // Already timezone aware
  timestamp: new Date('2017-10-20 17:20 Z'),
  securePayment: true,
  // amount in smallest currency unit(cents)
  // 49.99€
  amount: 4999,
  currency: 'EUR',
  order: '000079d1Zr9',
  merchantCode: '327234688',
  terminal: '001',
  response: 0,
  transactionType: '0',
  authorisationCode: '678746',
  lang: 'es',
  cardCountry: 'es',
  cardBrand: 'VISA',
  // Raw response parameters
  raw: {
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
}
```

### Response code messages

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
  PRODUCTION_URLS,
  randomTransactionId,
} = require('redsys-easy')

const redsys = new Redsys({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS, // Also PRODUCTION_URLS
})

const params = {
  // amount in smallest currency unit(cents)
  // 33.50€
  amount: 3350,
  order: '000079d1Zr9',
  merchantCode: '999008881',
  currency: 'EUR',
  pan: '4548812049400004',
  cvv: '123',
  expiryDate: '1220', // MMYY format
  transactionType: TRANSACTION_TYPES.NO_AUTHENTICATION,
  terminal: '1',
  // Raw parameters
  raw: {
    // merchantData
    DS_MERCHANT_MERCHANTDATA: 'foo',
  },
}

redsys.wsPetition(params).then(result => {
  console.log(result);
})
```

Redsys SIS errors will raise errors in Node JS, but failed transactions will not. You can check the transaction status in this way.

```js
const {
  getResponseCodeMessage,
} = require('redsys-easy')

// Get response code
result.response
result.raw.Ds_Response

// Get code message
getResponseCodeMessage(response);
getResponseCodeMessage(result.raw.Ds_Response);
```

### Basic SOAP Notification functions

```js
const {
  Redsys,
  SANDBOX_URLS,
  PRODUCTION_URLS,
} = require('redsys-easy')

const redsys = new Redsys({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS, // Also PRODUCTION_URLS
});

// Get the parameters from a message/request xml
// Throws an error if signature is not valid
const params = processSoapNotification(requestXml);

// Build your signed answer/response.
// Second arg dedices whether the transaction is approved
const answer = soapNotificationAnswer(params.Ds_Order, true);
```

### Mimic a SOAP Notification server

Now you can receive synchronous notifications and kill the transaction if you want. No need to run a full-fledged SOAP server.

```js
const {
  Redsys,
  SANDBOX_URLS,
  PRODUCTION_URLS,
  detectSoapVersion,
  mimicSoapNotificationReceiver,
  mimicSoap11NotificationResponse,
  mimicSoap12NotificationResponse,
} = require('redsys-easy')

const redsys = new Redsys({
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
  urls: SANDBOX_URLS, // Also PRODUCTION_URLS
});
```

In koa

```js
app.post('/soapNotification', ctx => {
  // Simulate processing raw xml by a SOAP server
  const requestXml = mimicSoapNotificationReceiver(ctx.request.body),

  // Throws an error if signature is not valid
  const params = processSoapNotification(requestXml);

  // Build your answer
  // Second arg dedices whether the transaction is approved
  const answer = soapNotificationAnswer(params.order, true);

  // Simulate a full SOAP server response
  const soapVersion = detectSoapVersion({
    headers: ctx.request.headers,
    body: ctx.request.body,
  });

  if (soapVersion === '1.2') {
    ctx.type = 'application/soap+xml; charset=utf-8';
    ctx.body = mimicSoap12NotificationResponse(answer);
  } else {
    ctx.type = 'text/xml; charset=utf-8';
    ctx.body = mimicSoap11NotificationResponse(answer);
  }
});
```

In express

```js
app.post('/soapNotification', (req, res) => {
  // Simulate processing raw xml by a SOAP server
  const requestXml = mimicSoapNotificationReceiver(req.body),

  // Throws an error if signature is not valid
  const params = processSoapNotification(requestXml);

  // Build your answer
  // Second arg dedices whether the transaction is approved
  const answer = soapNotificationAnswer(params.order, true);

  // Simulate a full SOAP server response
  const soapVersion = detectSoapVersion({
    headers: req.headers,
    body: req.body,
  });

  if (soapVersion === '1.2') {
    res.set('Content-Type', 'application/soap+xml; charset=utf-8');
    res.send(mimicSoap12NotificationResponse(answer));
  } else {
    res.set('Content-Type', 'text/xml; charset=utf-8');
    res.send(mimicSoap11NotificationResponse(answer));
  }
});
```


### Accepted parameters for redirectPetition and wsPetition

Numbers

* amount: integer in the smallest currency unit.

Strings

* order
* merchantCode
* currency: Uppercase ISO 4217 alpha-3 code, e.g 'EUR'
* transactionType
* terminal
* merchantName
* merchantURL
* errorURL
* successURL
* dateFrequency
* chargeExpiryDate
* sumTotal
* directPayment
* identifier
* group
* pan: credit card number
* expiryDate: As printed in your credit card, MMYY, has priority over expiryYear and expiryMonth
* expiryYear: YY
* expiryMonth: MM
* cvv 
* partialPayment
* cardCountry: Lowercase ISO 3166 Alpha 2 country code, e.g. 'es'
* merchantData
* clientIp
* lang: Lowercase ISO 639-1 lang code
* operationId
* payMethods
* productDescription
* taxReference
* transactionDate
* merchantDescriptor
* customerMobile: Mobile phone number
* customerMail: Email address
* cardHolder: Name of credit card holder
* smsTemplate: Paygold sms template like `'@COMERCIO@. Ya puede pagar su recibo de @IMPORTE@ @MONEDA@ en la siguiente url: @URL@'`

Other

* raw: Object with parameters that will not formatted. E.g. `raw: { DS_MERCHANTDATA: 'foo', ... }`

### Response

Numbers

* amount: integer in the smallest currency unit.
* response: response code

Booleans
* securePayment

Strings

* hour: HH:MM
* date: YYYY-MM-DD
* timestamp: javascript date object, with date and hour information
* order
* merchantCode
* currency: Uppercase ISO 4217 alpha-3 code, e.g 'EUR'
* transactionType
* terminal
* identifier
* cardNumber: Partial credit card number
* expiryDate: As printed in your credit card, MMYY
* expiryYear: YY
* expiryMonth: MM
* cardBrand: E.g. 'VISA'
* cardType: 'C' (Credit) or 'D' (Debit)
* cardCountry: Lowercase ISO 3166 Alpha 2 country code, e.g. 'es'
* authorisationCode
* merchantData
* clientIp
* lang: Lowercase ISO 639-1 lang code
* operationId
* transactionDate
* merchantDescriptor
* payURL: Paygold 2 phase payment URL to send to the client

Other

* raw: Full response as received from the server. E.g. `{ DS_MERCHANTDATA: 'foo', ... }`

### Transaction Types

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
* PAYLINK: "F". Also known as paygold.
* DEFERRED_AUTHORIZATION_CONFIRMATION: "P"
* DEFERRED_AUTHORIZATION_CANCEL: "Q"
* DEFERRED_INITIAL_FEE: "R"
* DEFERRED_SUCCESSIVE_FEE: "S"
* NO_AUTHENTICATION: "A"
* DELETE_REFERENCE: "44"

### Errors

* RedsysError: Super class from which all errors inherit. Unclassified errors.
* ValidationError: Error validating input parameters.
* ParseError: Error parsing response.
* GatewayError: Redsys gateway returned an error code. Note that only webservice requests trigger this error, notification processors don't.

```js
const {
  RedsysError,
  ValidationError,
  ParseError,
  GatewayError,
} = require('redsys-easy');
```

## FAQ

### What is the smallest unit of a currency?

The smallest unit of a currency, is the smallest integer amount of said currency. For euros, it is cents. So 1.99 EUR would be 199 of the smallest unit.

### Why are amounts denominated in the smallest unit of a currency?

To avoid floats and precision losses. In javascript `0.1 + 0.2 !== 0.3`, but `1 + 2 === 3`. Also, this is a convention for payment processors and POS terminals.

## Acknowledgments

Based on previous work

* [redsys-pay](https://github.com/warlock/redsys-pay) by Josep Subils
* [redsys-pos](https://github.com/TvrboPro/redsys-pos) by Jordi Moraleda and Joel Moreno
* [node-redsys-api](https://github.com/santiperez/node-redsys-api) by Santi Perez
