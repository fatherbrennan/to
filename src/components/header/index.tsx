import { component$ } from '@builder.io/qwik';

import { APP_TITLE } from '$app/constants';

export const Header = component$(() => {
  return (
    <header>
      <h1>{APP_TITLE}</h1>
    </header>
  );
});
