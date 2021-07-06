export const clientPostHeaders = {
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
  'Accept-Encoding': 'identity',
  'Accept-Language': 'en-US,en;q=0.5',
  'Cache-Control': 'max-age=0',
  Connection: 'keep-alive',
  'Content-Type': 'application/x-www-form-urlencoded',
  Origin: 'http://localhost:3333',
  Referer: 'http://localhost:3333/',
  'Upgrade-Insecure-Requests': '1'
};

export const clientBrowserFullInfo = {
  browserAcceptHeader: clientPostHeaders.Accept,
  browserUserAgent: clientPostHeaders['User-Agent'],
  browserJavascriptEnabled: false,
  browserJavaEnabled: false,
  browserLanguage: 'ES-es',
  browserColorDepth: '32',
  browserScreenHeight: '1080',
  browserScreenWidth: '1920',
  browserTZ: '-120'
};
