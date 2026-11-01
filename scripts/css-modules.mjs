import { createHash } from 'node:crypto';
import path from 'node:path';
import postcss from 'postcss';
import modules from 'postcss-modules';
import autoprefixer from 'autoprefixer';

/**
 * Compile module class maps into JS and extract their CSS without injection.
 * @returns {import('rollup').Plugin}
 */
export function cssModules() {
  const stylesheets = new Map();

  return {
    name: 'interactionkit-css-modules',
    async transform(source, id) {
      if (!id.endsWith('.module.css')) return null;
      this.addWatchFile(id);
      let classes;
      const result = await postcss([
        modules({
          generateScopedName(local, filename) {
            const relative = path.relative(process.cwd(), filename).split(path.sep).join('/');
            const hash = createHash('sha256').update(`${relative}:${local}`).digest('hex').slice(0, 7);
            return `ik_${path.basename(path.dirname(filename))}_${local}_${hash}`;
          },
          getJSON(_filename, json) { classes = json; },
        }),
        autoprefixer(),
      ]).process(source, { from: id, map: false });
      stylesheets.set(id, result.css);
      return { code: `export default ${JSON.stringify(classes)};`, map: { version: 3, sources: [], names: [], mappings: '' } };
    },
    generateBundle() {
      const css = [...stylesheets]
        .filter(([id]) => this.getModuleInfo(id)?.isIncluded)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, source]) => source)
        .join('\n');
      this.emitFile({ type: 'asset', fileName: 'styles.css', source: css });
    },
  };
}
