import { describe, expect, test } from 'bun:test';

import { days, hours, milliseconds, minutes, months, seconds, weeks, years } from '.';

describe('time utilities', async () => {
  test('milliseconds', async () => {
    expect(milliseconds(0)).toBe(0);
    expect(milliseconds(0.021)).toBe(21);
    expect(milliseconds(1)).toBe(1000);
    expect(milliseconds(1.5)).toBe(1500);
    expect(milliseconds(12345)).toBe(12345000);
    expect(() => milliseconds(-0)).toThrowError();
    expect(() => milliseconds(-1)).toThrowError();
    expect(() => milliseconds(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
  });

  test('seconds', async () => {
    expect(seconds(0)).toBe(0);
    expect(seconds(0.021)).toBe(0.021);
    expect(seconds(1)).toBe(1);
    expect(seconds(1.5)).toBe(1.5);
    expect(seconds(12345)).toBe(12345);
    expect(() => seconds(-0)).toThrowError();
    expect(() => seconds(-1)).toThrowError();
    expect(() => seconds(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
  });

  test('minutes', async () => {
    expect(minutes(0)).toBe(0);
    expect(minutes(0.021)).toBe(1.26);
    expect(minutes(1)).toBe(60);
    expect(minutes(1.5)).toBe(90);
    expect(minutes(12345)).toBe(740700);
    expect(() => minutes(-0)).toThrowError();
    expect(() => minutes(-1)).toThrowError();
    expect(() => minutes(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
  });

  test('hours', async () => {
    expect(hours(0)).toBe(0);
    expect(hours(0.021)).toBe(75.6);
    expect(hours(1)).toBe(3600);
    expect(hours(1.5)).toBe(5400);
    expect(hours(12345)).toBe(44442000);
    expect(() => hours(-0)).toThrowError();
    expect(() => hours(-1)).toThrowError();
    expect(() => hours(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
  });

  test('days', async () => {
    expect(days(0)).toBe(0);
    expect(days(0.021)).toBe(1814.4);
    expect(days(1)).toBe(86400);
    expect(days(1.5)).toBe(129600);
    expect(days(12345)).toBe(1066608000);
    expect(() => days(-0)).toThrowError();
    expect(() => days(-1)).toThrowError();
    expect(() => days(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
  });

  test('weeks', async () => {
    expect(weeks(0)).toBe(0);
    expect(weeks(0.021)).toBe(12700.8);
    expect(weeks(1)).toBe(604800);
    expect(weeks(1.5)).toBe(907200);
    expect(weeks(12345)).toBe(7466256000);
    expect(() => weeks(-0)).toThrowError();
    expect(() => weeks(-1)).toThrowError();
    expect(() => weeks(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
  });

  test('months', async () => {
    expect(months(0)).toBe(0);
    expect(months(0.021)).toBe(55225.8);
    expect(months(1)).toBe(2629800);
    expect(months(1.5)).toBe(3944700);
    expect(months(12345)).toBe(32464881000);
    expect(() => months(-0)).toThrowError();
    expect(() => months(-1)).toThrowError();
    expect(() => months(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
  });

  test('years', async () => {
    expect(years(0)).toBe(0);
    expect(years(0.021)).toBe(662709.6);
    expect(years(1)).toBe(31557600);
    expect(years(1.5)).toBe(47336400);
    expect(years(12345)).toBe(389578572000);
    expect(() => years(-0)).toThrowError();
    expect(() => years(-1)).toThrowError();
    expect(() => years(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
  });
});
