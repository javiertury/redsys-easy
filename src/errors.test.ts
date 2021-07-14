import { HTTPError, GatewayError, ResponseError } from './errors';

describe('HTTPError', () => {
  it('should format error correctly', () => {
    const error = new HTTPError({
      message: 'Foo',
      code: 404,
      response: { status: 404 }
    });
    expect(error.message).toEqual('HTTP error 404: Not Found\nFoo');
    expect(error.code).toEqual(404);
    expect(error.response).toEqual({ status: 404 });
  });
});

describe('GatewayError', () => {
  it('should format error correctly', () => {
    const error = new GatewayError({
      message: 'Foo',
      code: 'SIS0001',
      response: { errorCode: 'SIS0001' }
    });
    expect(error.message).toEqual('Gateway error SIS0001: Error Interno\nFoo');
    expect(error.code).toEqual('SIS0001');
    expect(error.response).toEqual({ errorCode: 'SIS0001' });
  });
});

describe('ResponseError', () => {
  it('should format error correctly', () => {
    const error = new ResponseError({
      message: 'Foo',
      code: 9051,
      response: { Ds_Response: 9051 }
    });
    expect(error.message).toEqual('Response error 9051: Error número de pedido repetido\nFoo');
    expect(error.code).toEqual(9051);
    expect(error.response).toEqual({ Ds_Response: 9051 });
  });
});
