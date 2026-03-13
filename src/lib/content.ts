import { getIsoDate } from '$lib/utils/date';

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
export type PersonContent = {
  name: string;
  books: Book[];
};
export type Content = {
  h: PersonContent;
  t: PersonContent;
};

export const content = {
  h: {
    books: [
      {
        chapters: [
          {
            pages: [
              { content: ['hi!'], title: 'i' },
              { content: ['hello!'], title: 'ii' },
              {
                content: ['so this is a little something for a little someone special to me.'],
                title: 'iii',
              },
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
              {
                content: ['i look forward to more of you, and more of us.'],
                title: 'x',
              },
              { content: ['for you.'], title: 'xi' },
            ],
            title: getIsoDate('2026-02-14T00:00:00.000+10:30'),
          },
        ],
        title: 'hi',
      },
      {
        chapters: [
          {
            pages: [
              { content: [''], title: '' }
            ],
            title: '19'
          },
          {
            pages: [
              { content: [''], title: '' }
            ],
            title: '20'
          },
          {
            pages: [
              { content: [''], title: '' },
              { content: [''], title: '' },
              { content: [''], title: '' }
            ],
            title: '21'
          },
          {
            pages: [
              { content: [''], title: '' }
            ],
            title: '22'
          },
          {
            pages: [
              { content: [''], title: '' }
            ],
            title: '23'
          },
          {
            pages: [
              { content: [''], title: '' }
            ],
            title: '24'
          },
          {
            pages: [
              { content: [''], title: '' }
            ],
            title: '25'
          },
        ],
        title: '25'
      }
    ],
    name: 'h',
  },
  t: {
    books: [
      {
        chapters: [
          {
            pages: [
              { content: ['hi!'], title: 'i' },
              {
                content: ['it has been a long time, i hope you remember me.'],
                title: 'ii',
              },
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
                  'sometimes it seems like you try to prove that to yourself;',
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
    name: 't',
  },
} satisfies Content;
