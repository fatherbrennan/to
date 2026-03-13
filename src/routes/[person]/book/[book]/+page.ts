import { entriesForBook, getContent } from '$lib/utils/url';
import type { PageLoad } from './$types';

export const entries = entriesForBook;

export const load: PageLoad = ({ params }) => {
  const content = getContent(params);
  return { content };
};
