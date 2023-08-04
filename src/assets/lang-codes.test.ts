import { expectType } from 'ts-expect';
import type { TypeEqual } from 'ts-expect';

import { LANGUAGES, REV_LANGUAGES } from './lang-codes';
import type { Language, LanguageNum } from './lang-codes';

describe('LANGUAGES and REV_LANGUAGES', () => {
  it('should use the Language interface', () => {
    expectType<TypeEqual<Record<Language, LanguageNum>, typeof LANGUAGES>>(
      true
    );

    expectType<TypeEqual<Record<LanguageNum, Language>, typeof REV_LANGUAGES>>(
      true
    );
  });

  it('should implement all of LanguageNum', () => {
    /*
     * The Record key makes sure that all members of the key union type are defined.
     * Then at runtime we collect all keys and compare them to the values of the enum
     * to checkout that all of them are implemented
     */
    const allLanguageNumsObj: Record<LanguageNum, true> = {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
      11: true,
      12: true,
      13: true,
      100: true,
      156: true,
      191: true,
      203: true,
      208: true,
      233: true,
      246: true,
      300: true,
      348: true,
      392: true,
      428: true,
      440: true,
      470: true,
      642: true,
      643: true,
      703: true,
      705: true,
      792: true
    };

    const allLanguageNums = Object.keys(allLanguageNumsObj).sort();
    const allStandardLanguageNums = allLanguageNums
      .filter((langNum) => langNum !== '10')
      .sort();
    const implementedLanguageNums = Object.values(LANGUAGES).sort();

    expect(implementedLanguageNums).toEqual(allStandardLanguageNums);

    const implementedRevLanguageNums = Object.keys(REV_LANGUAGES).sort();
    expect(implementedRevLanguageNums).toEqual(allLanguageNums);
  });
});
