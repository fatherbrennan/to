<script lang="ts">
  import type { Component } from 'svelte';

  type AsyncProps = {
    /** delay in milliseconds before rendering `isPending` component. @default 100 */
    delay?: number;
    /** signal to determine if component is pending. */
    isPending: boolean;
    /** component to render while pending. */
    onPending: Component;
    /** component to render while delaying. */
    onPreDelay?: Component;
    /** component to render when resolved. */
    onResolved: Component;
  };

  let { isPending = $bindable(), delay = 100, onPreDelay: PreDelay = () => ({}), onPending: Pending, onResolved: Resolved }: AsyncProps = $props();
  let isDelaying = $state(true);

  $effect(() => {
    if (isPending === false) {
      return;
    }

    isDelaying = true;

    const timeoutId = setTimeout(() => {
      isDelaying = false;
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  });
</script>

{#if isPending}
  {#if isDelaying}
    <PreDelay />
  {:else}
    <Pending />
  {/if}
{:else}
  <Resolved />
{/if}
