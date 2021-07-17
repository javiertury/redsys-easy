import type {
  ThreeDSBrowserClientInfo,
  ThreeDSMethodForm,
  ThreeDSv1ChallengeForm,
  ThreeDSv2ChallengeForm,
  Currency
} from 'redsys-easy';

export const serverAddress = 'http://localhost:8081';

/**
 * Checkout data provided by the client
 */
export interface CheckoutBody {
  /** Identifiers of the products the client is purchasing */
  productIds: readonly string[]
}

export interface CheckoutOutput {
  orderId: string
  productIds: readonly string[]
  totalAmount: string
  currency: string
}

/**
 * Card data collected on the clients web browser
 */
export interface CardData {
  pan: string
  expiryYear: string
  expiryMonth: string
  cvv: string
}

export interface PreauthRegularTransactionData extends CardData {
  type: 'regular'
}

export interface PreauthIdOperTransactionData {
  type: 'id-oper'

  idOper: string
}

/**
 * Preauth data provided by the client
 */
export interface PreauthBody {
  /** Order identifier */
  orderId: string

  transactionData: PreauthRegularTransactionData | PreauthIdOperTransactionData
}

export interface PreauthV1Output {
  /** 3DS version used */
  threeDSProtocolVersion: '1.0.2' | 'none'
}

export interface PreauthV22Output {
  /** 3DS version used */
  threeDSProtocolVersion: '2.2.0' | '2.1.0'

  /** Transaction id */
  threeDSServerTransID: string

  // Data for 3DS method
  // The frontend should create an iframe and use a POST request to submit this data
  threeDSMethodForm?: ThreeDSMethodForm
}

export type PreauthOutput = PreauthV1Output | PreauthV22Output;

interface CardDataPaymentMethod extends CardData {
  type: 'card-data'
}

interface IdOperPaymentMethod {
  type: 'id-oper'

  /** INSITE operation identifier */
  idOper: string
}

interface AuthRegularTransactionData {
  type: 'regular'

  /** Order identifier */
  orderId: string

  paymentMethod: CardDataPaymentMethod | IdOperPaymentMethod

  /** 3DS protocol version */
  threeDSProtocolVersion: '1.0.2' | 'none'
}

interface Auth3DSv2TransactionData {
  type: '3ds-v2'

  /** 3DS transaction identifier */
  threeDSServerTransID: string
}

/**
 * Preauth data provided by the client
 */
export interface AuthBody {
  transactionData: AuthRegularTransactionData | Auth3DSv2TransactionData

  /**
   * Client information
   *
   * Better if client send more information than strictly required
   */
  clientInfo?: ThreeDSBrowserClientInfo
}

interface AuthChallengeV1Output {
  status: 'challenge'

  orderId: string

  formVersion: '1'

  form: ThreeDSv1ChallengeForm
}

interface AuthChallengeV2Output {
  status: 'challenge'

  orderId: string

  formVersion: '2'

  form: ThreeDSv2ChallengeForm
}

type AuthChallengeOutput = AuthChallengeV1Output | AuthChallengeV2Output;

interface AuthDoneOutput {
  status: 'done'

  orderId: string
}

export type AuthOutput = AuthChallengeOutput | AuthDoneOutput;

export interface OrderSummaryBody {
  orderId: string
}

interface OrderInfo {
  orderId: string
  amount: string
  currency: Currency
  status: 'pending-payment' | 'payed'
}

export type OrderSummaryOutput = OrderInfo;

export type FinishedMessageEvent = MessageEvent<{ finished: boolean }>;
