import type {
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  ThreeDSv2ChallengeNotificationBody
} from 'redsys-easy';

import type {
  ThreeDSv2PreAuthOutputParams,
  ThreeDSv2PreAuthWithMethodOutputParams,
  ThreeDSv1ChallengeOutputParams,
  ThreeDSv2ChallengeOutputParams,
  ThreeDSCres
} from '../../src/types/3ds-params';

export const createChallengeFinalForm = ({
  threeDSServerTransID,
  acsTransID,
  messageVersion,
  transStatus
}: ThreeDSCres) => {
  const authValueVisa = 'AAIBARcUIiEFBAkEWRQiAAAAAAA=';
  const authValueMasterMaestro = '';

  const rreq = {
    // This UUID seems to be a constant
    dsTransID: '8a07108d-78b0-4f19-9bde-d13e00360515',
    threeDSServerTransID,
    acsTransID,
    authenticationMethod: {
      acsInterface: '02',
      acsUiTemplate: '05'
    },
    interactionCounter: '01',
    messageCategory: '01',
    messageType: 'RReq',
    messageVersion,
    transStatus,
    ...(['Y', 'N'].includes(transStatus) ? { authenticationType: '01' } : undefined),
    ...(transStatus === 'N' ? { transStatusReason: '01' } : undefined),
    ...(transStatus === 'Y'
      ? {
        authenticationValue: authValueVisa || authValueMasterMaestro || (
          transStatus === 'Y'
            ? 'CACZA1IBMQVlgBZDF5UHAAAAAAA='
            : 'QVVUSEVOVElDQVRJT05fX0dPT0Q='
        )
      }
      : undefined
    ),
    eci: !authValueVisa && authValueMasterMaestro
      ? (transStatus === 'Y' ? '02' : '00')
      : (transStatus === 'Y' ? '05' : '07')
  };

  return {
    url: 'https://sis-d.redsys.es/sis-simulador-web/authenticationRequestAction.jsp',
    body: {
      RREQ: Buffer.from(JSON.stringify(rreq), 'utf8').toString('base64')
    }
  };
};

export const extractChallengeVariables = (responseText: string) => {
  const threeDSServerTransID = /CResSend\.threeDSServerTransID="([0-9a-f-]+)";/.exec(responseText)?.[1];
  if (threeDSServerTransID === undefined || !threeDSServerTransID) {
    throw new Error('threeDSServerTransID not found');
  }

  const acsTransID = /CResSend\.acsTransID="([0-9a-f-]+)";/.exec(responseText)?.[1];
  if (acsTransID === undefined || !acsTransID) {
    throw new Error('acsTransID not found');
  }

  const notificationURL = /document\.clasico\.action ?= ?"(.+)";/.exec(responseText)?.[1];
  if (notificationURL === undefined || !notificationURL) {
    throw new Error('notificationURL not found');
  }

  return {
    threeDSServerTransID,
    acsTransID,
    notificationURL
  };
};

export const createThreeDSv2ChallengeNotificationFromBody = (
  cResSend: ThreeDSCres
): ThreeDSv2ChallengeNotificationBody & { cRes: string } => {
  const serializedCres = Buffer.from(JSON.stringify(cResSend), 'utf8').toString('base64');

  return {
    cres: serializedCres,
    cRes: serializedCres,
    threeDSSessionData: 'null'
  };
};

export const assert3DSv2CardConfig: <
  T extends RestIniciaPeticionOutputParams | RestTrataPeticionOutputParams
> (
  infoResult: T | undefined
) => asserts infoResult is (T & {
  Ds_EMV3DS: ThreeDSv2PreAuthOutputParams
}) = infoResult => {
  if (
    infoResult?.Ds_EMV3DS === undefined ||
    infoResult.Ds_EMV3DS.threeDSInfo !== 'CardConfiguration' ||
    (
      infoResult.Ds_EMV3DS.protocolVersion !== '2.1.0' &&
      infoResult.Ds_EMV3DS.protocolVersion !== '2.2.0'
    )
  ) {
    throw new Error('Unexpected 3DS info');
  }
};

export const assert3DSv2WithMethodCardConfig: <
  T extends RestIniciaPeticionOutputParams | RestTrataPeticionOutputParams
> (
  infoResult: T | undefined
) => asserts infoResult is (T & {
  Ds_EMV3DS: ThreeDSv2PreAuthWithMethodOutputParams
}) = infoResult => {
  assert3DSv2CardConfig(infoResult);
  if (
    !('threeDSMethodURL' in infoResult.Ds_EMV3DS) ||
    infoResult.Ds_EMV3DS.threeDSMethodURL == null
  ) {
    throw new Error('Unexpected 3DS data');
  }
};

const assert3DSChallengeRequest: <
  T extends RestIniciaPeticionOutputParams | RestTrataPeticionOutputParams
> (
  infoResult: T | undefined
) => asserts infoResult is (T & {
  Ds_EMV3DS: ThreeDSv1ChallengeOutputParams | ThreeDSv2ChallengeOutputParams
}) = infoResult => {
  if (
    infoResult?.Ds_EMV3DS === undefined ||
    infoResult.Ds_EMV3DS.threeDSInfo !== 'ChallengeRequest'
  ) {
    throw new Error('3DS info is not challenge request');
  }
};

export const assert3DSv1ChallengeRequest: <
  T extends RestIniciaPeticionOutputParams | RestTrataPeticionOutputParams
> (
  infoResult: T | undefined
) => asserts infoResult is (T & {
  Ds_EMV3DS: ThreeDSv1ChallengeOutputParams
}) = infoResult => {
  assert3DSChallengeRequest(infoResult);
  if (
    infoResult.Ds_EMV3DS.protocolVersion !== '1.0.2'
  ) {
    throw new Error('Wrong protocol version');
  }
};

export const assert3DSv2ChallengeRequest: <
  T extends RestIniciaPeticionOutputParams | RestTrataPeticionOutputParams
> (
  infoResult: T | undefined
) => asserts infoResult is (T & {
  Ds_EMV3DS: ThreeDSv2ChallengeOutputParams
}) = infoResult => {
  if (
    infoResult?.Ds_EMV3DS === undefined ||
    infoResult.Ds_EMV3DS.threeDSInfo !== 'ChallengeRequest'
  ) {
    throw new Error('3DS info is not challenge request');
  }
  assert3DSChallengeRequest(infoResult);
  if (
    infoResult.Ds_EMV3DS.protocolVersion !== '2.1.0' &&
    infoResult.Ds_EMV3DS.protocolVersion !== '2.2.0'
  ) {
    throw new Error('Wrong protocol version');
  }
};
