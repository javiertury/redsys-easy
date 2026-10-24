import crypto from 'node:crypto';
import base64url from 'base64url';

/**
 * Adds padding to a buffer.
 *
 * Rounds up the buffer length to the next block and uses 0 as padding.
 *
 * @params buf - Input buffer
 * @params blocksize - Size of block
 */
export const zeroPad = (buf: Buffer, blocksize: number): Buffer => {
  const pad = Buffer.alloc(
    (blocksize - (buf.length % blocksize)) % blocksize,
    0
  );
  return Buffer.concat([buf, pad]);
};

/**
 * Encrypt a message using 3DES
 *
 * @params key - Key to encrypt message
 * @params message - Message to be encrypted
 */
export const encrypt3DES = (key: string, message: string): Buffer => {
  const keyBuf = Buffer.from(key, 'base64');
  const iv = Buffer.alloc(8, 0);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
  const messageBuf = Buffer.from(message.toString(), 'utf8');
  // Align to blocksize by padding the message buffer
  const paddedMessageBuf = zeroPad(messageBuf, 8);

  const cipher = crypto.createCipheriv('des-ede3-cbc', keyBuf, iv);
  cipher.setAutoPadding(false);
  const encryptedBuf = Buffer.concat([
    cipher.update(paddedMessageBuf),
    cipher.final()
  ]);

  // Make sure that encrypted buffer is not longer than the padded message
  const maxLength = Math.ceil(messageBuf.length / 8) * 8;
  return encryptedBuf.subarray(0, maxLength);
};

/**
 * Compute HMAC_SHA256_V1 signature
 *
 * @params merchantKey - Key to encrypt message
 * @params order - Order number
 * @params params - Payload to sign
 */
export const sha256Sign = (
  merchantKey: string,
  order: string,
  params: string
) => {
  const orderKeyBuf = encrypt3DES(merchantKey, order);
  return crypto
    .createHmac('sha256', orderKeyBuf)
    .update(params)
    .digest('base64');
};

/**
 * Compare two signatures in constant time
 *
 * @params expected - Signature computed locally, base64 encoded
 * @params received - Signature received from redsys, base64 or base64url encoded
 */
export const isSignatureEqual = (
  expected: string,
  received: string
): boolean => {
  // Comparing different base64 encodings is messy. Make it foolproof by comparing buffers.
  const expectedBuf = Buffer.from(expected, 'base64');
  const receivedBuf = base64url.toBuffer(received);
  return (
    expectedBuf.length === receivedBuf.length &&
    crypto.timingSafeEqual(expectedBuf, receivedBuf)
  );
};
