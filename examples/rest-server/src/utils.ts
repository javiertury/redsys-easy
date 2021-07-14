import Decimal from 'decimal.js';
import type { OrderInfo } from './types/routes';
import { CURRENCIES } from 'redsys-easy';

export const createBasicRedsysOrderParams = ({
  orderId, amount, currency
}: Omit<OrderInfo, 'status'>) => {
  const currencyInfo = CURRENCIES[currency];

  // Convert 49.99€ -> 4999
  const redsysAmount = new Decimal(amount).mul(Math.pow(10, currencyInfo.decimals)).round().toFixed(0);
  // Convert EUR -> 978
  const redsysCurrency = currencyInfo.num;

  return {
    DS_MERCHANT_ORDER: orderId,
    DS_MERCHANT_AMOUNT: redsysAmount,
    DS_MERCHANT_CURRENCY: redsysCurrency
  };
};
