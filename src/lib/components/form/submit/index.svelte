<script lang="ts">
import type { HTMLButtonAttributes } from 'svelte/elements';

type SubmitProps = HTMLButtonAttributes;
let { children, ...props }: SubmitProps = $props();
</script>

<button type="submit" {...props}>
  {@render children?.()}
</button>
