import { describe, expect, test } from 'bun:test';
import { tryCatch } from '.';

describe('tryCatch utility', async () => {
  test('sync', async () => {
    const r1 = tryCatch(
      () => 'success',
      () => 'failed',
    );
    const r2 = tryCatch(
      () => true,
      () => false,
    );
    const r3 = tryCatch(
      () => {
        throw true;
        // biome-ignore lint/correctness/noUnreachable: testing.
        return true;
      },
      () => false,
    );

    expect(r1).toBeString();
    expect(r1).toBe('success');
    expect(r2).toBeBoolean();
    expect(r2).toBeTrue();
    expect(r3).toBeBoolean();
    expect(r3).toBeFalse();
  });

  test('async', async () => {
    const r1 = await tryCatch(
      async () => 'success',
      async () => 'failed',
    );
    const r2 = await tryCatch(
      async () => true,
      async () => false,
    );
    const r3 = await tryCatch(
      async () => {
        new Promise((resolve) => setTimeout(resolve, 100));
        throw true;
        // biome-ignore lint/correctness/noUnreachable: testing.
        return true;
      },
      async () => false,
    );

    expect(r1).toBeString();
    expect(r1).toBe('success');
    expect(r2).toBeBoolean();
    expect(r2).toBeTrue();
    expect(r3).toBeBoolean();
    expect(r3).toBeFalse();
  });

  test('mixed', async () => {
    const r1 = await tryCatch(
      () => 'success',
      async () => 'failed',
    );
    const r2 = await tryCatch(
      async () => true,
      () => false,
    );
    const r3 = await tryCatch(
      async () => {
        new Promise((resolve) => setTimeout(resolve, 100));
        throw true;
        // biome-ignore lint/correctness/noUnreachable: testing.
        return true;
      },
      () => false,
    );

    expect(r1).toBeString();
    expect(r1).toBe('success');
    expect(r2).toBeBoolean();
    expect(r2).toBeTrue();
    expect(r3).toBeBoolean();
    expect(r3).toBeFalse();
  });
});
