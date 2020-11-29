export class RedsysError extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'RedsysError';
  }
}

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

export class GatewayError extends RedsysError {
  code: number | undefined;
  response: unknown | undefined;

  constructor (message: string, code?: number, response?: unknown) {
    super(message);
    this.name = 'RedsysParseError';
    this.code = code;
    this.response = response;
  }
}
