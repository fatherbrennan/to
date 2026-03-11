import type { PageLoad } from './$types';
import { getContent, paramsToContentParam, entriesForChapter } from '$lib/utils/url';

export const entries = entriesForChapter;

export const load: PageLoad = ({ params }) => {
  const content = getContent(paramsToContentParam(params));
  return { content };
};
