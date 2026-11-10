import Link from "next/link";

export default function ViewTransitionDocs() {
  return <>
    <p className="text-xs text-neutral-500 dark:text-neutral-400">Interaction study · Experimental</p>
    <h1 className="mt-3 font-medium">View Transition</h1>
    <p className="mt-2">A study in connecting a control to the surface it opens, starting with a trigger that becomes a panel.</p>
    <Link href="/view-transition" className="mt-4 inline-flex min-h-8 items-center underline decoration-neutral-300 underline-offset-4 hover:text-neutral-500 dark:decoration-neutral-700 dark:hover:text-neutral-400">Read the study and try the demos →</Link>
    <h2 className="mt-10 font-medium">Status</h2>
    <p className="mt-2">The package includes a configurable non-modal ViewTransition component starting with version 0.0.1. The image-card, drag-to-close, and inline note demos remain website experiments, not package features.</p>
    <Link href="/docs/components/view-transition" className="mt-3 inline-flex min-h-8 items-center underline decoration-neutral-300 underline-offset-4 hover:text-neutral-500 dark:decoration-neutral-700 dark:hover:text-neutral-400">View component API →</Link>
    <h2 className="mt-10 font-medium">Related component</h2>
    <p className="mt-2">ImageViewer already uses a shared-layout transition to connect an image to its expanded view.</p>
    <Link href="/docs/components/image-viewer" className="mt-3 inline-flex min-h-8 items-center underline decoration-neutral-300 underline-offset-4 hover:text-neutral-500 dark:decoration-neutral-700 dark:hover:text-neutral-400">Explore ImageViewer →</Link>
  </>;
}
