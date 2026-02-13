import { OpenGraph } from '$app/constants';
import { content } from '$app/routes/h/book/content';
import { getToHead } from '$app/utils/title';
import { openGraphMeta, storiesParams } from '$app/utils/url';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, useLocation } from '@builder.io/qwik-city';

const { description, title } = getToHead('h');

export const head: DocumentHead = {
  meta: [
    { content: description, name: 'description' },
    openGraphMeta(OpenGraph.Title, title),
    openGraphMeta(OpenGraph.Description, description),
  ],
  title,
};

export default component$(() => {
  const { url } = useLocation();
  const { bookNumber, chapterNumber, pageNumber, personName } = storiesParams(url);
  const book = bookNumber !== null ? content.books[bookNumber] : null;
  const chapter = book !== null && chapterNumber !== null ? book.chapters[chapterNumber] : null;
  const pageIndex = pageNumber !== null ? pageNumber - 1 : null;
  const pages = chapter !== null ? chapter.pages : null;
  const page = pages !== null && pageIndex !== null ? pages[pageIndex] : null;

  return (
    <div>
      <h1>page</h1>
      <h1>{personName}</h1>
      <hr />
      <pre>{JSON.stringify(book, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(chapter, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(page, null, 2)}</pre>
      <hr />

      {pageNumber !== null && pageIndex !== null && pages && (
        <div>
          {pageIndex > 0 && pageIndex <= pages.length && (
            <Link href={`/to/${personName}/book/${bookNumber}/chapter/${chapterNumber}/page/${pageNumber - 1}`}>
              previous
            </Link>
          )}
          {pageIndex >= 0 && pageIndex < pages.length && (
            <Link href={`/to/${personName}/book/${bookNumber}/chapter/${chapterNumber}/page/${pageNumber + 1}`}>
              next
            </Link>
          )}
        </div>
      )}
    </div>
  );
});
