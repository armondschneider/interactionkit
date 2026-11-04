# Sheet

A modal bottom sheet for settings, forms, and focused actions. The package stylesheet works without a consumer Tailwind installation.

```tsx
import "useintkit/styles.css";
import { Sheet } from "useintkit";

<Sheet trigger="Open preferences" title="Preferences" description="Make it your own.">
  {/* Your controls or form */}
</Sheet>
```

## API

| Prop | Purpose |
| --- | --- |
| `title` | Required, meaningful accessible title. |
| `description` | Optional text describing the sheet. |
| `children`, `footer` | Scrollable body content and a separate, fixed footer. |
| `trigger` | Button content; defaults to `Open sheet`. Pass `null` for an external controlled opener. Do not nest another button inside it. |
| `triggerLabel`, `closeLabel` | Accessible labels for custom/icon triggers and the close action. |
| `open`, `onOpenChange` | Controlled visibility. The parent must apply requested changes. |
| `defaultOpen` | Initial uncontrolled visibility. Defaults to `false`. |
| `dismissible` | Whether Escape, backdrop presses, and dragging can dismiss. Defaults to `true`; the explicit close button always works. |
| `draggable` | Enables dragging from the handle only. Defaults to `true`. |
| `initialFocusRef` | Optional focus target inside the sheet. Defaults to the close button. |
| `className`, `triggerClassName`, `bodyClassName` | Styling hooks for the panel, trigger, and scrollable body. |

The native modal dialog makes the background inert and contains keyboard focus. Focus returns to the opener after exit, and scroll locking stays active throughout dismissal. ImageViewer and Sheet share the same modal lifecycle and reference-counted scroll locking.

Only the handle starts a drag: scrolling, text selection, inputs, and footer actions do not move the sheet. Short drags spring back; deliberate downward drags and flicks dismiss. `prefers-reduced-motion` disables the slide/fade transitions. Use `.dark` on an ancestor for dark styles. The footer remains visible when content overflows, and the panel accommodates the device's bottom safe area.

Use controlled state for save/cancel actions or to reject dismissal while an operation is pending. Keep the title and primary controls concise on small screens.

The borderless panel has 24px rounded corners on all sides, a 16px viewport inset, and 16px of extra bottom padding plus the device safe area. Entrance and exit combine the slide with a subtle blur and fade; reduced-motion preferences disable the effect.

The colocated CSS Module is compiled into the single package stylesheet. Customize through the class hooks or inherited variables such as `--ik-sheet-width`, `--ik-sheet-radius`, `--ik-sheet-background`, `--ik-sheet-color`, `--ik-sheet-body-color`, `--ik-sheet-muted-color`, `--ik-sheet-backdrop`, and `--ik-sheet-shadow`. Shared defaults can be overridden with `--ik-font-family` and `--ik-focus-color`.
