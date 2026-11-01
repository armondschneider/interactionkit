# Button

A quiet primary button: white in light mode, near-black in dark mode, with a 9px radius, a defined neutral border, layered shadows, and subtle spring press feedback.

```tsx
import "intkit/styles.css";
import { Button } from "intkit";

<Button onClick={handleContinue}>Continue</Button>
<Button type="submit" loading={saving}>Save changes</Button>
<Button disabled>Unavailable</Button>
```

## API

| Prop | Purpose |
| --- | --- |
| `children` | Label and optional decorative icons. |
| `size` | `sm` (32px minimum), `md` (default, 36px minimum), or `icon` (36px square). |
| `loading` | Shows a spinner and “Loading” text (spinner only for icon size), retaining the original label's space and keyboard focus. Prevents activation and form submission. |
| `disabled` | Native disabled behavior. |
| `type` | Defaults to `button`. Set `submit` explicitly for forms. |
| `className` | Additional classes on the button. |
| `ref` | Forwarded to the native button. |

Native button attributes and Motion button props are forwarded. Explicit `aria-disabled=true` also prevents activation. Loading uses `aria-busy` and `aria-disabled` rather than removing the focused control from keyboard navigation. The original label remains its accessible name.

Use `aria-label` for icon-only buttons, and hide decorative icons with `aria-hidden`. Icons can be passed as children without another wrapper. Use a link, not Button, for navigation.

Import the package stylesheet once; no consumer Tailwind setup is needed. Add `.dark` to an ancestor for the dark appearance. Reduced-motion preferences disable the default press scaling, color/shadow transitions, and spinner rotation. The sheet's trigger uses this same component.

Styles are colocated in `styles.module.css` and compiled into the package stylesheet. Customize them through `className` or inherited CSS variables: `--ik-button-radius`, `--ik-button-background`, `--ik-button-color`, `--ik-button-border`, `--ik-button-shadow`, `--ik-button-hover-background`, `--ik-button-pressed-shadow`, `--ik-focus-color`, and `--ik-font-family`. Every variable has a working default; setting a variable overrides that value in both themes.
