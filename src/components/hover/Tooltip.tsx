"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

type Props = {
  content: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export default function Tooltip({ content, children, className = "" }: Props) {
  const [show, setShow] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const CLOSE_DELAY = 80; // ms - short delay to reduce flash when moving between trigger and tooltip

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
        className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-default"
        onMouseEnter={openSoon}
        onMouseLeave={closeSoon}
        onFocus={openSoon}
        onBlur={closeSoon}
      >
        {children ?? <span className="font-medium">Info</span>}
        <Info size={16} className="text-neutral-400" aria-hidden />
      </div>

      {/* Tooltip (AnimatePresence for smooth exit) */}
      <AnimatePresence mode="wait" initial={false}>
        {show && (
          <motion.div
            key="tooltip"
            role="tooltip"
            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -6, scale: 0.96, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, scale: 0.96, filter: "blur(2px)" }}
            transition={{
              opacity: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            }}
            onMouseEnter={openSoon}
            onMouseLeave={closeSoon}
            style={{ pointerEvents: "auto", willChange: "transform, opacity, filter" }}
          >
            <div className="bg-neutral-900 text-white text-xs leading-relaxed px-2 py-1.5 rounded-lg shadow-xl text-center min-w-[70px] max-w-[260px] break-words whitespace-normal">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
