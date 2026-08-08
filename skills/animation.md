---
name: animation
description: Build or refine an InteractionKit animation by deciding whether motion is warranted, its purpose, tool, properties, timing, interruption behavior, and accessibility requirements, then write the implementation. Use when asked to add motion, animate a component, build a transition, or make an interaction feel more responsive. For broader UI conventions, also follow the project-local interactionkit skill.
---

# Building Animations

A construction skill for InteractionKit. Turn a motion request into a small, accessible implementation that belongs in this React, Tailwind, and Framer Motion codebase. Do not audit the entire repository or add decorative motion because it sounds appealing.

## Operating Posture

Build the interaction yourself. The standard is deliberate, quiet motion: it confirms an action, explains a spatial change, or makes state legible without competing with the component's purpose.

Two failure modes matter:

1. Animating something that should change immediately.
2. Animating the right thing with properties, timing, or interruption behavior that makes it feel slow or brittle.

Make the call rather than offering a menu of motion options. State the reason briefly, then implement it.

## Project Conventions

- Use React 19, Tailwind CSS, and `framer-motion`; the package is already installed. Do not introduce another animation library.
- Place reusable interactions in `src/components/<category>/`; keep each demo focused on one clear interaction.
- Use Tailwind for static presentation. Inline `style` is only for calculated values or MotionValues.
- Preserve dark mode with `dark:` classes for every visual surface or control state that needs one.
- Keep the demo frame stable: the interaction must not move the control the user is operating or clip controls and overlays on narrow screens.
- Use semantic controls, visible keyboard focus, accessible names for icon-only buttons, and real overlay behavior. Motion never substitutes for accessibility.
- Use `useReducedMotion` for nonessential Framer Motion movement. Keyboard navigation changes state immediately.
- Wrap conditionally rendered motion elements in `AnimatePresence` and give them an `exit` state. Use stable keys when the animated content changes.

## Build Sequence

### 1. Should this animate?

| Frequency | Decision |
| --- | --- |
| 100+ times/day or keyboard navigation | No animation. Change state immediately. |
| Tens of times/day | Near-imperceptible feedback only, or none. |
| Occasional overlays and state changes | Standard animation. |
| Rare or first-time moments | A small delight budget is acceptable. |

Keyboard-triggered actions do not animate. If the request fails this gate, implement the static state change or affordance instead.

### 2. Name the purpose

Use one of these before proceeding:

- **Feedback**: confirms the interface received input.
- **Spatial consistency**: shows where something came from or goes.
- **State indication**: makes a changed state legible.
- **Continuity**: prevents content from appearing to teleport.
- **Explanation**: demonstrates a concept in a demo or onboarding flow.
- **Delight**: reserved for rare moments.

If the purpose cannot be named, do not add motion. Data the user is reading or acting on should not move for decoration.

### 3. Choose the cheapest tool

| Need | Tool |
| --- | --- |
| Color, opacity, hover, focus, or simple class-controlled state | Tailwind/CSS transition with explicit properties |
| Component entry, exit, spring, drag, layout transition, or interruptible state | Framer Motion |
| A sheet, modal, menu, tooltip, or other overlay | Extend an existing InteractionKit component or implement its focus, Escape, dismissal, and scroll behavior with the motion |

Use CSS transitions for static visual states. Use Framer Motion only when React state, presence, gestures, or a spring requires it. Do not use keyframes for rapidly repeatable state changes; transitions and springs retarget from the current value.

### 4. Choose properties

- Prefer `transform` and `opacity`. Use `filter` sparingly for a short, subtle entrance when it improves continuity.
- Do not animate layout properties such as `width`, `height`, `margin`, `padding`, `top`, or `left` unless the interaction genuinely needs a layout change, such as the existing expanding search field. Keep that exception localized and verify it remains responsive.
- Never enter from `scale: 0`; use a subtle `0.94` to `0.98` scale with opacity when scale is warranted.
- Anchor tooltips and popovers toward their trigger using the matching `origin-*` utility. Centered modals are exempt.
- Prefer percentage translations for sheets and off-canvas exits: `y: "100%"` follows the element's own height.
- Keep press feedback within the project's `0.95` to `1.05` range. `SpringButton` uses `0.94` for its contained button pattern.

### 5. Select timing and easing

Follow InteractionKit's established motion language:

| Situation | Default |
| --- | --- |
| Button press and quick feedback | Spring, or 100-160ms visual transition |
| Tooltip and small popover | 125-200ms ease-out |
| Dropdown and select | 150-250ms ease-out |
| Modal and sheet entrance | 200-300ms ease-out or a restrained spring |
| Exit | Slightly quicker ease-in, following the entrance path |
| Progress or hold-to-confirm | Linear only when time itself is the feedback |

- User-initiated motion completes within 300ms unless it is a direct-manipulation gesture.
- Use `easeOut` for entrances and `easeIn` for exits. Use `linear` only for time-progress feedback.
- Match existing component values before adding new ones. Current patterns include tooltip easing `[0.16, 1, 0.3, 1]` and press springs near `{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }`.
- Use springs for press feedback, drag release, and interruptible icon or layout motion. Keep bounce restrained; most product UI should not visibly bounce.
- Define a complete `transition` object when different properties need different behavior. Otherwise keep the transition to one concise declaration.

### 6. Design interruption and exit

- Rapid repeat input must not flicker, restart awkwardly, or leave stale visual state. Test it by toggling repeatedly.
- Preserve velocity on drag release. Close a dismissible sheet only after a meaningful offset or velocity threshold.
- Exit on the same path used for entry. A bottom sheet leaves downward; a trigger-anchored tooltip returns toward its trigger.
- Avoid `AnimatePresence mode="wait"` for high-frequency toggles unless the short transition gap is intentional and acceptable.
- Keep one focal animation per demo. Do not add stagger or decorative movement without a clear explanatory purpose.

### 7. Ship reduced-motion and input behavior together

```tsx
const reduceMotion = useReducedMotion();

<motion.div
  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
  transition={reduceMotion ? { duration: 0.15 } : { duration: 0.2, ease: "easeOut" }}
/>
```

- Reduced motion keeps opacity or color transitions that aid comprehension but removes unnecessary translation, scale, blur, and decorative movement.
- Gate hover-only transform effects with `@media (hover: hover) and (pointer: fine)` when writing CSS. Touch must not receive false hover feedback.
- Keep focus, keyboard, Escape, outside-dismissal, and focus restoration behavior functional independently of the animation.

## Never Ship

| Avoid | Use instead |
| --- | --- |
| Motion on keyboard navigation or a 100+/day action | Immediate state change |
| `transition: all` | Explicit properties or a focused Tailwind transition utility |
| `scale: 0` entrance | `opacity: 0` with subtle scale or translation |
| `easeIn` entrance | `easeOut` |
| UI animation longer than 300ms without direct manipulation | 100-300ms timing |
| Keyframes for a toggle or rapidly-triggered element | Transition or spring |
| Ungated hover transform | Fine-pointer hover media query |
| Conditional motion without an exit state | `AnimatePresence` with `exit` |
| Missing reduced-motion behavior | An opacity-only or immediate variant |
| Motion that obscures focus, clips an overlay, or shifts the active control | Stable layout and accessible overlay behavior |

## Completion

Write the implementation, then report only:

- Gate result: frequency tier and named purpose.
- Ingredients: tool, properties, easing or spring, and duration.
- Feel check: test reduced motion, keyboard behavior, rapid repeats, desktop and narrow mobile widths; run `npm run build`.

The code is the deliverable. Keep the explanation brief and say plainly when no animation is the correct result.
