"use client";

import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useModalLifecycle } from "../internal/useModalLifecycle";
import { shouldDismissImage } from "./drag";
import primitives from "../internal/primitives.module.css";
import styles from "./styles.module.css";

export type ImageViewerProps = {
  src: string;
  alt: string;
  thumbnailSrc?: string;
  caption?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  openLabel?: string;
  closeLabel?: string;
  loading?: "eager" | "lazy";
};

export default function ImageViewer({
  src, alt, thumbnailSrc, caption, open: controlledOpen, defaultOpen = false,
  onOpenChange, className = "", imageClassName = "", contentClassName = "",
  openLabel, closeLabel = "Close image", loading = "lazy",
}: ImageViewerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const [ratio, setRatio] = useState(4 / 3);
  const [failed, setFailed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const thumbnailRef = useRef<HTMLImageElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const transition = { duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] as const };

  const { dialogRef, present, finishClosing } = useModalLifecycle({
    open,
    initialFocusRef: closeRef,
    returnFocusRef: triggerRef,
    onExitComplete: () => {
      x.stop();
      y.stop();
      x.set(0);
      y.set(0);
    },
  });

  function requestOpen(next: boolean) {
    if (next === open) return;
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  function updateRatio(image: HTMLImageElement) {
    if (image.naturalWidth && image.naturalHeight) setRatio(image.naturalWidth / image.naturalHeight);
  }

  useLayoutEffect(() => {
    if (open) {
      if (thumbnailRef.current) updateRatio(thumbnailRef.current);
      setFailed(false);
    }
  }, [open, src]);

  return (
    <LayoutGroup id={`ik-image-${id}`}>
      <motion.button
        ref={triggerRef}
        type="button"
        tabIndex={0}
        aria-label={openLabel ?? `Open image: ${alt || "Image preview"}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-dialog`}
        layoutId={reducedMotion ? undefined : "image"}
        transition={{ ...transition, scale: { type: "spring", stiffness: 450, damping: 32 } }}
        whileHover={!reducedMotion && !open ? { scale: 1.02 } : undefined}
        whileTap={reducedMotion ? undefined : { scale: 0.98 }}
        onClick={() => requestOpen(true)}
        className={`${styles.trigger} ${className}`}
      >
        <img
          ref={thumbnailRef}
          src={thumbnailSrc ?? src}
          alt={alt}
          loading={loading}
          draggable={false}
          onLoad={(event) => { if (!open) updateRatio(event.currentTarget); }}
          className={`${styles.thumbnail} ${imageClassName}`}
        />
      </motion.button>

      <dialog
        ref={dialogRef}
        id={`${id}-dialog`}
        aria-label={alt || "Image preview"}
        aria-describedby={`${id}-instructions`}
        onCancel={(event) => { event.preventDefault(); event.stopPropagation(); requestOpen(false); }}
        className={`${primitives.dialog} ${styles.dialog}`}
      >
        <AnimatePresence onExitComplete={finishClosing}>
          {present && (
            <motion.div key="viewer" layoutRoot className={primitives.layer}>
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                onClick={() => requestOpen(false)}
                className={`${primitives.layer} ${styles.backdrop}`}
              />
              <div className={styles.container}>
                <motion.figure
                  drag
                  dragMomentum={false}
                  style={{ x, y }}
                  onDragStart={() => { x.stop(); y.stop(); }}
                  onDragEnd={(_, info) => {
                    if (shouldDismissImage(info.offset, info.velocity)) requestOpen(false);
                    else {
                      const spring = { type: "spring" as const, stiffness: 450, damping: 38 };
                      animate(x, 0, { ...spring, velocity: info.velocity.x });
                      animate(y, 0, { ...spring, velocity: info.velocity.y });
                    }
                  }}
                  className={styles.figure}
                >
                  <motion.div
                    layout={!reducedMotion}
                    layoutId={reducedMotion ? undefined : "image"}
                    transition={transition}
                    style={{ aspectRatio: ratio, width: `min(88vw, 760px, ${ratio * 75}dvh)` }}
                    className={`${styles.content} ${contentClassName}`}
                  >
                    {failed ? (
                      <p role="status" className={styles.error}>This image couldn’t be loaded.</p>
                    ) : (
                      <img src={src} alt={alt} draggable={false} onLoad={(event) => updateRatio(event.currentTarget)} onError={() => setFailed(true)} className={styles.image} />
                    )}
                  </motion.div>
                  {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
                </motion.figure>
              </div>
              <motion.button
                ref={closeRef}
                type="button"
                aria-label={closeLabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.15 }}
                onClick={() => requestOpen(false)}
                className={styles.close}
              ><X size={18} aria-hidden="true" /></motion.button>
              <p id={`${id}-instructions`} className={primitives.srOnly}>Drag the image to dismiss it, press Escape, or use the close button.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </LayoutGroup>
  );
}
