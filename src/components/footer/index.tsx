import { component$ } from '@builder.io/qwik';

export const Footer = component$(() => {
  return (
    <footer class='text-center h-footer flex flex-col justify-center items-center'>
      <a
        class='text-xs sm:text-base'
        href='https://github.com/fatherbrennan/to'
        rel='noopener noreferrer'
        target='_blank'
      >
        from b.
      </a>
    </footer>
  );
});
