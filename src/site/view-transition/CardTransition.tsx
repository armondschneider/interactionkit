"use client";

import { AnimatePresence, motion, useDragControls, useMotionValue, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { surfaceSpring } from "./motion";

export default function CardTransition({ dragToClose = true }: { dragToClose?: boolean }) {
  const [open, setOpen] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const [frameWidth, setFrameWidth] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const interacted = useRef(false);
  const dragged = useRef(false);
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const id = useId();
  const guideIndicatorId = useId();
  const reduced = useReducedMotion();
  const transition = reduced ? { duration: 0 } : { type: "spring" as const, ...surfaceSpring };
  const close = () => { setOpen(false); y.set(0); };
  useEffect(() => {
    if (interacted.current) (open ? closeButton : trigger).current?.focus();
  }, [open]);
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const measure = () => setFrameWidth(node.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const compactWidth = Math.min(208, Math.max(0, frameWidth - 32));
  const expandedWidth = Math.min(420, Math.max(0, frameWidth - 32));
  const compactLeft = (frameWidth - compactWidth) / 2;
  const expandedLeft = (frameWidth - expandedWidth) / 2;
  const titleStart = compactLeft + compactWidth * 0.08;
  const titleEnd = expandedLeft + expandedWidth * 0.43;

  return <section aria-labelledby="card-demo-title" onKeyDown={(event) => { if (event.key === "Escape" && open) { event.stopPropagation(); close(); } }}>
    <h2 id="card-demo-title" className="font-medium">From preview to detail</h2>
    <p className="mt-2 text-neutral-600 dark:text-neutral-400">The image changes from a wide crop above the title to a tall crop beside it. The title and description appear in the detail area as the card opens.</p>
    <div ref={frame} className="relative mt-5 flex h-[300px] justify-center rounded-lg border border-neutral-200/80 bg-neutral-50/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(23,23,23,0.04),0_3px_6px_rgba(23,23,23,0.025)] dark:border-neutral-800 dark:bg-neutral-900/40 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.18),0_3px_6px_rgba(0,0,0,0.12)]">
      <motion.div tabIndex={-1} initial={false} animate={{ width: open ? 420 : 208, height: open ? 200 : 190, scale: 1 }} whileHover={!open && !reduced ? { scale: 1.02 } : undefined} whileTap={!open && !reduced ? { scale: 0.98 } : undefined} transition={transition} style={{ y }} drag={open && dragToClose ? "y" : false} dragControls={dragControls} dragListener={false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.45 }} dragMomentum={false} onDrag={(_, info) => { if (Math.abs(info.offset.y) > 5) dragged.current = true; }} onDragEnd={(_, info) => { if (info.offset.y > 80 || (info.offset.y > 20 && info.velocity.y > 600)) close(); window.setTimeout(() => { dragged.current = false; }, 0); }} className="group absolute top-8 max-w-[calc(100%-2rem)]">
      <div className="relative size-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:border-neutral-700 dark:bg-neutral-800">
        <motion.img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop" alt="" draggable={false} initial={false} animate={{ left: 0, top: 0, width: open ? "38%" : "100%", height: open ? 200 : 140, borderRadius: 0 }} transition={transition} className="absolute object-cover" />
        <motion.span aria-hidden={open} initial={false} animate={{ opacity: open ? 0 : 1 }} transition={{ duration: reduced ? 0 : 0.08, delay: reduced || open ? 0 : 0.07 }} className="absolute left-[8%] top-[154px] whitespace-nowrap text-sm font-medium text-neutral-800 dark:text-neutral-100">A quieter place</motion.span>
        <motion.span aria-hidden={!open} initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.1, delay: reduced || !open ? 0 : 0.07 }} className="absolute left-[43%] top-[38px] whitespace-nowrap text-sm font-medium text-neutral-800 dark:text-neutral-100">A quieter place</motion.span>
        <AnimatePresence initial={false}>{open && <motion.div id={id} key="description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.06 } }} transition={{ duration: reduced ? 0 : 0.12, delay: reduced ? 0 : 0.11 }} className="absolute left-[43%] right-5 top-[76px] text-xs leading-relaxed text-neutral-500 dark:text-neutral-400"><p>There’s room to breathe on the long road through the desert.</p><p className="mt-4 text-neutral-400 dark:text-neutral-500">A note from the road</p></motion.div>}</AnimatePresence>
        <button ref={trigger} type="button" aria-expanded={open} aria-controls={open ? id : undefined} aria-label="Open A quieter place" tabIndex={open ? -1 : 0} aria-hidden={open || undefined} onClick={() => { interacted.current = true; setOpen(true); }} className={`absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-neutral-400 ${open ? "pointer-events-none" : "cursor-pointer"}`} />
        {open && <button ref={closeButton} type="button" aria-label="Close A quieter place" onClick={close} className="absolute right-2 top-1 grid size-8 cursor-pointer place-items-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"><X size={16} aria-hidden="true" /></button>}
      </div>
      {open && dragToClose && <button type="button" aria-label="Close card; drag down or press" onPointerDown={(event) => { dragged.current = false; dragControls.start(event); }} onClick={() => { if (!dragged.current) close(); }} className="absolute left-1/2 top-0 grid h-8 w-16 -translate-x-1/2 touch-none cursor-grab place-items-center rounded-lg opacity-100 transition-opacity duration-150 active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-400 [@media(hover:hover)_and_(pointer:fine)]:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:focus-visible:opacity-100"><span aria-hidden="true" className="h-1 w-9 rounded-full bg-neutral-300/70 dark:bg-neutral-400/50" /></button>}
      </motion.div>
      {showGuides && frameWidth > 0 && <svg aria-hidden="true" viewBox={`0 0 ${frameWidth} 300`} className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible">
        <rect x={compactLeft + 1} y="33" width={Math.max(0, compactWidth - 2)} height="139" rx="2" fill="none" className="stroke-blue-500 dark:stroke-blue-400" strokeWidth="1.5" strokeDasharray="5 4" />
        <rect x={expandedLeft + 1} y="33" width={Math.max(0, (expandedWidth - 2) * 0.38)} height="199" rx="2" fill="none" className="stroke-violet-500 dark:stroke-violet-400" strokeWidth="1.5" strokeDasharray="5 4" />
        <path d={`M ${titleStart} 194 L ${titleEnd} 78`} fill="none" className="stroke-neutral-500 dark:stroke-neutral-300" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx={titleStart} cy="194" r="3" className="fill-neutral-700 stroke-white dark:fill-neutral-200 dark:stroke-neutral-900" strokeWidth="1" />
        <circle cx={titleEnd} cy="78" r="3" className="fill-neutral-700 stroke-white dark:fill-neutral-200 dark:stroke-neutral-900" strokeWidth="1" />
      </svg>}
    </div>
    <div className="mt-3 flex justify-center"><div role="group" aria-label="Card display" className="inline-flex rounded-lg bg-neutral-100 p-0.5 dark:bg-neutral-800">{[{ label: "Preview", value: false }, { label: "Motion guides", value: true }].map(({ label, value }) => <button key={label} type="button" aria-pressed={showGuides === value} onClick={() => setShowGuides(value)} className={`relative min-h-8 cursor-pointer rounded-md px-3 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${showGuides === value ? "text-neutral-800 dark:text-neutral-100" : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"}`}>
      {showGuides === value && <motion.span layoutId={guideIndicatorId} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 700, damping: 45 }} className="absolute inset-0 rounded-md bg-white shadow-[0_1px_3px_rgba(23,23,23,0.08)] dark:bg-neutral-700 dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]" />}
      <span className="relative">{label}</span>
    </button>)}</div></div>
    <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">Select the card to expand it. {dragToClose && "Drag the handle down to close, "}or use the close button or Escape.</p>
    {showGuides && <p className="mt-2 text-center text-[11px] italic leading-relaxed text-neutral-500 dark:text-neutral-400">Dashed outlines show the image’s two crops; dots mark the title positions. The title crossfades rather than moving along the line.</p>}
  </section>;
}
