export type TransactionType =
  | '0'
  | '1'
  | '2'
  | '3'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '15'
  | '17'
  | '34'
  | '37'
  | '44'
  | 'O'
  | 'F'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'A';

export const TRANSACTION_TYPES = {
  /** Autorización */
  AUTHORIZATION: '0',
  /** Preautorización */
  PRE_AUTHORIZATION: '1',
  /** Confirmación de preautorización */
  CONFIRMATION: '2',
  /** Devolución Automática */
  AUTO_REFUND: '3',
  /** Transacción Recurrente */
  RECURRING_TRANSACTION: '5',
  /** Transacción Sucesiva */
  SUCCESSIVE_TRANSACTION: '6',
  /** Pre-autenticación */
  PRE_AUTHENTICATION: '7',
  /** Confirmación de pre-autenticación */
  PRE_AUTHENTICATION_CONFIRMATION: '8',
  /** Anulación de Preautorización */
  PRE_AUTHORIZATION_CANCEL: '9',
  /** Autorización en diferido */
  DEFERRED_AUTHORIZATION: 'O',
  /** Paygold */
  PAYGOLD: '15',
  /** Autenticación Puce */
  PUCE_AUTH: '17',
  /** Devolución sin original */
  RETURN_WITHOUT_ORIGINAL: '34',
  /** Premio de apuestas */
  BETTING_PAYOUT: '37',
  /** Eliminar referencia */
  DELETE_REFERENCE: '44',
  /** Operaciones sin autenticacíon */
  NO_AUTHENTICATION: 'A',
  /** Paygold */
  PAYLINK: 'F',
  /** Confirmación de autorización en diferido */
  DEFERRED_AUTHORIZATION_CONFIRMATION: 'P',
  /** Anulación de autorización en diferido */
  DEFERRED_AUTHORIZATION_CANCEL: 'Q',
  /** Cuota inicial diferido */
  DEFERRED_INITIAL_FEE: 'R',
  /** Cuota sucesiva diferido */
  DEFERRED_SUCCESSIVE_FEE: 'S'
} as const;

export default TRANSACTION_TYPES;
