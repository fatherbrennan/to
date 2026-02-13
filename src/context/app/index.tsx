import { SCREEN_SMALL_WIDTH } from '$app/constants';
import {
  $,
  component$,
  createContextId,
  isDev,
  Slot,
  useContextProvider,
  useOnWindow,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';

export type AppContext = {
  /** local storage has been read. @default false */
  isLocalStorageRead: boolean;
  /** `true` if screen width is less than `SCREEN_SMALL_WIDTH`. @default true */
  isSmallDisplay: boolean;
};

export const appContextId = createContextId<AppContext>('beelep.context.app');

export const AppContextProvider = component$(() => {
  const store = useStore<AppContext>({
    isLocalStorageRead: false,
    isSmallDisplay: true,
  });

  const checkScreenSizes = $(() => {
    store.isSmallDisplay = window.innerWidth <= SCREEN_SMALL_WIDTH;
  });

  useOnWindow('DOMContentLoaded', checkScreenSizes);
  useOnWindow('resize', checkScreenSizes);

  useContextProvider(appContextId, store);

  // show eruda devtools in mobile when in development.
  // TODO: ensure that this is a build time condition.
  if (isDev) {
    // biome-ignore lint/correctness/noQwikUseVisibleTask: eruda requires access to the dom.
    useVisibleTask$(async () => {
      if (store.isSmallDisplay) {
        const eruda = (await import('eruda')).default;
        eruda.init();
      }
    });
  }

  return <Slot />;
});
