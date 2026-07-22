"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type ImageType = {
  src: string;
  alt: string;
};

type ImageStackProps = {
  images: ImageType[];
  className?: string;
};

const expandedOffsets = [
  { x: -96, y: -54 },
  { x: 96, y: -54 },
  { x: -78, y: 54 },
  { x: 78, y: 54 },
];

function rotationForIndex(index: number, expanded = false) {
  const rotations = [-10, 7, -4, 11];
  const base = rotations[index] ?? 0;
  return expanded ? base * 1.2 : base * 0.7;
}

export default function MultipleImageExpand({ images, className = "" }: ImageStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotations = useMemo(
    () => images.map((_, index) => ({ collapsed: rotationForIndex(index), expanded: rotationForIndex(index, true) })),
    [images],
  );

  return (
    <div className={`relative flex justify-center ${className}`}>
      <div className="relative h-[260px] w-[440px]">
        {images.map((image, index) => {
          const offset = isExpanded ? expandedOffsets[index] ?? { x: 0, y: 0 } : { x: 0, y: index * 13 };

          return (
            <motion.button
              key={image.src}
              type="button"
              aria-label={`${isExpanded ? "Collapse" : "Expand"} image stack`}
              aria-pressed={isExpanded}
              className="absolute left-1/2 top-1/2 h-[126px] w-[190px] origin-center -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-xl border-[3px] border-white bg-white p-0 shadow-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:focus-visible:ring-neutral-600"
              initial={false}
              animate={{
                x: offset.x,
                y: offset.y,
                rotate: isExpanded ? rotations[index].expanded : rotations[index].collapsed,
                scale: isExpanded ? 1.015 : 1,
                zIndex: isExpanded ? 20 + index : 10 + index,
              }}
              whileHover={{ scale: isExpanded ? 1.04 : 1.025 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.75 }}
              onClick={() => setIsExpanded((value) => !value)}
            >
              <Image src={image.src} alt={image.alt} fill sizes="190px" className="object-cover" priority />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
