import { defineConfig } from "vitest/config";

export default defineConfig({
  // Next.js sets `jsx: "preserve"` in tsconfig.json, so instruct esbuild directly
  esbuild: { jsx: "automatic" },
  // Package CSS is plain CSS Modules, independent of Next's Tailwind PostCSS config.
  css: { postcss: { plugins: [] } },
  test: {
    environment: "jsdom",
    // pretendToBeVisual gives jsdom a requestAnimationFrame clock, which
    // framer-motion's animation loop needs to finish AnimatePresence exits
    environmentOptions: { jsdom: { pretendToBeVisual: true } },
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "app/**/*.test.{ts,tsx}"],
    css: { include: [/\.module\.css$/] },
  },
});
