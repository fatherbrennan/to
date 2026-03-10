import type { Component } from 'svelte';
import { Field, Form, Submit } from '$lib/components';
import type { FieldProps } from '$lib/components/form/field/index.svelte';
import type { UnknownSuperValidated } from '$lib/contexts/form';

export type CreateForm<T extends UnknownSuperValidated> = {
  superValidated: T;
  Field: Component<FieldProps<keyof T['data']>>;
  Form: typeof Form;
  Submit: typeof Submit;
};
export const createForm = <T extends UnknownSuperValidated>(superValidated: () => T) => {
  return {
    Field,
    Form,
    Submit,
    superValidated: superValidated(),
  } satisfies CreateForm<T>;
};
