import type { Book, Chapter, Content, Page } from '$lib/content';
import { content } from '$lib/content';
import { sortStringAsc } from '../sort';

type EnsureTrailingSlash<T extends string> = T extends `${infer P}/` ? `${P}/` : `${T}/`;
type HasTrailingQuestionMark<T extends string> = T extends `${string}?` ? true : false;
type HasTrailingSlash<T extends string> = T extends `${string}/` ? true : false;
type HasLeadingSlash<T extends string> = T extends `/${string}` ? true : false;
/** `number` should always be `> 0`. */
export type GetContent = {
  book: Book | null;
  bookIndex: number | null;
  bookNumber: number | null;
  chapter: Chapter | null;
  chapterIndex: number | null;
  chapterNumber: number | null;
  chapters: Chapter[] | null;
  page: Page | null;
  pageIndex: number | null;
  pageNumber: number | null;
  pages: Page[] | null;
  personName: string | null;
};
type QueryFnParamValue = string | number | boolean | undefined;
type QueryFnParam = Record<string, QueryFnParamValue>;
type QueryKeyValue = { [key: string]: string | undefined };

export const hasTrailingQuestionMark = <T extends string>(path: T) => {
  return (path[path.length - 1] === '?') as HasTrailingQuestionMark<T>;
};

export const hasTrailingSlash = <T extends string>(path: T) => {
  return (path[path.length - 1] === '/') as HasTrailingSlash<T>;
};

export const hasLeadingSlash = <T extends string>(path: T) => {
  return (path[0] === '/') as HasLeadingSlash<T>;
};

export const withTrailingSlash = <T extends string>(path: T): EnsureTrailingSlash<T> => {
  return hasTrailingSlash(path) ? (path as unknown as EnsureTrailingSlash<T>) : (`${path}/` as EnsureTrailingSlash<T>);
};

/**
 * join paths together to form a url like path.
 * - there are no url validity checks. at most; one absolute url is assumed in argument 0.
 * - `simpleJoin('https://example.com/', 'https://example2.com/', '/bar')` -> `https://example.com/https://example2.com/bar/`
 * - `/` is always added to the end of the path.
 * - `simpleJoin('/', '/foo/', '/bar/')` -> `/foo/bar/`
 */
export const simpleJoin = (...paths: string[]) => {
  let joined = '';

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    if (path === '') {
      continue;
    }

    // always add a slash to the end of the path.
    joined += withTrailingSlash(hasLeadingSlash(path) && joined !== '' ? path.slice(1) : path);
  }

  return joined;
};

export const relativePath = <T extends URL>(url: T) => {
  return `${url.pathname}${url.search}${url.hash}`;
};

/** url encode value. */
export const encodeSubstring = (value: NonNullable<QueryFnParamValue>): string => {
  return encodeURIComponent(value);
};

/** generate a url query string from an object where the key is the query parameter and the value is the query value. */
export const query = <T extends QueryFnParam>(params: T): string => {
  // by sorting, we ensure these requests are cached in the same order.
  const keys = Object.keys(params).sort(sortStringAsc);

  if (keys.length === 0) {
    return '';
  }

  let q = '?';

  for (let i = 0; i < keys.length; i++) {
    const key: keyof T = keys[i];
    const value = params[key];
    if (value !== undefined) {
      q += `${String(key)}=${encodeSubstring(value)}&`;
    }
  }

  return q.slice(0, -1);
};

/** return a key value object from a url query string. */
export const queryKeyValue = <T extends QueryKeyValue>(searchParams: URLSearchParams) => {
  return Object.fromEntries(searchParams) as T;
};

/**
 * `/to/<person>/book/1/`
 * `/to/<person>/book/1/chapter/1/`
 * `/to/<person>/book/1/chapter/1/page/1/`
 */
export const getContent = (url: URL) => {
  const { pathname } = url;

  const [_match, person, bookString, _, chapterString, __, pageString] =
    withTrailingSlash(pathname).match(/^.{0,442}\/to\/(.+)\/book\/(\d+)\/(chapter\/(\d+)\/(page\/(\d+)\/)?)?$/m) ?? [];

  const bookNumber = Number(bookString) || null;
  const chapterNumber = Number(chapterString) || null;
  const pageNumber = Number(pageString) || null;
  const personName = person || null;
  const bookIndex = bookNumber !== null ? bookNumber - 1 : null;
  const book =
    (personName !== null && bookIndex !== null ? content[personName as keyof Content]?.books[bookIndex] : null) ?? null;
  const chapterIndex = chapterNumber !== null ? chapterNumber - 1 : null;
  const chapters = book !== null ? book.chapters : null;
  const chapter = (chapters !== null && chapterIndex !== null ? chapters[chapterIndex] : null) ?? null;
  const pageIndex = pageNumber !== null ? pageNumber - 1 : null;
  const pages = chapter !== null ? chapter.pages : null;
  const page = (pages !== null && pageIndex !== null ? pages[pageIndex] : null) ?? null;

  return {
    book,
    bookIndex,
    bookNumber,
    chapter,
    chapterIndex,
    chapterNumber,
    chapters,
    page,
    pageIndex,
    pageNumber,
    pages,
    personName,
  } satisfies GetContent;
};
