'use strict';

// ISO 4217
const CURRENCIES = {
  EUR: {
    num: '978',
    multiplier: 100,
  },
  USD: {
    num: '840',
    multiplier: 100,
  },
  GBP: {
    num: '826',
    multiplier: 100,
  },
  JPY: {
    num: '392',
    multiplier: 1,
  },
  RUB: {
    num: '643',
    multiplier: 100,
  },
  CNY: {
    num: 'CNY',
    multiplier: 100,
  }
};

exports.CURRENCIES = CURRENCIES;

const REV_CURRENCIES = {};

for (const [key, value] of Object.entries(CURRENCIES)) {
  REV_CURRENCIES[value.num] = {
    code: key,
    multiplier: value.multiplier,
  };
}

exports.REV_CURRENCIES = REV_CURRENCIES;
