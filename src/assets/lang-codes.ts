/**
 * ISO 639-1 language code
 *
 * @public
 */
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

/**
 * Redsys language code
 *
 * @public
 */
export type LanguageNum =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '100'
  | '156'
  | '191'
  | '203'
  | '208'
  | '233'
  | '246'
  | '300'
  | '348'
  | '392'
  | '428'
  | '440'
  | '470'
  | '642'
  | '643'
  | '703'
  | '705'
  | '792';

/**
 * Maps an ISO 639-1 language code to redsys language number
 *
 * @remarks
 * Some ISO 639-1 language codes may include more more than one redsys language number. In such cases the main redsys language number is used.
 *
 * @public
 */
// The Record key makes sure that all members of the key union type are defined.
export const LANGUAGES: Record<Language, LanguageNum> = {
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

/**
 * Maps a redsys language code to an ISO 639-1 language code
 *
 * @remarks
 * @see {@link LANGUAGES}
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion -- known deterministically
const REV_LANGUAGES = {} as Record<LanguageNum, Language>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- known deterministically
for (const [key, value] of Object.entries(LANGUAGES) as ReadonlyArray<
  [Language, LanguageNum]
>) {
  REV_LANGUAGES[value] = key;
}
REV_LANGUAGES['10'] = 'ca';

export { REV_LANGUAGES };
