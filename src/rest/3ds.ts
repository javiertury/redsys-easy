import base64url from 'base64url';

import type {
  ThreeDSv1ChallengeOutputParams,
  ThreeDSv2ChallengeOutputParams,
  ThreeDSv2PreAuthWithMethodOutputParams,
  ThreeDSMethodData,
  ThreeDSMethodForm,
  ThreeDSv1ChallengeForm,
  ThreeDSv2ChallengeForm,
  ThreeDSCres
} from '../types/3ds-params';

/*
 * 3DS method form
 */

/**
 * Creates parameters for a 3DS method form
 *
 * @public
 */
export const create3DSMethodForm = (
  emv3dsParams: Pick<
    ThreeDSv2PreAuthWithMethodOutputParams,
    'threeDSServerTransID' | 'threeDSMethodURL'
  >,
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

/**
 * Creates parameters for a 3DS v1 challenge form
 *
 * @public
 */
export const create3DSv1ChallengeForm = (
  emv3dsV1Challenge: ThreeDSv1ChallengeOutputParams,
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

/**
 * Creates parameters for a 3DS v2 challenge form
 *
 * @public
 */
export const create3DSv2ChallengeForm = (
  emv3dsV2Challenge: ThreeDSv2ChallengeOutputParams
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
 *
 * @public
 */
export const deserializeThreeDSMethodData = (
  threeDSMethodData: string
): ThreeDSMethodData => {
  return JSON.parse(base64url.decode(threeDSMethodData)) as ThreeDSMethodData;
};

/**
 * Deserialize `cres` field of a 3DS v2 challenge
 *
 * @public
 */
export const deserializeCres = (cres: string): ThreeDSCres => {
  return JSON.parse(
    Buffer.from(cres, 'base64').toString('utf8')
  ) as ThreeDSCres;
};
