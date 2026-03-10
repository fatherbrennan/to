<script lang="ts">
import type { AttributesOf } from '$lib/types';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingProps = AttributesOf<HTMLHeadingElement> & {
  level: HeadingLevel;
};

let { level, class: rootClass, children, ...props }: HeadingProps = $props();
let _tag = $derived(`h${level}`);
const _baseClass: Record<HeadingLevel, string> = {
  1: 'text-2xl md:text-3xl',
  2: 'text-xl md:text-2xl',
  3: 'text-lg md:text-xl',
  4: 'text-base md:text-lg',
  5: 'text-sm md:text-base',
  6: 'text-xs sm:text-base',
};
</script>

<svelte:element this={tag} {...props} class={cls('font-bold leading-tight', baseClass[level], rootClass)}>
  {@render children?.()}
</svelte:element>
