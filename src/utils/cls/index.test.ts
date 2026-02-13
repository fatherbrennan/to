import { describe, expect, test } from 'bun:test';
import { cls } from '.';

describe('class utility', async () => {
  test('falsy types', async () => {
    expect(cls(false && 'class1')).toBe('');
    expect(cls(false && 'class1', false && 'class2')).toBe('');
    expect(cls(false && 'class1', false && 'class2')).toBe('');
    expect(cls(false && 'class1', false && 'class2')).toBe('');
    expect(cls(false && 'class1', !!0 && 'class2')).toBe('');
    expect(cls(false && 'class1', false && 'class2', false && 'class3', false && 'class4', !!0 && 'class5')).toBe('');
  });

  test('truthy types', async () => {
    expect(cls(true && 'class1')).toBe('class1');
    expect(cls(true && 'class1', true && 'class2')).toBe('class1 class2');
    expect(cls(!false && 'class1', !false && 'class2')).toBe('class1 class2');
    expect(cls(!false && 'class1', !0 && 'class2')).toBe('class1 class2');
    expect(cls(true && 'class1', !false && 'class2', !false && 'class3', !false && 'class4', !0 && 'class5')).toBe(
      'class1 class2 class3 class4 class5',
    );
  });

  test('typical usage', async () => {
    expect(cls('class1')).toBe('class1');
    expect(cls(true && 'class1', 'class2', false && 'class3', 'class4')).toBe('class1 class2 class4');
    expect(cls('class1', 'class2', 'class3 class4', false && 'class5', !false && 'class6')).toBe(
      'class1 class2 class3 class4 class6',
    );
  });
});
