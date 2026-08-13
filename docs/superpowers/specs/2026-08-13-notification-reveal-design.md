# Notification Reveal Design

## Goal

Add a copy-ready `NotificationReveal` React component that turns an arriving notification icon into an expanded toast, with a replayable gallery demo.

## Component

Create `src/components/notification/NotificationReveal.tsx`. The component owns the complete interaction sequence and may be reused independently of the gallery.

By default, the rendered notification is fixed at the bottom center of the viewport. It accepts a positioning/class customization mechanism so the demo can contain it within the existing gallery frame without duplicating animation logic.

The public inputs cover notification title, icon, auto-dismiss duration, and optional class names. A trigger or replay mechanism lets a consumer start the sequence intentionally. The component exposes dismiss behavior through its close control and an optional dismissal callback.

## Motion Sequence

1. When triggered, a bell icon inside a lightly tinted circular surface enters from below, scaling and fading in with an ease-out transition.
2. After a short, intentional pause, the same icon shifts to the toast's leading position through a shared layout transition. The toast surface expands around it and reveals the title and dismiss control.
3. The close button dismisses immediately. The notification also dismisses after the configured timeout.
4. Either dismissal path scales and fades the notification out with ease-in timing.

The sequence is interruptible: dismissing during either visible state cancels the pending expansion or auto-dismiss timeout. Replaying always starts from the compact icon state. `prefers-reduced-motion` shortens nonessential spatial motion while retaining visible state changes.

## Presentation And Accessibility

The visual language follows the existing gallery: a quiet translucent neutral toast, subtle border/shadow, compact sans-serif text, and a red-tinted bell treatment inspired by the provided references. Default viewport placement is bottom center.

The dismiss control is a semantic icon button with an accessible label and a 32px or larger target. Escape dismisses the active notification. The component supplies an accessible announcement suitable for transient notification content.

## Gallery Integration

Add a `Notification Reveal` section to `app/page.tsx`, categorized as `Transient feedback`, and link it to `/demo/notification-reveal`. The homepage card and dedicated route show only the notification interaction inside their established neutral demo frames: no phone, browser chrome, or device mockup.

Add `app/demo/notification-reveal/page.tsx`, following the existing demo-route structure. It presents the component and an explicit replay trigger. The replay trigger remains stable while the sequence runs, and the notification stays within the demo frame.

Export `NotificationReveal` from `src/index.ts` alongside the other reusable components.

## Verification

Add focused tests using the repository's established test tooling, or introduce the smallest compatible test setup if none exists. Cover trigger-to-icon state, icon-to-toast expansion, close dismissal, auto-dismissal, replay, and reduced-motion behavior where feasible. Run the focused tests and `npm run build`. Manually verify light/dark display states, keyboard dismissal, rapid replay, and narrow widths.
