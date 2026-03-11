import type { PageLoad } from './$types';
import { getContent, paramsToContentParam, entriesForPerson } from '$lib/utils/url';

export const entries = entriesForPerson;

export const load: PageLoad = ({ params }) => {
  const content = getContent(paramsToContentParam(params));
  return { content };
};
