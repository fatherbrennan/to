import { APP_TITLE } from '$app/constants';
import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
  return (
    <header class='h-header'>
      <h1>{APP_TITLE}</h1>
    </header>
  );
});
