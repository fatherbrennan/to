<script lang="ts">
  import { cls } from '$lib/utils/cls';

  const { count, active }: { count: number; active: number } = $props();
</script>

<div class="flex flex-row flex-nowrap gap-x-2">
  {#each Array(count) as _, i}
    <span class={cls('h-0.5 grow rounded sm:h-1', i === active ? 'bg-[#d9e7d3]' : 'bg-[#a2ba86]')}></span>
  {/each}
</div>
