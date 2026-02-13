import { APP_TITLE, OpenGraph } from '$app/constants';
import { content } from '$app/routes/ham/book/content';
import { withAppTitle } from '$app/utils/title';
import { openGraphMeta } from '$app/utils/url';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useLocation } from '@builder.io/qwik-city';

const title = APP_TITLE;
const description = withAppTitle('ham');

export const head: DocumentHead = {
  meta: [
    { content: description, name: 'description' },
    openGraphMeta(OpenGraph.Title, title),
    openGraphMeta(OpenGraph.Description, description),
  ],
  title,
};

export default component$(() => {
  const { params } = useLocation();

  return (
    <div>
      <h1>{content[0].title}</h1>
      <h1>{content[0].title}</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
});
