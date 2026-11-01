import path from "node:path";
import { rollup } from "rollup";
import { describe, expect, it } from "vitest";
import { cssModules } from "../../scripts/css-modules.mjs";

describe("package CSS Module extraction", () => {
  async function build(format: "es" | "cjs") {
    const button = path.resolve("src/components/button/styles.module.css");
    const sheet = path.resolve("src/components/sheet/styles.module.css");
    const bundle = await rollup({
      input: "virtual:styles-test",
      plugins: [
        {
          name: "test-entry",
          resolveId(id) { if (id === "virtual:styles-test") return id; },
          load(id) {
            if (id === "virtual:styles-test") return `import button from ${JSON.stringify(button)}; import sheet from ${JSON.stringify(sheet)}; export { button, sheet };`;
          },
        },
        cssModules(),
      ],
    });
    try { return (await bundle.generate({ format })).output; }
    finally { await bundle.close(); }
  }

  it("compiles class maps into JS and extracts a single stylesheet without runtime injection", async () => {
    const output = await build("es");
    const css = output.filter((item) => item.type === "asset");
    expect(css).toHaveLength(1);
    expect(css[0].fileName).toBe("styles.css");
    const styles = String(css[0].source);
    expect(styles).toMatch(/\.ik_button_button_[a-f0-9]{7}/);
    expect(styles).toMatch(/\.ik_sheet_content_[a-f0-9]{7}/);
    expect(styles).toContain("--ik-button-radius");
    expect(styles).not.toMatch(/:root|--tw-|@tailwind/);
    const js = output.find((item) => item.type === "chunk")!;
    expect(js.code).not.toMatch(/document\.|styleInject|import .*\.css/);
    const className = js.code.match(/ik_button_button_[a-f0-9]{7}/)?.[0];
    expect(className).toBeTruthy();
    expect(styles).toContain(`.${className}`);
  });

  it("emits matching CSS identities for ESM and CommonJS builds", async () => {
    const esm = await build("es");
    const cjs = await build("cjs");
    const getCss = (output: typeof esm) => output.find((item) => item.type === "asset")!.source;
    expect(getCss(esm)).toBe(getCss(cjs));
  });
});
