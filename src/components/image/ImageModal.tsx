"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  layoutId?: string;
  className?: string;
};

export default function ImageModal({ src, alt = '', layoutId, className = '' }: Props) {
  const [open, setOpen] = useState(false);
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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
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
    if (didClose) {
      onClose();
    }
    return didClose;
  };

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateZ = useTransform(mvX, [-300, 300], [-2.5, 2.5]);
  const rotateX = useTransform(mvY, [-300, 300], [2.5, -2.5]);

  // Reset motion values when modal closes
  useEffect(() => {
    if (!open) {
      mvX.set(0);
      mvY.set(0);
    }
  }, [open, mvX, mvY]);

  return (
    <>
      <motion.button
        layoutId={id}
        type="button"
        onClick={() => setOpen(true)}
        className={`relative w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-neutral-100 ${className}`}
        aria-label={`Open ${alt}`}
        style={{ cursor: 'zoom-in' }}
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

      <AnimatePresence>
        {image && (
          <>
            <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            key="container"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              layoutId={id}
              drag
              style={{ 
                x: mvX, 
                y: mvY, 
                rotateZ, 
                rotateX, 
                perspective: 1200, 
                willChange: "transform", 
                touchAction: "none",
                position: "fixed",
                top: "50%",
                left: "50%",
                translate: "-50% -50%"
              }}
              dragConstraints={{ top: -90, left: -90, right: 90, bottom: 90 }}
              dragElastic={0.22}
              onDragEnd={(_, info) => {
                const shouldClose = closeIfDragged(info.offset, info.velocity);
                if (shouldClose) {
                  // fling the modal outwards and then close
                  const px = info.offset.x + info.velocity.x * 120;
                  const py = info.offset.y + info.velocity.y * 120;
                  animate(mvX, px, { type: "spring", stiffness: 500, damping: 36 });
                  animate(mvY, py, { type: "spring", stiffness: 500, damping: 36 });
                  // short delay to allow the fling to be visible
                  setTimeout(() => onClose(), 80);
                } else {
                  animate(mvX, 0, { type: "spring", stiffness: 160, damping: 22, velocity: info.velocity.x });
                  animate(mvY, 0, { type: "spring", stiffness: 160, damping: 22, velocity: info.velocity.y });
                }
              }}
              whileDrag={{ scale: 0.995 }}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30,
                opacity: { duration: 0.2 }
              }}
              className="pointer-events-auto w-full max-w-[85vw] max-h-[48vh] rounded-lg overflow-hidden bg-white shadow-sm cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[min(48vh,640px)] bg-neutral-100">
                <Image
                  src={image.src}
                  alt={image.alt ?? ""}
                  fill
                  sizes="(max-width: 640px) 90vw, 800px"
                  className="object-cover min-h-full min-w-full bg-transparent select-none"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
