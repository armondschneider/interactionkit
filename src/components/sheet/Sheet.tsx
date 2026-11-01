"use client";

import { AnimatePresence, animate, motion, useDragControls, useMotionValue, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react";
import { useModalLifecycle } from "../internal/useModalLifecycle";
import { shouldDismissSheet } from "./drag";
import Button from "../button/Button";
import primitives from "../internal/primitives.module.css";
import styles from "./styles.module.css";

export type SheetProps = {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  /** Button content. Pass null when using your own controlled trigger. */
  trigger?: ReactNode;
  triggerLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Disable backdrop, Escape, and drag dismissal; the close button still works. */
  dismissible?: boolean;
  draggable?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  closeLabel?: string;
  className?: string;
  triggerClassName?: string;
  bodyClassName?: string;
};

export default function Sheet({
  title, description, children, footer, trigger = "Open sheet", triggerLabel,
  open: controlledOpen, defaultOpen = false, onOpenChange,
  dismissible = true, draggable = true, initialFocusRef, closeLabel = "Close sheet",
  className = "", triggerClassName = "", bodyClassName = "",
}: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const openRef = useRef(open);
  openRef.current = open;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const settleFrameRef = useRef<number | null>(null);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const controls = useDragControls();
  const y = useMotionValue<number | string>(0);
  const canDrag = draggable && dismissible;

  const { dialogRef, present, finishClosing } = useModalLifecycle({
    open,
    initialFocusRef: initialFocusRef ?? closeRef,
    returnFocusRef: triggerRef,
    onExitComplete: () => { y.stop(); y.set(0); },
  });

  useEffect(() => () => {
    if (settleFrameRef.current !== null) cancelAnimationFrame(settleFrameRef.current);
    y.stop();
  }, [y]);

  function requestOpen(next: boolean) {
    if (next === open) return;
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  function settle(velocity = 0) {
    animate(y, 0, { type: "spring", stiffness: 550, damping: 42, velocity });
  }

  return (
    <>
      {trigger !== null && (
        <Button
          ref={triggerRef}
          type="button"
          tabIndex={0}
          aria-label={triggerLabel}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={`${id}-dialog`}
          onClick={() => requestOpen(true)}
          size="sm"
          className={triggerClassName}
        >{trigger}</Button>
      )}

      <dialog
        ref={dialogRef}
        id={`${id}-dialog`}
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-description` : undefined}
        onCancel={(event) => { event.preventDefault(); event.stopPropagation(); if (dismissible) requestOpen(false); }}
        className={`${primitives.dialog} ${styles.dialog}`}
      >
        <AnimatePresence onExitComplete={finishClosing}>
          {present && (
            <motion.div key="sheet" className={primitives.layer}>
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.16, ease: "easeIn" } }}
                transition={{ duration: reducedMotion ? 0 : 0.16, ease: "easeOut" }}
                onClick={() => { if (dismissible) requestOpen(false); }}
                className={`${primitives.layer} ${styles.backdrop}`}
              />
              <div className={styles.container}>
                <motion.section
                  ref={panelRef}
                  data-slot="sheet-content"
                  initial={reducedMotion ? false : { y: "100%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: reducedMotion ? "none" : "blur(0px)" }}
                  exit={{ ...(reducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0, filter: "blur(6px)" }), transition: { duration: reducedMotion ? 0 : 0.16, ease: "easeIn" } }}
                  transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                  style={{ y }}
                  drag={canDrag ? "y" : false}
                  dragControls={controls}
                  dragListener={false}
                  dragMomentum={false}
                  onDrag={(_, info) => { if (info.offset.y < 0) y.set(0); }}
                  onDragEnd={(_, info) => {
                    const height = panelRef.current?.getBoundingClientRect().height ?? 0;
                    if (canDrag && shouldDismissSheet(info.offset.y, info.velocity.y, height)) {
                      requestOpen(false);
                      // A controlled parent can reject a dismissal. Recenter
                      // only if it has kept the sheet open on the next frame.
                      if (settleFrameRef.current !== null) cancelAnimationFrame(settleFrameRef.current);
                      settleFrameRef.current = requestAnimationFrame(() => {
                        if (openRef.current) settle();
                        settleFrameRef.current = null;
                      });
                    } else settle(info.velocity.y);
                  }}
                  className={`${styles.content} ${className}`}
                >
                  {canDrag && (
                    <div data-slot="sheet-handle" aria-hidden="true" onPointerDown={(event) => controls.start(event)} className={styles.handle}>
                      <span className={styles.handleBar} />
                    </div>
                  )}
                  <header className={styles.header}>
                    <div className={styles.heading}>
                      <h2 id={`${id}-title`} className={styles.title}>{title}</h2>
                      {description && <p id={`${id}-description`} className={styles.description}>{description}</p>}
                    </div>
                    <button ref={closeRef} type="button" onClick={() => requestOpen(false)} aria-label={closeLabel} className={styles.close}><X size={16} aria-hidden="true" /></button>
                  </header>
                  <div data-slot="sheet-body" className={`${styles.body} ${bodyClassName}`}>{children}</div>
                  {footer && <footer className={styles.footer}>{footer}</footer>}
                </motion.section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}
