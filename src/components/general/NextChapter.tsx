"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState } from "react";

export default function NextChapter() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const reducedMotion = useReducedMotion();

  function openAnnouncement() {
    // Enter the top layer before mounting motion: percentage transforms must
    // measure the visible sheet, not a display:none dialog.
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    setActive(true);
    setOpen(true);
  }

  useLayoutEffect(() => {
    if (open) closeRef.current?.focus({ preventScroll: true });
  }, [open]);

  useLayoutEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [active]);

  return (
    <>
      <motion.button
        type="button"
        onClick={openAnnouncement}
        aria-haspopup="dialog"
        aria-expanded={open}
        initial={false}
        whileHover={reducedMotion ? undefined : { rotate: -2, y: -2 }}
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 450, damping: 26 }}
        className="group relative mb-4 inline-flex min-h-8 -rotate-6 cursor-pointer items-center overflow-hidden rounded-[3px] border-2 border-white bg-amber-300 px-2.5 pb-2 pt-1.5 text-amber-950 shadow-[0_1px_2px_rgba(120,53,15,0.12),1px_3px_5px_rgba(120,53,15,0.14)] outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-4 dark:border-amber-100 dark:bg-amber-300 dark:text-amber-950 dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),1px_3px_5px_rgba(0,0,0,0.3)] dark:focus-visible:ring-amber-300 dark:focus-visible:ring-offset-neutral-900"
      >
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-[repeating-linear-gradient(120deg,var(--color-amber-950)_0px,var(--color-amber-950)_5px,transparent_5px,transparent_10px)] opacity-75 dark:opacity-75" />
        <span className="text-left">
          <span className="block text-[8px] font-semibold uppercase tracking-wider opacity-65">Under construction</span>
          <span className="block text-[10px] font-semibold">InteractionKit 2.0</span>
        </span>
        <span aria-hidden="true" className="absolute right-0 top-0 size-2 rounded-bl-sm bg-amber-100 shadow-[-1px_1px_1px_rgba(120,53,15,0.14)] dark:bg-amber-100 dark:shadow-[-1px_1px_1px_rgba(120,53,15,0.14)]" />
      </motion.button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onCancel={(event) => { event.preventDefault(); setOpen(false); }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-neutral-900 outline-none backdrop:bg-transparent dark:text-neutral-100"
      >
        <AnimatePresence onExitComplete={() => {
          if (!open) {
            dialogRef.current?.close();
            setActive(false);
          }
        }}>
          {open && (
            <motion.div key="sheet-overlay" className="absolute inset-0 flex items-end justify-center sm:px-4">
              <motion.div
                aria-hidden="true"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
                className="absolute inset-0 bg-neutral-950/25 dark:bg-neutral-950/55"
              />
              <motion.section
                initial={reducedMotion ? { opacity: 0 } : { y: "100%", opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ ...(reducedMotion ? { opacity: 0 } : { y: "100%" }), transition: { duration: reducedMotion ? 0 : 0.2, ease: "easeIn" } }}
                transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 max-h-[90dvh] w-full max-w-[420px] overflow-y-auto overscroll-contain rounded-t-2xl border border-b-0 border-neutral-200 bg-neutral-50 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] dark:border-neutral-800 dark:bg-[#171716] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.16)]"
              >
                <div aria-hidden="true" className="mx-auto h-1 w-7 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                <div className="mb-5 mt-3 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">InteractionKit <span className="text-neutral-400 dark:text-neutral-500">/ 2.0</span></span>
                  <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close announcement" className="grid size-8 cursor-pointer place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-200/60 hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 active:scale-95 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus-visible:outline-neutral-400">
                    <X size={15} aria-hidden="true" />
                  </button>
                </div>
                <h2 id={titleId} className="text-xl font-medium leading-snug text-neutral-800 dark:text-neutral-200">Less like a website.<br />More like an app.</h2>
                <p id={descriptionId} className="mt-3 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">We’re building an npm package of React components that make web apps feel more native and fluid. Whether you’re building a SaaS product, a consumer app, or something in between.</p>
                <div className="mb-6 mt-3 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  <p>Drop components into your app for natural gestures, smooth transitions, and responsive feedback, without building every interaction from scratch.</p>
                  <p className="mt-3">Built with React and Motion, designed to fit your existing UI. Coming soon in InteractionKit 2.0.</p>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-3 text-[11px] dark:border-neutral-800">
                  <span className="text-neutral-400 dark:text-neutral-500">A new chapter. Coming soon.</span>
                  <a href="https://x.com/armondme" target="_blank" rel="noreferrer" className="inline-flex min-h-8 shrink-0 items-center gap-1 text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-950 dark:text-neutral-300 dark:decoration-neutral-600 dark:hover:text-white">Follow along <ArrowUpRight size={13} aria-hidden="true" /></a>
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}
