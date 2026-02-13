import type { OpenGraph } from '$app/constants';
import { ASSET_VERSION } from '../../constants';

type EnsureTrailingSlash<T extends string> = T extends `${infer P}/` ? `${P}/` : `${T}/`;
type HasTrailingQuestionMark<T extends string> = T extends `${string}?` ? true : false;
type HasTrailingSlash<T extends string> = T extends `${string}/` ? true : false;
type HasLeadingSlash<T extends string> = T extends `/${string}` ? true : false;
type Versioned<TPath extends string> = `${TPath}?v=${typeof ASSET_VERSION}`;
/** `number` should always be `> 0`. */
export type StoriesParams = {
  bookNumber: number | null;
  chapterNumber: number | null;
  pageNumber: number | null;
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
export const storiesParams = (url: URL) => {
  const { pathname } = url;

  const [_match, person, book, _, chapter, __, page] =
    withTrailingSlash(pathname).match(/^.{0,442}\/to\/(.+)\/book\/(\d+)\/(chapter\/(\d+)\/(page\/(\d+)\/)?)?$/m) ?? [];

  return {
    bookNumber: Number(book) || null,
    chapterNumber: Number(chapter) || null,
    pageNumber: Number(page) || null,
    personName: person || null,
  } satisfies StoriesParams;
};
