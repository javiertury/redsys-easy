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
 * Encrypt a message using AES-128-CBC
 *
 * @params key - Key to encrypt message, used as text
 * @params message - Message to be encrypted
 */
export const encryptAES = (key: string, message: string): Buffer => {
  // Redsys takes the first 16 characters of the key, right padded with zeros
  const keyBuf = Buffer.from(key.slice(0, 16).padEnd(16, '0'), 'utf8');
  const iv = Buffer.alloc(16, 0);

  // PKCS#7 padding, the default
  const cipher = crypto.createCipheriv('aes-128-cbc', keyBuf, iv);
  return Buffer.concat([cipher.update(message, 'utf8'), cipher.final()]);
};

/**
 * Compute HMAC_SHA512_V2 signature
 *
 * @params merchantKey - Key to encrypt message
 * @params order - Order number
 * @params params - Payload to sign
 */
export const sha512Sign = (
  merchantKey: string,
  order: string,
  params: string
) => {
  // The HMAC key is the encrypted order as a base64 string, not its bytes
  const orderKey = encryptAES(merchantKey, order).toString('base64');
  return crypto
    .createHmac('sha512', orderKey)
    .update(params)
    .digest('base64url');
};

/**
 * Compare two signatures in constant time
 *
 * @params expected - Signature computed locally, base64 or base64url encoded
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
