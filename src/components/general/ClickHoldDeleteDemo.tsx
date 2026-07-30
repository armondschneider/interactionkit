"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ClickHoldButton from "./ClickHoldButton";

const resetDelay = 2200;
export default function ClickHoldDeleteDemo() {
  const [isDeleted, setIsDeleted] = useState(false);
  const restoreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const deleteImage = () => {
    setIsDeleted(true);
    restoreTimer.current = setTimeout(() => setIsDeleted(false), resetDelay);
  };

  useEffect(() => () => {
    if (restoreTimer.current) clearTimeout(restoreTimer.current);
  }, []);

  return (
    <div className="flex min-h-64 flex-col items-center justify-end gap-5">
      <div className={`relative grid h-36 w-52 place-items-center overflow-visible rounded-xl transition-colors duration-150 ${isDeleted ? "border-0 bg-transparent" : "border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"}`}>
        <AnimatePresence initial={false}>
          {!isDeleted && (
            <motion.img
              key="delete-demo-image"
              src="https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=520&auto=format&fit=crop"
              alt="A small house among trees"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 4, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={prefersReducedMotion ? { opacity: 0 } : {
                opacity: [1, 1, 0],
                scaleX: [1, 0.82, 0.16],
                scaleY: [1, 0.85, 0.08],
                y: [0, 12, 38],
                clipPath: [
                  "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  "polygon(0% 0%, 100% 0%, 68% 100%, 32% 100%)",
                  "polygon(44% 0%, 56% 0%, 52% 100%, 48% 100%)",
                ],
                transition: { duration: 0.32, times: [0, 0.52, 1], ease: "easeIn" },
              }}
              transition={prefersReducedMotion ? { duration: 0.15 } : {
                opacity: { duration: 0.18, ease: "easeOut" },
                filter: { duration: 0.24, ease: "easeOut" },
                scale: { type: "spring", stiffness: 340, damping: 24 },
                y: { type: "spring", stiffness: 340, damping: 24 },
              }}
              style={{ transformOrigin: "50% 100%" }}
              className="absolute inset-0 h-full w-full rounded-xl object-cover"
            />
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ClickHoldButton onConfirm={deleteImage} resetAfter={resetDelay} />
      </div>
    </div>
  );
}
