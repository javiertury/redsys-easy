import { expectType } from 'ts-expect';
import type { TypeEqual } from 'ts-expect';

import { signatureVersions } from './signatures';

import type { SignatureVersion } from '../types/api';

describe('signatureVersions', () => {
  it('should use the SignatureVersion type', () => {
    expectType<TypeEqual<readonly SignatureVersion[], typeof signatureVersions>>(
      true
    );
  });

  it('should implement all of SignatureVersion', () => {
    /*
     * The Record key makes sure that all members of the key union type are defined.
     * Then at runtime we collect all keys and compare them to the values of the enum
     * to checkout that all of them are implemented
     */
    const allSignatureVersionsObj: Record<SignatureVersion, true> = {
      HMAC_SHA512_V2: true,
      HMAC_SHA512_V1: true,
      HMAC_SHA256_V1: true
    };

    const allSignatureVersions = Object.keys(allSignatureVersionsObj).sort();
    const implementedSignatureVersions = signatureVersions.toSorted();

    expect(implementedSignatureVersions).toEqual(allSignatureVersions);
  });
});
