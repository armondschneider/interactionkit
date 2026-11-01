# Examples

Only the current Button, ImageViewer, and Sheet package examples live here. Original interaction studies and archive page helpers live in `app/_components`.

- These files may depend on Next.js, website assets, and example-specific data.
- The homepage uses `image/ImageGridModal.tsx` as an example grid built with the package's ImageViewer. The grid itself is not a package export.
- `button/ButtonExample.tsx` and `sheet/SheetExample.tsx` demonstrate the package components without duplicating their implementations.
- Examples may import package components from `src/components`; package components must not import examples.

When promoting a prototype, implement and test the reusable API in `src/components`, then explicitly export it from `src/index.ts`.
