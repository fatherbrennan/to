import { component$ } from '@builder.io/qwik';

export const Footer = component$(() => {
  return (
    <footer class='text-center h-footer'>
      <a class='text-xs' href='https://github.com/fatherbrennan/beelep' rel='noopener noreferrer' target='_blank'>
        from b.
      </a>
    </footer>
  );
});
