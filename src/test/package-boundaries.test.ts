import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const components = path.join(root, "src/components");

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(file);
    return /\.tsx?$/.test(entry.name) && !entry.name.includes(".test.") ? [file] : [];
  });
}

describe("package boundaries", () => {
  it("keeps package source independent of examples, website UI, and framework/server APIs", () => {
    const files = [...sourceFiles(components), path.join(root, "src/index.ts")];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      const imports = source.matchAll(/(?:from\s*|import\s*\(\s*|require\s*\(\s*|import\s*)["']([^"']+)["']/g);
      for (const [, specifier] of imports) {
        expect(specifier, `${path.relative(root, file)} imports ${specifier}`).not.toMatch(/^(?:next(?:\/|$)|node:|fs(?:\/|$)|path$|@\/(?:app|src\/(?:examples|archive|site)))/);
        if (specifier.startsWith(".")) {
          const target = path.resolve(path.dirname(file), specifier);
          expect(target.startsWith(`${components}${path.sep}`), `${path.relative(root, file)} imports outside package components: ${specifier}`).toBe(true);
        }
      }
    }
  });

  it("limits library compilation to package source", () => {
    const config = JSON.parse(readFileSync(path.join(root, "tsconfig.lib.json"), "utf8"));
    expect(config.include).toEqual(["src/components/**/*", "src/index.ts"]);
    expect(config.exclude).toEqual(expect.arrayContaining(["app", "src/examples", "src/site", "src/test"]));
  });
});
