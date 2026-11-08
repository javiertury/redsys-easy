import type { SignatureVersion } from '../types/api';
import { signatureVersions as existingSignatureVersions } from '../assets/signatures';
import { RedsysError } from '../errors'

export const assetIsSignatureVersion: (value: unknown) => asserts value is SignatureVersion = (value) => {
  if (
    !(existingSignatureVersions as readonly unknown[]).includes(value)
  ) {
    throw new RedsysError(
      `Unknown signature version: ${String(value)}`
    );
  }
}

export const assetIsNonEmptyListOfSignatureVersions: (values: readonly unknown[]) => asserts values is readonly [SignatureVersion, ...SignatureVersion[]] = (values) => {
  if (values.length < 1) {
    throw new RedsysError(
      'List of signature versions is empty'
    );
  }

  if (
    !values.every(sigItem => (existingSignatureVersions as readonly unknown[]).includes(sigItem))
  ) {
    throw new RedsysError(
      `Unknown signature versions in: ${values.map(String).join(',')}`
    );
  }
}
