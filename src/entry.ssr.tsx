/**
 * WHAT IS THIS FILE?
 *
 * ssr entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - server (express, cloudflare...)
 * - `bun run start`
 * - `bun run preview`
 * - `bun run build`
 *
 */

import type { RenderToStreamOptions } from '@builder.io/qwik/server';
import { renderToStream } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import { Root } from './root';

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    // use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: 'en-AU',
      ...opts.containerAttributes,
    },
    serverData: {
      ...opts.serverData,
    },
  });
}
