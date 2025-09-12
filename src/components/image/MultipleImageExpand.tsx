"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type ImageType = {
  src: string;
  alt: string;
};

type ImageStackProps = {
  images: ImageType[];
  className?: string;
};

// deterministic rotation (no Math.random() on every mount)
const rotationForIndex = (index: number, expanded = false) => {
  const base = ((index * 37) % 21) - 10; // -10..10
  return expanded ? base * 1.6 : base * 0.8;
};

const expandedOffsets = [
  { x: -120, y: -70 },
  { x: 120, y: -70 },
  { x: -100, y: 70 },
  { x: 100, y: 70 },
];

const MultipleImageExpand = ({ images, className = '' }: ImageStackProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // keep rotations stable across renders
  const rotations = useMemo(
    () => images.map((_, i) => ({
      collapsed: rotationForIndex(i, false),
      expanded: rotationForIndex(i, true),
    })),
    [images]
  );

  const toggleExpand = () => setIsExpanded((s) => !s);

  return (
    <div
      className={`relative flex justify-center ${className}`}
      onClick={() => {
        if (isExpanded) setIsExpanded(false);
      }}
    >
      {/* container provides a stable area for transforms; we use fixed card size and animate transforms only */}
      <div className="relative" style={{ width: 560, height: 320 }} onClick={(e) => e.stopPropagation()}>
        {images.map((image, index) => {
          const zIndex = isExpanded ? 50 + index : 20 + index;
          const rotate = isExpanded ? rotations[index].expanded : rotations[index].collapsed;
          const offset = isExpanded ? expandedOffsets[index] ?? { x: 0, y: 0 } : { x: 0, y: index * 18 };

          return (
            <motion.button
              key={image.src}
              layoutId={`image-${index}`}
              onClick={() => {
                if (!isExpanded) {
                  toggleExpand();
                } else {
                  // second click when expanded collapses the stack
                  setIsExpanded(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (!isExpanded) toggleExpand(); else setIsExpanded(false);
                }
              }}
              aria-pressed={isExpanded}
              aria-label={`Toggle image stack ${index + 1}`}
              type="button"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
              style={{
                zIndex,
                width: 240,
                height: 160,
                transformOrigin: 'center center',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 250, damping: 28 }}
              // animate only transforms for smooth gpu-driven animations
              animate={{
                x: offset.x,
                y: offset.y,
                rotate,
                scale: isExpanded ? 1.03 : 1,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="260px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default MultipleImageExpand;