import { ERROR_CODES } from './error-codes';

const RESPONSE_CODES: Record<string, string> = {
  ...ERROR_CODES,
  // Transacciones exitosas
  0: 'Transacción autorizada por el banco emisor de la tarjeta.',
  1: 'Código exclusivo para transacciones Verified by Visa o MasterCard SecureCode. La transacción ha sido autorizada y, además, el banco emisor nos informa que ha autenticado correctamente la identidad del titular de la tarjeta.',
  2: 'Transacción autorizada por el banco emisor.',
  400: 'Transacción de anulación o retrocesión parcial aceptada por el banco emisor.',
  900: 'Transacción autorizada para devoluciones y confirmaciones.'
};

export default RESPONSE_CODES;
