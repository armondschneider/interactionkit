"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HoverTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

const HoverTooltip: React.FC<HoverTooltipProps> = ({
  children,
  content,
  position = "top",
  delay = 0,
  className = ""
}) => {
  const [hovered, setHovered] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "left-1/2 -translate-x-1/2 bottom-full mb-2";
      case "bottom":
        return "left-1/2 -translate-x-1/2 top-full mt-2";
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      default:
        return "left-1/2 -translate-x-1/2 bottom-full mb-2";
    }
  };

  const getAnimationDirection = () => {
    switch (position) {
      case "top":
        return { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 } };
      case "bottom":
        return { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };
      case "left":
        return { initial: { opacity: 0, x: 8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 8 } };
      case "right":
        return { initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -8 } };
      default:
        return { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 } };
    }
  };

  const animation = getAnimationDirection();

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={() => {
          if (delay > 0) {
            setTimeout(() => setHovered(true), delay);
          } else {
            setHovered(true);
          }
        }}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </div>
      
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.15
            }}
            className={`absolute z-50 bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-lg whitespace-nowrap pointer-events-none ${getPositionClasses()}`}
          >
            {content}
            
            {/* Tooltip arrow */}
            <div 
              className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${
                position === "top" ? "top-full left-1/2 -translate-x-1/2 -mt-1" :
                position === "bottom" ? "bottom-full left-1/2 -translate-x-1/2 -mb-1" :
                position === "left" ? "left-full top-1/2 -translate-y-1/2 -ml-1" :
                "right-full top-1/2 -translate-y-1/2 -mr-1"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HoverTooltip;
