import type { PageLoad } from './$types';
import { getContent, paramsToContentParam, entriesForPage } from '$lib/utils/url';

export const entries = entriesForPage;

export const load: PageLoad = ({ params }) => {
  const content = getContent(paramsToContentParam(params));
  return { content };
};
