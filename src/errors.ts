import {
  getResponseCodeMessage,
  getSISErrorCodeMessage,
  getHTTPErrorCodeMessage
} from './utils/codes';

/**
 * Error superclass for all redsys-easy specific errors
 *
 * @public
 */
export class RedsysError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RedsysError';
  }
}

/**
 * Invalid input provided
 *
 * @public
 */
export class ValidationError extends RedsysError {
  value: unknown;
  parameters: object;

  constructor(message: string, parameters: object) {
    super(message);
    this.name = 'RedsysValidationError';
    this.parameters = parameters;
  }
}

/**
 * Response cannot be parsed
 *
 * @public
 */
export class ParseError extends RedsysError {
  value: unknown;
  location: unknown | undefined;
  description: string | undefined;

  constructor(message: string, value?: unknown | undefined, location?: unknown | undefined) {
    super(message);
    this.name = 'RedsysParseError';
    this.value = value;
    this.location = location;
  }
}

interface HTTPErrorOptions {
  message?: string | undefined;
  code: number;
  response?: unknown | undefined;
}

/**
 * HTTP Error
 *
 * @public
 */
export class HTTPError extends RedsysError {
  code: number | undefined;
  response: unknown | undefined;

  constructor({ message, code, response }: HTTPErrorOptions) {
    const codeDescription = getHTTPErrorCodeMessage(code);
    const codeInfo =
      code !== undefined
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
  message?: string | undefined;
  code: string;
  response?: unknown | undefined;
}

/**
 * Request could not be processed by Redsys
 *
 * @public
 */
export class GatewayError extends RedsysError {
  code: string | undefined;
  response: unknown | undefined;

  constructor({ message, code, response }: GatewayErrorOptions) {
    const codeDescription = getSISErrorCodeMessage(code);
    const codeInfo =
      code !== undefined
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
  message?: string | undefined;
  code: number;
  response?: unknown | undefined;
}

/**
 * Response contained an error code
 *
 * @public
 */
export class ResponseError extends RedsysError {
  code: number | undefined;
  response: unknown | undefined;

  constructor({ message, code, response }: ResponseErrorOptions) {
    const codeDescription = getResponseCodeMessage(code);
    const codeInfo =
      code !== undefined
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
