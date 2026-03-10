import { content } from '$lib/content';

export function load({ params }) {
  const { person, book, chapter, page } = params;

  const personData = content[person as 'h' | 't'];
  if (!personData) throw new Error('Invalid person');

  const bookIndex = Number(book) - 1;
  const chapterIndex = Number(chapter) - 1;
  const pageIndex = Number(page) - 1;

  const bookData = personData.books[bookIndex];
  const chapterData = bookData.chapters[chapterIndex];
  const pageData = chapterData.pages[pageIndex];

  return {
    book: bookData,
    chapter: chapterData,
    page: pageData,
    person: personData,
  };
}
