import type { Component } from 'solid-js';
import { Switch, Match, createSignal } from 'solid-js';
import styles from './App.module.css';

import { router } from './router';
import type { CheckoutOutput } from './server-info';

import { CheckoutPage } from './pages/Checkout';
import { PaymentMethodSelectionPage } from './pages/PaymentMethodSelection';
import { CardPaymentPage } from './pages/CardPayment';
import { ViewPayedOrderPage } from './pages/ViewPayedOrder';

const App: Component = () => {
  const [productIds] = createSignal<readonly string[]>(['9a8FW23', '23IU8b42']);
  const [checkoutData, setCheckoutData] = createSignal<CheckoutOutput>();

  return (
    <div class={styles.App}>
      <Switch fallback={<div>Not Found</div>}>
        <Match when={router.page === 'checkout'}>
          <CheckoutPage productIds={productIds()} onCheckoutDataChanged={setCheckoutData} />
        </Match>
        <Match when={router.page === 'payment-selection'}>
          <PaymentMethodSelectionPage checkoutData={checkoutData() as CheckoutOutput} />
        </Match>
        <Match when={router.page === 'card-payment'}>
          <CardPaymentPage checkoutData={checkoutData() as CheckoutOutput} />
        </Match>
        <Match when={router.page === 'order-summary'}>
          <ViewPayedOrderPage checkoutData={checkoutData() as CheckoutOutput} />
        </Match>
      </Switch>
    </div>
  );
};

export default App;
