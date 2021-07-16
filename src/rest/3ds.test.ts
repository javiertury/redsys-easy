import {
  create3DSMethodForm,
  deserializeThreeDSMethodData,
  create3DSv1ChallengeForm,
  create3DSv2ChallengeForm,
  deserializeCres
} from './3ds';

import {
  deserializedIniciaPeticionResponse,
  threeDSMethodForm,
  threeDSMethodNotificationBody,
  deserialized3DSMethodResponse,
  threeDSChallengeForm as threeDSv2ChallengeForm,
  threeDSChallengeNotificationBody,
  deserializedCres,
  deserializedThreeDSMethodData
} from '../../test/fixtures/rest/3ds-v2.1-challenge';

import {
  deserializedThreeDSChallengeResponse as deserializedThreeDSv1ChallengeResponse,
  threeDSChallengeForm as threeDSv1ChallengeForm
} from '../../test/fixtures/rest/3ds-v1';

describe('create3DSMethodForm', () => {
  it('should create 3DS method form parameters', () => {
    expect(create3DSMethodForm(
      deserializedIniciaPeticionResponse.Ds_EMV3DS,
      'http://my-server:3000/notification-3ds-method'
    )).toEqual(threeDSMethodForm);
  });
});

describe('deserializeThreeDSMethodData', () => {
  it('should deserialize "threeDSMethodData" field from 3DS method notification', () => {
    expect(deserializeThreeDSMethodData(
      threeDSMethodNotificationBody.threeDSMethodData
    )).toEqual(deserializedThreeDSMethodData);
  });
});

describe('create3DSv1ChallengeForm', () => {
  it('should create 3DS v1 challenge form parameters', () => {
    expect(create3DSv1ChallengeForm(
      deserializedThreeDSv1ChallengeResponse.Ds_EMV3DS,
      'http://my-server:3000/post-challenge-v1'
    )).toEqual(threeDSv1ChallengeForm);
  });
});

describe('create3DSv2ChallengeForm', () => {
  it('should create 3DS v2 challenge form parameters', () => {
    expect(create3DSv2ChallengeForm(
      deserialized3DSMethodResponse.Ds_EMV3DS
    )).toEqual(threeDSv2ChallengeForm);
  });
});

describe('deserializeCres', () => {
  it('should deserialize "cres" field from callenge notification', () => {
    expect(deserializeCres(threeDSChallengeNotificationBody.cres)).toEqual(deserializedCres);
  });
});
