import type { LocalStorageContext } from '$app/context';
import { localStorageContextId } from '$app/context';
import { useContext } from '@builder.io/qwik';

/**
 * easy read/write to local storage.
 * @example
 * ```ts
 * component$(() => {
 *   const local = useLocalStorage();
 *   return <pre>{JSON.stringify(local)}</pre>;
 * });
 * ```
 *
 * check the `isLocalStorageRead` property in app state to ensure values have been read from local storage.
 * common use case is to conditionally render a component based on local storage values.
 * @example
 * ```ts
 * component$(() => {
 *   const app = useApp();
 *   const local = useLocalStorage();
 *   return app.isLocalStorageRead && <body class={local.theme}>...</body>;
 * });
 * ```
 */
export function useLocalStorage(): LocalStorageContext {
  const local = useContext(localStorageContextId);
  return local;
}
