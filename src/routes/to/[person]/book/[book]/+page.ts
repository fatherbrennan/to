import type { PageLoad } from './$types';
import { getContent, paramsToContentParam, entriesForBook } from '$lib/utils/url';

export const entries = entriesForBook;

export const load: PageLoad = ({ params }) => {
  const content = getContent(paramsToContentParam(params));
  return { content };
};
