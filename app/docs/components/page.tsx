import Link from "next/link";
import { components } from "../../../src/site/docs/components";

export default function ComponentsPage() {
  return <>
    <h1 className="font-medium">Components</h1>
    <p className="mt-2">Browse the components and their documentation.</p>
    <div className="mt-6 border-t border-neutral-200/80 dark:border-neutral-800">{components.map((component) => <Link href={`/docs/components/${component.slug}`} key={component.slug} className="group flex min-h-16 items-center justify-between gap-4 border-b border-neutral-200/80 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:border-neutral-800"><div><span className="font-medium group-hover:underline group-hover:underline-offset-4">{component.name}</span><p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{component.description}</p></div></Link>)}</div>
  </>;
}
