import {
  META_OG_IMAGE_ALT,
  META_OG_IMAGE_HEIGHT,
  META_OG_IMAGE_TYPE,
  META_OG_IMAGE_WIDTH,
  META_URL_OG_IMAGE,
  OpenGraph,
} from '$app/constants';
import { openGraphMeta } from '$app/utils/url';
import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

/** this component is placed inside of the document `<head>` element. */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const location = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link href={location.url.href} rel='canonical' />
      {[
        openGraphMeta(OpenGraph.Url, location.url.href),
        openGraphMeta(OpenGraph.Type, 'website'),
        openGraphMeta(OpenGraph.Image, META_URL_OG_IMAGE),
        openGraphMeta(OpenGraph.ImageAlt, META_OG_IMAGE_ALT),
        openGraphMeta(OpenGraph.ImageType, META_OG_IMAGE_TYPE),
        openGraphMeta(OpenGraph.ImageWidth, META_OG_IMAGE_WIDTH.toString()),
        openGraphMeta(OpenGraph.ImageHeight, META_OG_IMAGE_HEIGHT.toString()),
      ].map((m) => (
        <meta key={m.property} {...m} />
      ))}

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}
    </>
  );
});
