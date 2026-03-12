import tailwindCssForms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./**/*.{ts,svelte}'],
  plugins: [tailwindCssForms({ strategy: 'base' })],
} satisfies Config;
