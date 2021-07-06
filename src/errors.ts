import {
  getResponseCodeMessage,
  getSISErrorCodeMessage,
  getHTTPErrorCodeMessage
} from './utils/codes';

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
  parameters: object;

  constructor (message: string, parameters: object) {
    super(message);
    this.name = 'RedsysValidationError';
    this.parameters = parameters;
  }
}

/**
 * Response cannot be parsed
 */
export class ParseError extends RedsysError {
  value: unknown;
  text: string | undefined;
  description: string | undefined;

  constructor (message: string, value?: unknown, text?: string) {
    super(message);
    this.name = 'RedsysParseError';
    this.value = value;
    this.text = text;
  }
}

/**
 * HTTP Error
 */
export class HTTPError extends RedsysError {
  code: number | undefined;
  response: unknown | undefined;

  constructor (message: string, code: number, response?: unknown) {
    const codeDescription = getHTTPErrorCodeMessage(code);
    const codeInfo = code !== undefined
      ? ` ${code}${codeDescription != null ? ` ${codeDescription}` : ''}`
      : '';
    const augmentedMessage = `HTTP error${codeInfo}: ${message}`;

    super(augmentedMessage);

    this.name = 'RedsysHTTPError';
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
    const codeInfo = code !== undefined
      ? ` ${code}${codeDescription != null ? ` ${codeDescription}` : ''}`
      : '';
    const augmentedMessage = `Gateway error${codeInfo}: ${message}`;

    super(augmentedMessage);

    this.name = 'RedsysGatewayError';
    this.code = code;
    this.response = response;
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
    const codeInfo = code !== undefined
      ? ` ${code}${codeDescription != null ? ` ${codeDescription}` : ''}`
      : '';
    const augmentedMessage = `Response error${codeInfo}: ${message}`;

    super(augmentedMessage);

    this.name = 'RedsysResponseError';
    this.code = code;
    this.response = response;
  }
}
