import type { Component } from 'solid-js';
import { serverAddress } from '../server-info';
import { setRouter } from '../router';
import type { CheckoutBody, CheckoutOutput } from '../server-info';

export interface Props {
  productIds: readonly string[]
  onCheckoutDataChanged: (result: CheckoutOutput) => void
}

export const CheckoutPage: Component<Props> = (props) => {
  const onCheckoutClick = async () => {
    /**
     * 1. Send list of products to the backend
     * 2. Receive "orderId" and price info
     * 3. Change page from checkout to payment selection
     */
    const checkoutParams: CheckoutBody = {
      productIds: props.productIds
    };

    const response = await fetch(`${serverAddress}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutParams)
    });

    if (!response.ok) {
      throw new Error('Checkout failed');
    }

    const result = await response.json() as CheckoutOutput;
    props.onCheckoutDataChanged(result);
    setRouter('page', 'payment-selection');
  };

  return (
    <div id="checkout-page">
      <button id="checkout" onClick={onCheckoutClick}>Checkout</button>
    </div>
  );
};
