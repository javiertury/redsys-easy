/**
 * Simulating a database
 */

import type {
  RestTrataPeticionInputParams,
  RestIniciaPeticionOutputParams
} from 'redsys-easy';
import type { OrderInfo } from './types/routes';

interface ThreeDSv2TransactionStatus {
  orderId: string
  protocolVersion: Exclude<NonNullable<RestIniciaPeticionOutputParams['Ds_EMV3DS']>['protocolVersion'], 'NO_3DS_v2'>
  threeDSServerTransID: string
  hasCompleted3DSMethod: boolean
  params: Pick<
    RestTrataPeticionInputParams,
    | 'DS_MERCHANT_MERCHANTCODE'
    | 'DS_MERCHANT_TERMINAL'
    | 'DS_MERCHANT_TRANSACTIONTYPE'
    | 'DS_MERCHANT_ORDER'
    | 'DS_MERCHANT_AMOUNT'
    | 'DS_MERCHANT_CURRENCY'
    | 'DS_MERCHANT_PAN'
    | 'DS_MERCHANT_EXPIRYDATE'
    | 'DS_MERCHANT_CVV2'
  >
}

interface ThreeDSv1ChallengeStatus {
  MD: string // Serves as an identifier
  params: Pick<
    RestTrataPeticionInputParams,
    | 'DS_MERCHANT_MERCHANTCODE'
    | 'DS_MERCHANT_TERMINAL'
    | 'DS_MERCHANT_TRANSACTIONTYPE'
    | 'DS_MERCHANT_ORDER'
    | 'DS_MERCHANT_AMOUNT'
    | 'DS_MERCHANT_CURRENCY'
    | 'DS_MERCHANT_PAN'
    | 'DS_MERCHANT_EXPIRYDATE'
    | 'DS_MERCHANT_CVV2'
  >
}

const createDB = () => {
  let storedOrders: OrderInfo[] = [];
  let stored3DSv2Transactions: ThreeDSv2TransactionStatus[] = [];
  const stored3DSv1Challenges: ThreeDSv1ChallengeStatus[] = [];

  return {
    orders: {
      insert: (data: OrderInfo): void => {
        storedOrders.push(data);
      },
      update: (
        orderId: string,
        data: Partial<Omit<OrderInfo, 'orderId'>>
      ): void => {
        storedOrders = storedOrders.map(oldData => {
          if (oldData.orderId === orderId) {
            return {
              ...oldData,
              ...data
            };
          }
          return oldData;
        });
      },
      findOneByOrderId: (orderId: string): OrderInfo | undefined => {
        return storedOrders.find(data => data.orderId === orderId);
      }
    },
    threeDSv2Transactions: {
      insert: (data: ThreeDSv2TransactionStatus): void => {
        stored3DSv2Transactions.push(data);
      },
      update: (
        threeDSServerTransID: string,
        data: Partial<Omit<ThreeDSv2TransactionStatus, 'threeDSServerTransID'>>
      ): void => {
        stored3DSv2Transactions = stored3DSv2Transactions.map(oldData => {
          if (oldData.threeDSServerTransID === threeDSServerTransID) {
            return {
              ...oldData,
              ...data
            };
          }
          return oldData;
        });
      },
      findOneBy3DSServerTransID: (threeDSServerTransID: string): ThreeDSv2TransactionStatus | undefined => {
        return stored3DSv2Transactions.find(data => data.threeDSServerTransID === threeDSServerTransID);
      }
    },
    threeDSv1Challenges: {
      insert: (data: ThreeDSv1ChallengeStatus): void => {
        stored3DSv1Challenges.push(data);
      },
      findOneByMD: (md: string): ThreeDSv1ChallengeStatus | undefined => {
        return stored3DSv1Challenges.find(data => data.MD === md);
      }
    }
  };
};
export const db = createDB();
