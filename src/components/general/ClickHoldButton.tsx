"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

type Props = {
  onConfirm?: () => void;
  duration?: number;
  children?: React.ReactNode;
  className?: string;
};

export default function ClickHoldButton({ 
  onConfirm, 
  duration = 900, 
  children = "Click and hold",
  className = ""
}: Props) {
  const holdTimer = useRef<number | null>(null);
  const holdProgress = useMotionValue(0);
  const scaleX = useTransform(holdProgress, [0, 100], [0, 1]);
  
  const [status, setStatus] = useState<"idle" | "deleting" | "deleted">("idle");

  const startHold = () => {
    // Animate progress from 0 to 100 over duration
    animate(holdProgress, 100, { duration: duration / 1000, ease: "linear" });
    
    // @ts-ignore window.setTimeout gives number
    holdTimer.current = window.setTimeout(() => {
      setStatus("deleting");
      onConfirm?.();
      // Show "Deleted" after a brief delay
      setTimeout(() => {
        setStatus("deleted");
        holdProgress.set(0);
      }, 800);
    }, duration);
  };

  const cancelHold = () => {
    // Snap progress back to 0 with spring
    animate(holdProgress, 0, { type: "spring", stiffness: 300, damping: 25 });
    
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  return (
    <motion.button
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      disabled={status !== "idle"}
      className={`relative px-3 py-1.5 rounded-full text-sm text-white bg-red-500 overflow-hidden cursor-pointer disabled:cursor-default ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-red-600/50"
        style={{ 
          scaleX,
          transformOrigin: "left"
        }}
      />
      <span className="relative z-10 flex items-center gap-2 justify-center">
        {status === "idle" && children}
        {status === "deleting" && (
          <>
            <motion.svg
              className="w-4 h-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="60"
                strokeDashoffset="15"
                strokeLinecap="round"
              />
            </motion.svg>
            Deleting...
          </>
        )}
        {status === "deleted" && "Deleted!"}
      </span>
    </motion.button>
  );
}
