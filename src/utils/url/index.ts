import type { OpenGraph } from '$app/constants';
import type { Book, Chapter, Page } from '$app/routes/h/book/content';
import { content } from '$app/routes/h/book/content';
import { ASSET_VERSION } from '../../constants';

type EnsureTrailingSlash<T extends string> = T extends `${infer P}/` ? `${P}/` : `${T}/`;
type HasTrailingQuestionMark<T extends string> = T extends `${string}?` ? true : false;
type HasTrailingSlash<T extends string> = T extends `${string}/` ? true : false;
type HasLeadingSlash<T extends string> = T extends `/${string}` ? true : false;
type Versioned<TPath extends string> = `${TPath}?v=${typeof ASSET_VERSION}`;
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

export const hasTrailingQuestionMark = <T extends string>(path: T) => {
  return (path[path.length - 1] === '?') as HasTrailingQuestionMark<T>;
};

export function hasTrailingSlash<T extends string>(path: T) {
  return (path[path.length - 1] === '/') as HasTrailingSlash<T>;
}

export function hasLeadingSlash<T extends string>(path: T) {
  return (path[0] === '/') as HasLeadingSlash<T>;
}

export function withTrailingSlash<T extends string>(path: T): EnsureTrailingSlash<T> {
  return hasTrailingSlash(path) ? (path as unknown as EnsureTrailingSlash<T>) : (`${path}/` as EnsureTrailingSlash<T>);
}

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

/** add a version to a path. used for parameter cache busting for assets. */
export const v = <T extends string>(path: T): Versioned<T> => `${path}?v=${ASSET_VERSION}` as Versioned<T>;

/** note: Qwik City does not preserve hash for ssr; so `useLocation().url.hash = ''` always. */
export const relativePath = (url: URL) => {
  return `${url.pathname}${url.search}${url.hash}`;
};

export const openGraphMeta = <TProperty extends (typeof OpenGraph)[keyof typeof OpenGraph], TContent extends string>(
  property: TProperty,
  content: TContent,
) => ({
  content,
  property: `og:${property}` as const,
});

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
  const book = (bookIndex !== null ? content.books[bookIndex] : null) ?? null;
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
