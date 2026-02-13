import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '../footer';
import { Header } from '../header';
import { Main } from '../main';

export const Body = component$(() => {
  return (
    <div class='h-screen-h-full flex flex-col'>
      <Header />

      <Main>
        <Slot />
      </Main>

      <Footer />
    </div>
  );
});
