import { sveltekit } from '@sveltejs/kit/vite';
import tailwindCss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        external: ['bun'],
      },
    },
    plugins: [sveltekit(), tailwindCss()],
    server: {
      hmr: {
        host: '[::1]',
      },
      host: true,
    },
  };
});
