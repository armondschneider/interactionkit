import Link from "next/link";
import DocumentationCodeBlock from "../../src/site/code/DocumentationCodeBlock";

export default function DocsOverview() {
  return <>
    <h1 className="font-medium">Introduction</h1>
    <p className="mt-2">InteractionKit is a collection of React components for building interfaces that feel native and fluid.</p>
    <h2 className="mt-10 font-medium">Installation</h2>
    <p className="mt-2">Install the package from your command line.</p>
    <div className="mt-4"><DocumentationCodeBlock title="terminal" terminal code="npm install useintkit" /></div>
    <h2 className="mt-10 font-medium">Components</h2>
    <p className="mt-2">Explore the components, try the interactions, and see how to use them.</p>
    <Link href="/docs/components" className="mt-3 inline-flex min-h-8 items-center text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100">See component documentation</Link>
    <h2 className="mt-10 font-medium">Interaction studies</h2>
    <p className="mt-2">Ideas in progress, explored through interactive examples.</p>
    <Link href="/docs/view-transition" className="mt-3 inline-flex min-h-8 items-center text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100">Explore View Transition</Link>
  </>;
}
