"use client";

import { LayoutGroup, motion } from "framer-motion";
import { useId, useState } from "react";
import ImageModal from "./ImageModal";

type ImageItem = {
  src: string;
  alt: string;
};

type LayoutMode = "grid" | "feature" | "list";

type Props = {
  images: ImageItem[];
};

const modes: { id: LayoutMode; label: string }[] = [
  { id: "grid", label: "Mosaic" },
  { id: "feature", label: "Feature" },
  { id: "list", label: "Row" },
];

const positions: Record<LayoutMode, string[]> = {
  grid: ["col-span-2 row-span-2", "col-start-3 row-start-1", "col-start-3 row-start-2"],
  feature: ["col-start-3 row-start-2", "col-start-3 row-start-1", "col-span-2 row-span-2"],
  list: ["col-start-1", "col-start-2", "col-start-3"],
};

export default function ImageGridRearrange({ images }: Props) {
  const [mode, setMode] = useState<LayoutMode>("grid");
  const capsuleId = useId();

  return (
    <LayoutGroup id="image-grid-rearrange">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="mb-3 text-center">
          <div className="inline-flex gap-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800">
          {modes.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              aria-pressed={mode === item.id}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className={`relative min-h-8 rounded-full px-3 text-xs font-medium transition-colors ${mode === item.id ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"}`}
            >
              {mode === item.id && <motion.span layoutId={`grid-tab-capsule-${capsuleId}`} className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-neutral-700 dark:shadow-black/20" />}
              <span className="relative">{item.label}</span>
            </motion.button>
          ))}
          </div>
        </div>

        <div className={`grid h-[210px] grid-cols-3 gap-2 sm:h-[220px] ${mode === "list" ? "grid-rows-1" : "grid-rows-2"}`}>
          {images.map((image, index) => (
            <ImageModal
              key={image.src}
              src={image.src}
              alt={image.alt}
              layoutId={`rearrange-image-${index}`}
              animateLayout
              expandedClassName="!aspect-[4/3] !w-[min(480px,88vw)]"
              backdropClassName="!backdrop-blur-sm"
              className={`!h-full !w-full ${positions[mode][index]}`}
            />
          ))}
        </div>
      </div>
    </LayoutGroup>
  );
}
