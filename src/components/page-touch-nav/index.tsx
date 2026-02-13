import { useApp } from '$app/hooks/use-app';
import { cls } from '$app/utils/cls';
import { getContent, withTrailingSlash } from '$app/utils/url';
import { component$, Slot, useTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

type TouchNavProps = {
  url: URL;
};

export const PageTouchNav = component$<TouchNavProps>(({ url }) => {
  const app = useApp();
  const content = getContent(url);

  useTask$(({ track }) => {
    track(() => url);
    app.content = structuredClone(content);
  });

  return (
    <div class='flex flex-col size-full relative'>
      {content.pageNumber !== null && content.pageIndex !== null && content.pages && (
        <div class='flex flex-row absolute size-full justify-between z-10 pointer-events-none'>
          <Link
            class={cls(
              'left-0 top-0 w-25',
              content.pageIndex > 0 && content.pageNumber <= content.pages.length
                ? 'pointer-events-auto'
                : 'pointer-events-none',
            )}
            href={withTrailingSlash(
              `/to/${content.personName}/book/${content.bookNumber}/chapter/${content.chapterNumber}/page/${content.pageNumber - 1}`,
            )}
            title='previous'
          ></Link>
          <Link
            class={cls(
              'right-0 top-0 w-25',
              content.pageIndex >= 0 && content.pageNumber < content.pages.length
                ? 'pointer-events-auto'
                : 'pointer-events-none',
            )}
            href={withTrailingSlash(
              `/to/${content.personName}/book/${content.bookNumber}/chapter/${content.chapterNumber}/page/${content.pageNumber + 1}`,
            )}
            title='next'
          ></Link>
        </div>
      )}

      <div class='absolute top-0 left-0 w-full'>
        <div class='p-2 text-sm sm:text-lg'>
          <p>
            &gt; to <strong>{content.personName}</strong>
          </p>
          <p>&gt; {content.book?.title || `book ${content.bookNumber}`}</p>
          <p>&gt; {content.chapter?.title || `chapter ${content.chapterNumber}`}</p>
          <p>&gt; {content.page?.title || `page ${content.pageNumber}`}</p>
        </div>
      </div>

      <div class='size-full flex flex-col gap-2 p-2 pt-footer'>
        <div class='bg-[#d9e7d3] mx-auto my-auto p-8 w-9/12 h-8/12 flex flex-col gap-2 justify-center items-center rounded shadow-xs text-sm sm:text-base'>
          <Slot />

          {content.page?.content.map((content, index) => {
            return <p key={index}>{content}</p>;
          })}
        </div>
      </div>
    </div>
  );
});
