"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  layoutId?: string;
  className?: string;
  expandedClassName?: string;
  backdropClassName?: string;
  animateLayout?: boolean;
};

export default function ImageModal({ src, alt = '', layoutId, className = '', expandedClassName = '', backdropClassName = '', animateLayout = false }: Props) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const id = layoutId || `img-modal-${src.slice(-10)}`;
  const image = open ? { src, alt } : null;
  const onClose = () => setOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (image) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [image]);

  useEffect(() => {
    if (!image) return;
    const prev = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [image]);

  const closeIfDragged = (offset: { x: number; y: number }, velocity: { x: number; y: number }) => {
    const threshold = 140;
    const velocityThreshold = 650; 
    const didClose =
      Math.abs(offset.x) > threshold ||
      Math.abs(offset.y) > threshold ||
      Math.abs(velocity.x) > velocityThreshold ||
      Math.abs(velocity.y) > velocityThreshold;
    return didClose;
  };

  const viewTransition = { duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] as const };

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateZ = useTransform(mvX, [-300, 300], [-2.5, 2.5]);
  const rotateX = useTransform(mvY, [-300, 300], [2.5, -2.5]);

  const resetDrag = () => {
    mvX.stop();
    mvY.stop();
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <LayoutGroup id={`image-modal-${id}`}>
      <motion.button
        layout={animateLayout}
        layoutId={id}
        type="button"
        onClick={() => { resetDrag(); setOpen(true); }}
        className={`relative h-48 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-100 transition-shadow hover:shadow-lg dark:bg-neutral-800 sm:h-56 md:h-64 ${className}`}
        aria-label={`Open ${alt}`}
        whileHover={reducedMotion ? undefined : { scale: 1.01 }}
        transition={viewTransition}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover" 
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px" 
          priority 
        />
      </motion.button>

      <AnimatePresence onExitComplete={resetDrag}>
        {image && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
              className={`fixed inset-0 z-[60] cursor-pointer bg-black/40 backdrop-blur-md ${backdropClassName}`}
              onClick={onClose}
            />

            <motion.div
              key="container"
              className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
            >
            <motion.div
              drag
              dragMomentum={false}
              style={{
                x: mvX, 
                y: mvY, 
                rotateZ: reducedMotion ? 0 : rotateZ,
                rotateX: reducedMotion ? 0 : rotateX,
              }}
              onDragStart={() => { mvX.stop(); mvY.stop(); }}
              onDragEnd={(_, info) => {
                const shouldClose = closeIfDragged(info.offset, info.velocity);
                if (shouldClose) {
                  // Let the shared layout return from the released position.
                  // Momentum and an early reset would fight that transition.
                  mvX.stop();
                  mvY.stop();
                  onClose();
                } else {
                  const spring = { type: "spring" as const, stiffness: 450, damping: 38 };
                  animate(mvX, 0, spring);
                  animate(mvY, 0, spring);
                }
              }}
              whileDrag={reducedMotion ? undefined : { scale: 1.01 }}
              className="pointer-events-auto cursor-grab touch-none [perspective:1200px] [will-change:transform] active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                layoutId={id}
                transition={viewTransition}
                className={`aspect-video w-[min(900px,92vw)] max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-sm dark:bg-neutral-900 ${expandedClassName}`}
              >
              <div className="relative h-full w-full bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={image.src}
                  alt={image.alt ?? ""}
                  fill
                  sizes="(max-width: 640px) 90vw, 900px"
                  className="object-cover min-h-full min-w-full bg-transparent select-none cursor-grab active:cursor-grabbing"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  priority
                />
              </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </LayoutGroup>
  );
}
