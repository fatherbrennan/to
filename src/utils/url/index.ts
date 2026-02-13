import type { OpenGraph } from '$app/constants';
import { ASSET_VERSION } from '../../constants';
import { sortAscString } from '../sort';

type EnsureTrailingSlash<T extends string> = T extends `${infer P}/` ? `${P}/` : `${T}/`;
type HasTrailingQuestionMark<T extends string> = T extends `${string}?` ? true : false;
type HasTrailingSlash<T extends string> = T extends `${string}/` ? true : false;
type HasLeadingSlash<T extends string> = T extends `/${string}` ? true : false;
type Versioned<TPath extends string> = `${TPath}?v=${typeof ASSET_VERSION}`;
type QueryFnParamValue = string | number | boolean | undefined;
type QueryFnParam = Record<string, QueryFnParamValue>;
type QueryKeyValue = { [key: string]: string | undefined };

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

/** url encode value. */
export const encodeSubstring = (value: NonNullable<QueryFnParamValue>): string => {
  return encodeURIComponent(value);
};

/** generate a url query string from an object where the key is the query parameter and the value is the query value. */
export const query = <T extends QueryFnParam>(params: T): string => {
  // by sorting, we ensure these requests are cached in the same order.
  const keys = Object.keys(params).sort(sortAscString);

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
