<script lang="ts">
  import type { NonNullableObject } from '$lib/types';
  import { cls } from '$lib/utils/cls';
  import type { GetContent } from '$lib/utils/url';
  import type { Snippet } from 'svelte';
  import { ProgressBar } from '..';

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

    <div class="flex flex-col flex-nowrap grow gap-y-8 size-full p-2">
      <div class="flex">
        <table class="text-xs [&_th]:text-left [&_th]:font-normal [&_th]:pr-2">
          <tbody>
            <tr>
              <th>[to]</th>
              <td><strong>{content.personName}</strong></td>
            </tr>
            <tr>
              <th>[book]</th>
              <td><strong>{book.title || content.bookNumber}</strong></td>
            </tr>
            <tr>
              <th>[chapter]</th>
              <td><strong>{chapter.title || content.chapterNumber}</strong></td>
            </tr>
            <tr>
              <th>[page]</th>
              <td><strong>{page.title || content.pageNumber}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex grow overflow-auto">
        <div class="size-full p-2">
          <div class="flex flex-col flex-nowrap gap-y-4 mx-auto bg-[#d9e7d3] rounded-2xl p-4 text-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl 2xl:max-w-7xl">
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
      </div>

      <div class="flex justify-center">
        <div class="flex flex-col flex-nowrap w-full gap-y-2 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12">
          <ProgressBar count={chapter.pages.length} active={c.pageIndex} />
          <ProgressBar count={book.chapters.length} active={c.chapterIndex} />
          <ProgressBar count={c.personContent.books.length} active={c.bookIndex} />
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- color: #4f6b3c -->
<!-- color: #a2ba86 -->
<!-- color: #d9e7d3 -->
<!-- color: #2f2f2f -->
<!-- bg-[#d9e7d3] rounded-2xl -->
