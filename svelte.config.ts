import adapter from '@sveltejs/adapter-static';
import type { Config } from '@sveltejs/kit';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  compilerOptions: {
    runes: true,
  },
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // if your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // see https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      assets: 'build',
      fallback: undefined,
      pages: 'build',
      precompress: false,
      strict: true,
    }),
    csrf: {
      trustedOrigins: ['https://fatherbrennan.github.io/to'],
    },
    env: {
      dir: __dirname,
    },
    paths: {
      base: '/to',
    }
  },
  // consult https://svelte.dev/docs/kit/integrations.
  // for more information about preprocessors.
  preprocess: vitePreprocess(),
} satisfies Config;
