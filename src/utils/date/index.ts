/**
 * **date.ts**
 *
 * keep in mind that every Date object is a utc date internally (unix timestamp).
 *
 * unix timestamp has no time zone.
 *
 * keywords:
 * - `iso` (ISO 8601) is the international standard format for representing dates and times. `YYYY-MM-DDThh:mm:ss.sss`
 * - `utc` is the is the primary time standard.
 * - `local` is the local time, which is to be the chosen time zone relative to utc.
 * - `common` is for variables used for utc and local time.
 * - `time` is to specify `hour`, `minute`, `second`, `millisecond`, `microsecond`. `Thh:mm:ss.sss`
 * - `date` is to specify `year`, `month`, `day`. `YYYY-MM-DD`
 * - `timeZone` is to specify the time zone. `Z` is for UTC, and `±hh:mm` for local time.
 */

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
  /^((\d\d\d\d)-([0-1][0-2])-([0-3]\d))?(T?([0-2]\d):([0-5]\d)(:([0-5]\d))?)?(\.(\d{1,3}))?([+-][0-2]\d:[0-5]\d|Z)?$/m;
/**
 * - `'DD/MM/YYYY, hh:mm:ss GMT'`
 * - `'DD/MM/YYYY, hh:mm:ss GMT+hh:mm'`
 * - `'DD/MM/YYYY, hh:mm:ss GMT-hh:mm'`
 */
export const rIntlLocalDatetime = /^([0-3]\d)\/([0-1][0-2])\/(\d\d\d\d), ([0-2]\d):([0-5]\d):([0-5]\d) GMT(.{0,6})/m;

import type {
  IsoDate,
  IsoDatetime,
  IsoLikeDatetime,
  IsoTime,
  IsoTimeHhMm,
  IsoTimeHhMmSs,
  IsoTimeOffset,
  LanguageCode,
  TimeZone,
  UnixTimestamp,
} from '../../types';

type DeconstructedIsoDatetime = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
  offset?: IsoTimeOffset;
};

// use a known locale (`'en-AU'`) so we can predict the output.
export const getIntlLocalDatetime = (localTimeZone: TimeZone) => {
  return new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    month: '2-digit',
    second: '2-digit',
    timeZone: localTimeZone,
    timeZoneName: 'longOffset',
    year: 'numeric',
  });
};

const intlCommonTimeOptions = {
  hour: '2-digit',
  hour12: false,
  minute: '2-digit',
} as const satisfies Parameters<typeof Intl.DateTimeFormat>[1];

export const getIntlUtcTime = (localLanguageCode: LanguageCode) => {
  return new Intl.DateTimeFormat(localLanguageCode, {
    ...intlCommonTimeOptions,
    timeZone: 'UTC',
  });
};

export const getIntlLocalTime = (localLanguageCode: LanguageCode, localTimeZone: TimeZone) => {
  return new Intl.DateTimeFormat(localLanguageCode, {
    ...intlCommonTimeOptions,
    timeZone: localTimeZone,
  });
};

const numberOrUndefined = (n: string | undefined) => (n === undefined ? undefined : +n);

/** given an iso datetime or unix timestamp, return a deconstructed object with the local time zone offset. */
export const deconstructLocalFromUtcDatetime = (
  localTimeZone: TimeZone,
  isoDatetimeOrUnixTs?: IsoDatetime | UnixTimestamp,
): DeconstructedIsoDatetime => {
  const [_match, day, month, year, hour, minute, second, offset] =
    getIntlLocalDatetime(localTimeZone)
      .format(isoDatetimeOrUnixTs !== undefined ? new Date(isoDatetimeOrUnixTs) : new Date())
      .match(rIntlLocalDatetime) ?? [];

  return {
    day: numberOrUndefined(day),
    hour: numberOrUndefined(hour),
    minute: numberOrUndefined(minute),
    month: numberOrUndefined(month),
    offset: offset === undefined || offset === '' ? 'Z' : offset,
    second: numberOrUndefined(second),
    year: numberOrUndefined(year),
  };
};

export const buildIsoDatetime = ({
  day,
  month,
  year,
  hour,
  minute,
  second,
  millisecond,
  offset,
}: DeconstructedIsoDatetime): IsoDatetime => {
  /** add leading `'0'` to string based on `length`. */
  const padZero = (value: number | string, length: number) => {
    const valueString = value.toString();
    let v = '';
    for (let i = 0; i < length - valueString.length; i++) v += '0';
    return v + valueString;
  };

  return `${padZero(year ?? '0000', 4)}-${padZero(month ?? '01', 2)}-${padZero(day ?? '01', 2)}T${padZero(hour ?? '00', 2)}:${padZero(minute ?? '00', 2)}:${padZero(
    second ?? '00',
    2,
  )}.${padZero(millisecond ?? '000', 3)}${offset ?? 'Z'}`;
};

/** return deconstructed date and time from an iso-like datetime string. see `rIsoDatetime` for valid patterns. */
export const deconstructIsoLikeDatetime = (isoLikeDatetime: IsoLikeDatetime): DeconstructedIsoDatetime => {
  const [_match, __, year, month, day, ___, hour, minute, ____, second, _____, millisecond, offset] =
    isoLikeDatetime.match(rIsoLikeDatetime) ?? [];

  return {
    day: numberOrUndefined(day),
    hour: numberOrUndefined(hour),
    millisecond: numberOrUndefined(millisecond),
    minute: numberOrUndefined(minute),
    month: numberOrUndefined(month),
    offset: offset,
    second: numberOrUndefined(second),
    year: numberOrUndefined(year),
  };
};

/**
 * create a `Date` object from an iso-like datetime string or unix timestamp.
 * overwrite the `offset` to `Z`, even when an alternative offset is provided.
 *
 * examples:
 * - `YYYY-MM-DD` -> `YYYY-MM-DDT00:00:00.000Z`
 * - `YYYY-MM-DDThh:mm:ss.sssZ` -> `YYYY-MM-DDThh:mm:ss.sssZ`
 * - `YYYY-MM-DDThh:mm:ss.sss+10:30` -> `YYYY-MM-DDThh:mm:ss.sssZ`
 * - `1234567891011` -> `1234567891011` (always unchanged)
 */
export const utcDate = (isoLikeDatetimeOrUnixTs: IsoLikeDatetime | UnixTimestamp): Date => {
  return new Date(
    typeof isoLikeDatetimeOrUnixTs === 'number'
      ? isoLikeDatetimeOrUnixTs
      : buildIsoDatetime({ ...deconstructIsoLikeDatetime(isoLikeDatetimeOrUnixTs), offset: 'Z' }),
  );
};

/**
 * create a `Date` object from an iso-like datetime string or unix timestamp.
 * overwrite the `offset` to the local time zone offset, even when an alternative offset is provided.
 *
 * examples (assuming the local time zone is `+10:30`):
 * - `YYYY-MM-DD` -> `YYYY-MM-DDThh:mm:ss.sss+10:30`
 * - `YYYY-MM-DDThh:mm:ss.sssZ` -> `YYYY-MM-DDThh:mm:ss.sss+10:30`
 * - `YYYY-MM-DDThh:mm:ss.sss+10:30` -> `YYYY-MM-DDThh:mm:ss.sss+10:30`
 * - `1234567891011` -> `1234567891011` (always unchanged)
 */
export const localDate = (localTimeZone: TimeZone, isoLikeDatetimeOrUnixTs: IsoLikeDatetime | UnixTimestamp): Date => {
  return new Date(
    typeof isoLikeDatetimeOrUnixTs === 'number'
      ? isoLikeDatetimeOrUnixTs
      : buildIsoDatetime({
          ...deconstructIsoLikeDatetime(isoLikeDatetimeOrUnixTs),
          offset: deconstructLocalFromUtcDatetime(localTimeZone).offset,
        }),
  );
};

export const getIsoDate = (isoDatetime: IsoDatetime): IsoDate => {
  return isoDatetime.slice(0, 10) as IsoDate;
};

export const getIsoTime = (isoDatetime: IsoDatetime): IsoTime => {
  return isoDatetime.slice(11, isoDatetime.length) as IsoTime;
};

export const getIsoTimeHhMm = (isoDatetime: IsoDatetime): IsoTimeHhMm => {
  return isoDatetime.slice(11, 16) as IsoTimeHhMm;
};

export const getIsoTimeHhMmSs = (isoDatetime: IsoDatetime): IsoTimeHhMmSs => {
  return isoDatetime.slice(11, 19) as IsoTimeHhMmSs;
};
