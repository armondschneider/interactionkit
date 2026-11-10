"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useIsomorphicLayoutEffect } from "../../components/internal/useIsomorphicLayoutEffect";
import Button from "../../components/button/Button";
import { surfaceSpring } from "./motion";

export default function NoteTransition() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState("");
  const [draft, setDraft] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const interacted = useRef(false);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const spring = reducedMotion ? { duration: 0 } : { type: "spring" as const, ...surfaceSpring };

  useEffect(() => {
    if (!saved || open) return;
    const timer = window.setTimeout(() => setSaved(false), 2400);
    return () => window.clearTimeout(timer);
  }, [saved, open]);

  useIsomorphicLayoutEffect(() => {
    if (!interacted.current) return;
    if (open) input.current?.focus({ preventScroll: true });
    else trigger.current?.focus({ preventScroll: true });
  }, [open]);

  function openEditor() {
    interacted.current = true;
    setDraft(note);
    setSaved(false);
    setOpen(true);
  }

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    setNote(draft);
    setSaved(true);
    setOpen(false);
  }

  return <section aria-labelledby="note-transition-title" onKeyDown={(event) => { if (event.key === "Escape" && open) { event.stopPropagation(); setOpen(false); } }}>
    <h2 id="note-transition-title" className="font-medium">From action to editor</h2>
    <p className="mt-2 text-neutral-600 dark:text-neutral-400">A button becomes a place to write, then folds back into a little confirmation.</p>
    <div className="relative mt-5 flex h-[480px] items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-50/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(23,23,23,0.04),0_3px_6px_rgba(23,23,23,0.025)] dark:border-neutral-800 dark:bg-neutral-900/40 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.18),0_3px_6px_rgba(0,0,0,0.12)]">
      <motion.div data-slot="note-surface" tabIndex={-1} initial={false} animate={{ width: open ? 360 : saved ? 104 : 130, scale: 1 }} whileHover={!open && !reducedMotion ? { scale: 1.02 } : undefined} whileTap={!open && !reducedMotion ? { scale: 0.98 } : undefined} transition={spring} className={`max-w-full overflow-hidden rounded-2xl border shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-colors duration-200 motion-reduce:transition-none ${saved && !open ? "border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950" : "border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800"}`}>
        <motion.button ref={trigger} type="button" aria-label={saved ? "Saved" : "Create note"} aria-expanded={open} aria-controls={id} aria-hidden={open || undefined} tabIndex={open ? -1 : 0} onClick={openEditor} initial={false} animate={{ height: open ? 0 : 40, opacity: open ? 0 : 1 }} transition={{ height: spring, opacity: { duration: reducedMotion ? 0 : 0.08 } }} className={`grid w-full place-items-center overflow-hidden text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-neutral-400 ${open ? "pointer-events-none" : "cursor-pointer"}`}>
          <span aria-live="polite" className="sr-only">{saved ? "Saved" : "Create note"}</span>
          <AnimatePresence initial={false}>
            <motion.span key={saved ? "saved" : "create"} aria-hidden="true" initial={{ opacity: 0, y: reducedMotion ? 0 : 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -4 }} transition={{ duration: reducedMotion ? 0 : 0.16, ease: "easeOut" }} className={`col-start-1 row-start-1 inline-flex items-center gap-2 whitespace-nowrap ${saved ? "text-sky-700 dark:text-sky-300" : "text-neutral-800 dark:text-neutral-100"}`}>{saved ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}{saved ? "Saved" : "Create note"}</motion.span>
          </AnimatePresence>
        </motion.button>
        <motion.div id={id} aria-hidden={!open} initial={false} animate={{ height: open ? "auto" : 0 }} transition={spring} className="overflow-hidden">
          <motion.form onSubmit={saveNote} initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : open ? 0.12 : 0.06, delay: reducedMotion || !open ? 0 : 0.06 }} className={`w-[358px] max-w-[calc(100vw-4.75rem)] ${open ? "" : "pointer-events-none"}`}>
            <fieldset disabled={!open} className="min-w-0 border-0 p-5">
              <label htmlFor={`${id}-note`} className="sr-only">Note</label>
              <textarea ref={input} id={`${id}-note`} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={500} rows={4} placeholder="Write something…" className="block w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm leading-relaxed text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-400" />
              <div className="mt-4 flex items-center justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="min-h-9 cursor-pointer rounded-lg px-3 text-xs font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100">Cancel</button><Button type="submit" disabled={!draft.trim()} className="[--ik-button-background:#171717] [--ik-button-color:#fff] [--ik-button-hover-background:#404040] [--ik-button-shadow:none] dark:[--ik-button-background:#f5f5f5] dark:[--ik-button-color:#171717] dark:[--ik-button-hover-background:#fff]">Save note</Button></div>
            </fieldset>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
    <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">The note is kept on this page until you reload; it isn’t sent anywhere.</p>
  </section>;
}
