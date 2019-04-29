'use strict';

const base64url = require('base64url');
const xmlParser = require('fast-xml-parser');
const soap = require('soap');

const js2xml = new xmlParser.j2xParser();

const {
  TRANSACTION_TYPES,
  getResponseCodeMessage,
  getSISErrorCodeMessage,
  signedFieldsXMLResponse,
  sha256Sign,
  formatParams
} = require('./utils.js');

exports.getResponseCodeMessage = getResponseCodeMessage;
exports.getSISErrorCodeMessage = getSISErrorCodeMessage;
exports.TRANSACTION_TYPES = TRANSACTION_TYPES;

exports.PRODUCTION_URLS = {
  redirect: 'https://sis.redsys.es/sis/realizarPago',
  ws: 'https://sis.redsys.es/sis/services/SerClsWSEntrada/wsdl/SerClsWSEntrada.wsdl',
};

exports.SANDBOX_URLS = {
  redirect: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  ws: 'https://sis-t.redsys.es:25443/sis/services/SerClsWSEntrada/wsdl/SerClsWSEntrada.wsdl',
};

class Redsys {
  constructor(options) {
    if (!options.secretKey || typeof options.secretKey !== 'string') {
      throw new Error('A secretKey key must be provided');
    }

    if (!options.urls || typeof options.urls !== 'object' || options.urls == null ||
      !options.urls.ws || !options.urls.redirect) {
      throw new Error('URLs must be provided');
    }

    this.secretKey = options.secretKey;
    this.urls = options.urls;
  }

  signOrderText (order, text) {
    return sha256Sign(this.secretKey, order, text);
  }

  redirectPetitionParameters (paramsInput) {
    const paramsObj = formatParams(paramsInput);
    // Docs escape "/" but we don't, this JSON won't get placed in a script tag
    return Buffer.from(JSON.stringify(paramsObj), 'utf8').toString('base64');
  }

  redirectPetition (paramsInput) {
    const Ds_MerchantParameters = this.redirectPetitionParameters(paramsInput);
    const Ds_Signature = sha256Sign(this.secretKey, paramsInput.order, Ds_MerchantParameters);
    return {
      url: this.urls.redirect,
      body: {
        Ds_SignatureVersion: 'HMAC_SHA256_V1',
        Ds_MerchantParameters,
        Ds_Signature,
      },
    };
  }

  processNotificationParameters (strPayload) {
    if (!strPayload) {
      throw new Error('Payload is required');
    }

    if (typeof strPayload !== 'string') {
      throw new Error('Payload must be a base-64 encoded string');
    }
    const payload = JSON.parse(decodeURIComponent(Buffer.from(strPayload, 'base64').toString('utf8')));

    return payload || null;
  }

  processNotification (body) {
    const params = this.processNotificationParameters(body.Ds_MerchantParameters);
    const signature = body.Ds_Signature;
    // Base64url with padding, only substitutes + and /
    const expSignature = sha256Sign(this.secretKey,
      params.Ds_Order, body.Ds_MerchantParameters);
    
    // Comparing different base64 encodings is messy. Foolproof, compare buffers.
    if (!signature || !Buffer.from(expSignature, 'base64').equals(base64url.toBuffer(signature))) {
      throw new Error('Invalid signature');
    }

    return params;
  }

  processXMLResponseData (xmlData) {
    return xmlParser.parse(xmlData, { parseNodeValue: false }).RETORNOXML;
  }

  // Generic Processor for Web Service Responses
  processXMLResponse (xmlData) {
    const data = this.processXMLResponseData(xmlData);
    if (data.CODIGO !== '0') {
      const err = new Error(`Redsys error ${data.CODIGO}`);
      err.code = data.CODIGO;
      err.description = getSISErrorCodeMessage(data.CODIGO);

      // Can't access data.OPERACION, only data.RECIBIDO
      // However data.RECIBIDO may contain sensitive information
      throw err;
    }

    return data;
  }

  assertXMLPetitionResponseSignature (data) {
    const operationData = data.OPERACION;

    const signedValues = [];
    for (const field of signedFieldsXMLResponse) {
      const value = operationData[field] || operationData[field.toUpperCase()];
      if (value) {
        signedValues.push(value);
      }
    }
    const signedString = signedValues.join('');

    const orderId = operationData.Ds_Order || operationData.DS_ORDER;
    const signature = operationData.Ds_Signature;
    const expSignature = sha256Sign(this.secretKey, orderId, signedString);

    if (signature !== expSignature) {
      throw new Error('Invalid signature');
    }

    return data;
  }

  // Processes Web Service Petitions Responses
  processXMLPetitionResponse (xml) {
    const data = this.processXMLResponse(xml);
    this.assertXMLPetitionResponseSignature(data);

    return data;
  }

  xmlPetitionParameters (paramsInput) {
    const datosEntrada = { DATOSENTRADA: formatParams(paramsInput) };
    return js2xml.parse(datosEntrada);
  }

  xmlPetitionData (paramsInput) {
    const datosEntradaXML = this.xmlPetitionParameters(paramsInput);
    const signature = sha256Sign(this.secretKey, paramsInput.order, datosEntradaXML);

    return `<REQUEST>${datosEntradaXML}<DS_SIGNATUREVERSION>HMAC_SHA256_V1</DS_SIGNATUREVERSION><DS_SIGNATURE>${signature}</DS_SIGNATURE></REQUEST>`;
  }

  // Good idea unless sessions are used
  getWSClient () {
    if (!this.wsClient) {
      this.wsClient = soap.createClientAsync(this.urls.ws);
    }

    // Promise
    return this.wsClient;
  }

  wsPetition (paramsInput) {
    const peticion = this.xmlPetitionData(paramsInput);

    return this.getWSClient().then(client => {
      client.trataPeticionAsync({ datoEntrada: peticion }).then(res => {
        const result = res[0].trataPeticionReturn;

        return this.processXMLPetitionResponse(result);
      });
    });
  }
}

exports.Redsys = Redsys;
