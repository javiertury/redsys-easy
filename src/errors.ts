import {
  getResponseCodeMessage,
  getSISErrorCodeMessage
} from './formatters/codes';

export class RedsysError extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'RedsysError';
  }
}

/**
 * Invalid input provided
 */
export class ValidationError extends RedsysError {
  value: unknown;
  field: string;

  constructor (message: string, value: unknown, field: string) {
    super(message);
    this.name = 'RedsysValidationError';
    this.value = value;
    this.field = field;
  }
}

/**
 * Response cannot be parsed
 */
export class ParseError extends RedsysError {
  value: unknown;
  text: string | undefined;
  code: string | undefined;
  description: string | undefined;

  constructor (message: string, value?: unknown, text?: string) {
    super(message);
    this.name = 'RedsysParseError';
    this.value = value;
    this.text = text;
  }
}

/**
 * Response contained an error code
 */
export class ResponseError extends RedsysError {
  code: number | undefined;
  response: unknown | undefined;

  constructor (message: string, code: number, response?: unknown) {
    const codeDescription = getResponseCodeMessage(code);
    const augmentedMessage = code !== undefined
      ? `${message}\nResponse error ${code}${codeDescription != null ? `: ${codeDescription}` : ''}`
      : message;

    super(augmentedMessage);

    this.name = 'RedsysResponseError';
    this.code = code;
    this.response = response;
  }
}

/**
 * Request could not be processed by Redsys
 */
export class GatewayError extends RedsysError {
  code: string | undefined;
  response: unknown | undefined;

  constructor (message: string, code: string, response?: unknown) {
    const codeDescription = getSISErrorCodeMessage(code);
    const augmentedMessage = code !== undefined
      ? `${message}\nGateway error ${code}${codeDescription != null ? `: ${codeDescription}` : ''}`
      : message;

    super(augmentedMessage);

    this.name = 'RedsysGatewayError';
    this.code = code;
    this.response = response;
  }
}
