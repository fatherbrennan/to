<script lang="ts">
  import { getForm } from '$lib/components/form/index.svelte';
  import type { KeyLike } from '$lib/types';
  import type { HTMLInputAttributes } from 'svelte/elements';

  type InputFieldProps<T> = Omit<HTMLInputAttributes, 'name' | 'type'> & {
    name: T;
  };
  export type FieldProps<T extends KeyLike> = InputFieldProps<T> & {
    label: string;
    type: 'email' | 'password';
  };

  let { name: n, type, label }: FieldProps<KeyLike> = $props();
  const name = $derived(String(n));
  const context = getForm();
</script>

<div class="flex flex-col gap-1 text-xs">
  <label for={name}>{label}</label>
  <div>
    <input {type} {name} id={name} aria-invalid={context.errors[name] ? 'true' : undefined} bind:value={context.data[name]} {...context.constraints?.[name]} />
  </div>
  {#if context.errors[name]}<span class="text-red-600">{context.errors[name]}</span>{/if}
</div>
