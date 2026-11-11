"use client";

import { useEffect, useRef, useState } from "react";

const agentPrompt = `# Implement an InteractionKit View Transition

Help me add a connected, expanding surface to this project. First inspect the existing app, its styling conventions, and the relevant InteractionKit documentation:

- Study: https://interactionkit.org/view-transition
- Component API: https://interactionkit.org/docs/components/view-transition
- Package: https://www.npmjs.com/package/useintkit

## Directions

1. Understand where the interaction belongs and adapt it to the existing design. Ask me if the intended content or behavior is unclear.
2. For a React disclosure, use the published \`useintkit\` package (version 0.0.1 or later), import \`useintkit/styles.css\`, and use its \`ViewTransition\` component. Install it only if needed and follow the package's peer dependency requirements.
3. Keep the trigger semantic and accessible. Support keyboard use, Escape, focus restoration, and reduced motion. Check narrow screens and light and dark themes where applicable.
4. Treat ViewTransition as a non-modal disclosure, not a complete menu or dialog. If I need a modal or menu, implement its additional accessibility and interaction requirements or choose an appropriate component.
5. Use the size presets and motion options as starting points; tune them for the content. The blog's image card, drag-to-close, and inline note demos are examples, not package exports. Do not assume the component uses the browser View Transitions API.
6. Run the project's relevant tests and build, and summarize the changes and any limitations.
`;

export default function CopyAgentPrompt() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(agentPrompt);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return <div className="-ml-2 mt-3">
    <button type="button" onClick={copyPrompt} className="min-h-8 cursor-pointer rounded-lg px-2 text-left text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 motion-reduce:transition-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
      {status === "copied" ? "Copied" : status === "error" ? "Could not copy — try again" : "Copy agent prompt"}
    </button>
    <span role="status" className="sr-only">{status === "copied" ? "Agent prompt copied" : status === "error" ? "Could not copy the agent prompt" : ""}</span>
  </div>;
}
