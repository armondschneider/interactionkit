import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const expected = [
  'ImageViewer',
  'Sheet',
  'Button',
].sort();

for (const filename of ['index.js', 'index.cjs']) {
  const source = readFileSync(new URL(`../dist/${filename}`, import.meta.url), 'utf8');
  assert.ok(source.startsWith('"use client";'), `${filename} must preserve the client boundary`);
  assert.doesNotMatch(source, /react-jsx-runtime\.(?:production|development)|react\.production/);
  assert.doesNotMatch(source, /next\/image|next\/link|src\/(?:examples|archive|site)\//);
  assert.doesNotMatch(source, /(?:import\s.*|require\([^)]*)\.css/);
}

const esm = await import('../dist/index.js');
const cjs = require('../dist/index.cjs');
assert.deepEqual(Object.keys(esm).sort(), expected, 'ESM exports must match the public API');
assert.deepEqual(Object.keys(cjs).sort(), expected, 'CommonJS exports must match the public API');
const styles = readFileSync(new URL('../dist/styles.css', import.meta.url), 'utf8');
for (const component of ['button', 'sheet', 'image-viewer', 'internal']) {
  assert.ok(styles.includes(`.ik_${component}_`), `Package styles must include scoped ${component} CSS`);
}
assert.doesNotMatch(styles, /box-sizing:border-box;border:0 solid/);
assert.doesNotMatch(styles, /:root|@tailwind|--tw-/);
const manifest = require('../dist/package.json');
assert.equal(manifest.publishConfig.access, 'public');
assert.equal(manifest.publishConfig.registry, 'https://registry.npmjs.org/');
assert.equal(manifest.exports['./styles.css'], './styles.css');
assert.match(readFileSync(new URL('../dist/LICENSE', import.meta.url), 'utf8'), /MIT License/);
console.log('Package checks passed: ESM, CommonJS, public exports, client boundary, and external React runtime.');
