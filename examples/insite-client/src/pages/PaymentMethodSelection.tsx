import type { Component } from 'solid-js';
import type { CheckoutOutput } from '../server-info';

import { setRouter } from '../router';

interface Props {
  checkoutData: CheckoutOutput
}

export const PaymentMethodSelectionPage: Component<Props> = (props) => {
  /**
   * 1. Show price
   * 2. Change from payment selection to payment page
   */

  const onPayWithCardClicked = () => {
    setRouter('page', 'card-payment');
  };

  const price = () => {
    const { totalAmount, currency } = props.checkoutData;
    return `${totalAmount} ${currency}`;
  };

  return (
    <div id="payment-selection-page">
      <p>Price {price()}</p>
      <button onClick={onPayWithCardClicked}>Pay with card</button>
    </div>
  );
};
