import type { QRL } from '@builder.io/qwik';
import { $, implicit$FirstArg, useStore } from '@builder.io/qwik';

export type UseDebounceFn<T> = QRL<(args: T) => void>;

export type UseDebounceOptions = {
  /** delay in milliseconds before triggering `fn`. @default 300 */
  delay?: number;
  /**
   * maximum number of times during debouncing, before triggering `fn`.
   * - note: If equal to `1`, will execute immediately.
   * @default Number.POSITIVE_INFINITY
   */
  threshold?: number;
};

export type UseDebounce<T> = {
  /** cancel existing debounce. */
  clear: QRL<() => void>;
  /** queue `fn` to be executed after debounce dependencies are met. */
  debounce: UseDebounceFn<T>;
  /** cancel existing debounce and immediately execute `fn`. */
  force: UseDebounceFn<T>;
  /** `true` when in a debounce state, meaning there is a queued `fn` to execute. */
  isDebouncing: boolean;
};

type UseDebounceState = {
  timeoutId: number | undefined;
  debounced: number;
  isDebouncing: boolean;
};

export function useDebounceQrl<T>(fn: UseDebounceFn<T>, options?: UseDebounceOptions): UseDebounce<T> {
  const { delay = 300, threshold = Number.POSITIVE_INFINITY } = options ?? {};
  const state = useStore<UseDebounceState>({
    debounced: 0,
    isDebouncing: false,
    timeoutId: undefined,
  });

  const clear: UseDebounce<T>['clear'] = $(() => {
    clearTimeout(state.timeoutId);
    state.timeoutId = undefined;
    state.debounced = 0;
    state.isDebouncing = false;
  });

  const force: UseDebounce<T>['force'] = $(async (args) => {
    clear();
    fn(args);
  });

  const debounce: UseDebounce<T>['debounce'] = $(async (args) => {
    state.debounced++;
    state.isDebouncing = true;

    // force execute if threshold reached
    if (state.debounced >= threshold) {
      force(args);
      return;
    }

    clearTimeout(state.timeoutId);
    state.timeoutId = Number(setTimeout(() => force(args), delay));
  });

  return {
    clear,
    debounce,
    force,
    isDebouncing: state.isDebouncing,
  };
}

/**
 * set debounce callback `fn` and debounce dependencies.
 * @example
 * ```ts
 * component$(() => {
 *   const { debounce } = useDebounce$<string>((value) => {
 *     console.log(value);
 *   }, { delay: 200, threshold: 5 });
 *
 *   return <input type="text" onInput$={$((_event, { value }) => debounce(value))} />;
 * });
 * ```
 */
export const useDebounce$ = implicit$FirstArg(useDebounceQrl);
