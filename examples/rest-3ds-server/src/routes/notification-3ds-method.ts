import type { AppMiddleware } from '../types/app';
import type { ThreeDSv2MethodNotificationBody } from 'redsys-easy';
import { deserializeThreeDSMethodData } from 'redsys-easy';

/*
 * Get notified if a client completes the 3DS method required by preauth
 *
 * Redsys expects a regular html page to put in the iframe
 */
export const notification3DSMethodHandler: AppMiddleware = async ({ request, response, db }, next) => {
  // Someone passed through the 3DS v2 method url

  const { threeDSMethodData } = request.body as unknown as ThreeDSv2MethodNotificationBody;
  // One should use "threeDSMethodData" and "threeDSServerTransID" to resolve
  // the orderId. Although not recommended, the "orderId" query parameter setted
  // above could also be accessed.
  // const orderId = request.query['orderId'] as string;

  const { threeDSServerTransID } = deserializeThreeDSMethodData(threeDSMethodData);

  db.threeDSv2Transactions.update(threeDSServerTransID, {
    hasCompleted3DSMethod: true
  });

  response.type = 'text/html; charset=utf-8';
  response.body = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<script>',
    // This content is embedded in the iframe, notify parent window that we are done
    // FinishedMessageEvent: MessageEvent<{ finished: boolean }>
    'window.postMessage({ finished: true }, "*")',
    '</script>',
    '</head>',
    '<body>',
    '</body>',
    '</html>'
  ].join('\n');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next();
};
