import { describe, expect, test } from 'bun:test';
import { camelToLowerSnake } from '.';

describe('string utilities', async () => {
  test('camelToSnake', async () => {
    expect(camelToLowerSnake('camelCase')).toBe('camel_case');
    expect(camelToLowerSnake('superLongCamelCase')).toBe('super_long_camel_case');
    expect(camelToLowerSnake('HTTPRequest')).toBe('http_request');
    expect(camelToLowerSnake('userID')).toBe('user_id');
    expect(camelToLowerSnake('simple')).toBe('simple');

    // non const usage.
    let dynamic = 'camelCase';
    expect(camelToLowerSnake(dynamic)).toBe('camel_case');
    dynamic = 'HTTPRequest';
    expect(camelToLowerSnake(dynamic)).toBe('http_request');
  });
});
