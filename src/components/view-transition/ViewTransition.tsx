"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./styles.module.css";
import { contentTiming, surfaceSpring } from "./motion";
import { useIsomorphicLayoutEffect } from "../internal/useIsomorphicLayoutEffect";

export type ViewTransitionSpring = { stiffness?: number; damping?: number; mass?: number };
export type ViewTransitionSize = "sm" | "md" | "lg";
const widths: Record<ViewTransitionSize, number> = { sm: 200, md: 240, lg: 320 };
export type ViewTransitionProps = {
  /** Content inside the native trigger button. Do not place interactive elements here. */
  trigger: ReactNode | ((open: boolean) => ReactNode);
  children: ReactNode | ((controls: { close: () => void }) => ReactNode);
  triggerLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Expanded-width preset. Defaults to "md". */
  size?: ViewTransitionSize;
  /** Override the content-sized trigger width in pixels. */
  closedWidth?: number;
  /** Override the preset's expanded width in pixels. */
  openWidth?: number;
  spring?: ViewTransitionSpring;
  contentDelay?: number;
  closeOnOutsideClick?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export default function ViewTransition({
  trigger, children, triggerLabel, open: controlledOpen, defaultOpen = false, onOpenChange,
  size = "md", closedWidth, openWidth, spring, contentDelay = contentTiming.enterDelay,
  closeOnOutsideClick = true, className = "", triggerClassName = "", contentClassName = "",
}: ViewTransitionProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [hydrated, setHydrated] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => { setHydrated(true); }, []);

  function requestOpen(next: boolean) {
    if (next === open) return;
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  useIsomorphicLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (!open && content.contains(document.activeElement)) triggerRef.current?.focus();
    content.toggleAttribute("inert", !open);
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    const content = contentRef.current;
    if (!content || !open) { setScrollable(false); return; }
    const measure = () => setScrollable(content.scrollHeight > content.clientHeight + 1);
    measure();
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    const mutations = typeof MutationObserver === "undefined" ? null : new MutationObserver(measure);
    resize?.observe(content);
    mutations?.observe(content, { childList: true, subtree: true, characterData: true });
    window.addEventListener("resize", measure);
    return () => { resize?.disconnect(); mutations?.disconnect(); window.removeEventListener("resize", measure); };
  }, [open, children]);

  useEffect(() => {
    if (!open || !closeOnOutsideClick) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) requestOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  });

  const transition = reducedMotion ? { duration: 0 } : { type: "spring" as const, ...surfaceSpring, ...spring };

  return <motion.div ref={rootRef} data-slot="view-transition" tabIndex={-1} initial={false} animate={{ width: open ? (openWidth ?? widths[size] ?? widths.md) : (closedWidth ?? "auto"), scale: 1 }} whileHover={!open && !reducedMotion ? { scale: 1.02 } : undefined} whileTap={!open && !reducedMotion ? { scale: 0.98 } : undefined} transition={transition} className={`${styles.surface} ${className}`} onKeyDown={(event) => {
    if (event.key === "Escape" && open) { event.stopPropagation(); requestOpen(false); triggerRef.current?.focus(); }
  }}>
    <button ref={triggerRef} type="button" aria-label={triggerLabel} aria-expanded={open} aria-controls={id} onClick={() => requestOpen(!open)} className={`${styles.trigger} ${triggerClassName}`}>
      {typeof trigger === "function" ? trigger(open) : trigger}
    </button>
    <motion.div initial={false} animate={{ height: open ? "auto" : 0 }} transition={transition} className={styles.reveal}>
      <motion.div ref={contentRef} id={id} aria-hidden={!open} role={open && scrollable ? "region" : undefined} aria-label={open && scrollable ? (triggerLabel ?? (typeof trigger === "string" ? trigger : "Expanded content")) : undefined} tabIndex={open && scrollable ? 0 : -1} data-initial-hidden={!open && !hydrated ? "" : undefined} initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : open ? contentTiming.enterDuration : contentTiming.exitDuration, delay: reducedMotion || !open ? 0 : Math.max(0, contentDelay), ease: "easeOut" }} className={`${styles.content} ${contentClassName}`}>
        {typeof children === "function" ? children({ close: () => requestOpen(false) }) : children}
      </motion.div>
    </motion.div>
  </motion.div>;
}
