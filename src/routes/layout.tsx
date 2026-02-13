import { Footer, Header, Main } from '$app/components';
import { AppContextProvider, LocalStorageContextProvider } from '$app/context';
import { seconds, years } from '$app/utils/time';
import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // max once every 5 seconds, revalidate on the server to get a fresh version of this page.
    maxAge: seconds(5),
    // always serve a cached response by default, up to a year stale.
    staleWhileRevalidate: years(1),
  });
};

export default component$(() => {
  return (
    <AppContextProvider>
      <LocalStorageContextProvider>
        <Header />

        <Main>
          <Slot />
        </Main>

        <Footer />
      </LocalStorageContextProvider>
    </AppContextProvider>
  );
});
