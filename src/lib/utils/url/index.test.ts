import { describe, expect, test } from 'bun:test';
import {
  entriesForBook,
  entriesForChapter,
  entriesForPage,
  entriesForPerson,
  getContent,
  hasLeadingSlash,
  hasTrailingQuestionMark,
  hasTrailingSlash,
  queryKeyValue,
  simpleJoin,
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

  test('queryKeyValue', async () => {
    expect(queryKeyValue(new URLSearchParams('?id=123'))).toEqual({ id: '123' });
  });

  test('getContent', async () => {
    const params = { person: 'h', book: '1', chapter: '1', page: '1' };
    const content = getContent(params);
    expect(content.personName).toBe('h');
    expect(content.bookNumber).toBe(1);
    expect(content.chapterNumber).toBe(1);
    expect(content.pageNumber).toBe(1);
    expect(content.book?.title).toBeDefined();
    expect(content.chapter?.pages.length).toBeGreaterThan(0);
  });

  test('entries generators', async () => {
    const persons = entriesForPerson();
    expect(persons).toEqual([{ person: 'h' }, { person: 't' }]);

    const books = entriesForBook();
    expect(books).toEqual([
      { person: 'h', book: '1' },
      { person: 't', book: '1' },
    ]);

    const chapters = entriesForChapter();
    expect(chapters).toEqual([
      { person: 'h', book: '1', chapter: '1' },
      { person: 't', book: '1', chapter: '1' },
    ]);

    const pages = entriesForPage();
    expect(pages).toEqual([
      { person: 'h', book: '1', chapter: '1', page: '1' },
      { person: 'h', book: '1', chapter: '1', page: '2' },
      { person: 'h', book: '1', chapter: '1', page: '3' },
      { person: 'h', book: '1', chapter: '1', page: '4' },
      { person: 'h', book: '1', chapter: '1', page: '5' },
      { person: 'h', book: '1', chapter: '1', page: '6' },
      { person: 'h', book: '1', chapter: '1', page: '7' },
      { person: 'h', book: '1', chapter: '1', page: '8' },
      { person: 'h', book: '1', chapter: '1', page: '9' },
      { person: 'h', book: '1', chapter: '1', page: '10' },
      { person: 'h', book: '1', chapter: '1', page: '11' },
      { person: 't', book: '1', chapter: '1', page: '1' },
      { person: 't', book: '1', chapter: '1', page: '2' },
      { person: 't', book: '1', chapter: '1', page: '3' },
      { person: 't', book: '1', chapter: '1', page: '4' },
      { person: 't', book: '1', chapter: '1', page: '5' },
      { person: 't', book: '1', chapter: '1', page: '6' },
      { person: 't', book: '1', chapter: '1', page: '7' },
      { person: 't', book: '1', chapter: '1', page: '8' },
    ]);
  });
});
