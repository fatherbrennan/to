/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [require('@tailwindcss/forms')({ strategy: 'base' })],
};
