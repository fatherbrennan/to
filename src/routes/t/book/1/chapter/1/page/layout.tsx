import { PageTouchNav } from '$app/components';
import { component$, Slot } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const { url } = useLocation();

  return (
    <PageTouchNav url={url}>
      <Slot />
    </PageTouchNav>
  );
});
