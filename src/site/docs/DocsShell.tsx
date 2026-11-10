"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { components } from "./components";
import DeadIcon from "../DeadIcon";
import PublishedVersion from "../PublishedVersion";

export default function DocsShell({ children, hideNavigation = false }: { children: ReactNode; hideNavigation?: boolean }) {
  const path = usePathname();
  const [dark, setDark] = useState(false);
  const [highlight, setHighlight] = useState<{ x: number; y: number; width: number; height: number; visible: boolean; moving: boolean }>({ x: 0, y: 0, width: 0, height: 0, visible: false, moving: false });
  const reducedMotion = useReducedMotion();
  const links = [{ href: "/docs", label: "Overview" }, { href: "/docs/installation", label: "Installation" }, { href: "/docs/components", label: "All components" }, ...components.map((component) => ({ href: `/docs/components/${component.slug}`, label: component.name })), { href: "/docs/view-transition", label: "View Transition study" }];

  return <div className={`min-h-screen font-sans text-sm leading-relaxed ${dark ? "dark bg-[#171716] text-neutral-200" : "bg-white text-neutral-800"}`}>
    <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[680px] pb-16 pt-9 sm:pt-[72px]">
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Link href="/" className="inline-flex min-h-8 items-center font-medium">InteractionKit</Link>
        <div className="flex items-center gap-3 text-xs text-neutral-400 sm:text-sm dark:text-neutral-500">
          <a href="https://github.com/armondschneider/interactionkit" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">GitHub</a>
          <span aria-hidden="true">—</span>
          <Link href="/docs" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">Docs</Link>
          <span aria-hidden="true">—</span>
          <a href="https://x.com/armondme" target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">Twitter</a>
          <span aria-hidden="true">—</span>
          <PublishedVersion />
        </div>
      </header>
      <div className="relative mt-8">
        {!hideNavigation && <nav aria-label="Documentation" onMouseLeave={() => setHighlight((current) => ({ ...current, visible: false }))} className="relative flex cursor-pointer flex-wrap gap-1 border-b border-neutral-200/80 pb-3 xl:absolute xl:right-full xl:top-0 xl:mr-8 xl:w-44 xl:flex-col xl:border-0 xl:pb-0 dark:border-neutral-800">
          <motion.span aria-hidden="true" initial={false} animate={{ x: highlight.x, y: highlight.y, width: highlight.width, height: highlight.height, opacity: highlight.visible ? 1 : 0 }} transition={reducedMotion || !highlight.moving ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38, opacity: { duration: 0.1 } }} className="pointer-events-none absolute left-0 top-0 rounded-md bg-neutral-100 dark:bg-neutral-800" />
          {links.map((link) => {
            const active = path.replace(/\/$/, "") === link.href;
            return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} onMouseEnter={(event) => { const item = event.currentTarget; const bounds = { x: item.offsetLeft, y: item.offsetTop, width: item.offsetWidth, height: item.offsetHeight }; setHighlight((current) => ({ ...bounds, visible: true, moving: current.visible })); }} className={`relative inline-flex min-h-8 items-center rounded-md px-2.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${active ? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100" : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"}`}>
              {link.label}
            </Link>;
          })}
        </nav>}
        <main className={hideNavigation ? "min-w-0" : "min-w-0 pt-10 xl:pt-0"}>{children}</main>
      </div>
      <footer className="mt-14 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-neutral-200/80 pt-5 text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
        <span>Made by <a href="https://armond.me" className="underline underline-offset-4 hover:text-neutral-800 dark:hover:text-neutral-200">Armond Schneider</a></span>
        <Link href="/archive" className="inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap transition-colors hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:hover:text-neutral-200"><DeadIcon />Old Interactions</Link>
        <button type="button" aria-label="Toggle display" aria-pressed={dark} onClick={() => setDark(!dark)} className="ml-auto grid size-8 cursor-pointer place-items-center rounded-md transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus-visible:outline-neutral-500">{dark ? <Sun size={14} /> : <Moon size={14} />}</button>
      </footer>
    </div>
  </div>;
}
