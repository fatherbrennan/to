import { content } from '$lib/content';

export const prerender = true;

export const entries = (() => {
  const paths: string[] = [];

  for (const personKey of Object.keys(content)) {
    const person = content[personKey as keyof typeof content];
    let path = `/${personKey}`;
    paths.push(path);

    for (let bookIndex = 0; bookIndex < person.books.length; bookIndex++) {
      const book = person.books[bookIndex];
      const bookNumber = bookIndex + 1;
      path = `${path}/books/${bookNumber}`;
      paths.push(path);

      for (let chapterIndex = 0; chapterIndex < book.chapters.length; chapterIndex++) {
        const chapter = book.chapters[chapterIndex];
        const chapterNumber = chapterIndex + 1;
        path = `${path}/chapter/${chapterNumber}`;
        paths.push(path);

        for (let pageIndex = 0; pageIndex < chapter.pages.length; pageIndex++) {
          const pageNumber = pageIndex + 1;
          path = `${path}/page/${pageNumber}`;
          paths.push(path);
        }
      }
    }
  }

  return paths;
})();
