export type Millisecond = number;
export type Second = number;
export type Minute = number;
export type Hour = number;
export type Day = number;
export type Week = number;
export type Month = number;
export type Quarter = number;
export type Year = number;

const failUnsafeNumber = (v: Millisecond | Second | Minute | Hour | Day | Week | Month | Quarter | Year) => {
  if (v < 0 || !(v < Number.MAX_SAFE_INTEGER) || Object.is(v, -0)) {
    throw new RangeError(`unsafe number: ${v}`);
  }
};

const conditionalRound = (
  v: Millisecond | Second | Minute | Hour | Day | Week | Month | Quarter | Year,
  doRound?: boolean,
) => (doRound ? Math.round(v * 1000) / 1000 : v);

/**
 * return milliseconds from seconds.
 * @param n seconds to convert to milliseconds.
 */
export const milliseconds = (n: Second) => {
  failUnsafeNumber(n);
  return conditionalRound(n * 1000, true);
};

/**
 * return seconds from seconds.
 * @param n seconds to convert to seconds.
 */
export const seconds = (n: Second): Second => {
  failUnsafeNumber(n);
  return conditionalRound(n, true);
};

/**
 * return seconds from minutes.
 * @param n minutes to convert to seconds.
 */
export const minutes = (n: Minute): Second => {
  failUnsafeNumber(n);
  return conditionalRound(seconds(n) * 60, true);
};

/**
 * return seconds from hours.
 * @param n hours to convert to seconds.
 */
export const hours = (n: Hour): Second => {
  failUnsafeNumber(n);
  return conditionalRound(minutes(n) * 60, true);
};

/**
 * return seconds from days.
 * @param n days to convert to seconds.
 */
export const days = (n: Day): Second => {
  failUnsafeNumber(n);
  return conditionalRound(hours(n) * 24, true);
};

/**
 * return seconds from weeks.
 * @param n weeks to convert to seconds.
 */
export const weeks = (n: Week): Second => {
  failUnsafeNumber(n);
  return conditionalRound(days(n) * 7, true);
};

/**
 * return seconds from months.
 * @param n months to convert to seconds.
 */
export const months = (n: Month): Second => {
  failUnsafeNumber(n);
  return conditionalRound(days(n) * 30.4375, true); // average number of days in a month.
};

/**
 * return seconds from quarters.
 * @param n quarters to convert to seconds.
 */
export const quarters = (n: Quarter): Second => {
  failUnsafeNumber(n);
  return conditionalRound(months(n) * 3, true);
};

/**
 * return seconds from years.
 * @param n years to convert to seconds.
 */
export const years = (n: Year): Second => {
  failUnsafeNumber(n);
  return conditionalRound(days(n) * 365.25, true); // average number of days in a year.
};
