import { expectType } from 'ts-expect';
import type { TypeEqual } from 'ts-expect';

import {
  CARDBRANDS
} from './card-brands';

import type {
  CardBrand,
  CardBrandNum,
  REV_CARDBRANDS
} from './card-brands';

describe('CARDBRANDS and REV_CARDBRANDS', () => {
  it('should use the CardBrand interface', () => {
    expectType<TypeEqual<
      Record<CardBrand, CardBrandNum>,
      typeof CARDBRANDS
    >>(true);

    expectType<TypeEqual<
      Record<CardBrandNum, CardBrand>,
      typeof REV_CARDBRANDS
    >>(true);
  });

  it('should implement all of CardBrandNum', () => {
    /*
     * The Record key makes sure that all members of the key union type are defined.
     * Then at runtime we collect all keys and compare them to the values of the enum
     * to checkout that all of them are implemented
     */
    const allCardBrandNumsObj: Record<CardBrandNum, true> = {
      1: true,
      2: true,
      6: true,
      7: true,
      8: true,
      9: true,
      22: true
    };

    const allCardBrandNums = Object.keys(allCardBrandNumsObj).sort();
    const implementedCardBrandNums = Object.values(CARDBRANDS).sort();

    expect(implementedCardBrandNums).toEqual(allCardBrandNums);
  });
});
