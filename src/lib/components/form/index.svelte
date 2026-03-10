<script lang="ts" module>
export const { iniForm, updForm, getForm, setForm } = createFormContext();
</script>

<script lang="ts">
  import type { UnknownSuperValidated } from '$lib/contexts/form';
  import { createFormContext } from '$lib/contexts/form';
  import type { AttributesOf } from '$lib/types';
  import type { CreateForm } from '$lib/utils/form/index.svelte';
  import { superForm } from 'sveltekit-superforms';

  type FormProps = AttributesOf<HTMLFormElement> & {
    instance: CreateForm<UnknownSuperValidated>;
  };
  let { instance = $bindable(), children }: FormProps = $props();
  const { form, errors, constraints, message, enhance } = superForm<UnknownSuperValidated['data'], UnknownSuperValidated['message']>(instance.superValidated);
  const context = $state(iniForm());
  setForm(context);
  updForm({ data: $form, errors: $errors, constraints: $constraints, message: $message });
  // update form system with context.
  $effect(() => {
    form.set(context.data);
  });
  // super form controlled variables only, exposed to context.
  $effect(() => {
    context.errors = $errors;
    context.constraints = $constraints;
    context.message = $message;
  });
</script>

<pre>{JSON.stringify(context, null, 2)}</pre>

<form method="post" use:enhance>
  {@render children?.()}
</form>
