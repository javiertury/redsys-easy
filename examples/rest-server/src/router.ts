import KoaRouter from '@koa/router';
import { checkoutHandler } from './routes/api/checkout';
import { preauthHandler } from './routes/api/preauth';
import { notification3DSMethodHandler } from './routes/notification-3ds-method';
import { authHandler } from './routes/api/auth';
import { postChallengeV1Handler } from './routes/post-challenge-v1';
import { postChallengeV2Handler } from './routes/post-challenge-v2';
import { orderSummaryHandler } from './routes/api/order-summary';

const router = new KoaRouter();

// Client sends the products IDs to place an order, receives an orderId
router.post('/api/checkout', checkoutHandler);

// Client uses orderId and payment data to find out how to pay
router.post('/api/preauth', preauthHandler);

// If client was instructed to complete the 3DS method and finishes, this
// route will process the notification
router.post('/notification-3ds-method', notification3DSMethodHandler);

// Client now proceeds to authorize the payment
router.post('/api/auth', authHandler);

// If client was instructed to complete a challenge and finishes, these
// routes will process the notification
router.post('/postchallenge-v1', postChallengeV1Handler);
router.post('/postchallenge-v2', postChallengeV2Handler);

// Finally this endpoint provides a order summary
router.post('/api/order-summary', orderSummaryHandler);

export { router };
