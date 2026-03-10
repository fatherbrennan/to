import { createContext } from 'svelte';

type IniContextUpdFnParam<T> = (value: T, newValue: T) => void;
type IniContextUpdFnReturn<T> = <U extends T>(newValue: U) => void;
type IniContextUpdFn<T> = (fn: IniContextUpdFnParam<T>) => IniContextUpdFnReturn<T>;

export const iniContext = <T>(iniValue: T) => {
  const [getAuthContext, setAuthContext] = createContext<T>();
  const get = () => getAuthContext();
  const set = setAuthContext;
  const ini = () => iniValue satisfies T;
  const upd: IniContextUpdFn<T> = (fn) => {
    return (newValue) => {
      const v = get();
      fn(v, newValue);
      set(v);
    };
  };

  return {
    /** get the current value. */
    get,
    /** initial value. is a function to avoid potential reference issues. */
    ini,
    /** set the current value. */
    set,
    /** update function with access to previous value. */
    upd,
  };
};
