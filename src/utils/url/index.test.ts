import { OpenGraph } from '$app/constants';
import { describe, expect, test } from 'bun:test';
import {
  hasLeadingSlash,
  hasTrailingQuestionMark,
  hasTrailingSlash,
  openGraphMeta,
  simpleJoin,
  v,
  withTrailingSlash,
} from '.';

describe('url utilities', async () => {
  test('hasTrailingQuestionMark', async () => {
    expect(hasTrailingQuestionMark('hi')).toBe(false);
    expect(hasTrailingQuestionMark('hi?')).toBe(true);
    expect(hasTrailingQuestionMark('hi/there')).toBe(false);
    expect(hasTrailingQuestionMark('hi/there?')).toBe(true);
    expect(hasTrailingQuestionMark('hi/there/?')).toBe(true);
    expect(hasTrailingQuestionMark('?hi/there/')).toBe(false);
    expect(hasTrailingQuestionMark('?hi/there/?')).toBe(true);
    expect(hasTrailingQuestionMark('hi/there/?/')).toBe(false);
    expect(hasTrailingQuestionMark('hi/there/?id=')).toBe(false);
    expect(hasTrailingQuestionMark('hi/there/?id=123')).toBe(false);
  });

  test('hasTrailingSlash', async () => {
    expect(hasTrailingSlash('hi')).toBe(false);
    expect(hasTrailingSlash('hi?')).toBe(false);
    expect(hasTrailingSlash('hi/there')).toBe(false);
    expect(hasTrailingSlash('hi/there?')).toBe(false);
    expect(hasTrailingSlash('hi/there/?')).toBe(false);
    expect(hasTrailingSlash('?hi/there/')).toBe(true);
    expect(hasTrailingSlash('?hi/there/?')).toBe(false);
    expect(hasTrailingSlash('hi/there/?/')).toBe(true);
    expect(hasTrailingSlash('hi/there/?id=')).toBe(false);
    expect(hasTrailingSlash('hi/there/?id=123')).toBe(false);
  });

  test('hasLeadingSlash', async () => {
    expect(hasLeadingSlash('hi')).toBe(false);
    expect(hasLeadingSlash('hi?')).toBe(false);
    expect(hasLeadingSlash('hi/there')).toBe(false);
    expect(hasLeadingSlash('hi/there?')).toBe(false);
    expect(hasLeadingSlash('hi/there/?')).toBe(false);
    expect(hasLeadingSlash('?hi/there/')).toBe(false);
    expect(hasLeadingSlash('?hi/there/?')).toBe(false);
    expect(hasLeadingSlash('hi/there/?/')).toBe(false);
    expect(hasLeadingSlash('hi/there/?id=')).toBe(false);
    expect(hasLeadingSlash('hi/there/?id=123')).toBe(false);
    expect(hasLeadingSlash('/hi')).toBe(true);
    expect(hasLeadingSlash('/hi?')).toBe(true);
    expect(hasLeadingSlash('/hi/there')).toBe(true);
    expect(hasLeadingSlash('/hi/there?')).toBe(true);
    expect(hasLeadingSlash('/hi/there/?')).toBe(true);
    expect(hasLeadingSlash('/?hi/there/')).toBe(true);
    expect(hasLeadingSlash('/?hi/there/?')).toBe(true);
    expect(hasLeadingSlash('/hi/there/?/')).toBe(true);
    expect(hasLeadingSlash('/hi/there/?id=')).toBe(true);
    expect(hasLeadingSlash('/hi/there/?id=123')).toBe(true);
  });

  test('withTrailingSlash', async () => {
    expect(withTrailingSlash('')).toBe('/');
    expect(withTrailingSlash('/')).toBe('/');
    expect(withTrailingSlash('hi')).toBe('hi/');
    expect(withTrailingSlash('hi/')).toBe('hi/');
    expect(withTrailingSlash('hi/there')).toBe('hi/there/');
    expect(withTrailingSlash('hi/there/')).toBe('hi/there/');
    expect(withTrailingSlash('hi/there/123')).toBe('hi/there/123/');
    expect(withTrailingSlash('hi/there/123/')).toBe('hi/there/123/');
  });

  test('simpleJoin', async () => {
    expect(simpleJoin('')).toBe('');
    expect(simpleJoin('/')).toBe('/');
    expect(simpleJoin('/', 'foo')).toBe('/foo/');
    expect(simpleJoin('/', '/foo')).toBe('/foo/');
    expect(simpleJoin('', 'foo')).toBe('foo/');
    expect(simpleJoin('', '/foo')).toBe('/foo/');
    expect(simpleJoin('/', 'foo', 'bar')).toBe('/foo/bar/');
    expect(simpleJoin('/', '/foo', '/bar')).toBe('/foo/bar/');
    expect(simpleJoin('/', '/foo/', '/bar')).toBe('/foo/bar/');
    expect(simpleJoin('/', '/foo/', '/bar/')).toBe('/foo/bar/');
    expect(simpleJoin('https://example.com/', '/foo/', '/bar/')).toBe('https://example.com/foo/bar/');
    // expect to create an invalid url.
    expect(simpleJoin('https://example.com/', 'https://example2.com/', '/bar/')).toBe(
      'https://example.com/https://example2.com/bar/',
    );
  });

  test('v', async () => {
    const assetVersion = 1744242140483;
    expect(v('hello')).toBe(`hello?v=${assetVersion}`);
    expect(v('/hello')).toBe(`/hello?v=${assetVersion}`);
    expect(v('hello.json')).toBe(`hello.json?v=${assetVersion}`);
    expect(v('/hello.json')).toBe(`/hello.json?v=${assetVersion}`);
    expect(v('hello/there.svg')).toBe(`hello/there.svg?v=${assetVersion}`);
    expect(v('/hello/there.svg')).toBe(`/hello/there.svg?v=${assetVersion}`);
    expect(v('hello/there.png')).toBe(`hello/there.png?v=${assetVersion}`);
    expect(v('/hello/there.png')).toBe(`/hello/there.png?v=${assetVersion}`);
  });

  test('openGraphMeta', async () => {
    expect(openGraphMeta(OpenGraph.Type, 'image/png')).toEqual({ content: 'image/png', property: 'og:type' });
    expect(openGraphMeta(OpenGraph.Title, 'Hello World!')).toEqual({ content: 'Hello World!', property: 'og:title' });
    expect(openGraphMeta('description', 'Goodbye World!')).toEqual({
      content: 'Goodbye World!',
      property: 'og:description',
    });
  });
});
