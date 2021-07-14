import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import type { CheckoutOutput, OrderSummaryBody, OrderSummaryOutput } from '../server-info';
import { serverAddress } from '../server-info';

import { setRouter } from '../router';

interface Props {
  checkoutData: CheckoutOutput
}

export const ViewPayedOrderPage: Component<Props> = (props) => {
  /**
   * Show payed order status
   */

  const [orderData, setOrderData] = createSignal<OrderSummaryOutput>();

  const onResetClicked = () => {
    setRouter('page', 'checkout');
  };

  const price = () => {
    const resolveOrderData = orderData();
    if (!resolveOrderData) return 'unknown';

    const { amount, currency } = resolveOrderData;
    return `${amount} ${currency}`;
  };

  const refreshData = async () => {
    const orderInfoParams: OrderSummaryBody = {
      orderId: props.checkoutData.orderId
    };

    const response = await fetch(`${serverAddress}/api/order-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInfoParams)
    });

    if (!response.ok) {
      throw new Error('Order summary request failed');
    }

    const result = await response.json() as OrderSummaryOutput;
    setOrderData(result);
  };

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  refreshData();

  return (
    <div id="payment-selection-page">
      <p>Order: {props.checkoutData.orderId}</p>
      <p>Price: {price()}</p>
      <p>Status: {orderData()?.status ?? 'unknown'}</p>
      <button onClick={onResetClicked}>Reset</button>
    </div>
  );
};
