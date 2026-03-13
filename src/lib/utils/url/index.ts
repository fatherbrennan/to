import type { Content, PersonContent } from '$lib/content';
import { content } from '$lib/content';
import { sortStringAsc } from '../sort';

type EnsureTrailingSlash<T extends string> = T extends `${infer P}/` ? `${P}/` : `${T}/`;
type HasTrailingQuestionMark<T extends string> = T extends `${string}?` ? true : false;
type HasTrailingSlash<T extends string> = T extends `${string}/` ? true : false;
type HasLeadingSlash<T extends string> = T extends `/${string}` ? true : false;
export type GetContentParam = {
  person: string | null;
  book?: string | null;
  chapter?: string | null;
  page?: string | null;
};
/** `number` should always be `> 0`. */
export type GetContent = {
  bookIndex: number | null;
  bookNumber: number | null;
  chapterIndex: number | null;
  chapterNumber: number | null;
  pageIndex: number | null;
  pageNumber: number | null;
  personName: string | null;
  personContent: PersonContent | null;
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
 * `/to/<person>/book/1`
 * `/to/<person>/book/1/chapter/1`
 * `/to/<person>/book/1/chapter/1/page/1`
 */
export const getContent = (param: GetContentParam) => {
  const { person, bookString, chapterString, pageString } = (() => {
    return { bookString: param.book, chapterString: param.chapter, pageString: param.page, person: param.person };
  })();

  const bookNumber = Number(bookString) || null;
  const chapterNumber = Number(chapterString) || null;
  const pageNumber = Number(pageString) || null;
  const personName = person || null;
  const bookIndex = bookNumber !== null ? bookNumber - 1 : null;
  const books = personName !== null ? content[personName as keyof Content]?.books : null;
  const book = (books !== null && bookIndex !== null ? books[bookIndex] : null) ?? null;
  const chapterIndex = chapterNumber !== null ? chapterNumber - 1 : null;
  const chapters = book !== null ? book.chapters : null;
  const chapter = (chapters !== null && chapterIndex !== null ? chapters[chapterIndex] : null) ?? null;
  const pageIndex = pageNumber !== null ? pageNumber - 1 : null;
  const pages = chapter !== null ? chapter.pages : null;
  const personContent = personName !== null ? content[personName as keyof Content] : null;

  return {
    bookIndex,
    bookNumber,
    chapterIndex,
    chapterNumber,
    pageIndex,
    pageNumber,
    personName,
    personContent,
  } satisfies GetContent;
};

/** list every person identifier available in the content object */
export const allPersons = (): string[] => Object.keys(content);

/** generate every combination of person+book */
export const allBooks = (): Array<{ person: string; book: string }> => {
  const results: Array<{ person: string; book: string }> = [];
  for (const person of allPersons()) {
    const books = content[person as keyof Content]?.books ?? [];
    books.forEach((_, i) => results.push({ person, book: String(i + 1) }));
  }
  return results;
};

/** generate every combination of person+book+chapter */
export const allChapters = (): Array<{
  person: string;
  book: string;
  chapter: string;
}> => {
  const results: Array<{ person: string; book: string; chapter: string }> = [];
  for (const { person, book } of allBooks()) {
    const chapters =
      content[person as keyof Content]?.books[Number(book) - 1]?.chapters ?? [];
    chapters.forEach((_, j) => results.push({ person, book, chapter: String(j + 1) }));
  }
  return results;
};

/** generate every combination of person+book+chapter+page */
export const allPages = (): Array<{
  person: string;
  book: string;
  chapter: string;
  page: string;
}> => {
  const results: Array<{
    person: string;
    book: string;
    chapter: string;
    page: string;
  }> = [];
  for (const { person, book, chapter } of allChapters()) {
    const pages =
      content[person as keyof Content]?.books[Number(book) - 1]?.chapters[Number(chapter) - 1]?.pages ?? [];
    pages.forEach((_, k) =>
      results.push({ person, book, chapter, page: String(k + 1) })
    );
  }
  return results;
};

export const entriesForPerson = () => allPersons().map(person => ({ person }));
export const entriesForBook = () => allBooks().map(({ person, book }) => ({ person, book }));
export const entriesForChapter = () =>
  allChapters().map(({ person, book, chapter }) => ({ person, book, chapter }));
export const entriesForPage = () =>
  allPages().map(({ person, book, chapter, page }) => ({ person, book, chapter, page }));
