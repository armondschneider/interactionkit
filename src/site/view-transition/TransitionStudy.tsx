"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Archive, Copy, FilePlus2, FolderPlus, Link2, Pencil, Plus, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import ViewTransition from "../../components/view-transition/ViewTransition";

const quickActions = [{ label: "New document", Icon: FilePlus2 }, { label: "New folder", Icon: FolderPlus }, { label: "Copy link", Icon: Link2 }];
const moreActions = [{ label: "Rename", Icon: Pencil }, { label: "Duplicate", Icon: Copy }, { label: "Archive", Icon: Archive }];

export default function TransitionStudy() {
  const [active, setActive] = useState<"quick" | "options" | null>(null);
  const [twoTriggers, setTwoTriggers] = useState(false);
  const [selected, setSelected] = useState("");
  const groupRef = useRef<HTMLDivElement>(null);
  const indicatorId = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !groupRef.current?.contains(event.target)) setActive(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [active]);

  function surface(which: "quick" | "options") {
    const isQuick = which === "quick";
    const open = active === which;
    const compact = twoTriggers && active !== null && !open;
    const label = isQuick ? "Quick actions" : "Options";
    const Icon = isQuick ? Plus : SlidersHorizontal;
    const actions = isQuick ? quickActions : moreActions;
    return <ViewTransition key={which} open={open} onOpenChange={(next) => setActive(next ? which : null)} closeOnOutsideClick={false} closedWidth={compact ? 44 : twoTriggers ? (isQuick ? 144 : 104) : 144} openWidth={twoTriggers ? 208 : 240} triggerLabel={`${open ? "Close" : "Open"} ${label.toLowerCase()}`} className="shrink-0 [--ik-view-transition-padding:5px]" triggerClassName={compact ? "!justify-center !px-0" : ""} trigger={(expanded) => <><Icon size={15} aria-hidden="true" className="shrink-0" /><motion.span aria-hidden="true" initial={false} animate={{ width: compact ? 0 : "auto", opacity: compact ? 0 : 1, marginLeft: compact ? 0 : 8 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.14, ease: "easeOut" }} className="overflow-hidden whitespace-nowrap">{label}</motion.span>{expanded && <X size={15} aria-hidden="true" className="ml-auto shrink-0 text-neutral-400 dark:text-neutral-400" />}</>}>
      {({ close }) => actions.map(({ label: action, Icon: ActionIcon }) => <button key={action} type="button" onClick={() => { setSelected(action); close(); }} className="flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-400 active:scale-[0.98] dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700"><ActionIcon size={15} aria-hidden="true" className="shrink-0 text-neutral-400 dark:text-neutral-400" />{action}</button>)}
    </ViewTransition>;
  }

  return <section aria-label="Morph example" className="min-w-0">
    <div className="relative flex h-[280px] justify-center rounded-lg border border-neutral-200/80 bg-neutral-50/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(23,23,23,0.04),0_3px_6px_rgba(23,23,23,0.025)] dark:border-neutral-800 dark:bg-neutral-900/40 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.18),0_3px_6px_rgba(0,0,0,0.12)]">
      <div ref={groupRef} className="absolute inset-x-2 top-16 flex items-start justify-center gap-2">{surface("quick")}{twoTriggers && surface("options")}</div>
      <p role="status" className="absolute bottom-4 text-xs text-neutral-500 dark:text-neutral-400">{selected ? `${selected} selected` : ""}</p>
    </div>
    <div className="mt-3 flex justify-center"><div role="group" aria-label="Number of buttons" className="inline-flex rounded-lg bg-neutral-100 p-0.5 dark:bg-neutral-800">{[{ label: "One button", value: false }, { label: "Two buttons", value: true }].map(({ label, value }) => <button key={label} type="button" aria-pressed={twoTriggers === value} onClick={() => { if (twoTriggers !== value) { setActive(null); setTwoTriggers(value); } }} className={`relative min-h-8 cursor-pointer rounded-md px-3 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${twoTriggers === value ? "text-neutral-800 dark:text-neutral-100" : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"}`}>
      {twoTriggers === value && <motion.span layoutId={indicatorId} transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 700, damping: 45 }} className="absolute inset-0 rounded-md bg-white shadow-[0_1px_3px_rgba(23,23,23,0.08)] dark:bg-neutral-700 dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]" />}
      <span className="relative">{label}</span>
    </button>)}</div></div>
  </section>;
}
