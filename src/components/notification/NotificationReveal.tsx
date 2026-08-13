"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type NotificationRevealProps = {
  title?: string;
  duration?: number;
  position?: "fixed" | "absolute";
  className?: string;
  showTrigger?: boolean;
  autoReveal?: boolean;
  icon?: ReactNode;
  iconClassName?: string;
  onDismiss?: () => void;
};

type Phase = "hidden" | "icon" | "notification";

export default function NotificationReveal({
  title = "Meeting Soon",
  duration = 3600,
  position = "fixed",
  className = "",
  showTrigger = true,
  autoReveal = false,
  icon = <img src="/img/IconBell2.svg" alt="" className="size-4" />,
  iconClassName = "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
  onDismiss,
}: NotificationRevealProps) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const dismiss = () => {
    clearTimers();
    setPhase("hidden");
    onDismiss?.();
  };

  const reveal = () => {
    clearTimers();
    setPhase("hidden");
    requestAnimationFrame(() => {
      setPhase("icon");
      timers.current.push(setTimeout(() => setPhase("notification"), prefersReducedMotion ? 120 : 620));
      timers.current.push(setTimeout(dismiss, duration));
    });
  };

  useEffect(() => {
    if (autoReveal) reveal();
  }, [autoReveal]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && phase !== "hidden") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [phase]);

  useEffect(() => () => clearTimers(), []);

  const isExpanded = phase === "notification";
  const placement = position === "fixed" ? "fixed" : "absolute";

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {showTrigger && (
        <motion.button
          type="button"
          onClick={reveal}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          className="rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-medium text-neutral-700 shadow-sm transition-colors hover:border-neutral-300 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:text-white dark:focus-visible:ring-neutral-500"
        >
          Show notification
        </motion.button>
      )}

      <AnimatePresence>
        {phase !== "hidden" && (
          <motion.div
            layout
            role="status"
            aria-live="polite"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.64, y: 34 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              width: isExpanded ? 240 : 48,
              borderRadius: 999,
            }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.82, y: 8 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : phase === "icon"
                  ? { duration: 0.36, ease: [0.16, 1, 0.3, 1] }
                  : { type: "spring", stiffness: 430, damping: 30, mass: 0.7 }
            }
            className={`${placement} bottom-6 left-1/2 z-50 flex h-12 -translate-x-1/2 items-center overflow-hidden pointer-events-auto ${isExpanded ? "border border-neutral-200/50 bg-white p-1 shadow-md shadow-neutral-950/5 dark:border-neutral-700/50 dark:bg-neutral-800 dark:shadow-black/15" : "bg-transparent"}`}
          >
            <div className={`grid size-10 shrink-0 place-items-center rounded-full ${iconClassName}`}>
              {icon}
            </div>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.16, ease: "easeOut" }}
                  className="flex min-w-0 flex-1 items-center pl-2"
                >
                  <span className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{title}</span>
                  <button
                    type="button"
                    onClick={dismiss}
                    aria-label="Dismiss notification"
                    className="ml-auto grid size-8 shrink-0 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-500"
                  >
                    <X size={16} aria-hidden />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
