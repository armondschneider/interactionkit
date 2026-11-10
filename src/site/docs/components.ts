export const components = [
  {
    slug: "view-transition", name: "ViewTransition", description: "A trigger that expands into a connected, non-modal surface.",
    code: `import "useintkit/styles.css";\nimport { ViewTransition } from "useintkit";\n\n<ViewTransition trigger="Quick actions" size="md">\n  {({ close }) => <button type="button" onClick={close}>Done</button>}\n</ViewTransition>`,
    props: [["trigger", "ReactNode | (open) => ReactNode", "Required content for the trigger button; do not nest interactive elements."], ["triggerLabel", "string", "Accessible name for the trigger, required for an icon-only trigger."], ["children", "ReactNode | ({ close }) => ReactNode", "Required content of the surface, optionally with a close callback."], ["open / onOpenChange", "boolean / function", "Control the open state from your application; update open when onOpenChange is called."], ["defaultOpen", "boolean", "Initial uncontrolled state. Defaults to false."], ["size", '"sm" | "md" | "lg"', "Expanded width: 200, 240, or 320 pixels. Defaults to md."], ["closedWidth / openWidth", "number", "Optional pixel overrides; closed width otherwise fits the trigger, and openWidth overrides the size preset. Capped by available width."], ["spring", "object", "Optional stiffness, damping and mass. Defaults to 700, 48 and 0.8."], ["contentDelay", "number", "Content entrance delay in seconds; defaults to 0.06."], ["closeOnOutsideClick", "boolean", "Dismiss on an outside pointer press; defaults to true."], ["className / triggerClassName / contentClassName", "string", "Classes for the surface, trigger and content."]],
    note: "This is a non-modal disclosure, not a menu or dialog. Its children remain mounted when closed but are inert and hidden from assistive technology. Escape closes it when focus is inside. It respects reduced motion; use Sheet for modal focus containment.",
  },
  {
    slug: "button", name: "Button", description: "A quiet primary action with tactile feedback and loading states.",
    code: `import "useintkit/styles.css";\nimport { Button } from "useintkit";\n\n<Button onClick={handleContinue}>Continue</Button>\n<Button loading>Continue</Button>\n<Button disabled>Unavailable</Button>`,
    props: [["size", '"sm" | "md" | "icon"', 'Button size. Defaults to "md".'], ["loading", "boolean", "Shows progress and prevents activation while retaining focus."], ["disabled", "boolean", "Disables the button using native behavior."], ["type", '"button" | "submit" | "reset"', 'Defaults to "button".'], ["className", "string", "Additional classes for the button."]],
    note: "Native button attributes and Motion props are forwarded. Use an accessible label for icon-only buttons.",
  },
  {
    slug: "image-viewer", name: "ImageViewer", description: "Expand an image into a focused, gesture-friendly viewer.",
    code: `import "useintkit/styles.css";\nimport { ImageViewer } from "useintkit";\n\n<ImageViewer\n  src="/images/coast.jpg"\n  alt="A quiet coastline"\n  caption="An afternoon by the sea"\n/>`,
    props: [["src", "string", "Required. Full-size image URL."], ["alt", "string", "Required. Descriptive alternative text."], ["thumbnailSrc", "string", "Optional thumbnail URL; defaults to src."], ["caption", "ReactNode", "Optional content beneath the expanded image."], ["open / onOpenChange", "boolean / function", "Control the viewer from your application."], ["defaultOpen", "boolean", "Initial state when uncontrolled."]],
    note: "Escape, the backdrop, the close button, or a deliberate drag dismisses the viewer. Focus returns to the trigger.",
  },
  {
    slug: "sheet", name: "Sheet", description: "A focused modal surface for settings, forms, and small decisions.",
    code: `import "useintkit/styles.css";\nimport { Sheet } from "useintkit";\n\n<Sheet trigger="Open sheet" title="Preferences"\n  description="Make it your own.">\n  {/* Your content or form */}\n</Sheet>`,
    props: [["title", "ReactNode", "Required accessible title."], ["description", "ReactNode", "Optional description of the sheet."], ["trigger", "ReactNode", "Trigger content; pass null to use an external controlled opener."], ["open / onOpenChange", "boolean / function", "Control the sheet from your application."], ["dismissible", "boolean", "Allow Escape, backdrop, and drag dismissal. Defaults to true."], ["draggable", "boolean", "Enable handle drag. Defaults to true."], ["footer", "ReactNode", "Content fixed below the scrollable body."]],
    note: "The modal contains focus and restores it on close. Only the handle starts a drag, leaving the body free to scroll.",
  },
  {
    slug: "video-player", name: "VideoPlayer", description: "Custom video controls and unobscured YouTube and Vimeo embeds.",
    code: `import { VideoPlayer } from "useintkit";\n\n<VideoPlayer\n  src="/videos/example.mp4"\n  title="A quiet scene"\n  poster="/images/poster.jpg"\n/>`,
    props: [["src", "string", "Required. Direct video URL or supported provider URL."], ["title", "string", "Required accessible title for the video."], ["provider", '"video" | "youtube" | "vimeo"', 'Defaults to "video".'], ["youtubeControls", '"native" | "custom"', "Experimental custom YouTube controls below the embed; defaults to native."], ["vimeoControls", '"native" | "custom"', "Experimental custom Vimeo controls; requires an eligible video owner plan."], ["poster", "string", "Optional poster image for direct video."], ["captions", "object", "Optional default caption track for direct video."], ["className", "string", "Additional classes for the player wrapper."]],
    note: "Vimeo and YouTube use their own embedded controls by default. Custom bars stay outside the embed; Vimeo chromeless mode requires an eligible owner plan.",
  },
] as const;

export type ComponentSlug = (typeof components)[number]["slug"];
