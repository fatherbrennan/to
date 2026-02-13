import type { AppContext } from '$app/context';
import { appContextId } from '$app/context';
import { useContext } from '@builder.io/qwik';

/**
 * easy handling app state.
 * @example
 * ```ts
 * component$(() => {
 *   const app = useApp();
 *   return <pre>{JSON.stringify(app)}</pre>;
 * });
 * ```
 */
export function useApp(): AppContext {
  const store = useContext(appContextId);
  return store;
}
