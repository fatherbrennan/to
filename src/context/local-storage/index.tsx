import { useApp } from '$app/hooks/use-app';
import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useOnWindow,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';

export type LocalStorageContext = {};

export const localStorageKey = 'app.local';
export const localStorageContextId = createContextId<LocalStorageContext>(localStorageKey);

export const LocalStorageContextProvider = component$(() => {
  const app = useApp();
  const local = useStore<LocalStorageContext>({});

  useContextProvider(localStorageContextId, local);

  useOnWindow(
    'DOMContentLoaded',
    $(() => {
      const localStorageString = window.localStorage.getItem(localStorageKey);
      app.isLocalStorageRead = true;

      // keep defaults.
      if (!localStorageString) {
        return;
      }

      const _localStorage = JSON.parse(localStorageString) as Partial<LocalStorageContext>;
    }),
  );

  // biome-ignore lint/correctness/noQwikUseVisibleTask: browser local storage is not accessible from the server.
  useVisibleTask$(({ track: _track }) => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(local));
  });

  return <Slot />;
});
