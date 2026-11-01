import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';
import { cssModules } from './scripts/css-modules.mjs';

const packageJson = JSON.parse(readFileSync('./lib-package.json', 'utf8'));
const dependencies = [
  ...Object.keys(packageJson.peerDependencies ?? {}),
  ...Object.keys(packageJson.dependencies ?? {}),
];
const external = (id) => dependencies.some((name) => id === name || id.startsWith(`${name}/`));

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
        banner: '"use client";',
      },
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
        banner: '"use client";',
      },
    ],
    plugins: [
      cssModules(),
      typescript({
        tsconfig: './tsconfig.lib.json',
        outputToFilesystem: true,
      }),
    ],
    external,
    onwarn(warning, warn) {
      // All public exports are client components; the output banner preserves
      // that boundary after Rollup removes individual module directives.
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) return;
      warn(warning);
    },
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external,
  },
];
