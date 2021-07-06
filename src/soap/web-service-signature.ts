import { sha256Sign } from '../crypto';

import {
  extractAndAssertOrderFromRequestParams,
  extractAndAssertOrderFromResponseParams
} from '../utils/misc';

import {
  ParseError,
  RedsysError
} from '../errors';

import type {
  ResponseXML,
  CommonRawRequestParams
} from '../types/api';

// Order is important
const signedFieldsXMLResponse = ['Ds_Amount', 'Ds_Order',
  'Ds_MerchantCode', 'Ds_Currency', 'Ds_Response', 'Ds_CardNumber',
  'Ds_TransactionType', 'Ds_SecurePayment'] as const;

export const verifyWebServiceResponse = (
  merchantKey: string,
  data: ResponseXML['RETORNOXML']
): void => {
  if (data.CODIGO !== '0') {
    if ('OPERACION' in data) {
      throw new RedsysError('Request returned both an error code and "OPERACION", suspicious');
    }
    // Response is only signed if operation succeeded
    return;
  }

  if (!('OPERACION' in data)) {
    throw new ParseError('Request is missing operation parameters');
  }

  const responseParams = data.OPERACION;
  const signedString: string = signedFieldsXMLResponse.map(field => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
    const value: string | undefined = responseParams[field] || (responseParams as unknown as Record<string, string>)[field.toUpperCase()];

    return value ?? '';
  }).join('');

  const orderId: string = extractAndAssertOrderFromResponseParams(responseParams);

  const signature: string | undefined = responseParams.Ds_Signature;
  const expSignature: string = sha256Sign(merchantKey, orderId, signedString);

  if (signature == null || !signature || signature !== expSignature) {
    throw new ParseError('Invalid signature');
  }
};

export const signWebServiceRequest = (
  merchantKey: string,
  serializedParams: string,
  requestParams: CommonRawRequestParams
): string => {
  const order: string = extractAndAssertOrderFromRequestParams(requestParams);

  const signature: string = sha256Sign(merchantKey, order, serializedParams);

  return `<REQUEST>${serializedParams}<DS_SIGNATUREVERSION>HMAC_SHA256_V1</DS_SIGNATUREVERSION><DS_SIGNATURE>${signature}</DS_SIGNATURE></REQUEST>`;
};
