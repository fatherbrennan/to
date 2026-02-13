/*
 * WHAT IS THIS FILE?
 *
 * it's the bundle entry point for `bun run preview`.
 * that is, serving your app built in production mode.
 *
 * feel free to modify this file, but don't remove it!
 *
 * learn more about vite's preview command:
 * - https://vitejs.dev/config/preview-options.html#preview-options
 *
 */
import { createQwikCity } from '@builder.io/qwik-city/middleware/bun';
import qwikCityPlan from '@qwik-city-plan';

// make sure qwikCityPlan is imported before entry
import render from './entry.ssr';

/**
 * the default export is the QwikCity adapter used by vite preview.
 */
export default createQwikCity({ qwikCityPlan, render });
