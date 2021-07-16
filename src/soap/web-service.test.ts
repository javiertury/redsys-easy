import type { Client } from 'soap';
import type {
  WebServiceTrataPeticionTrait
} from '../types/api';

import {
  deserializeAndVerifyWebServiceResponse,
  serializeAndSignWebServiceRequest,
  webServiceTrataPeticionRequest
} from './web-service';

import {
  ParseError,
  GatewayError
} from '../errors';

import {
  incorrectMerchantKey
} from '../../test/fixtures/merchant-keys';

import {
  webServiceRequestMerchantKey,
  webServiceRequestParams,
  serializedAndSignedWebServiceRequestParams,
  serializedWebServiceRequest
} from '../../test/fixtures/soap/web-service-request';

import {
  webServiceResponseMerchantKey,
  serializedWebServiceResponseParams,
  serializedWebServiceResponse,
  deserializedWebServiceResponse
} from '../../test/fixtures/soap/web-service-response';

import {
  serializedWebServiceErrorResponseParams,
  deserializedWebServiceErrorResponse,
  serializedWebServiceErrorResponse
} from '../../test/fixtures/soap/web-service-error-response';

describe('SOAP Web Service', () => {
  it('should serialize and sign request', () => {
    const serializedAndSignedRequest = serializeAndSignWebServiceRequest(webServiceRequestMerchantKey, webServiceRequestParams);
    expect(serializedAndSignedRequest).toEqual(serializedAndSignedWebServiceRequestParams);
  });

  it('should deserialize and verify legit response', () => {
    const verify = () => deserializeAndVerifyWebServiceResponse(webServiceResponseMerchantKey, serializedWebServiceResponseParams);
    expect(verify).not.toThrowError();

    const deserializedRequest = deserializeAndVerifyWebServiceResponse(webServiceResponseMerchantKey, serializedWebServiceResponseParams);
    expect(deserializedRequest).toEqual(deserializedWebServiceResponse);
  });

  it('should deserialize if response contains an error code', () => {
    const verify = () => deserializeAndVerifyWebServiceResponse(incorrectMerchantKey, serializedWebServiceErrorResponseParams);
    expect(verify).not.toThrowError();

    const deserializedRequest = deserializeAndVerifyWebServiceResponse(webServiceResponseMerchantKey, serializedWebServiceErrorResponseParams);
    expect(deserializedRequest).toEqual(deserializedWebServiceErrorResponse);
  });

  it('should throw if merchant key is incorrect', () => {
    const verify = () => deserializeAndVerifyWebServiceResponse(incorrectMerchantKey, serializedWebServiceResponseParams);
    expect(verify).toThrowError(new ParseError('Invalid signature'));
  });

  it('should throw if signature is forged', () => {
    const verify = () => deserializeAndVerifyWebServiceResponse(
      webServiceResponseMerchantKey,
      serializedWebServiceResponseParams.replace(
        /<Ds_Signature>[^<>]+<\/Ds_Signature>/,
        '<Ds_Signature>RTcH98KdGhGJ3hTKsXJCvJFO9KjcIYgj1oxwSSC+yw0=</Ds_Signature>'
      )
    );
    expect(verify).toThrowError(new ParseError('Invalid signature'));
  });

  describe('webServiceTrataPeticionRequest', () => {
    const mockTrataPeticionAsync = jest.fn();

    const client = {
      trataPeticionAsync: mockTrataPeticionAsync
    } as unknown as Client & WebServiceTrataPeticionTrait;

    beforeEach(() => {
      // mockTrataPeticionAsync.mockClear();
      mockTrataPeticionAsync.mockReset();
      mockTrataPeticionAsync.mockResolvedValue(serializedWebServiceResponse);
    });

    it('should serialize and sign request data', async () => {
      try {
        await webServiceTrataPeticionRequest(
          client,
          webServiceRequestMerchantKey,
          webServiceRequestParams
        );
      } finally {
        expect(mockTrataPeticionAsync).toHaveBeenCalledWith(serializedWebServiceRequest);
      }
    });

    it('should deserialize response', async () => {
      return await expect(
        webServiceTrataPeticionRequest(
          client,
          webServiceRequestMerchantKey,
          webServiceRequestParams
        )
      ).resolves.toEqual(deserializedWebServiceResponse.OPERACION);
    });

    it('should throw if response signature is invalid', async () => {
      mockTrataPeticionAsync.mockResolvedValue([{
        trataPeticionReturn: serializedWebServiceResponse[0].trataPeticionReturn.replace(
          /<Ds_Signature>.*<\/Ds_Signature>/,
          'RTcH98KdGhGJ3hTKsXJCvJFO9KjcIYgj1oxwSSC+yw0='
        )
      },
      ...serializedWebServiceResponse.slice(1)
      ]);
      const resultPromise = webServiceTrataPeticionRequest(
        client,
        webServiceRequestMerchantKey,
        webServiceRequestParams
      );

      return await expect(resultPromise)
        .rejects.toEqual(new ParseError('Invalid signature'));
    });

    it('should throw if response is not signed', async () => {
      mockTrataPeticionAsync.mockResolvedValue([{
        trataPeticionReturn: serializedWebServiceResponse[0].trataPeticionReturn.replace(
          /<Ds_Signature>.*<\/Ds_Signature>/,
          ''
        )
      },
      ...serializedWebServiceResponse.slice(1)
      ]);
      const resultPromise = webServiceTrataPeticionRequest(
        client,
        webServiceRequestMerchantKey,
        webServiceRequestParams
      );

      return await expect(resultPromise)
        .rejects.toEqual(new ParseError('Invalid signature'));
    });

    it('should throw on response error', async () => {
      mockTrataPeticionAsync.mockResolvedValue(serializedWebServiceErrorResponse);
      const resultPromise = webServiceTrataPeticionRequest(
        client,
        webServiceRequestMerchantKey,
        webServiceRequestParams
      );

      return await expect(resultPromise)
        .rejects.toEqual(new GatewayError({
          code: 'SIS0051',
          response: {
            CODIGO: 'SIS0051',
            RECIBIDO: {
              trataPeticion: {
                datoEntrada: ''
              }
            }
          }
        }));
    });
  });
});
