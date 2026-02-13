import type { AttributesOf } from '$app/types';
import { cls } from '$app/utils/cls/index';
import type { Component } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = AttributesOf<HTMLHeadingElement> & {
  level: HeadingLevel;
};

export const Heading = component$<HeadingProps>(({ level, class: rootClass, ...props }) => {
  const HeadingTag = `h${level}` as unknown as Component<AttributesOf<HTMLHeadingElement>>;
  const baseClass: { [headingLevel in HeadingLevel]: string } = {
    1: 'text-2xl md:text-3xl',
    2: 'text-xl md:text-2xl',
    3: 'text-lg md:text-xl',
    4: 'text-base md:text-lg',
    5: 'text-sm md:text-base',
    6: 'text-xs sm:text-base',
  };

  return (
    <HeadingTag {...props} class={cls('font-bold italic leading-tight', baseClass[level], rootClass)}>
      <Slot />
    </HeadingTag>
  );
});
