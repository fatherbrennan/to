import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import tailwindcss from '@tailwindcss/vite';
import { join } from 'node:path';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';

type PkgDep = Record<string, string>;

const { dependencies = {}, devDependencies = {} } = pkg as unknown as {
  dependencies: PkgDep;
  devDependencies: PkgDep;
  [key: string]: unknown;
};
errorOnDuplicatesPkgDeps(devDependencies, dependencies);

/**
 * note that Vite normally starts from `index.html` but the qwikCity plugin makes start at `src/entry.ssr.tsx` instead.
 */

export default defineConfig(({ command, mode }): UserConfig => {
  return {
    // this is for docusaurus.
    // assetsInclude: ['./src/routes/wiki/wiki/**/*.{html,js,css,txt,png,jpg,svg,ico}'],
    base: 'to',
    // this tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // put problematic deps that break bundling here, mostly those with binaries.
      // for example ['better-sqlite3'] if you use that in server functions.
      exclude: [],
    },
    plugins: [qwikCity({ trailingSlash: true }), qwikVite({ lint: false }), tailwindcss(), tsconfigPaths()],
    preview: {
      headers: {
        // do cache the server response in preview (non-adapter production build)
        'Cache-Control': 'public, max-age=600',
      },
      // do not accidentally use port 0 if there is no defined port.
      port: 5173,
    },
    resolve: {
      alias: {
        $app: join(__dirname, 'src'),
      },
    },
    server: {
      headers: {
        // do not cache the server response in dev mode
        'Cache-Control': 'public, max-age=0',
      },
      // do not accidentally use port 0 if there is no defined port.
      port: 5173,
    },
    ssr:
      command === 'build' && mode === 'production'
        ? {
            // anything marked as a dependency will not be bundled.
            // these should only be production binary deps (including deps of deps), CLI deps, and their module graph.
            // if a dep-of-dep needs to be external, add it here
            // for example, if something uses `bcrypt` but you don't have it as a dep, you can write
            // external: [...Object.keys(dependencies), 'bcrypt']
            external: Object.keys(dependencies),
            // all dev dependencies should be bundled in the server build.
            noExternal: Object.keys(devDependencies),
          }
        : undefined,
  };
});

// *** utils ***

/**
 * function to identify duplicate dependencies and throw an error
 * @param {Object} devDependencies - list of development dependencies
 * @param {Object} dependencies - list of production dependencies
 */
function errorOnDuplicatesPkgDeps(devDependencies: PkgDep, dependencies: PkgDep) {
  let msg = '';
  // create an array 'duplicateDeps' by filtering devDependencies.
  // if a dependency also exists in dependencies, it is considered a duplicate.
  const duplicateDeps = Object.keys(devDependencies).filter((dep) => dependencies[dep]);

  // include any known qwik packages
  const qwikPkg = Object.keys(dependencies).filter((value) => /qwik/i.test(value));

  // any errors for missing "qwik-city-plan"
  // [PLUGIN_ERROR]: Invalid module "@qwik-city-plan" is not a valid package
  msg = `Move qwik packages ${qwikPkg.join(', ')} to devDependencies`;

  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }

  // format the error message with the duplicates list.
  // the `join` function is used to represent the elements of the 'duplicateDeps' array as a comma-separated string.
  msg = `
    Warning: The dependency "${duplicateDeps.join(', ')}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;

  // throw an error with the constructed message.
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}
