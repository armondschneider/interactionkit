"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { ArrowDownToLine, ArrowRight, RotateCcw, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type Stage = "idle" | "downloading" | "ready";

function DocumentPreview({ stage, progress, hovered }: { stage: Stage; progress: number; hovered: boolean }) {
  const reducedMotion = useReducedMotion();
  const strokeId = useId().replace(/:/g, "");
  const separated = hovered && !reducedMotion;
  const spring = reducedMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 440, damping: 26, mass: 0.6 };

  return (
    <div aria-hidden="true" className="relative size-12 shrink-0">
      <motion.div initial={false} animate={{ x: separated ? -1.5 : 0, y: separated ? -1.5 : 0, rotate: separated ? 0 : 3 }} transition={spring} className="absolute left-1 top-1 h-10 w-[34px] rounded-lg border border-transparent bg-linear-to-b from-white to-neutral-50 px-1.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.07)] dark:from-neutral-700 dark:to-neutral-800 dark:shadow-black/20">
        <svg viewBox="0 0 34 40" fill="none" className="pointer-events-none absolute -inset-px h-[40px] w-[34px]">
          <defs>
            <linearGradient id={strokeId} x1="0" y1="0" x2="34" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="currentColor" className="text-neutral-200 dark:text-neutral-500" />
              <stop offset="1" stopColor="currentColor" className="text-neutral-300 dark:text-neutral-700" />
            </linearGradient>
          </defs>
          <rect x="0.5" y="0.5" width="33" height="39" rx="7.5" stroke={`url(#${strokeId})`} />
        </svg>
        <div className="mb-1 h-[2px] rounded-full bg-neutral-400/80 dark:bg-neutral-300/80" />
        {["w-full", "w-4/5", "w-full", "w-3/5", "w-4/5"].map((width, index) => (
          <div key={index} className="mt-[2px] flex items-center gap-[2px]">
            <span className="size-[2px] shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-500" />
            <span className={`h-[2px] rounded-full bg-neutral-200 dark:bg-neutral-500 ${width}`} />
          </div>
        ))}
      </motion.div>
      <motion.div initial={false} animate={{ x: separated ? 1.5 : 0, y: separated ? 1.5 : 0 }} transition={spring} className={`absolute bottom-0 right-0 grid size-5 place-items-center rounded-full ring-2 ring-white transition-colors duration-150 dark:ring-neutral-800 ${stage === "ready" ? "bg-green-500 text-white dark:bg-green-500 dark:text-white" : stage === "downloading" ? "bg-violet-50 text-violet-500 dark:bg-violet-950 dark:text-violet-400" : "bg-neutral-200 text-neutral-500 dark:bg-neutral-600 dark:text-neutral-200"}`}>
        <AnimatePresence initial={false}>
          <motion.span
            key={stage}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.55, rotate: stage === "downloading" ? -35 : -12, y: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{
              opacity: 0,
              scale: reducedMotion ? 1 : 0.55,
              rotate: reducedMotion ? 0 : 20,
              y: reducedMotion ? 0 : 4,
              transition: { duration: reducedMotion ? 0 : 0.1, ease: "easeIn" },
            }}
            transition={reducedMotion ? { duration: 0 } : {
              type: "spring", stiffness: 480, damping: 25, mass: 0.55,
              opacity: { duration: 0.12, ease: "easeOut" },
            }}
            className="absolute inset-0 grid place-items-center"
          >
            {stage === "ready" ? (
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                <motion.path d="m5 10 3.2 3.2L15 6.5" initial={reducedMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }} />
              </svg>
            ) : stage === "downloading" ? (
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" className="size-5 -rotate-90">
                <circle cx="12" cy="12" r="8" className="stroke-violet-200 dark:stroke-violet-900" />
                <motion.circle cx="12" cy="12" r="8" pathLength="1" stroke="currentColor" strokeDasharray="1" strokeLinecap="round" initial={false} animate={{ strokeDashoffset: 1 - Math.max(0.06, progress / 100) }} transition={{ duration: reducedMotion ? 0 : 0.08, ease: "linear" }} />
              </svg>
            ) : <ArrowDownToLine size={12} strokeWidth={2.6} />}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function DownloadFileDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const trigger = useRef<HTMLButtonElement>(null);
  const file = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);

  // Demo-only progress. In production, supply progress from the real transfer.
  useEffect(() => {
    if (stage !== "downloading") return;
    const timer = window.setInterval(() => setProgress((value) => Math.min(100, value + 4)), 80);
    return () => window.clearInterval(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === "downloading" && progress === 100) {
      restoreFocus.current = document.activeElement === trigger.current;
      setStage("ready");
    }
  }, [progress, stage]);

  useEffect(() => {
    if (!restoreFocus.current) return;
    (stage === "ready" ? file : trigger).current?.focus({ preventScroll: true });
    restoreFocus.current = false;
  }, [stage]);

  function reset(keyboard: boolean) {
    restoreFocus.current = keyboard;
    setStage("idle");
    setProgress(0);
  }

  const transition = reducedMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 460, damping: 27, mass: 0.65 };
  const contentMotion = {
    initial: reducedMotion ? false as const : { opacity: 0, y: 4, filter: "blur(2px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: reducedMotion ? 0 : -4, filter: reducedMotion ? "blur(0px)" : "blur(2px)" },
    transition: reducedMotion ? { duration: 0 } : { duration: 0.16, ease: "easeOut" as const },
  };

  return (
    <div className="flex h-40 w-[calc(100%-2rem)] max-w-[264px] flex-col items-center justify-center gap-3">
      <motion.div
        initial={false}
        animate={{ width: stage === "ready" ? "100%" : stage === "downloading" ? 224 : 184, borderRadius: 14 }}
        transition={transition}
        whileTap={stage === "downloading" || reducedMotion ? undefined : { scale: 0.98 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative h-[72px] max-w-full shrink-0 border border-neutral-200/50 bg-white text-neutral-800 dark:border-neutral-700/50 dark:bg-neutral-800 dark:text-neutral-100"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center gap-3 px-4">
          <DocumentPreview stage={stage} progress={progress} hovered={hovered && stage === "idle"} />
          <div className="relative h-full min-w-0 flex-1">
            <AnimatePresence initial={false}>
              <motion.div key={stage} {...contentMotion} className="absolute inset-0 flex flex-col justify-center whitespace-nowrap">
                <span className="truncate text-xs font-medium leading-4">{stage === "idle" ? "Download file" : stage === "downloading" ? "Downloading" : "studio-mark.svg"}</span>
                {stage === "ready" && <span className="mt-0.5 truncate text-[10px] leading-3 text-neutral-400 dark:text-neutral-400">SVG · Complete</span>}
              </motion.div>
            </AnimatePresence>
          </div>
          {stage === "downloading" && <span aria-hidden="true" data-progress={progress} className="inline-flex w-[42px] shrink-0 justify-center rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-medium tabular-nums text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
            <NumberFlow value={progress} suffix="%" animated={!reducedMotion} transformTiming={{ duration: 180, easing: "ease-out" }} spinTiming={{ duration: 180, easing: "ease-out" }} opacityTiming={{ duration: 100, easing: "ease-out" }} />
          </span>}
          {stage === "ready" && <span className="grid size-7 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"><ArrowRight size={15} strokeWidth={2.5} /></span>}
        </div>

        {stage === "ready" ? (
          <div ref={file} role="group" tabIndex={-1} aria-label="Download complete: studio-mark.svg" className="absolute inset-0 rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-400 dark:focus-visible:outline-neutral-500" />
        ) : (
          <button ref={trigger} type="button" aria-label={stage === "downloading" ? "Downloading file" : "Download file"} aria-disabled={stage === "downloading"} onClick={() => { if (stage === "idle") setStage("downloading"); }} className="absolute inset-0 cursor-pointer rounded-[14px] transition-colors hover:bg-neutral-500/5 aria-disabled:cursor-progress aria-disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-400 dark:hover:bg-white/5 dark:focus-visible:outline-neutral-500" />
        )}
      </motion.div>

      <div className="flex h-8 items-center justify-center text-[11px] text-neutral-400 dark:text-neutral-500">
        <AnimatePresence initial={false}>
        {stage !== "idle" && (
          <motion.button
            key="secondary-action"
            type="button"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.9, transition: { duration: reducedMotion ? 0 : 0.1, ease: "easeIn" } }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }}
            onClick={(event) => reset(event.detail === 0)}
            className="flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full bg-neutral-100 px-3 text-neutral-500 transition-colors hover:bg-neutral-200/70 hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus-visible:outline-neutral-500"
          >
            {stage === "downloading" ? <X size={11} aria-hidden="true" /> : <RotateCcw size={11} aria-hidden="true" />}
            {stage === "downloading" ? "Cancel" : "Try again"}
          </motion.button>
        )}
        </AnimatePresence>
      </div>
      <span role="status" className="sr-only">{stage === "downloading" ? "Downloading sample file." : stage === "ready" ? "Download complete. studio-mark.svg." : "Ready to download."}</span>
    </div>
  );
}
