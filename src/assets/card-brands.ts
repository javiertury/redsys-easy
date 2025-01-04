/**
 * Card brand name
 *
 * @public
 */
export type CardBrand =
  | 'VISA'
  | 'MASTERCARD'
  | 'DINERS'
  | 'PRIVATE'
  | 'AMEX'
  | 'JCB'
  | 'UPI';

/**
 * Card brand number
 *
 * @public
 */
export type CardBrandNum = '1' | '2' | '6' | '7' | '8' | '9' | '22';

/**
 * Card brand name to number
 *
 * @public
 */
// The Record key makes sure that all members of the key union type are defined.
export const CARDBRANDS: Record<CardBrand, CardBrandNum> = {
  VISA: '1',
  MASTERCARD: '2',
  DINERS: '6',
  PRIVATE: '7',
  AMEX: '8',
  JCB: '9',
  UPI: '22'
};

/**
 * Card brand number to name
 *
 * @remarks
 * @see {@link CARDBRANDS}
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion -- known deterministically
const REV_CARDBRANDS = {} as Record<CardBrandNum, CardBrand>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- known deterministically
for (const [key, value] of Object.entries(CARDBRANDS) as ReadonlyArray<
  [CardBrand, CardBrandNum]
>) {
  REV_CARDBRANDS[value] = key;
}

export { REV_CARDBRANDS };
