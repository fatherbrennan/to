import { OpenGraph } from '$app/constants';
import { getToHead } from '$app/utils/title';
import { openGraphMeta } from '$app/utils/url';
import { component$, Slot } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

const { description, title } = getToHead('h');

export const head: DocumentHead = {
  meta: [
    { content: description, name: 'description' },
    openGraphMeta(OpenGraph.Title, title),
    openGraphMeta(OpenGraph.Description, description),
  ],
  title,
};

export default component$(() => {
  return <Slot />;
});
