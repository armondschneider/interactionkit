# ViewTransition

An expandable, non-modal surface with a persistent trigger. It is a disclosure, not a modal, menu, browser View Transitions API wrapper, or the blog's draggable image-card prototype.

```tsx
import "useintkit/styles.css";
import { ViewTransition } from "useintkit";

<ViewTransition
  trigger="Quick actions"
  size="md"
  spring={{ stiffness: 700, damping: 48, mass: 0.8 }}
  contentDelay={0.06}
>
  {({ close }) => <button type="button" onClick={close}>Done</button>}
</ViewTransition>
```

The trigger is rendered inside a native button; don't put another interactive element inside it. Supply `triggerLabel` for an icon-only trigger. Children remain mounted while closed, but are hidden from assistive technology and made inert. `close` requests closure; controlled consumers must update `open` in `onOpenChange`.

The closed surface sizes to its trigger by default. The `size` preset sets the expanded width: `sm` is 200px, `md` (the default) is 240px, and `lg` is 320px. Width is capped by the containing block. Set `closedWidth` to override the trigger width, or `openWidth` to override the preset; both take pixel values. Avoid putting interactive elements inside the trigger.

Height follows the content up to the default maximum of `min(320px, 50vh)`, after which the content scrolls. A scrollable content region is keyboard-focusable. Override the limit with `--ik-view-transition-max-height`. If you place an overlay inside the surface, note that the content and surface clip overflow.

Use `open` and `onOpenChange` for controlled state, or `defaultOpen` for uncontrolled state. Set `closeOnOutsideClick={false}` to disable outside-pointer dismissal. Escape closes when focus is inside. Focus returns to the trigger if closure would otherwise leave it inside hidden content. Reduced-motion settings disable the spatial animation.

The content is ordinary disclosure content: Tab navigation works normally. If you build a true application menu or modal, you must supply its appropriate keyboard, focus, and dismissal behavior; use `Sheet` for a modal. The component doesn't position itself over other content or provide collision handling.

Customize with `className`, `triggerClassName`, `contentClassName`, and CSS variables:

```css
.my-surface {
  --ik-view-transition-radius: 16px;
  --ik-view-transition-padding: 12px;
  --ik-view-transition-max-height: 400px;
  --ik-view-transition-background: #fff;
  --ik-view-transition-color: #262626;
  --ik-view-transition-border: rgb(0 0 0 / 10%);
  --ik-view-transition-divider: rgb(0 0 0 / 6%);
  --ik-view-transition-shadow: 0 4px 12px rgb(0 0 0 / 8%);
}
```

The package supplies defaults for light and `.dark` themes. Custom colors should provide appropriate values for both themes.
