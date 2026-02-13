import { getIsoDate } from '$app/utils/date';

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
          pages: [
            { content: ['hi!'], title: 'i' },
            { content: ['hello!'], title: 'ii' },
            { content: ['so this is a little something for a little someone special to me.'], title: 'iii' },
            {
              content: ['you should be proud of how you have handled your career.'],
              title: 'iv',
            },
            {
              content: ['the many trips and hours of driving to pursue your dream shows your dedication.'],
              title: 'v',
            },
            {
              content: [
                'putting yourself in positions to increase your luck was out of your comfort zone, but now is no big leap in comparison.',
              ],
              title: 'vi',
            },
            {
              content: [
                'it is a warm, exciting feeling to see someone you share a life with obtain what once was thought to be out of reach.',
              ],
              title: 'vii',
            },
            { content: ['you are amazing.'], title: 'viii' },
            { content: ['i am proud of you.'], title: 'ix' },
            { content: ['i look forward to more of you, and more of us.'], title: 'x' },
            { content: ['for you.'], title: 'xi' },
          ],
          title: getIsoDate('2026-02-14T00:00:00.000+10:30'),
        },
      ],
      title: 'hi',
    },
  ],
} satisfies Content;
