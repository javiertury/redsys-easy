export type CardBrand =
  | 'VISA'
  | 'MASTERCARD'
  | 'DINERS'
  | 'PRIVATE'
  | 'AMEX'
  | 'JCB'
  | 'UPI';

export const REV_CARDBRANDS: Record<string, CardBrand> = {
  1: 'VISA',
  2: 'MASTERCARD',
  6: 'DINERS',
  7: 'PRIVATE',
  8: 'AMEX',
  9: 'JCB',
  22: 'UPI'
};
