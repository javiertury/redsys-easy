export type Language =
  | 'es'
  | 'en'
  | 'ca'
  | 'fr'
  | 'de'
  | 'nl'
  | 'it'
  | 'sv'
  | 'pt'
  | 'pl'
  | 'gl'
  | 'eu'
  | 'bg'
  | 'zh'
  | 'hr'
  | 'cs'
  | 'da'
  | 'et'
  | 'fi'
  | 'el'
  | 'hu'
  | 'ja'
  | 'lv'
  | 'lt'
  | 'mt'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'tr';

// ISO 639-1
export const LANGUAGES: Record<Language, string> = {
  es: '1',
  en: '2',
  ca: '3', // Codigo ISO "ca" compartido por catalan(3) y valenciano(10)
  fr: '4',
  de: '5',
  nl: '6',
  it: '7',
  sv: '8',
  pt: '9',
  pl: '11',
  gl: '12',
  eu: '13',
  // Redsys ha utilizado ISO 3166-1(pais) como codigo de idioma para el resto
  bg: '100',
  zh: '156',
  hr: '191',
  cs: '203',
  da: '208',
  et: '233',
  fi: '246',
  el: '300',
  hu: '348',
  ja: '392',
  lv: '428',
  lt: '440',
  mt: '470',
  ro: '642',
  ru: '643',
  sk: '703',
  sl: '705',
  tr: '792'
};

const REV_LANGUAGES: Record<string, Language> = {};

for (const [key, value] of Object.entries(LANGUAGES) as ReadonlyArray<[Language, string]>) {
  REV_LANGUAGES[value] = key;
}
REV_LANGUAGES['10'] = 'ca';

export { REV_LANGUAGES };
