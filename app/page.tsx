"use client";

import { Analytics } from "@vercel/analytics/next";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import DocumentationCodeBlock from "../src/site/code/DocumentationCodeBlock";
import ImageGridModal from "../src/examples/image/ImageGridModal";
import { imageGridImages } from "../src/examples/image/exampleImages";
import SheetExample from "../src/examples/sheet/SheetExample";
import ButtonExample from "../src/examples/button/ButtonExample";
import packageInfo from "../lib-package.json";

const packageUrl = `https://www.npmjs.com/package/${packageInfo.name}`;
const installation = `pnpm add ${packageInfo.name}`;
const usage = `import "useintkit/styles.css";
import { ImageViewer } from "useintkit";

export default function Gallery() {
  return (
    <ImageViewer
      src="/images/coast.jpg"
      alt="A quiet coastline"
    />
  );
}`;

const sheetUsage = `import "useintkit/styles.css";
import { Sheet } from "useintkit";

<Sheet
  trigger="Open sheet"
  title="Make it your own"
  description="A few preferences for your app."
>
  {/* Your content, forms, or actions */}
</Sheet>`;

const buttonUsage = `import "useintkit/styles.css";
import { Button } from "useintkit";

<Button onClick={handleContinue}>Continue</Button>
<Button loading>Continue</Button>
<Button disabled>Unavailable</Button>`;

export default function Home() {
  const [dimmed, setDimmed] = useState(false);

  return (
    <>
      <main className={`min-h-screen font-sans text-sm leading-relaxed ${dimmed ? "dark bg-[#171716] text-neutral-200" : "bg-white text-neutral-800"}`}>
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[680px] pb-10 pt-9 sm:pb-16 sm:pt-[72px]">
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2" aria-label="Primary navigation">
            <h1><a href="/" className="inline-flex min-h-8 items-center font-medium">InteractionKit</a></h1>
            <div className="flex items-center gap-3 text-xs text-neutral-400 sm:text-sm dark:text-neutral-500">
              <a href="https://github.com/armondschneider/interactionkit" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">GitHub</a>
              <span aria-hidden="true">—</span>
              <a href="https://x.com/armondme" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">Twitter</a>
              <span aria-hidden="true">—</span>
              <a href={packageUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200" aria-label={`${packageInfo.name} ${packageInfo.version} on npm`} title={`Version ${packageInfo.version} · awaiting npm approval`}>{packageInfo.version}</a>
            </div>
          </nav>

          <section aria-label="Interactive image gallery preview — select an image to expand it" className="relative flex h-[320px] items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-50/70 px-5 sm:h-[400px] dark:border-neutral-800 dark:bg-neutral-900/40">
            <ImageGridModal images={imageGridImages} className="!max-w-[250px] sm:!max-w-[300px]" />
          </section>

          <div className="mt-12 space-y-12">
            <section aria-labelledby="introduction">
              <h2 id="introduction" className="mb-1 font-medium">Introduction</h2>
              <p>InteractionKit is a kit of React components that make your web apps feel more native and fluid. For SaaS products, consumer apps, and everything in between.</p>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">Natural gestures, smooth transitions, and responsive feedback, without building every interaction from scratch. Built with React and Motion to fit into your existing UI.</p>
            </section>

            <section aria-labelledby="installation">
              <h2 id="installation" className="mb-1 scroll-mt-8 font-medium">Installation</h2>
              <p>Install InteractionKit from npm once its first release is approved.</p>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Version {packageInfo.version} is awaiting npm approval. The current npm package is a placeholder and does not yet contain the components.</p>
              <div className="mt-6"><DocumentationCodeBlock code={installation} title="terminal" terminal /></div>
            </section>

            <section aria-labelledby="usage">
              <h2 id="usage" className="mb-1 font-medium">Usage</h2>
              <p>Import a component and make it part of your app.</p>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">The gallery above uses ImageViewer. Import the stylesheet once, then use the component with a single image or in your own grid. No Tailwind setup required.</p>
              <div className="mt-6"><DocumentationCodeBlock code={usage} title="gallery.tsx" /></div>
            </section>

            <section aria-labelledby="button">
              <h2 id="button" className="mb-1 font-medium">Button</h2>
              <p>A quiet primary action. A white surface in light mode, near-black in dark mode, with a soft edge, layered depth, and a little give when pressed.</p>
              <div className="mt-6 flex h-[240px] items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-50/70 px-5 dark:border-neutral-800 dark:bg-neutral-900/40"><ButtonExample /></div>
              <div className="mt-6"><DocumentationCodeBlock code={buttonUsage} title="button.tsx" /></div>
            </section>

            <section aria-labelledby="sheet">
              <h2 id="sheet" className="mb-1 font-medium">Sheet</h2>
              <p>A focused surface for settings, forms, and small decisions. Drag the handle to dismiss it, or use the keyboard. Content scrolls independently of the gesture.</p>
              <div className="mt-6 flex h-[220px] items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-50/70 px-5 dark:border-neutral-800 dark:bg-neutral-900/40"><SheetExample /></div>
              <div className="mt-6"><DocumentationCodeBlock code={sheetUsage} title="sheet.tsx" /></div>
            </section>

            <section aria-labelledby="archive">
              <h2 id="archive" className="mb-1 font-medium">The archive</h2>
              <p>The original collection isn’t going anywhere. Explore the interaction studies, try the examples, and use their source in your own projects.</p>
              <a href="/archive" className="mt-3 inline-flex min-h-8 items-center text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100">Browse the original interactions</a>
            </section>
          </div>

          <footer className="mt-14 flex items-center justify-between gap-4 border-t border-neutral-200/80 pt-5 text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
            <span>Made by <a href="https://armond.me" className="underline underline-offset-4 hover:text-neutral-800 dark:hover:text-neutral-200">Armond Schneider</a></span>
            <button type="button" className="grid size-8 cursor-pointer place-items-center rounded-md transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus-visible:outline-neutral-500" onClick={() => setDimmed((value) => !value)} aria-label="Toggle display" aria-pressed={dimmed}>
              {dimmed ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </footer>
        </div>
      </main>
      <Analytics />
    </>
  );
}
