/**
 * - `'YYYY-MM-DD'`
 * - `'hh:mm'`
 * - `'hh:mm:ss'`
 * - `'hh:mm:ss+hh:mm'`
 * - `'hh:mm:ss-hh:mm'`
 * - `'hh:mm:ssZ'`
 * - `'hh:mm:ss.sss'`
 * - `'hh:mm:ss.sss+hh:mm'`
 * - `'hh:mm:ss.sss-hh:mm'`
 * - `'hh:mm:ss.sssZ'`
 * - `'Thh:mm'`
 * - `'Thh:mm:ss'`
 * - `'Thh:mm:ss+hh:mm'`
 * - `'Thh:mm:ss-hh:mm'`
 * - `'Thh:mm:ssZ'`
 * - `'Thh:mm:ss.sss'`
 * - `'Thh:mm:ss.sss+hh:mm'`
 * - `'Thh:mm:ss.sss-hh:mm'`
 * - `'Thh:mm:ss.sssZ'`
 * - `'YYYY-MM-DDThh:mm'`
 * - `'YYYY-MM-DDThh:mm+hh:mm'`
 * - `'YYYY-MM-DDThh:mm-hh:mm'`
 * - `'YYYY-MM-DDThh:mmZ'`
 * - `'YYYY-MM-DDThh:mm:ss'`
 * - `'YYYY-MM-DDThh:mm:ss+hh:mm'`
 * - `'YYYY-MM-DDThh:mm:ss-hh:mm'`
 * - `'YYYY-MM-DDThh:mm:ssZ'`
 * - `'YYYY-MM-DDThh:mm:ss.sss'`
 * - `'YYYY-MM-DDThh:mm:ss.sss+hh:mm'`
 * - `'YYYY-MM-DDThh:mm:ss.sss-hh:mm'`
 * - `'YYYY-MM-DDThh:mm:ss.sssZ'`
 */
export const rIsoLikeDatetime =
  /^((\d\d\d\d)-([0-1]\d)-([0-3]\d))?(T?([0-2]\d):([0-5]\d)(:([0-5]\d))?)?(\.(\d{1,3}))?([+-][0-2]\d:[0-5]\d|Z)?$/m;
/**
 * - `'DD/MM/YYYY, hh:mm:ss GMT'`
 * - `'DD/MM/YYYY, hh:mm:ss GMT+hh:mm'`
 * - `'DD/MM/YYYY, hh:mm:ss GMT-hh:mm'`
 */
export const rIntlLocalDatetime = /^([0-3]\d)\/([0-1]\d)\/(\d\d\d\d), ([0-2]\d):([0-5]\d):([0-5]\d) GMT(.{0,6})/m;
