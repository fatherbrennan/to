import type { HTMLAttributes } from 'svelte/elements';

/** add phantom type. attach a $type object to a value for stronger typing. */
export type Typed<A, T> = A & { $type: T };
/** value without phantom type. works for extended objects only. */
export type Untyped<A> = Omit<A, '$type'>;
/**
 * add phantom type to a value.
 * - where `v` is the value.
 * - where `V` is the desired type of value.
 * - where `T` is the phantom type to add to the value.
 * @param v value to type.
 * @returns value with added T as phantom types.
 */
export const typed = <V, T>(v: V) => {
  return v satisfies V as Typed<V, T>;
};
/**
 * remove phantom type from a value.
 * - where `v` is the value.
 * - where `V` is the desired type of value.
 * @param v value to type.
 * @returns value with phantom types removed.
 */
export const untyped = <V>(v: V) => {
  return v satisfies V as Untyped<V>;
};

export type ClassList = string | undefined | null | false;
export type AttributesOf<T extends Element> = Omit<HTMLAttributes<T>, 'class'> & { class?: ClassList };
export type KeyLike = string | number | symbol;
/** basic plain object type. */
export type PlainObject<T> = { [key: string]: T };
/** from T, pick a set of properties whose keys are in the union K to make optional. */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
/** from T, pick a set of properties whose keys are in the union K to make required. */
export type Require<T, K extends keyof T> = Pick<Required<T>, K> & Omit<T, K>;
type LanguageCodeToLanguageCodeI18n<T extends string> = T extends `${infer L}-${infer R}` ? `${L}_${R}` : T;
/** @link https://www.techonthenet.com/js/language_tags.php */
export type LanguageCode =
  | 'ar-SA'
  | 'bn-BD'
  | 'bn-IN'
  | 'cs-CZ'
  | 'da-DK'
  | 'de-AT'
  | 'de-CH'
  | 'de-DE'
  | 'el-GR'
  | 'en-AU'
  | 'en-CA'
  | 'en-GB'
  | 'en-IE'
  | 'en-IN'
  | 'en-NZ'
  | 'en-US'
  | 'en-ZA'
  | 'es-AR'
  | 'es-CL'
  | 'es-CO'
  | 'es-ES'
  | 'es-MX'
  | 'es-US'
  | 'fi-FI'
  | 'fr-BE'
  | 'fr-CA'
  | 'fr-CH'
  | 'fr-FR'
  | 'he-IL'
  | 'hi-IN'
  | 'hu-HU'
  | 'id-ID'
  | 'it-CH'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'nl-BE'
  | 'nl-NL'
  | 'no-NO'
  | 'pl-PL'
  | 'pt-BR'
  | 'pt-PT'
  | 'ro-RO'
  | 'ru-RU'
  | 'sk-SK'
  | 'sv-SE'
  | 'ta-IN'
  | 'ta-LK'
  | 'th-TH'
  | 'tr-TR'
  | 'zh-CN'
  | 'zh-HK'
  | 'zh-TW';
export type LanguageCodeI18n = LanguageCodeToLanguageCodeI18n<LanguageCode>;
export type TimeZone = Intl.DateTimeFormatOptions['timeZone'];
/** unix timestamp in seconds. */
export type UnixTimestampSeconds = number;
/** unix timestamp in milliseconds. */
export type UnixTimestamp = number;
/**
 * - `'Z'` (utc)
 * - `'±hh:mm'`
 */
export type IsoTimeOffset = string;
/** `YYYY-MM-DD` */
export type IsoDate = `${string}-${string}-${string}`;
/** `hh:mm:ss.sss<IsoTimeOffset>` */
export type IsoTime = `${string}:${string}:${string}.${string}${IsoTimeOffset}`;
/** `hh:mm:ss` */
export type IsoTimeHhMmSs = `${string}:${string}:${string}`;
/** `hh:mm` */
export type IsoTimeHhMm = `${string}:${string}`;
/** `YYYY-MM-DDThh:mm:ss.sss<IsoTimeOffset>` */
export type IsoDatetime = `${IsoDate}T${IsoTime}`;
export type IsoLikeDatetime = IsoDatetime | IsoDate | IsoTime | IsoTimeHhMmSs | IsoTimeHhMm;
