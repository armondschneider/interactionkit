"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { contentTiming, surfaceSpring } from "./motion";

function Wireframe({ connected, open, reduced }: { connected: boolean; open: boolean; reduced: boolean | null }) {
  const spring = reduced ? { duration: 0 } : { type: "spring" as const, ...surfaceSpring };
  return <div className="min-w-0">
    <div aria-hidden="true" className="relative h-56 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100/70 dark:border-neutral-700 dark:bg-neutral-800/50">
      <div className="absolute left-4 top-4 flex w-20 flex-col gap-2 opacity-60"><span className="h-1.5 w-10 rounded-full bg-neutral-400 dark:bg-neutral-500" /><span className="h-1.5 w-20 rounded-full bg-neutral-300 dark:bg-neutral-600" /></div>
      {connected ? <motion.div initial={false} animate={{ width: open ? 132 : 46, height: open ? 102 : 28, borderRadius: open ? 12 : 8 }} transition={spring} className="absolute left-1/2 top-[70px] max-w-[calc(100%-1rem)] -translate-x-1/2 overflow-hidden border border-neutral-300 bg-white shadow-sm dark:border-neutral-600 dark:bg-neutral-700">
        <div className="absolute left-2.5 top-3 h-1 w-6 rounded-full bg-neutral-400 dark:bg-neutral-400" />
        <motion.div initial={false} animate={{ opacity: open ? 1 : 0 }} transition={reduced ? { duration: 0 } : { duration: open ? contentTiming.enterDuration : contentTiming.exitDuration, delay: open ? contentTiming.enterDelay : 0 }} className="absolute left-2.5 top-9 flex w-24 flex-col gap-2"><span className="h-1 w-20 rounded-full bg-neutral-200 dark:bg-neutral-500" /><span className="h-1 w-14 rounded-full bg-neutral-200 dark:bg-neutral-500" /><span className="mt-1 h-5 w-24 rounded bg-neutral-100 dark:bg-neutral-600" /></motion.div>
      </motion.div> : <>
        <div className="absolute left-1/2 top-[70px] h-7 w-[46px] -translate-x-1/2 rounded-lg border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-700"><span className="absolute left-2.5 top-3 h-1 w-6 rounded-full bg-neutral-400 dark:bg-neutral-400" /></div>
        <motion.div initial={false} animate={{ opacity: open ? 1 : 0 }} transition={reduced ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }} className="absolute left-1/2 top-[104px] h-[102px] w-[132px] max-w-[calc(100%-1rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-neutral-300 bg-white p-2.5 shadow-sm dark:border-neutral-600 dark:bg-neutral-700"><div className="flex flex-col gap-2"><span className="h-1 w-6 rounded-full bg-neutral-400 dark:bg-neutral-400" /><span className="mt-3 h-1 w-20 rounded-full bg-neutral-200 dark:bg-neutral-500" /><span className="h-1 w-14 rounded-full bg-neutral-200 dark:bg-neutral-500" /><span className="mt-1 h-5 w-24 rounded bg-neutral-100 dark:bg-neutral-600" /></div></motion.div>
      </>}
    </div>
    <p className="mt-3 font-medium">{connected ? "Connected" : "Fade"}</p>
    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{connected ? "The trigger becomes the surface." : "The surface appears independently."}</p>
  </div>;
}

export default function TransitionComparison() {
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const preference = useReducedMotion();
  const reduced = mounted ? preference : null;
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (paused || reduced !== false) return;
    const timer = window.setInterval(() => setOpen((current) => !current), 1600);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);
  return <section aria-labelledby="comparison-title" className="rounded-xl border border-neutral-200 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(23,23,23,0.04),0_3px_6px_rgba(23,23,23,0.025)] sm:p-6 dark:border-neutral-800 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.18),0_3px_6px_rgba(0,0,0,0.12)]">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 id="comparison-title" className="font-medium">Two ways to open</h2><p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">One action, two transitions.</p></div><button type="button" onClick={() => reduced ? setOpen((current) => !current) : setPaused((current) => !current)} className="min-h-9 rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium hover:bg-neutral-50 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700">{reduced ? (open ? "Close both" : "Open both") : (paused ? "Play" : "Pause")}</button></div>
    <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5"><Wireframe connected={false} open={open} reduced={reduced} /><Wireframe connected open={open} reduced={reduced} /></div>
  </section>;
}
