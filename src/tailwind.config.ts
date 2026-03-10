import tailwindCssForms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./**/*.{ts,tsx}'],
  plugins: [tailwindCssForms({ strategy: 'base' })],
} satisfies Config;
