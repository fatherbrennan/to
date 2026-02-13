import { APP_TITLE, OpenGraph } from '$app/constants';
import { openGraphMeta } from '$app/utils/url';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

const title = APP_TITLE;
const description = 'TODO: Needs a description';

export const head: DocumentHead = {
  meta: [
    { content: description, name: 'description' },
    openGraphMeta(OpenGraph.Title, title),
    openGraphMeta(OpenGraph.Description, description),
  ],
  title,
};

export default component$(() => {
  return (
    <div>
      <p>&#x2603;</p>
    </div>
  );
});
