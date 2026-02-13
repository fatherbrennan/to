/*
 * WHAT IS THIS FILE?
 *
 * it is the entry point for the Bun HTTP server when building for production.
 *
 * learn more about the Bun integration here:
 * - https://qwik.dev/docs/deployments/bun/
 * - https://bun.sh/docs/api/http
 *
 */
import { createQwikCity } from '@builder.io/qwik-city/middleware/bun';
import qwikCityPlan from '@qwik-city-plan';
import { manifest } from '@qwik-client-manifest';
import render from './entry.ssr';

// create the Qwik City Bun middleware.
const { router, notFound, staticFile } = createQwikCity({
  manifest,
  qwikCityPlan,
  render,
});

Bun.serve({
  async fetch(request: Request) {
    const staticResponse = await staticFile(request);
    if (staticResponse) {
      return staticResponse;
    }

    // server-side render this request with Qwik City.
    const qwikCityResponse = await router(request);
    if (qwikCityResponse) {
      return qwikCityResponse;
    }

    // path not found.
    return notFound(request);
  },
  port: 5173,
});
