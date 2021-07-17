/**
 * ISO 4217 currency code
 *
 * @public
 */
export type Currency =
  | 'ALL'
  | 'DZD'
  | 'ARS'
  | 'AUD'
  | 'BSD'
  | 'BHD'
  | 'BDT'
  | 'AMD'
  | 'BBD'
  | 'BMD'
  | 'BTN'
  | 'BOB'
  | 'BWP'
  | 'BZD'
  | 'SBD'
  | 'BND'
  | 'MMK'
  | 'BIF'
  | 'KHR'
  | 'CAD'
  | 'CVE'
  | 'KYD'
  | 'LKR'
  | 'CLP'
  | 'CNY'
  | 'COP'
  | 'KMF'
  | 'CRC'
  | 'HRK'
  | 'CUP'
  | 'CZK'
  | 'DKK'
  | 'DOP'
  | 'SVC'
  | 'ETB'
  | 'ERN'
  | 'FKP'
  | 'FJD'
  | 'DJF'
  | 'GMD'
  | 'GIP'
  | 'GTQ'
  | 'GNF'
  | 'GYD'
  | 'HTG'
  | 'HNL'
  | 'HKD'
  | 'HUF'
  | 'ISK'
  | 'INR'
  | 'IDR'
  | 'IRR'
  | 'IQD'
  | 'ILS'
  | 'JMD'
  | 'JPY'
  | 'KZT'
  | 'JOD'
  | 'KES'
  | 'KPW'
  | 'KRW'
  | 'KWD'
  | 'KGS'
  | 'LAK'
  | 'LBP'
  | 'LSL'
  | 'LRD'
  | 'LYD'
  | 'MOP'
  | 'MWK'
  | 'MYR'
  | 'MVR'
  | 'MUR'
  | 'MXN'
  | 'MNT'
  | 'MDL'
  | 'MAD'
  | 'OMR'
  | 'NAD'
  | 'NPR'
  | 'ANG'
  | 'AWG'
  | 'VUV'
  | 'NZD'
  | 'NIO'
  | 'NGN'
  | 'NOK'
  | 'PKR'
  | 'PAB'
  | 'PGK'
  | 'PYG'
  | 'PEN'
  | 'PHP'
  | 'QAR'
  | 'RUB'
  | 'RWF'
  | 'SHP'
  | 'SAR'
  | 'SCR'
  | 'SLL'
  | 'SGD'
  | 'VND'
  | 'SOS'
  | 'ZAR'
  | 'SSP'
  | 'SZL'
  | 'SEK'
  | 'CHF'
  | 'SYP'
  | 'THB'
  | 'TOP'
  | 'TTD'
  | 'AED'
  | 'TND'
  | 'UGX'
  | 'MKD'
  | 'EGP'
  | 'GBP'
  | 'TZS'
  | 'USD'
  | 'UYU'
  | 'UZS'
  | 'WST'
  | 'YER'
  | 'TWD'
  | 'TMT'
  | 'GHS'
  | 'RSD'
  | 'MZN'
  | 'AZN'
  | 'RON'
  | 'TRY'
  | 'XAF'
  | 'XCD'
  | 'XOF'
  | 'XPF'
  | 'ZMW'
  | 'SRD'
  | 'AFN'
  | 'TJS'
  | 'AOA'
  | 'BGN'
  | 'CDF'
  | 'BAM'
  | 'EUR'
  | 'UAH'
  | 'GEL'
  | 'PLN'
  | 'BRL';

/**
 * ISO 4217 currency number
 *
 * @public
 */
export type CurrencyNum =
  | '8'
  | '12'
  | '32'
  | '36'
  | '44'
  | '48'
  | '50'
  | '51'
  | '52'
  | '60'
  | '64'
  | '68'
  | '72'
  | '84'
  | '90'
  | '96'
  | '104'
  | '108'
  | '116'
  | '124'
  | '132'
  | '136'
  | '144'
  | '152'
  | '156'
  | '170'
  | '174'
  | '188'
  | '191'
  | '192'
  | '203'
  | '208'
  | '214'
  | '222'
  | '230'
  | '232'
  | '238'
  | '242'
  | '262'
  | '270'
  | '292'
  | '320'
  | '324'
  | '328'
  | '332'
  | '340'
  | '344'
  | '348'
  | '352'
  | '356'
  | '360'
  | '364'
  | '368'
  | '376'
  | '388'
  | '392'
  | '398'
  | '400'
  | '404'
  | '408'
  | '410'
  | '414'
  | '417'
  | '418'
  | '422'
  | '426'
  | '430'
  | '434'
  | '446'
  | '454'
  | '458'
  | '462'
  | '480'
  | '484'
  | '496'
  | '498'
  | '504'
  | '512'
  | '516'
  | '524'
  | '532'
  | '533'
  | '548'
  | '554'
  | '558'
  | '566'
  | '578'
  | '586'
  | '590'
  | '598'
  | '600'
  | '604'
  | '608'
  | '634'
  | '643'
  | '646'
  | '654'
  | '682'
  | '690'
  | '694'
  | '702'
  | '704'
  | '706'
  | '710'
  | '728'
  | '748'
  | '752'
  | '756'
  | '760'
  | '764'
  | '776'
  | '780'
  | '784'
  | '788'
  | '800'
  | '807'
  | '818'
  | '826'
  | '834'
  | '840'
  | '858'
  | '860'
  | '882'
  | '886'
  | '901'
  | '934'
  | '936'
  | '941'
  | '943'
  | '944'
  | '946'
  | '949'
  | '950'
  | '951'
  | '952'
  | '953'
  | '967'
  | '968'
  | '971'
  | '972'
  | '973'
  | '975'
  | '976'
  | '977'
  | '978'
  | '980'
  | '981'
  | '985'
  | '986';

interface CurrencyData {
  num: CurrencyNum
  decimals: number
}

/**
 * Maps a ISO 4217 code to a ISO 4217 currency number and decimal positions
 *
 * @public
 */
// The Record key makes sure that all members of the key union type are defined.
export const CURRENCIES: Record<Currency, CurrencyData> = {
  ALL: { num: '8', decimals: 2 },
  DZD: { num: '12', decimals: 2 },
  // AOK: { num: '24', decimals: },
  // MON: { num: '30', decimals: },
  // AZM: { num: '31', decimals: },
  // Redsys says 32 is ARP, but that currency code is no longer used
  ARS: { num: '32', decimals: 2 },
  AUD: { num: '36', decimals: 2 },
  BSD: { num: '44', decimals: 2 },
  BHD: { num: '48', decimals: 3 },
  BDT: { num: '50', decimals: 2 },
  AMD: { num: '51', decimals: 2 },
  BBD: { num: '52', decimals: 2 },
  BMD: { num: '60', decimals: 2 },
  BTN: { num: '64', decimals: 2 },
  // Redsys says 68 is BOP, but that currency code is no longer used
  BOB: { num: '68', decimals: 2 },
  // BAD: { num: 70, decimals: },
  BWP: { num: '72', decimals: 2 },
  // BRC: { num: 76, decimals: },
  BZD: { num: '84', decimals: 2 },
  SBD: { num: '90', decimals: 2 },
  BND: { num: '96', decimals: 2 },
  // BGL: { num: '100', decimals: },
  MMK: { num: '104', decimals: 2 },
  BIF: { num: '108', decimals: 0 },
  // BYB: { num: '112', decimals: },
  KHR: { num: '116', decimals: 2 },
  CAD: { num: '124', decimals: 2 },
  CVE: { num: '132', decimals: 2 },
  KYD: { num: '136', decimals: 2 },
  LKR: { num: '144', decimals: 2 },
  CLP: { num: '152', decimals: 0 },
  CNY: { num: '156', decimals: 2 },
  // CNH: { num: '157', decimals: },
  COP: { num: '170', decimals: 2 },
  KMF: { num: '174', decimals: 0 },
  // ZRZ: { num: '180', decimals: },
  CRC: { num: '188', decimals: 2 },
  HRK: { num: '191', decimals: 2 },
  CUP: { num: '192', decimals: 2 },
  // CYP: { num: '196', decimals: },
  // CSK: { num: '200', decimals: },
  CZK: { num: '203', decimals: 2 },
  DKK: { num: '208', decimals: 2 },
  DOP: { num: '214', decimals: 2 },
  // ECS: { num: '218', decimals: },
  SVC: { num: '222', decimals: 2 },
  // GQE: { num: '226', decimals: },
  ETB: { num: '230', decimals: 2 },
  ERN: { num: '232', decimals: 2 },
  // EEK: { num: '233', decimals: },
  FKP: { num: '238', decimals: 2 },
  FJD: { num: '242', decimals: 2 },
  DJF: { num: '262', decimals: 0 },
  // GEL: { num: '268', decimals: },
  GMD: { num: '270', decimals: 2 },
  // DDM: { num: '278', decimals: },
  // GHC: { num: '288', decimals: },
  GIP: { num: '292', decimals: 2 },
  GTQ: { num: '320', decimals: 2 },
  // Redsys says 324 is GNS, but that may be incorrect
  GNF: { num: '324', decimals: 0 },
  GYD: { num: '328', decimals: 2 },
  HTG: { num: '332', decimals: 2 },
  HNL: { num: '340', decimals: 2 },
  HKD: { num: '344', decimals: 2 },
  HUF: { num: '348', decimals: 2 },
  ISK: { num: '352', decimals: 0 },
  INR: { num: '356', decimals: 2 },
  IDR: { num: '360', decimals: 2 },
  IRR: { num: '364', decimals: 2 },
  // IRA: { num: '365', decimals: },
  IQD: { num: '368', decimals: 3 },
  ILS: { num: '376', decimals: 2 },
  JMD: { num: '388', decimals: 2 },
  JPY: { num: '392', decimals: 0 },
  KZT: { num: '398', decimals: 2 },
  JOD: { num: '400', decimals: 3 },
  KES: { num: '404', decimals: 2 },
  KPW: { num: '408', decimals: 2 },
  KRW: { num: '410', decimals: 0 },
  KWD: { num: '414', decimals: 3 },
  KGS: { num: '417', decimals: 2 },
  LAK: { num: '418', decimals: 2 },
  LBP: { num: '422', decimals: 2 },
  // Redsys says 426 is LSM, but that may be incorrect
  LSL: { num: '426', decimals: 2 },
  // LVL: { num: '428', decimals: },
  LRD: { num: '430', decimals: 2 },
  LYD: { num: '434', decimals: 3 },
  // LTL: { num: '440', decimals: },
  MOP: { num: '446', decimals: 2 },
  // MGF: { num: '450', decimals: },
  MWK: { num: '454', decimals: 2 },
  MYR: { num: '458', decimals: 2 },
  MVR: { num: '462', decimals: 2 },
  // MLF: { num: '466', decimals: },
  // MTL: { num: '470', decimals: },
  // MRO: { num: '478', decimals: },
  MUR: { num: '480', decimals: 2 },
  // Redsys says 484 is MXP, but that currency code is no longer used
  MXN: { num: '484', decimals: 2 },
  MNT: { num: '496', decimals: 2 },
  MDL: { num: '498', decimals: 2 },
  MAD: { num: '504', decimals: 2 },
  // MZM: { num: '508', decimals: },
  OMR: { num: '512', decimals: 3 },
  NAD: { num: '516', decimals: 2 },
  NPR: { num: '524', decimals: 2 },
  ANG: { num: '532', decimals: 2 },
  AWG: { num: '533', decimals: 2 },
  // NTZ: { num: '536', decimals: },
  VUV: { num: '548', decimals: 0 },
  NZD: { num: '554', decimals: 2 },
  // Redsys says 558 is NIC, but that currency code is no longer used
  NIO: { num: '558', decimals: 2 },
  NGN: { num: '566', decimals: 2 },
  NOK: { num: '578', decimals: 2 },
  // PCI: { num: '582', decimals: },
  PKR: { num: '586', decimals: 2 },
  PAB: { num: '590', decimals: 2 },
  PGK: { num: '598', decimals: 2 },
  PYG: { num: '600', decimals: 0 },
  // Redsys says 604 is PEI, but that currency code is no longer used
  PEN: { num: '604', decimals: 2 },
  PHP: { num: '608', decimals: 2 },
  // PLZ: { num: '616', decimals: },
  // GWP: { num: '624', decimals: },
  // TPE: { num: '626', decimals: },
  QAR: { num: '634', decimals: 2 },
  // ROL: { num: '642', decimals: },
  RUB: { num: '643', decimals: 2 },
  RWF: { num: '646', decimals: 0 },
  SHP: { num: '654', decimals: 2 },
  // STD: { num: '678', decimals: },
  SAR: { num: '682', decimals: 2 },
  SCR: { num: '690', decimals: 2 },
  SLL: { num: '694', decimals: 2 },
  SGD: { num: '702', decimals: 2 },
  // SKK: { num: '703', decimals: },
  VND: { num: '704', decimals: 0 },
  // SIT: { num: '705', decimals: },
  SOS: { num: '706', decimals: 2 },
  ZAR: { num: '710', decimals: 2 },
  // ZWD: { num: '716', decimals: },
  // YDD: { num: '720', decimals: },
  SSP: { num: '728', decimals: 2 },
  // SDP: { num: '736', decimals: },
  // SDA: { num: '737', decimals: },
  // SRG: { num: '740', decimals: },
  SZL: { num: '748', decimals: 2 },
  SEK: { num: '752', decimals: 2 },
  CHF: { num: '756', decimals: 2 },
  SYP: { num: '760', decimals: 2 },
  // TJR: { num: '762', decimals: },
  THB: { num: '764', decimals: 2 },
  TOP: { num: '776', decimals: 2 },
  TTD: { num: '780', decimals: 2 },
  AED: { num: '784', decimals: 2 },
  TND: { num: '788', decimals: 3 },
  // TRL: { num: '792', decimals: },
  // PTL: { num: '793', decimals: },
  // TMM: { num: '795', decimals: },
  // Redsys says 800 is UGS, but that currency code is no longer used
  UGX: { num: '800', decimals: 0 },
  // UAK: { num: '804', decimals: },
  MKD: { num: '807', decimals: 2 },
  // RUR: { num: '810', decimals: },
  EGP: { num: '818', decimals: 2 },
  GBP: { num: '826', decimals: 2 },
  TZS: { num: '834', decimals: 2 },
  USD: { num: '840', decimals: 2 },
  // Redsys says 858 is UYP, but that currency code is no longer used
  UYU: { num: '858', decimals: 2 },
  UZS: { num: '860', decimals: 2 },
  // VEB: { num: '862', decimals: },
  WST: { num: '882', decimals: 2 },
  YER: { num: '886', decimals: 2 },
  // YUD: { num: '890', decimals: },
  // YUG: { num: '891', decimals: },
  // ZMK: { num: '892', decimals: },
  TWD: { num: '901', decimals: 2 },
  TMT: { num: '934', decimals: 2 },
  GHS: { num: '936', decimals: 2 },
  RSD: { num: '941', decimals: 2 },
  MZN: { num: '943', decimals: 2 },
  AZN: { num: '944', decimals: 2 },
  RON: { num: '946', decimals: 2 },
  TRY: { num: '949', decimals: 2 },
  XAF: { num: '950', decimals: 0 },
  XCD: { num: '951', decimals: 2 },
  XOF: { num: '952', decimals: 0 },
  XPF: { num: '953', decimals: 0 },
  // XEU: { num: '954', decimals: },
  ZMW: { num: '967', decimals: 2 },
  SRD: { num: '968', decimals: 2 },
  // MGA: { num: '969', decimals: },
  AFN: { num: '971', decimals: 2 },
  TJS: { num: '972', decimals: 2 },
  AOA: { num: '973', decimals: 2 },
  // BYR: { num: '974', decimals: },
  BGN: { num: '975', decimals: 2 },
  CDF: { num: '976', decimals: 2 },
  BAM: { num: '977', decimals: 2 },
  EUR: { num: '978', decimals: 2 },
  UAH: { num: '980', decimals: 2 },
  GEL: { num: '981', decimals: 2 },
  PLN: { num: '985', decimals: 2 },
  BRL: { num: '986', decimals: 2 }
  // ZAL: { num: '991', decimals: }
};

interface RevCurrencyData {
  code: Currency
  decimals: number
}

/**
 * Maps a ISO 4217 number to a ISO 4217 currency code and decimal positions
 *
 * @remarks
 * @see {@link CURRENCIES}
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const REV_CURRENCIES = {} as Record<CurrencyNum, RevCurrencyData>;

for (const [key, value] of Object.entries(CURRENCIES)) {
  REV_CURRENCIES[value.num] = {
    code: key as Currency,
    decimals: value.decimals
  };
}

export { REV_CURRENCIES };
