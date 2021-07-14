import { createStore } from 'solid-js/store';
// import { createStore, createEvent } from 'effector';

export type PageName = 'checkout' | 'payment-selection' | 'card-payment' | 'order-summary';

interface RouterState {
  page: PageName
}

const [router, setRouter] = createStore<RouterState>({
  page: 'checkout'
});

export { router, setRouter };
