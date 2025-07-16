"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "./Avatar";

interface AvatarTooltipProps {
  variant?: "image" | "initials";
  src?: string;
  initials?: string;
  alt?: string;
}

const AvatarTooltip: React.FC<AvatarTooltipProps> = ({
  variant = "image",
  src,
  initials = "--",
  alt = "Profile avatar",
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="inline-block">
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Avatar
          src={src}
          alt={alt}
          initials={initials}
          variant={variant}
        />
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-black text-white text-sm rounded-md px-3 py-2 shadow-lg whitespace-nowrap"
            >
              Account created August 2019
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AvatarTooltip; 