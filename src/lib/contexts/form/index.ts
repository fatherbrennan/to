import type { SuperValidated } from 'sveltekit-superforms';
import type { Require } from '$lib/types';
import { iniContext } from '$lib/utils/context';
import type { Sr } from '$lib/utils/response';

type UnknownRecord = Record<string, unknown>;
export type UnknownSuperValidated = SuperValidated<UnknownRecord, Sr<unknown>, UnknownRecord>;
export type FormContext = Require<
  Pick<UnknownSuperValidated, 'data' | 'errors' | 'constraints' | 'message'>,
  'constraints'
>;

export const createFormContext = () => {
  const {
    upd,
    ini: iniForm,
    get: getForm,
    set: setForm,
  } = iniContext<FormContext>({
    constraints: {},
    data: {},
    errors: {},
    message: undefined,
  });

  /** complete update of form context. */
  const updForm = upd((v, newValue) => {
    v.data = newValue.data;
    v.errors = newValue.errors;
    v.constraints = newValue.constraints;
    v.message = newValue.message;
  });

  return {
    getForm,
    iniForm,
    setForm,
    updForm,
  };
};
