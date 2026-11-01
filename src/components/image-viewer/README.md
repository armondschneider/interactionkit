# ImageViewer

A framework-independent React image viewer. Import the package stylesheet once in your app; no Tailwind installation is needed.

```tsx
import "intkit/styles.css";
import { ImageViewer } from "intkit";

<ImageViewer
  src="/photos/coast.jpg"
  thumbnailSrc="/photos/coast-small.jpg"
  alt="A quiet coastline"
  caption="An afternoon by the sea"
/>
```

## API

| Prop | Purpose |
| --- | --- |
| `src`, `alt` | Required full-size image URL and descriptive alternative text. |
| `thumbnailSrc` | Optional smaller source for the thumbnail. Defaults to `src`. |
| `caption` | Optional React content below the expanded image. Keep it short and non-interactive. |
| `open`, `onOpenChange` | Controlled visibility. The parent must apply requested changes. |
| `defaultOpen` | Initial visibility in uncontrolled mode. Defaults to `false`. |
| `className` | Classes on the thumbnail button. |
| `imageClassName` | Classes on the thumbnail image. |
| `contentClassName` | Classes on the expanded image frame. |
| `openLabel`, `closeLabel` | Optional localized accessible button labels. |
| `loading` | Thumbnail loading: `lazy` (default) or `eager`. |

The component uses the browser's native modal dialog for background inertness and focus containment. Escape, the close button, the backdrop, and a deliberate drag dismiss the image. A short drag springs back. Focus and body scroll styles are restored after dismissal. Each instance has its own identity, including when the same source appears more than once.

The image remains fully visible rather than being cropped in the expanded state. Reduced-motion preferences disable the expansion and fading animations. Direct pointer dragging remains available.

Use `.dark` on an ancestor for dark mode. Styles live in a colocated CSS Module, compiled to scoped class names in the single package stylesheet. There is no global reset, and consumers do not need CSS Modules support. The component does not import Next.js or the website/demo code.

Use the class hooks or inherited CSS variables to customize appearance: `--ik-image-radius`, `--ik-image-background`, `--ik-image-backdrop`, `--ik-image-shadow`, `--ik-focus-color`, and `--ik-font-family`. All have defaults and work without the website's theme variables.
