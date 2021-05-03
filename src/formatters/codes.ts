import { SIS_ERROR_CODES } from '../assets/error-codes';
import RESPONSE_CODES from '../assets/response-codes';

export const getResponseCodeMessage = (code: string | number): string | undefined => {
  if (typeof code !== 'number' && typeof code !== 'string') {
    return;
  }

  const lookupNum = typeof code === 'string' ? Number.parseFloat(code.trim()) : code;

  if (!Number.isInteger(lookupNum) || lookupNum < 0) {
    return;
  }

  const msg = RESPONSE_CODES[lookupNum.toString()];

  if ((msg == null || !msg) && lookupNum < 100) {
    return 'Transacción autorizada para pagos y preautorizaciones';
  }

  return msg;
};

export const getSISErrorCodeMessage = (code: string): string | undefined => {
  if (!code || typeof code !== 'string') {
    return undefined;
  }

  return SIS_ERROR_CODES[code.trim()];
};
