---
name: interactionkit
description: Review and implement InteractionKit UI components, Tailwind styling, Framer Motion interactions, dark mode, icon transitions, tooltips, audio feedback, and component demos. Use when changing visual behavior or interaction design in this repository.
license: MIT
metadata:
  author: Armond Schneider
  version: "1.0.0"
---

# InteractionKit UI Standards

Use this skill for every visual or interaction change in InteractionKit. Preserve the project visual language: quiet neutral surfaces, compact typography, intentional motion, and demos that make the interaction easy to understand.

## Implementation Rules

- Use Tailwind utilities for static presentation. Keep inline `style` only for values that must be driven by a Framer Motion `MotionValue` or calculated at runtime.
- Every new surface, border, text color, hover state, and control must have a class-based `dark:` variant when it can appear under the homepage display toggle.
- Keep the homepage demo frame stable. Content changes must not shift the interaction control that a user is trying to use.
- Demos may crop decorative overflow, but must never crop an interactive control, tooltip, or hover preview.
- Prefer existing component class hooks and props before adding page-specific selectors. Add a focused customization prop when a component needs a reusable visual adjustment.
- Keep interactive controls at least 32px in their effective pointer target, even when their visible icon is smaller.
- Use semantic buttons for actions, links for navigation, and give icon-only buttons an accessible name.

## Motion Rules

- User-initiated animation should complete within 300ms unless it is a direct-manipulation gesture using spring physics.
- Use springs for drag release, press feedback, and interruptible icon or layout motion. Preserve velocity for gesture release where appropriate.
- Use ease-out for entrances and ease-in for exits. Use linear easing only for time-progress feedback.
- Give interactive controls subtle pressed feedback in the 0.95-1.05 scale range.
- Wrap conditional motion elements in `AnimatePresence`, provide an `exit` state, and use stable keys for changing content.
- Do not use `AnimatePresence mode="wait"` for a high-frequency control unless the short gap is acceptable. Prefer interruptible spring transitions for rapid toggles.
- Honor `prefers-reduced-motion` for nonessential motion. Do not use animated transitions for keyboard navigation.
- Keep one focal animation per demo. Do not add stagger or competing decorative movement without a clear purpose.

## Tooltip And Overlay Rules

- A tooltip bubble must size to its content up to a sensible maximum width. Do not allow absolutely positioned bubbles to collapse to a word-width column.
- Place overlays above their trigger with an explicit z-index hierarchy, and ensure they stay inside a demo frame at the provided viewport sizes.
- Tooltip triggers must work with pointer and keyboard focus. Avoid hover-only information when it is essential.
- Modals and sheets must dim the background, support Escape, trap or manage focus as needed, and prevent background scrolling while open.

## Icon And Audio Rules

- Icons used as stateful controls must communicate the state with an accessible label in addition to any animation.
- Icon transitions must not overlap or flicker on fast repeat input. Test repeated toggles before shipping.
- Audio feedback is optional, subtle, and paired with a visible state change. Never require sound to understand a result.
- Provide a way to disable optional sound. Do not play decorative sounds for hover or high-frequency input.
- Reset replayable audio before triggering it again, and keep default playback volume low.

## Typography And Visual Design

- Use the site sans-serif face for interface copy. Reserve alternate type treatments for deliberate editorial content only.
- Keep headings balanced and body text readable without arbitrary tracking or excessive small text.
- Underlined links need a visible underline offset and a distinct hover/focus color.
- Maintain a consistent spacing scale, nested corner-radius relationship, border contrast, and shadow direction.
- Prefer neutral, translucent border and shadow colors over pure black shadows.

## Review Checklist

Before finishing a UI change:

1. Verify default and dark display states.
2. Test hover, focus, keyboard, and rapid repeat interaction paths.
3. Check desktop and narrow mobile widths for clipping and layout shifts.
4. Confirm motion timing and reduced-motion behavior are appropriate.
5. Run `npm run build`.

## References

- The principles used here are informed by the User Interface Wiki by Raphael Salaja: https://github.com/raphaelsalaja/userinterface-wiki/tree/main/skills
- This file is project-local and defines InteractionKit-specific conventions.
