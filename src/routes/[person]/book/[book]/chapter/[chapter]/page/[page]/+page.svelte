<script lang="ts">
  import { asset } from '$app/paths';
  import { PageTouchNav } from '$lib/components';
  const { data } = $props();
  const content = $derived(data.content);
</script>

<PageTouchNav {content}>
  {#if content.personName === 'h'}
    {#if content.bookNumber === 2 && content.chapterNumber === 1 && content.pageNumber === 1}
      <div class="size-full flex">
        <img src={asset('/assets/leonardo-dicaprio-dm.png')} alt="dm from leonardo dicaprio" class="w-full h-auto object-contain" />
      </div>
    {/if}
  {/if}
</PageTouchNav>
