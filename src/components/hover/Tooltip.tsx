"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

type Props = {
  content: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  side?: "bottom" | "left" | "right";
};

const positions = {
  bottom: {
    className: "top-full left-1/2 mt-3 -translate-x-1/2",
    hidden: { opacity: 0, y: -6, scale: 0.96, filter: "blur(2px)" },
  },
  left: {
    className: "right-full top-1/2 mr-3 -translate-y-1/2",
    hidden: { opacity: 0, x: 6, scale: 0.96, filter: "blur(2px)" },
  },
  right: {
    className: "left-full top-1/2 ml-3 -translate-y-1/2",
    hidden: { opacity: 0, x: -6, scale: 0.96, filter: "blur(2px)" },
  },
};

export default function Tooltip({ content, children, className = "", side = "bottom" }: Props) {
  const [show, setShow] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const CLOSE_DELAY = 80; // ms - short delay to reduce flash when moving between trigger and tooltip
  const position = positions[side];

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
    };
  }, []);

  const openSoon = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setShow(true);
  };

  const closeSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    // Small delay so quick mouse movements don't cause flicker
    closeTimer.current = window.setTimeout(() => {
      setShow(false);
      closeTimer.current = null;
    }, CLOSE_DELAY);
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}> 
      {/* Trigger */}
      <div
        className="inline-flex cursor-default items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
        onMouseEnter={openSoon}
        onMouseLeave={closeSoon}
        onFocus={openSoon}
        onBlur={closeSoon}
      >
        {children ?? <span className="font-medium">Info</span>}
        <Info size={16} className="text-neutral-400 dark:text-neutral-500" aria-hidden />
      </div>

      {/* Tooltip (AnimatePresence for smooth exit) */}
      <AnimatePresence mode="wait" initial={false}>
        {show && (
          <motion.div
            key="tooltip"
            role="tooltip"
            className={`absolute z-50 pointer-events-auto [will-change:transform,opacity,filter] ${position.className}`}
            initial={position.hidden}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={position.hidden}
            transition={{
              opacity: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            }}
            onMouseEnter={openSoon}
            onMouseLeave={closeSoon}
          >
            <div className="w-max max-w-[260px] break-words rounded-lg bg-neutral-900 px-2 py-1.5 text-center text-xs leading-relaxed text-white shadow-xl whitespace-normal dark:bg-neutral-700">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
