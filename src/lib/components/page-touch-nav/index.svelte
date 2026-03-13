<script lang="ts">
  import type { NonNullableObject } from '$lib/types';
  import { cls } from '$lib/utils/cls';
  import type { GetContent } from '$lib/utils/url';
  import type { Snippet } from 'svelte';

  const { content, children }: { content: GetContent; children?: Snippet } = $props();

  const isValidContent = (c: GetContent): c is NonNullableObject<GetContent> => {
    return (
      c.bookIndex !== null ||
      c.bookNumber !== null ||
      c.chapterIndex !== null ||
      c.chapterNumber !== null ||
      c.pageIndex !== null ||
      c.pageNumber !== null ||
      c.personName !== null ||
      c.personContent !== null
    );
  };

  const prev = () => {
    if (isValidContent(content) === false) {
      return;
    }

    const isFirstBook = content.bookIndex === 0;
    const isFirstChapter = content.chapterIndex === 0;
    const isFirstPage = content.pageIndex === 0;

    // very first in rotation.
    if (isFirstPage && isFirstChapter && isFirstBook) {
      return;
    }

    // same book, same chapter, previous page.
    if (!isFirstPage) {
      return `/to/${content.personName}/book/${content.bookNumber}/chapter/${content.chapterNumber}/page/${content.pageNumber - 1}`;
    }

    // same book, previous chapter, last page.
    if (isFirstPage && !isFirstChapter) {
      const prevChapterNumber = content.chapterNumber - 1;
      const prevChapterIndex = content.chapterIndex - 1;
      const prevChapter = content.personContent.books[content.bookIndex].chapters[prevChapterIndex];
      const lastPageNumberInPrevChapter = prevChapter.pages.length;
      return `/to/${content.personName}/book/${content.bookNumber}/chapter/${prevChapterNumber}/page/${lastPageNumberInPrevChapter}`;
    }

    // previous book, last chapter, last page.
    if (isFirstPage && isFirstChapter && !isFirstBook) {
      const prevBookNumber = content.bookNumber - 1;
      const prevBookIndex = content.bookIndex - 1;
      const prevBook = content.personContent.books[prevBookIndex];
      const lastChapterNumberInPrevBook = prevBook.chapters.length;
      const lastChapterIndexInPrevBook = lastChapterNumberInPrevBook - 1;
      const lastChapterInPrevBook = prevBook.chapters[lastChapterIndexInPrevBook];
      const lastPageNumberInLastChapterInPrevBook = lastChapterInPrevBook.pages.length;
      return `/to/${content.personName}/book/${prevBookNumber}/chapter/${lastChapterNumberInPrevBook}/page/${lastPageNumberInLastChapterInPrevBook}`;
    }
  };

  const next = () => {
    if (isValidContent(content) === false) {
      return;
    }

    const books = content.personContent.books;
    const chapters = books[content.bookIndex].chapters;
    const isLastBook = content.bookIndex === books.length - 1;
    const isLastChapter = content.chapterIndex === chapters.length - 1;
    const isLastPage = content.pageIndex === chapters[content.chapterIndex].pages.length - 1;

    // very last in rotation.
    if (isLastPage && isLastChapter && isLastBook) {
      return;
    }

    // same book, same chapter, next page.
    if (!isLastPage) {
      return `/to/${content.personName}/book/${content.bookNumber}/chapter/${content.chapterNumber}/page/${content.pageNumber + 1}`;
    }

    // same book, next chapter, first page.
    if (isLastPage && !isLastChapter) {
      const nextChapterNumber = content.chapterNumber + 1;
      return `/to/${content.personName}/book/${content.bookNumber}/chapter/${nextChapterNumber}/page/${1}`;
    }

    // next book, first chapter, first page.
    if (isLastPage && isLastChapter && !isLastBook) {
      const nextBookNumber = content.bookNumber + 1;
      return `/to/${content.personName}/book/${nextBookNumber}/chapter/${1}/page/${1}`;
    }
  };

  const nextHref = $derived(next());
  const prevHref = $derived(prev());
</script>

<div class="flex flex-col size-full relative">
  <div class="flex flex-row absolute size-full justify-between z-10 pointer-events-none">
    <a class={cls('left-0 top-0 w-25', prevHref !== undefined ? 'pointer-events-auto' : 'pointer-events-none')} href={prevHref} title="previous"></a>
    <a class={cls('right-0 top-0 w-25', nextHref !== undefined ? 'pointer-events-auto' : 'pointer-events-none')} href={nextHref} title="next"></a>
  </div>

  {#if isValidContent(content)}
    {@const c = content}
    {@const book = c.personContent.books[c.bookIndex]}
    {@const chapter = book.chapters[c.chapterIndex]}
    {@const page = chapter.pages[c.pageIndex]}

    <div class="absolute top-0 left-0 w-full">
      <div class="p-2 text-sm sm:text-lg">
        <p>
          &gt; to <strong>{content.personName}</strong>
        </p>
        <p>&gt; {book.title}</p>
        <p>&gt; {chapter.title}</p>
        <p>&gt; {page.title}</p>
      </div>
    </div>

    <div class="size-full flex flex-col gap-2 p-2">
      <div class="bg-[#d9e7d3] mx-auto my-auto p-6 w-9/12 h-8/12 flex flex-col gap-2 rounded shadow-xs text-sm sm:text-base sm:p-8">
        {@render children?.()}

        {#each page.content as contentItem, contentItemIndex}
          <div>
            <p>
              {contentItem}{#if page.content.length === contentItemIndex + 1}<span class="animate-[blink_1s_steps(1)_infinite]">&#x0332;</span>{/if}
            </p>
          </div>
        {/each}
      </div>
    </div>

    <div class="flex flex-col w-full gap-y-2 px-2 pb-2">
      <div class="flex flex-row flex-nowrap gap-x-2">
        {#each Array(chapter.pages.length) as _, pageIndex}
          <span class={cls('h-0.5 grow', pageIndex === c.pageIndex ? 'bg-[#d9e7d3]' : 'bg-[#a2ba86]')}></span>
        {/each}
      </div>
      <div class="flex flex-row flex-nowrap gap-x-2">
        {#each Array(book.chapters.length) as _, chapterIndex}
          <span class={cls('h-0.5 grow', chapterIndex === c.chapterIndex ? 'bg-[#d9e7d3]' : 'bg-[#a2ba86]')}></span>
        {/each}
      </div>
      <div class="flex flex-row flex-nowrap gap-x-2">
        {#each Array(content.personContent.books.length) as _, bookIndex}
          <span class={cls('h-0.5 grow', bookIndex === content.bookIndex ? 'bg-[#d9e7d3]' : 'bg-[#a2ba86]')}></span>
        {/each}
      </div>
    </div>
  {/if}
</div>

<!-- color: #4f6b3c -->
<!-- color: #a2ba86 -->
<!-- color: #d9e7d3 -->
<!-- color: #2f2f2f -->
