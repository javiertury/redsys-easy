import type { AppMiddleware } from '../../types/app';
import type { OrderSummaryBody, OrderSummaryOutput } from '../../types/routes';

export const orderSummaryHandler: AppMiddleware = async ({ request, response, db }, next) => {
  const { orderId } = request.body as unknown as OrderSummaryBody;

  const output: OrderSummaryOutput = db.orders.findOneByOrderId(orderId);

  response.status = 200;
  response.body = output;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next();
};
