import type { AppMiddleware } from '../types/app';
import Decimal from 'decimal.js';

import type {
  ThreeDSv1ChallengeNotificationBody
} from 'redsys-easy';
import {
  assertSuccessfulResponse,
  REV_CURRENCIES
} from 'redsys-easy';

import {
  restTrataPeticion
} from '../redsys';

/**
 * Landing page for 3DS v1 challenge completion
 *
 * This is not a JSON API endpoint, but a redirection landing page
 */
export const postChallengeV1Handler: AppMiddleware = async ({ request, response, db }, next) => {
  // Someone solved a 3DS v1 challenge

  const { MD, PaRes } = request.body as unknown as ThreeDSv1ChallengeNotificationBody;
  // One should use "MD" to resolve the orderId. Although not recommended, the
  // "orderId" query parameter setted above could also be accessed.
  // const orderId = request.query['orderId'] as string;

  // Recover transaction from database
  const threeDSInfo = db.threeDSv1Challenges.findOneByMD(MD);

  if (!threeDSInfo) {
    response.status = 400;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await next();
  }

  // Final transaction
  const result = await restTrataPeticion({
    ...threeDSInfo.params,
    DS_MERCHANT_EMV3DS: {
      protocolVersion: '1.0.2',
      threeDSInfo: 'ChallengeResponse',
      MD,
      PARes: PaRes
    }
  });

  assertSuccessfulResponse(result);

  const orderId = threeDSInfo.params.DS_MERCHANT_ORDER;

  db.orders.update(orderId, { status: 'payed' });

  const currencyInfo = REV_CURRENCIES[result.Ds_Currency];

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!currencyInfo) {
    throw new Error('Unknown currency');
  }

  // Convert 978 -> EUR
  const regularCurrency = currencyInfo.code;
  // Convert 4999 -> 49.99€
  const regularTotalAmount = new Decimal(result.Ds_Amount).dividedBy(Math.pow(10, currencyInfo.decimals)).toFixed();

  // Success, we are done!
  response.status = 200;
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
    `Your payment for order ${orderId} is now complete: ${regularTotalAmount} ${regularCurrency}`,
    '</body>',
    '</html>'
  ].join('\n');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next();
};
