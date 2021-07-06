import base64url from 'base64url';

import type {
  EMV3DSv1ChallengeOutputParams,
  EMV3DSv2ChallengeOutputParams,
  EMV3DSv2PreAuthWithMethodOutputParams,
  ThreeDSMethodData,
  ThreeDSMethodForm,
  ThreeDSv1ChallengeForm,
  ThreeDSv2ChallengeForm
} from '../types/emv3ds-params';

/*
 * 3DS Method form
 */

export const create3DSMethodForm = (
  emv3dsParams: Pick<EMV3DSv2PreAuthWithMethodOutputParams, 'threeDSServerTransID' | 'threeDSMethodURL'>,
  notificationURL: string
): ThreeDSMethodForm => {
  const methodData: ThreeDSMethodData = {
    threeDSServerTransID: emv3dsParams.threeDSServerTransID,
    threeDSMethodNotificationURL: notificationURL
  };

  return {
    url: emv3dsParams.threeDSMethodURL,
    body: {
      threeDSMethodData: base64url.encode(JSON.stringify(methodData))
    }
  };
};

export const create3DSv1ChallengeForm = (
  emv3dsV1Challenge: EMV3DSv1ChallengeOutputParams,
  challengeNotificationUrl: string
): ThreeDSv1ChallengeForm => {
  return {
    url: emv3dsV1Challenge.acsURL,
    body: {
      PaReq: emv3dsV1Challenge.PAReq,
      MD: emv3dsV1Challenge.MD,
      TermUrl: challengeNotificationUrl
    }
  };
};

export const create3DSv2ChallengeForm = (
  emv3dsV2Challenge: EMV3DSv2ChallengeOutputParams
): ThreeDSv2ChallengeForm => {
  return {
    url: emv3dsV2Challenge.acsURL,
    body: {
      creq: emv3dsV2Challenge.creq
    }
  };
};

/**
 * Deserialize threeDSMethodData
 */
export const deserializeThreeDSMethodData = (
  threeDSMethodData: string
): ThreeDSMethodData => {
  return JSON.parse(base64url.decode(threeDSMethodData)) as ThreeDSMethodData;
};

export interface DeserializedCres {
  // Even for EMV3DS v2.2, the version seems to be fixed at 2.1.0
  messageVersion: '2.1.0' | '2.2.0'
  threeDSServerTransID: string
  acsTransID: string
  messageType: 'CRes'
  transStatus: 'Y' | 'N'
}

/**
 * Deserialize "cres" field
 */
export const deserializeCres = (cres: string): DeserializedCres => {
  return JSON.parse(Buffer.from(cres, 'base64').toString('utf8')) as DeserializedCres;
};
