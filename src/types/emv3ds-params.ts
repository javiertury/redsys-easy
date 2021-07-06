export interface EMV3DSPhone {
  /** Country prefix number */
  cc: string

  /** Phone number */
  subscriber: string
}

export interface RequestorAuthenticationInfo {
  /** Authentication Data */
  threeDSReqAuthData: string

  /** Authentication method code */
  threeDSReqAuthMethod: string

  /** Authentication timestamp, yyyymmddHHMM */
  threeDSReqAuthTimestamp: string
}

export interface RequestorPriorAuthenticationInfo {
  /** Reference */
  threeDSReqPriorRef?: string

  /** Authentication method code */
  threeDSReqPriorAuthMethod?: string

  /** Authentication timestamp, yyyymmddHHMM */
  threeDSReqPriorAuthTimestamp?: string
}

export interface BaseEMV3DSAuthenticationDataParams {
  /** 3DSecure protocol version */
  protocolVersion: '1.0.2' | '2.1.0' | '2.2.0'

  /** 3DSecure information type */
  threeDSInfo: 'AuthenticationData'

  /** Challenge notification URL */
  notificationURL: string

  /** 3DSecure Method result indicator */
  threeDSCompInd: 'Y' | 'N' | 'U'

  /** 3DSecure transaction identifier */
  threeDSServerTransID: string

  /**
   * Browser Screen Color Depth
   * screen.colorDepth.toString() or '1' if javascript is disabled
   */
  browserColorDepth: string

  /**
   * Browser Java Enabled
   * navigator.javaEnabled() or false if javascript is disabled
   */
  browserJavaEnabled: boolean

  /**
   * Browser Language
   * navigator.language
   */
  browserLanguage: string

  /**
   * Browser Screen Height
   * screen.height.toString() or '0' if javascript is disabled
   */
  browserScreenHeight: string

  /**
   * Browser Screen Width
   * screen.width.toString() or '0' if javascript is disabled
   */
  browserScreenWidth: string

  /**
   * Browser Time Zone
   * (new Date()).getTimezoneOffset().toString() or '0' if javascript is disabled
   */
  browserTZ: string

  /** Browser JavaScript Enabled */
  browserJavascriptEnabled: boolean

  /** Browser User-Agent */
  browserUserAgent: string

  /** Browser Accept Header */
  browserAcceptHeader: string

  /** Browser IP Address, ipv4 or ipv6 */
  browserIP?: string

  /** Additional account information, max 64 characters */
  acctID?: string

  /** Account information, json */
  acctInfo?: {
    /** Account creation ellapsed time code */
    chAccAgeInd?: '01' | '02' | '03' | '04' | '05'

    /** Account modification date, yyyymmdd */
    chAccChange?: string

    /** Account modification ellapsed time code */
    chAccChangeInd?: '01' | '02' | '03' | '04'

    /** Account creation date, yyyymmdd */
    chAccDate?: string

    /** Last password change date, yyyymmdd */
    chAccPwChange?: string

    /** Password change ellapsed time code */
    chAccPwChangeInd?: '01' | '02' | '03' | '04' | '05'

    /** Number of purchases during the last 6 months */
    nbPurchaseAccount?: string

    /** Attemps to add a card during the last 24 hours */
    provisionAttemptsDay?: string

    /** Number of transactions attempted during the last 24 hours */
    txnActivityDay?: string

    /** Number of transactions attempted last year */
    txnActivityYear?: string

    /** Card registration date, yyyymmdd */
    paymentAccAge?: string

    /** Card registration ellapsed time code */
    paymentAccInd?: '01' | '02' | '03' | '04' | '05'

    /** First usage of shipping address date, yyyymmdd */
    shipAddressUsage?: string

    /** First usage of shipping address ellapsed time code */
    shipAddressUsageInd?: '01' | '02' | '03' | '04' | '05'

    /** Cardholder shipping name indicator code */
    shipNameIndicator?: '01' | '02'

    /** Suspicious activity code */
    suspiciousAccActivity?: '01' | '02'
  }

  /** Matching shipping and billing addresses indicator */
  addrMatch?: 'Y' | 'N'

  /** Billing address city */
  billAddrCity?: string

  /** Billing address line 1 */
  billAddrLine1?: string

  /** Billing address line 2 */
  billAddrLine2?: string

  /** Billing address line 3 */
  billAddrLine3?: string

  /** Billing address postal code */
  billAddrPostCode?: string

  /** Billing address state code, ISO 3166-2 */
  billAddrState?: string

  /** Billing address country code, ISO 3166-1 */
  billAddrCountry?: string

  /** Cardholder name */
  cardholderName?: string

  /** Challenge window size */
  challengeWindowSize?: string

  /** Account email address */
  email?: string

  /** Account landline phone number */
  homePhone?: EMV3DSPhone

  /** Account mobile phone number */
  mobilePhone?: EMV3DSPhone

  /** Account work phone number */
  workPhone?: EMV3DSPhone

  /** Merchant risk indicator, json */
  merchantRiskIndicator?: {
    /** Delivery email address */
    deliveryEmailAddress?: string

    /** Delivery time code */
    deliveryTimeframe?: '01' | '02' | '03' | '04'

    /** Gift card amount */
    giftCardAmount?: string

    /** Count of gift cards used */
    giftCardCount?: string

    /** Gift card currency number, ISO-4217 */
    giftCardCurr?: string

    /** Preorder availability date, yyyymmdd */
    preOrderDate?: string

    /** Preorder availability indicator code */
    preOrderPurchaseInd?: '01' | '02'

    /** Reorder indicator code */
    reorderItemsInd?: '01' | '02'

    /** Shipping indicator code */
    shipIndicator?: '01' | '02' | '03' | '04' | '05' | '06' | '07'
  }

  /** Number of purchase installments */
  purchaseInstalData?: string

  /** Recurring payments expiration date, yyyymmdd */
  recurringExpiry?: string

  /** Minimum number of days between recurring payments */
  recurringFrequency?: string

  /** Shipping address city */
  shipAddrCity?: string

  /** Shipping address line 1 */
  shipAddrLine1?: string

  /** Shipping address line 2 */
  shipAddrLine2?: string

  /** Shipping address line 3 */
  shipAddrLine3?: string

  /** Shipping address postal code */
  shipAddrPostCode?: string

  /** Shipping address state code, ISO 3166-2 */
  shipAddrState?: string

  /** Shipping address country code, ISO 3166-1 */
  shipAddrCountry?: string

  /** Authentication information, json */
  threeDSRequestorAuthenticationInfo?: RequestorAuthenticationInfo

  /** Previous authentication information, json */
  threeDSRequestorPriorAuthenticationInfo?: RequestorPriorAuthenticationInfo
}

export type EMV3DSBrowserClientInfo = Pick<
  BaseEMV3DSAuthenticationDataParams,
  | 'browserLanguage'
  | 'browserColorDepth'
  | 'browserScreenHeight'
  | 'browserScreenWidth'
  | 'browserTZ'
  | 'browserJavaEnabled'
>;

/*
 * Input
 */

export interface EMV3DSPreAuthInputParams {
  threeDSInfo: 'CardData'
}

export interface EMV3DSv1AuthDataInputParams extends Pick<
  BaseEMV3DSAuthenticationDataParams,
  | 'protocolVersion'
  | 'threeDSInfo'
  | 'browserAcceptHeader'
  | 'browserUserAgent'
> {
  protocolVersion: '1.0.2'
  threeDSInfo: 'AuthenticationData'
}

export interface EMV3DSv2AuthDataInputParams extends BaseEMV3DSAuthenticationDataParams {
  protocolVersion: '2.1.0' | '2.2.0'
  threeDSInfo: 'AuthenticationData'
}

export interface EMV3DSv1ChallengeResponseInputParams {
  protocolVersion: '1.0.2'
  threeDSInfo: 'ChallengeResponse'
  PARes: string
  MD: string
}

export interface EMV3DSv2ChallengeResponseInputParams {
  protocolVersion: '2.1.0' | '2.2.0'
  threeDSInfo: 'ChallengeResponse'
  cres: string
}

/** EMV 3DSecure input parameters */
export type EMV3DSInputParams =
  | EMV3DSPreAuthInputParams
  | EMV3DSv1AuthDataInputParams
  | EMV3DSv2AuthDataInputParams
  | EMV3DSv1ChallengeResponseInputParams
  | EMV3DSv2ChallengeResponseInputParams;

export type EMV3DSRedirectInputParams = Omit<BaseEMV3DSAuthenticationDataParams,
  | 'protocolVersion'
  | 'threeDSInfo'
  | 'notificationURL'
  | 'threeDSCompInd'
  | 'threeDSServerTransID'
  | 'browserColorDepth'
  | 'browserJavaEnabled'
  | 'browserLanguage'
  | 'browserScreenHeight'
  | 'browserScreenWidth'
  | 'browserTZ'
  | 'browserJavascriptEnabled'
  | 'browserUserAgent'
  | 'browserAcceptHeader'
  | 'browserIP'
>;

/*
 * Output
 */

export interface EMV3DSNo3DSv2PreAuthOutputParams {
  protocolVersion: 'NO_3DS_v2'
  threeDSInfo: 'CardConfiguration'
}

export interface EMV3DSv2PreAuthWithoutMethodOutputParams {
  protocolVersion: '2.1.0' | '2.2.0'
  threeDSInfo: 'CardConfiguration'
  threeDSServerTransID: string
}

export interface EMV3DSv2PreAuthWithMethodOutputParams extends EMV3DSv2PreAuthWithoutMethodOutputParams {
  threeDSMethodURL: string
}

export type EMV3DSv2PreAuthOutputParams =
  | EMV3DSv2PreAuthWithoutMethodOutputParams
  | EMV3DSv2PreAuthWithMethodOutputParams;

export interface EMV3DSv1ChallengeOutputParams {
  protocolVersion: '1.0.2'
  threeDSInfo: 'ChallengeRequest'
  acsURL: string
  MD: string
  PAReq: string
}

export interface EMV3DSv2ChallengeOutputParams {
  protocolVersion: '2.1.0' | '2.2.0'
  threeDSInfo: 'ChallengeRequest'
  acsURL: string
  creq: string
}

/** EMV 3DSecure output parameters */
export type EMV3DSOutputParams =
  | EMV3DSNo3DSv2PreAuthOutputParams
  | EMV3DSv2PreAuthOutputParams
  | EMV3DSv1ChallengeOutputParams
  | EMV3DSv2ChallengeOutputParams;

/** EMV 3DSecure v2 challenge solution parameters */
export interface EMV3DSv2ChallengeSolutionNotificationOutputParams {
  cres: string
}

/** EMV 3DSecure v1 challenge solution parameters */
export interface EMV3DSv1ChallengeSolutionNotificationOutputParams {
  MD: string
  PaRes: string
}

export interface ThreeDSMethodData {
  threeDSServerTransID: string
  threeDSMethodNotificationURL: string
}

export interface ThreeDSMethodForm {
  url: string
  body: {
    threeDSMethodData: string
  }
}

/*
 * 3DS Challenge form
 */

export interface ThreeDSv1ChallengeForm {
  url: string
  body: {
    /** Payment authentication Request, XML that is gzip compressed and base64 encoded */
    PaReq: string
    /** Merchant data, random generated identifier hex encoded? */
    MD: string
    /** Post challenge redirect URL */
    TermUrl: string
  }
}

export interface ThreeDSv2ChallengeForm {
  url: string
  body: {
    /** Challenge request, JSON that is base64 encoded */
    creq: string
  }
}
