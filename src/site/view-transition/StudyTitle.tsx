"use client";

import { Check, CircleAlert, Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function StudyTitle() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const reducedMotion = useReducedMotion();
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return <div>
    <h1 className="w-fit text-2xl font-medium"><button type="button" onClick={copyLink} aria-label={status === "copied" ? "Link copied" : status === "error" ? "Could not copy page link; try again" : "Copy link to View Transition"} className="group relative flex cursor-pointer items-center text-left focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-400">
      View Transition
      <span className="relative ml-2 grid size-8 shrink-0 place-items-center text-neutral-400 min-[780px]:absolute min-[780px]:right-full min-[780px]:ml-0 dark:text-neutral-500 [@media(hover:hover)_and_(pointer:fine)]:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:transition-opacity [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:opacity-100">
        <AnimatePresence initial={false}>
          <motion.span key={status} aria-hidden="true" initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.8 }} transition={reducedMotion ? { duration: 0 } : { scale: { type: "spring", stiffness: 700, damping: 38 }, opacity: { duration: 0.1 } }} className="absolute grid place-items-center">
            {status === "copied" ? <Check size={15} /> : status === "error" ? <CircleAlert size={15} /> : <Copy size={15} />}
          </motion.span>
        </AnimatePresence>
      </span>
    </button></h1>
    <span role="status" className="sr-only">{status === "copied" ? "Page link copied" : status === "error" ? "Could not copy the page link" : ""}</span>
  </div>;
}
