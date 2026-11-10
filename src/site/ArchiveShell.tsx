"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useState, type ReactNode } from "react";
import PublishedVersion from "./PublishedVersion";
import DeadIcon from "./DeadIcon";

export default function ArchiveShell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  return <main className={`min-h-screen font-sans text-sm leading-relaxed ${dark ? "dark bg-[#171716] text-neutral-200" : "bg-white text-neutral-800"}`}>
    <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[680px] pb-10 pt-9 sm:pb-16 sm:pt-[72px]">
      <nav className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2" aria-label="Primary navigation">
        <Link href="/" className="inline-flex min-h-8 items-center font-medium">InteractionKit</Link>
        <div className="flex items-center gap-3 text-xs text-neutral-400 sm:text-sm dark:text-neutral-500">
          <a href="https://github.com/armondschneider/interactionkit" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">GitHub</a><span aria-hidden="true">—</span>
          <Link href="/docs" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">Docs</Link><span aria-hidden="true">—</span>
          <a href="https://x.com/armondme" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">Twitter</a><span aria-hidden="true">—</span>
          <PublishedVersion />
        </div>
      </nav>
      {children}
      <footer className="mt-14 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-neutral-200/80 pt-5 text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
        <span>Made by <a href="https://armond.me" className="underline underline-offset-4 hover:text-neutral-800 dark:hover:text-neutral-200">Armond Schneider</a></span>
        <Link href="/archive" className="inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap transition-colors hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:hover:text-neutral-200"><DeadIcon />Old Interactions</Link>
        <button type="button" aria-label="Toggle display" aria-pressed={dark} onClick={() => setDark((value) => !value)} className="ml-auto grid size-8 cursor-pointer place-items-center rounded-md transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus-visible:outline-neutral-500">{dark ? <Sun size={14} /> : <Moon size={14} />}</button>
      </footer>
    </div>
  </main>;
}
