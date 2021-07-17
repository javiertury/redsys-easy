import { expectType } from 'ts-expect';
import type { TypeEqual } from 'ts-expect';

import { CURRENCIES } from './currencies';
import type {
  Currency,
  CurrencyNum,
  REV_CURRENCIES
} from './currencies';

describe('CURRENCIES and REV_CURRENCIES', () => {
  it('should use the Currency interface', () => {
    expectType<TypeEqual<
      Record<Currency, {
        num: CurrencyNum
        decimals: number
      }>,
      typeof CURRENCIES
    >>(true);

    expectType<TypeEqual<
      Record<CurrencyNum, {
        code: Currency
        decimals: number
      }>,
      typeof REV_CURRENCIES
    >>(true);
  });

  it('should implement all of CurrencyNum', () => {
    /*
     * The Record key makes sure that all members of the key union type are defined.
     * Then at runtime we collect all keys and compare them to the values of the enum
     * to checkout that all of them are implemented
     */
    const allCurrencyNumsObj: Record<CurrencyNum, true> = {
      8: true,
      12: true,
      32: true,
      36: true,
      44: true,
      48: true,
      50: true,
      51: true,
      52: true,
      60: true,
      64: true,
      68: true,
      72: true,
      84: true,
      90: true,
      96: true,
      104: true,
      108: true,
      116: true,
      124: true,
      132: true,
      136: true,
      144: true,
      152: true,
      156: true,
      170: true,
      174: true,
      188: true,
      191: true,
      192: true,
      203: true,
      208: true,
      214: true,
      222: true,
      230: true,
      232: true,
      238: true,
      242: true,
      262: true,
      270: true,
      292: true,
      320: true,
      324: true,
      328: true,
      332: true,
      340: true,
      344: true,
      348: true,
      352: true,
      356: true,
      360: true,
      364: true,
      368: true,
      376: true,
      388: true,
      392: true,
      398: true,
      400: true,
      404: true,
      408: true,
      410: true,
      414: true,
      417: true,
      418: true,
      422: true,
      426: true,
      430: true,
      434: true,
      446: true,
      454: true,
      458: true,
      462: true,
      480: true,
      484: true,
      496: true,
      498: true,
      504: true,
      512: true,
      516: true,
      524: true,
      532: true,
      533: true,
      548: true,
      554: true,
      558: true,
      566: true,
      578: true,
      586: true,
      590: true,
      598: true,
      600: true,
      604: true,
      608: true,
      634: true,
      643: true,
      646: true,
      654: true,
      682: true,
      690: true,
      694: true,
      702: true,
      704: true,
      706: true,
      710: true,
      728: true,
      748: true,
      752: true,
      756: true,
      760: true,
      764: true,
      776: true,
      780: true,
      784: true,
      788: true,
      800: true,
      807: true,
      818: true,
      826: true,
      834: true,
      840: true,
      858: true,
      860: true,
      882: true,
      886: true,
      901: true,
      934: true,
      936: true,
      941: true,
      943: true,
      944: true,
      946: true,
      949: true,
      950: true,
      951: true,
      952: true,
      953: true,
      967: true,
      968: true,
      971: true,
      972: true,
      973: true,
      975: true,
      976: true,
      977: true,
      978: true,
      980: true,
      981: true,
      985: true,
      986: true
    };

    const allCurrencyNums = Object.keys(allCurrencyNumsObj).sort();
    const implementedCurrencyNums = Object.values(CURRENCIES).map(({ num }) => num).sort();

    expect(implementedCurrencyNums).toEqual(allCurrencyNums);
  });
});
