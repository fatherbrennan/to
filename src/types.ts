import type { QwikAttributes, PropsOf as QwikPropsOf } from '@builder.io/qwik';

// extend global types.
declare global {
  interface Window {}
}

export type ClassList = string | undefined | null | false;
export type PropsOf<T> = Omit<QwikPropsOf<T>, 'class'> & { class?: ClassList };
export type AttributesOf<T extends Element> = Omit<QwikAttributes<T>, 'class'> & { class?: ClassList };
