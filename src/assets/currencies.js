'use strict';

// ISO 4217
const CURRENCIES = {
  EUR: {
    num: '978',
    decimals: 2,
  },
  USD: {
    num: '840',
    decimals: 2,
  },
  GBP: {
    num: '826',
    decimals: 2,
  },
  JPY: {
    num: '392',
    decimals: 0,
  },
  RUB: {
    num: '643',
    decimals: 2,
  },
  CNY: {
    num: 'CNY',
    decimals: 2,
  }
};

exports.CURRENCIES = CURRENCIES;

const REV_CURRENCIES = {};

for (const [key, value] of Object.entries(CURRENCIES)) {
  REV_CURRENCIES[value.num] = {
    code: key,
    decimals: value.decimals,
  };
}

exports.REV_CURRENCIES = REV_CURRENCIES;
