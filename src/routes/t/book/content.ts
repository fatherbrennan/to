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
            { content: ['it has been a long time, i hope you remember me.'], title: 'ii' },
            {
              content: [
                'you are here and there and everywhere, never knowing where you are or where you are going.',
                'but you manage without a sweat.',
                'it is admirable.',
              ],
              title: 'iii',
            },
            {
              content: [
                'you are highly capable.',
                'sometimes it seems like you try to prove that to yourself',
                'from the sidelines of your life, there is nothing more you could do that would surprise me.',
                'i do not think anything is out of reach for you given enough time.',
              ],
              title: 'iv',
            },
            {
              content: [
                'i miss our overly deep post-film conversations for no apparent reason, where we get to thoroughly judge, hate and love films that we had absolutely no skin in the game in.',
                '...but that is fun...',
                '...and we will do it again sometime hopefully.',
              ],
              title: 'v',
            },
            { content: ['some months to go...'], title: 'vi' },
            { content: ['stay safe for me.'], title: 'vii' },
            { content: ['for you.'], title: 'viii' },
          ],
          title: getIsoDate('2026-02-14T00:00:00.000+10:30'),
        },
      ],
      title: 'hi',
    },
  ],
} satisfies Content;
