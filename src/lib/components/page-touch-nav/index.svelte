<script lang="ts">
  import { getApp, setApp } from '$lib/contexts/app';
  import { cls } from '$lib/utils/cls';
  import { getContent, withTrailingSlash } from '$lib/utils/url';
  import type { Snippet } from 'svelte';

  let { url, children }: { url: URL; children?: Snippet } = $props();
  let content = $derived(getContent(url));

  $effect(() => {
    if (content) {
      const app = getApp();
      app.content = structuredClone(content);
      setApp(app);
    }
  });
</script>

<div class="flex flex-col size-full relative">
  {#if content.pageNumber !== null && content.pageIndex !== null && content.pages}
    <div class="flex flex-row absolute size-full justify-between z-10 pointer-events-none">
      <a
        class={cls('left-0 top-0 w-25', content.pageIndex > 0 && content.pageNumber <= content.pages.length ? 'pointer-events-auto' : 'pointer-events-none')}
        href={withTrailingSlash(`/to/${content.personName}/book/${content.bookNumber}/chapter/${content.chapterNumber}/page/${content.pageNumber - 1}`)}
        title="previous"
      ></a>
      <a
        class={cls('right-0 top-0 w-25', content.pageIndex >= 0 && content.pageNumber < content.pages.length ? 'pointer-events-auto' : 'pointer-events-none')}
        href={withTrailingSlash(`/to/${content.personName}/book/${content.bookNumber}/chapter/${content.chapterNumber}/page/${content.pageNumber + 1}`)}
        title="next"
      ></a>
    </div>
  {/if}

  <div class="absolute top-0 left-0 w-full">
    <div class="p-2 text-sm sm:text-lg">
      <p>
        &gt; to <strong>{content.personName}</strong>
      </p>
      <p>&gt; {content.book?.title || `book ${content.bookNumber}`}</p>
      <p>&gt; {content.chapter?.title || `chapter ${content.chapterNumber}`}</p>
      <p>&gt; {content.page?.title || `page ${content.pageNumber}`}</p>
    </div>
  </div>

  <div class="size-full flex flex-col gap-2 p-2 pt-footer">
    <div class="bg-[#d9e7d3] mx-auto my-auto p-8 w-9/12 h-8/12 flex flex-col gap-2 justify-center items-center rounded shadow-xs text-center text-sm sm:text-base">
      {@render children?.()}

      {#each content.page?.content || [] as contentItem}
        <p>{contentItem}</p>
      {/each}
    </div>
  </div>
</div>
