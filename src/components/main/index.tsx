import { component$, Slot } from '@builder.io/qwik';

export const Main = component$(() => {
  return (
    <main>
      <Slot />
    </main>
  );
});
