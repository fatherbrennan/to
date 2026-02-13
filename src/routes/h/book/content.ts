export type Page = {
  title: string;
  content: string[];
};
export type Chapter = {
  pages: Page[];
  title: string;
};
export type Book = {
  chapters: Chapter[];
  title: string;
};
export type Content = {
  books: Book[];
};

export const content = {
  books: [
    {
      chapters: [
        {
          pages: [{ content: [], title: 'Page 1' }],
          title: 'Chapter 1',
        },
      ],
      title: 'Book 1',
    },
  ],
} satisfies Content;
