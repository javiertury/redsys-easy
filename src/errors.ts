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
  location: unknown | undefined;
  description: string | undefined;

  constructor (message: string, value?: unknown, location?: unknown) {
    super(message);
    this.name = 'RedsysParseError';
    this.value = value;
    this.location = location;
  }
}

interface HTTPErrorOptions {
  message?: string
  code: number
  response?: unknown
}

/**
 * HTTP Error
 */
export class HTTPError extends RedsysError {
  code: number | undefined;
  response: unknown | undefined;

  constructor ({ message, code, response }: HTTPErrorOptions) {
    const codeDescription = getHTTPErrorCodeMessage(code);
    const codeInfo = code !== undefined
      ? ` ${code}${codeDescription != null ? `: ${codeDescription}` : ''}`
      : '';
    const augmentationLine = message != null && message ? `\n${message}` : '';
    const augmentedMessage = `HTTP error${codeInfo}${augmentationLine}`;

    super(augmentedMessage);

    this.name = 'RedsysHTTPError';
    this.code = code;
    this.response = response;
  }
}

interface GatewayErrorOptions {
  message?: string
  code: string
  response?: unknown
}

/**
 * Request could not be processed by Redsys
 */
export class GatewayError extends RedsysError {
  code: string | undefined;
  response: unknown | undefined;

  constructor ({ message, code, response }: GatewayErrorOptions) {
    const codeDescription = getSISErrorCodeMessage(code);
    const codeInfo = code !== undefined
      ? ` ${code}${codeDescription != null ? `: ${codeDescription}` : ''}`
      : '';
    const augmentationLine = message != null && message ? `\n${message}` : '';
    const augmentedMessage = `Gateway error${codeInfo}${augmentationLine}`;

    super(augmentedMessage);

    this.name = 'RedsysGatewayError';
    this.code = code;
    this.response = response;
  }
}

interface ResponseErrorOptions {
  message?: string
  code: number
  response?: unknown
}

/**
 * Response contained an error code
 */
export class ResponseError extends RedsysError {
  code: number | undefined;
  response: unknown | undefined;

  constructor ({ message, code, response }: ResponseErrorOptions) {
    const codeDescription = getResponseCodeMessage(code);
    const codeInfo = code !== undefined
      ? ` ${code}${codeDescription != null ? `: ${codeDescription}` : ''}`
      : '';
    const augmentationLine = message != null && message ? `\n${message}` : '';
    const augmentedMessage = `Response error${codeInfo}${augmentationLine}`;

    super(augmentedMessage);

    this.name = 'RedsysResponseError';
    this.code = code;
    this.response = response;
  }
}
