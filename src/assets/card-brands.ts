export type CardBrand =
  | 'VISA'
  | 'MASTERCARD'
  | 'DINERS'
  | 'PRIVATE'
  | 'AMEX'
  | 'JCB'
  | 'UPI';

export const CARDBRANDS: Record<CardBrand, string> = {
  VISA: '1',
  MASTERCARD: '2',
  DINERS: '6',
  PRIVATE: '7',
  AMEX: '8',
  JCB: '9',
  UPI: '22'
};

const REV_CARDBRANDS: Record<string, CardBrand> = {};

for (const [key, value] of Object.entries(CARDBRANDS) as ReadonlyArray<[CardBrand, string]>) {
  REV_CARDBRANDS[value] = key;
}

export { REV_CARDBRANDS };
