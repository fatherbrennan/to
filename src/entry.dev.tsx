/*
 * WHAT IS THIS FILE?
 *
 * development entry point using only client-side modules:
 * - do not use this mode in production!
 * - no ssr
 * - no portion of the application is pre-rendered on the server.
 * - all of the application is running eagerly in the browser.
 * - more code is transferred to the browser than in ssr mode.
 * - optimizer/serialization/deserialization code is not exercised!
 */

import type { RenderOptions } from '@builder.io/qwik';
import { render } from '@builder.io/qwik';
import { Root } from './root';

export default function (opts: RenderOptions) {
  return render(document, <Root />, opts);
}
