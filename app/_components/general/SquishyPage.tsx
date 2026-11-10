"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import CodeBlock from "../code/CodeBlock";
import Link from "next/link";
import ArchiveShell from "../../../src/site/ArchiveShell";
import DetachableBrowserToolbar from "./DetachableBrowserToolbar";
import SquishyButton from "./SquishyButton";

type Props = {
  source: string;
  toolbarSource: string;
};

export default function SquishyPage({ source, toolbarSource }: Props) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <ArchiveShell>
      <Link href="/archive" className="inline-flex min-h-8 items-center text-xs text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100">Back to old interactions</Link>

      <div>
        <header className="mb-8 mt-8">
          <h1 className="font-medium">Squishy button</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            A small press-and-hold button with a little give and a soft sound.
          </p>
        </header>

        <article className="border-t border-neutral-200 py-6 sm:py-7 dark:border-neutral-800">
          <header className="mb-7 flex items-start justify-between gap-5">
            <div>
              <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Press and hold</h2>
              <p className="mt-1 max-w-md text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                Hold either button for as long as you like. It springs back when you let go.
              </p>
            </div>
            <button
              type="button"
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
              onClick={() => setSoundEnabled((enabled) => !enabled)}
              className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 text-[11px] text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200 dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-900"
            >
              {soundEnabled ? <Volume2 aria-hidden="true" className="size-3.5" /> : <VolumeX aria-hidden="true" className="size-3.5" />}
              <span>{soundEnabled ? "Sound on" : "Sound off"}</span>
            </button>
          </header>

          <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-neutral-200 bg-white/40 p-6 sm:min-h-[480px] sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3 sm:gap-4">
              <SquishyButton
                soundEnabled={soundEnabled}
                ariaLabel="Confirm"
                className="size-10 !min-h-10 !w-10 !px-0"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.051l-7.5 9a.75.75 0 0 1-1.098.053l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.92 3.919 6.923-8.307a.75.75 0 0 1 1.052-.156Z" clipRule="evenodd" />
                </svg>
              </SquishyButton>
              <SquishyButton soundEnabled={soundEnabled}>Submit</SquishyButton>
            </div>
          </div>
        </article>

        <article className="border-t border-neutral-200 py-6 sm:py-7 dark:border-neutral-800">
          <header className="mb-7">
            <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Detach and rearrange</h2>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Press and hold a browser control to pick it up, then move it along the toolbar and release it into a new spot.
            </p>
          </header>

          <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-neutral-200 bg-white/40 p-3 sm:min-h-[480px] sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <DetachableBrowserToolbar soundEnabled={soundEnabled} />
          </div>
        </article>

        <section className="mt-12" aria-labelledby="source-code-title">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="source-code-title" className="text-sm font-medium">Source code</h2>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Copy and paste into your project</span>
          </div>
          <CodeBlock code={source} language="tsx" title="SquishyButton.tsx" />
          <div className="mt-6">
            <CodeBlock code={toolbarSource} language="tsx" title="DetachableBrowserToolbar.tsx" previewLines={24} />
          </div>
        </section>

      </div>
    </ArchiveShell>
  );
}
