import type { JSXOutput, Signal } from '@builder.io/qwik';
import { component$, useSignal, useTask$ } from '@builder.io/qwik';

type AsyncProps = {
  /** delay in milliseconds before rendering `isPending` component. @default 100 */
  delay?: number;
  /** signal to determine if component is pending. */
  isPending: Signal<boolean>;
  /** component to render while pending. */
  onPending: JSXOutput;
  /** component to render while delaying. @default <></> */
  onPreDelay?: JSXOutput;
  /** component to render when resolved. */
  onResolved: JSXOutput;
};

export const Async = component$<AsyncProps>(
  ({ isPending, delay = 100, onPreDelay: PreDelay = <></>, onPending: Pending, onResolved: Resolved }) => {
    const timeoutId = useSignal<number | undefined>();
    const isDelaying = useSignal(true);

    useTask$(({ track }) => {
      track(() => isPending.value);

      if (timeoutId.value !== undefined) {
        clearTimeout(timeoutId.value);
        timeoutId.value = undefined;
      }

      isDelaying.value = true;
      timeoutId.value = Number(
        setTimeout(() => {
          clearTimeout(timeoutId.value);
          timeoutId.value = undefined;
          isDelaying.value = false;
        }, delay),
      );
    });

    return isPending.value ? (isDelaying.value ? PreDelay : Pending) : Resolved;
  },
);
