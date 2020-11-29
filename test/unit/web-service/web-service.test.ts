import {
  Redsys
} from '../../../src';

import settings from '../settings';

import request from './data/request';
import requestProcessed from './data/request-processed.json';

import response from './data/response.json';
import responseForged from './data/response-forged.json';
import responseNotSigned from './data/response-not-signed.json';
import responseProcessed from './data/response-processed.json';
import { Client } from 'soap';
import { ParseError } from '../../../src/errors';

describe('Redsys Web Service Requests and Responses', () => {
  const mockTrataPeticionAsync = jest.fn();

  const client = {
    trataPeticionAsync: mockTrataPeticionAsync
  };

  const redsys = new Redsys({
    secretKey: settings.secretKey,
    urls: settings.urls
  });

  redsys.wsClient = Promise.resolve(client) as unknown as Promise<Client>;

  beforeEach(() => {
    // mockTrataPeticionAsync.mockClear();
    mockTrataPeticionAsync.mockReset();
    mockTrataPeticionAsync.mockResolvedValue(response);
  });

  describe('wsPetition', () => {
    it('should prepare request data', async () => {
      try {
        await redsys.wsPetition(request);
      } finally {
        expect(mockTrataPeticionAsync).toHaveBeenCalledWith(requestProcessed);
      }
    });

    it('should process response', async () => {
      return await expect(redsys.wsPetition(request))
        .resolves.toEqual(responseProcessed);
    });

    it('should throw if response signature is invalid', async () => {
      mockTrataPeticionAsync.mockResolvedValue(responseForged);
      const resultPromise = redsys.wsPetition(request);

      return await expect(resultPromise)
        .rejects.toEqual(new ParseError('Invalid signature'));
    });

    it('should throw if response signature is invalid', async () => {
      mockTrataPeticionAsync.mockResolvedValue(responseNotSigned);
      const resultPromise = redsys.wsPetition(request);

      return await expect(resultPromise)
        .rejects.toEqual(new ParseError('Invalid signature'));
    });
  });
});
