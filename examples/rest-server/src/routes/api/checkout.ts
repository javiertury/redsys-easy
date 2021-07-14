import { randomTransactionId } from 'redsys-easy';
import type { AppMiddleware } from '../../types/app';
import type { CheckoutBody, CheckoutOutput } from '../../types/routes';

/**
 * Creates an order
 *
 * The input looks like this
 *
 * {
 *   productIds: ['9Ai2FW', 'y78Ujl'],
 * }
 */
export const checkoutHandler: AppMiddleware = async ({ request, response, db }, next) => {
  const {
    productIds
  } = request.body as unknown as CheckoutBody;

  // Use productIds to calculate amount and currency
  const { totalAmount, currency } = {
    // Never use floats for money
    totalAmount: productIds.length > 3 ? '99.99' : '49.99',
    currency: 'EUR'
  } as const;

  const orderId = randomTransactionId();

  // Save order to database
  db.orders.insert({
    orderId,
    amount: totalAmount,
    currency,
    status: 'pending-payment'
  });

  const output: CheckoutOutput = {
    orderId,
    productIds,
    totalAmount,
    currency
  };

  // Send to the frontend a reference to this orderId and information
  // The client should send this orderId back to *preauth* endpoint
  response.status = 200;
  response.body = output;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next();
};
