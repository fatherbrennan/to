import { getRandomValues, subtle } from 'node:crypto';
import { sr } from '$lib/utils/response';
import { tryCatch } from '$lib/utils/try-catch';

/** generate a random string of 24 bytes. */
export const generateRandomString = (): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  // generate 24 bytes = 192 bits of entropy.
  // only going to use first 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits.
  const bytes = new Uint8Array(24);
  getRandomValues(bytes);

  let id = '';
  for (let i = 0; i < bytes.length; i++) {
    // >> 3 disregards the right-most 3 bits of the byte.
    id += alphabet[bytes[i] >> 3];
  }
  return id;
};

/** constant time equality check. */
export const o1Equal = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  let c = 0;

  for (let i = 0; i < a.byteLength; i++) {
    c |= a[i] ^ b[i];
  }

  return c === 0;
};

/** hash a secret using SHA-256. */
export const hashSecret = async (secret: string) => {
  return await tryCatch(
    async () => {
      const secretBytes = new TextEncoder().encode(secret);
      const secretHashBuffer = await subtle.digest('sha-256', secretBytes);
      return sr<Buffer<ArrayBuffer>>({
        data: Buffer.from(secretHashBuffer),
        message: 'successfully hashed secret.',
        success: true,
      });
    },
    async () => {
      throw sr({
        message: 'failed to hash secret.',
        success: false,
      });
    },
  );
};
