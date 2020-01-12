'use strict';

class RedsysError extends Error {
  constructor (message) {
    super(message);
    this.name = 'RedsysError';
  }
}

class ValidationError extends RedsysError {
  constructor (message, value, field) {
    super(message);
    this.name = 'RedsysValidationError';
    this.value = value;
    this.field = field;
  }
}

class ParseError extends RedsysError {
  constructor (message, value, text) {
    super(message);
    this.name = 'RedsysParseError';
    this.value = value;
    this.text = text;
  }
}

class GatewayError extends RedsysError {
  constructor (message, code, response) {
    super(message);
    this.name = 'RedsysParseError';
    this.code = code;
    this.response = response;
  }
}

exports.RedsysError = RedsysError;
exports.ValidationError = ValidationError;
exports.ParseError = ParseError;
exports.GatewayError = GatewayError;
