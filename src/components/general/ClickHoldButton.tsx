"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  onConfirm?: () => void;
  duration?: number;
  children?: ReactNode;
  completedLabel?: ReactNode;
  resetAfter?: number;
  className?: string;
};

export default function ClickHoldButton({
  onConfirm,
  duration = 900,
  children = "Hold to delete",
  completedLabel = "Deleted",
  resetAfter,
  className = "",
}: Props) {
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const progress = useMotionValue(0);
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "holding" | "deleted">("idle");

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const reset = () => {
    clearHold();
    progressAnimation.current?.stop();
    progress.set(0);
    setStatus("idle");
  };

  const confirm = () => {
    clearHold();
    setStatus("deleted");
    progress.set(1);
    onConfirm?.();

    if (resetAfter) {
      resetTimer.current = setTimeout(reset, resetAfter);
    }
  };

  const startHold = () => {
    if (status !== "idle") return;

    setStatus("holding");
    progressAnimation.current?.stop();
    progressAnimation.current = animate(progress, 1, {
      duration: duration / 1000,
      ease: "linear",
    });
    holdTimer.current = setTimeout(confirm, duration);
  };

  const cancelHold = () => {
    if (status !== "holding") return;

    clearHold();
    progressAnimation.current?.stop();
    setStatus("idle");

    if (prefersReducedMotion) {
      progress.set(0);
      return;
    }

    progressAnimation.current = animate(progress, 0, {
      type: "spring",
      stiffness: 340,
      damping: 28,
    });
  };

  useEffect(() => () => {
    clearHold();
    if (resetTimer.current) clearTimeout(resetTimer.current);
    progressAnimation.current?.stop();
  }, []);

  return (
    <motion.button
      type="button"
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        startHold();
      }}
      onPointerUp={cancelHold}
      onPointerCancel={cancelHold}
      onKeyDown={(event) => {
        if ((event.key === " " || event.key === "Enter") && !event.repeat) {
          event.preventDefault();
          startHold();
        }
      }}
      onKeyUp={(event) => {
        if (event.key === " " || event.key === "Enter") cancelHold();
      }}
      onBlur={cancelHold}
      animate={{ scale: status === "holding" ? 0.96 : 1 }}
      transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 26, mass: 0.55 }}
      disabled={status === "deleted"}
      aria-label={status === "deleted" ? "Deleted" : "Press and hold to delete"}
      className={`relative inline-flex min-h-9 min-w-32 items-center justify-center overflow-hidden cursor-pointer rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:cursor-default disabled:bg-red-500 dark:focus-visible:ring-offset-neutral-900 ${className}`}
    >
      <motion.span className="absolute inset-0 origin-left bg-red-700/45" style={{ scaleX }} />
      <span className="relative z-10">{status === "deleted" ? completedLabel : children}</span>
    </motion.button>
  );
}
