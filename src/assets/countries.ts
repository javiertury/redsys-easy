/**
 * Country ISO 3166 Alpha 2 code
 *
 * @public
 */
export type Country =
  | 'af'
  | 'al'
  | 'aq'
  | 'dz'
  | 'as'
  | 'ad'
  | 'ao'
  | 'ag'
  | 'az'
  | 'ar'
  | 'au'
  | 'at'
  | 'bs'
  | 'bh'
  | 'bd'
  | 'am'
  | 'bb'
  | 'be'
  | 'bm'
  | 'bt'
  | 'bo'
  | 'ba'
  | 'bw'
  | 'bv'
  | 'br'
  | 'bz'
  | 'io'
  | 'sb'
  | 'vg'
  | 'bn'
  | 'bg'
  | 'mm'
  | 'bi'
  | 'by'
  | 'kh'
  | 'cm'
  | 'ca'
  | 'cv'
  | 'ky'
  | 'cf'
  | 'lk'
  | 'td'
  | 'cl'
  | 'cn'
  | 'tw'
  | 'cx'
  | 'cc'
  | 'co'
  | 'km'
  | 'yt'
  | 'cg'
  | 'cd'
  | 'ck'
  | 'cr'
  | 'hr'
  | 'cu'
  | 'cy'
  | 'cz'
  | 'bj'
  | 'dk'
  | 'dm'
  | 'do'
  | 'ec'
  | 'sv'
  | 'gq'
  | 'et'
  | 'er'
  | 'ee'
  | 'fo'
  | 'fk'
  | 'gs'
  | 'fj'
  | 'fi'
  | 'ax'
  | 'fr'
  | 'gf'
  | 'pf'
  | 'tf'
  | 'dj'
  | 'ga'
  | 'ge'
  | 'gm'
  | 'ps'
  | 'de'
  | 'gh'
  | 'gi'
  | 'ki'
  | 'gr'
  | 'gl'
  | 'gd'
  | 'gp'
  | 'gu'
  | 'gt'
  | 'gn'
  | 'gy'
  | 'ht'
  | 'hm'
  | 'va'
  | 'hn'
  | 'hk'
  | 'hu'
  | 'is'
  | 'in'
  | 'id'
  | 'ir'
  | 'iq'
  | 'ie'
  | 'il'
  | 'it'
  | 'ci'
  | 'jm'
  | 'jp'
  | 'kz'
  | 'jo'
  | 'ke'
  | 'kp'
  | 'kr'
  | 'kw'
  | 'kg'
  | 'la'
  | 'lb'
  | 'ls'
  | 'lv'
  | 'lr'
  | 'ly'
  | 'li'
  | 'lt'
  | 'lu'
  | 'mo'
  | 'mg'
  | 'mw'
  | 'my'
  | 'mv'
  | 'ml'
  | 'mt'
  | 'mq'
  | 'mr'
  | 'mu'
  | 'mx'
  | 'mc'
  | 'mn'
  | 'md'
  | 'me'
  | 'ms'
  | 'ma'
  | 'mz'
  | 'om'
  | 'na'
  | 'nr'
  | 'np'
  | 'nl'
  | 'cw'
  | 'aw'
  | 'sx'
  | 'bq'
  | 'nc'
  | 'vu'
  | 'nz'
  | 'ni'
  | 'ne'
  | 'ng'
  | 'nu'
  | 'nf'
  | 'no'
  | 'mp'
  | 'um'
  | 'fm'
  | 'mh'
  | 'pw'
  | 'pk'
  | 'pa'
  | 'pg'
  | 'py'
  | 'pe'
  | 'ph'
  | 'pn'
  | 'pl'
  | 'pt'
  | 'gw'
  | 'tl'
  | 'pr'
  | 'qa'
  | 're'
  | 'ro'
  | 'ru'
  | 'rw'
  | 'bl'
  | 'sh'
  | 'kn'
  | 'ai'
  | 'lc'
  | 'mf'
  | 'pm'
  | 'vc'
  | 'sm'
  | 'st'
  | 'sa'
  | 'sn'
  | 'rs'
  | 'sc'
  | 'sl'
  | 'sg'
  | 'sk'
  | 'vn'
  | 'si'
  | 'so'
  | 'za'
  | 'zw'
  | 'es'
  | 'ss'
  | 'sd'
  | 'eh'
  | 'sr'
  | 'sj'
  | 'sz'
  | 'se'
  | 'ch'
  | 'sy'
  | 'tj'
  | 'th'
  | 'tg'
  | 'tk'
  | 'to'
  | 'tt'
  | 'ae'
  | 'tn'
  | 'tr'
  | 'tm'
  | 'tc'
  | 'tv'
  | 'ug'
  | 'ua'
  | 'mk'
  | 'eg'
  | 'gb'
  | 'gg'
  | 'je'
  | 'im'
  | 'tz'
  | 'us'
  | 'vi'
  | 'bf'
  | 'uy'
  | 'uz'
  | 've'
  | 'wf'
  | 'ws'
  | 'ye'
  | 'zm';

/**
 * Country UN M49 number
 *
 * @public
 */
export type CountryNum =
  | '4'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '31'
  | '32'
  | '36'
  | '40'
  | '44'
  | '48'
  | '50'
  | '51'
  | '52'
  | '56'
  | '60'
  | '64'
  | '68'
  | '70'
  | '72'
  | '74'
  | '76'
  | '84'
  | '86'
  | '90'
  | '92'
  | '96'
  | '100'
  | '104'
  | '108'
  | '112'
  | '116'
  | '120'
  | '124'
  | '132'
  | '136'
  | '140'
  | '144'
  | '148'
  | '152'
  | '156'
  | '158'
  | '162'
  | '166'
  | '170'
  | '174'
  | '175'
  | '178'
  | '180'
  | '184'
  | '188'
  | '191'
  | '192'
  | '196'
  | '203'
  | '204'
  | '208'
  | '212'
  | '214'
  | '218'
  | '222'
  | '226'
  | '231'
  | '232'
  | '233'
  | '234'
  | '238'
  | '239'
  | '242'
  | '246'
  | '248'
  | '250'
  | '254'
  | '258'
  | '260'
  | '262'
  | '266'
  | '268'
  | '270'
  | '275'
  | '276'
  | '288'
  | '292'
  | '296'
  | '300'
  | '304'
  | '308'
  | '312'
  | '316'
  | '320'
  | '324'
  | '328'
  | '332'
  | '334'
  | '336'
  | '340'
  | '344'
  | '348'
  | '352'
  | '356'
  | '360'
  | '364'
  | '368'
  | '372'
  | '376'
  | '380'
  | '384'
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
  | '428'
  | '430'
  | '434'
  | '438'
  | '440'
  | '442'
  | '446'
  | '450'
  | '454'
  | '458'
  | '462'
  | '466'
  | '470'
  | '474'
  | '478'
  | '480'
  | '484'
  | '492'
  | '496'
  | '498'
  | '499'
  | '500'
  | '504'
  | '508'
  | '512'
  | '516'
  | '520'
  | '524'
  | '528'
  | '531'
  | '533'
  | '534'
  | '535'
  | '540'
  | '548'
  | '554'
  | '558'
  | '562'
  | '566'
  | '570'
  | '574'
  | '578'
  | '580'
  | '581'
  | '583'
  | '584'
  | '585'
  | '586'
  | '591'
  | '598'
  | '600'
  | '604'
  | '608'
  | '612'
  | '616'
  | '620'
  | '624'
  | '626'
  | '630'
  | '634'
  | '638'
  | '642'
  | '643'
  | '646'
  | '652'
  | '654'
  | '659'
  | '660'
  | '662'
  | '663'
  | '666'
  | '670'
  | '674'
  | '678'
  | '682'
  | '686'
  | '688'
  | '690'
  | '694'
  | '702'
  | '703'
  | '704'
  | '705'
  | '706'
  | '710'
  | '716'
  | '724'
  | '728'
  | '729'
  | '732'
  | '740'
  | '744'
  | '748'
  | '752'
  | '756'
  | '760'
  | '762'
  | '764'
  | '768'
  | '772'
  | '776'
  | '780'
  | '784'
  | '788'
  | '792'
  | '795'
  | '796'
  | '798'
  | '800'
  | '804'
  | '807'
  | '818'
  | '826'
  | '831'
  | '832'
  | '833'
  | '834'
  | '840'
  | '850'
  | '854'
  | '858'
  | '860'
  | '862'
  | '876'
  | '882'
  | '887'
  | '894';

/**
 * Maps ISO 3166 Alpha 2 codes to UN M49 numbers
 *
 * @remarks
 * [UN M49 to ISO 3166 information](https://unstats.un.org/unsd/methodology/m49/)
 *
 * @public
 */
// The Record key makes sure that all members of the key union type are defined.
export const COUNTRIES: Record<Country, CountryNum> = {
  af: '4',
  al: '8',
  aq: '10',
  dz: '12',
  as: '16',
  ad: '20',
  ao: '24',
  ag: '28',
  az: '31',
  ar: '32',
  au: '36',
  at: '40',
  bs: '44',
  bh: '48',
  bd: '50',
  am: '51',
  bb: '52',
  be: '56',
  bm: '60',
  bt: '64',
  bo: '68',
  ba: '70',
  bw: '72',
  bv: '74',
  br: '76',
  bz: '84',
  io: '86',
  sb: '90',
  vg: '92',
  bn: '96',
  bg: '100',
  mm: '104',
  bi: '108',
  by: '112',
  kh: '116',
  cm: '120',
  ca: '124',
  cv: '132',
  ky: '136',
  cf: '140',
  lk: '144',
  td: '148',
  cl: '152',
  cn: '156',
  tw: '158',
  cx: '162',
  cc: '166',
  co: '170',
  km: '174',
  yt: '175',
  cg: '178',
  cd: '180',
  ck: '184',
  cr: '188',
  hr: '191',
  cu: '192',
  cy: '196',
  cz: '203',
  bj: '204',
  dk: '208',
  dm: '212',
  do: '214',
  ec: '218',
  sv: '222',
  gq: '226',
  et: '231',
  er: '232',
  ee: '233',
  fo: '234',
  fk: '238',
  gs: '239',
  fj: '242',
  fi: '246',
  ax: '248',
  fr: '250',
  gf: '254',
  pf: '258',
  tf: '260',
  dj: '262',
  ga: '266',
  ge: '268',
  gm: '270',
  ps: '275',
  de: '276',
  gh: '288',
  gi: '292',
  ki: '296',
  gr: '300',
  gl: '304',
  gd: '308',
  gp: '312',
  gu: '316',
  gt: '320',
  gn: '324',
  gy: '328',
  ht: '332',
  hm: '334',
  va: '336',
  hn: '340',
  hk: '344',
  hu: '348',
  is: '352',
  in: '356',
  id: '360',
  ir: '364',
  iq: '368',
  ie: '372',
  il: '376',
  it: '380',
  ci: '384',
  jm: '388',
  jp: '392',
  kz: '398',
  jo: '400',
  ke: '404',
  kp: '408',
  kr: '410',
  kw: '414',
  kg: '417',
  la: '418',
  lb: '422',
  ls: '426',
  lv: '428',
  lr: '430',
  ly: '434',
  li: '438',
  lt: '440',
  lu: '442',
  mo: '446',
  mg: '450',
  mw: '454',
  my: '458',
  mv: '462',
  ml: '466',
  mt: '470',
  mq: '474',
  mr: '478',
  mu: '480',
  mx: '484',
  mc: '492',
  mn: '496',
  md: '498',
  me: '499',
  ms: '500',
  ma: '504',
  mz: '508',
  om: '512',
  na: '516',
  nr: '520',
  np: '524',
  nl: '528',
  cw: '531',
  aw: '533',
  sx: '534',
  bq: '535',
  nc: '540',
  vu: '548',
  nz: '554',
  ni: '558',
  ne: '562',
  ng: '566',
  nu: '570',
  nf: '574',
  no: '578',
  mp: '580',
  um: '581',
  fm: '583',
  mh: '584',
  pw: '585',
  pk: '586',
  pa: '591',
  pg: '598',
  py: '600',
  pe: '604',
  ph: '608',
  pn: '612',
  pl: '616',
  pt: '620',
  gw: '624',
  tl: '626',
  pr: '630',
  qa: '634',
  re: '638',
  ro: '642',
  ru: '643',
  rw: '646',
  bl: '652',
  sh: '654',
  kn: '659',
  ai: '660',
  lc: '662',
  mf: '663',
  pm: '666',
  vc: '670',
  sm: '674',
  st: '678',
  sa: '682',
  sn: '686',
  rs: '688',
  sc: '690',
  sl: '694',
  sg: '702',
  sk: '703',
  vn: '704',
  si: '705',
  so: '706',
  za: '710',
  zw: '716',
  es: '724',
  ss: '728',
  sd: '729',
  eh: '732',
  sr: '740',
  sj: '744',
  sz: '748',
  se: '752',
  ch: '756',
  sy: '760',
  tj: '762',
  th: '764',
  tg: '768',
  tk: '772',
  to: '776',
  tt: '780',
  ae: '784',
  tn: '788',
  tr: '792',
  tm: '795',
  tc: '796',
  tv: '798',
  ug: '800',
  ua: '804',
  mk: '807',
  eg: '818',
  gb: '826',
  gg: '831',
  je: '832',
  im: '833',
  tz: '834',
  us: '840',
  vi: '850',
  bf: '854',
  uy: '858',
  uz: '860',
  ve: '862',
  wf: '876',
  ws: '882',
  ye: '887',
  zm: '894'
};

/**
 * Maps UN M49 numbers to ISO 3166 Alpha 2 codes
 *
 * @remarks
 * @see {@link COUNTRIES}
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion -- known deterministically
const REV_COUNTRIES = {} as Record<CountryNum, Country>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- known deterministically
for (const [key, value] of Object.entries(COUNTRIES) as ReadonlyArray<
  [Country, CountryNum]
>) {
  REV_COUNTRIES[value] = key;
}

export { REV_COUNTRIES };
