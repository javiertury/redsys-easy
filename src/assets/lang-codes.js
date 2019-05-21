'use strict';

// ISO 639-1
const LANGUAGES = {
  'es': '1',
  'en': '2',
  'ca': '3', // Codigo ISO(ca) compartido por catalan(3) y valenciano(10)
  'fr': '4',
  'de': '5',
  'nl': '6',
  'it': '7',
  'sv': '8',
  'pt': '9',
  'pl': '11',
  'gl': '12',
  'eu': '13',
  // Redsys ha utilizado ISO 3166-1(pais) como codigo de idioma
  'bg': '100',
  'zh': '156',
  'hr': '191',
  'cs': '203',
  'da': '208',
  'et': '233',
  'fi': '246',
  'el': '300',
  'hu': '348',
  'ja': '392',
  'lv': '428',
  'lt': '440',
  'mt': '470',
  'ro': '642',
  'ru': '643',
  'sk': '703',
  'sl': '705',
  'tr': '792',
};

exports.LANGUAGES = LANGUAGES;

const REV_LANGUAGES = {};

for (const [key, value] of Object.entries(LANGUAGES)) {
  REV_LANGUAGES[value] = key;
}
REV_LANGUAGES['10'] = 'ca';

exports.REV_LANGUAGES = REV_LANGUAGES;
