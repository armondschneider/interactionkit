"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TabItem = {
  label: string;
  content: React.ReactNode;
};

type Props = {
  tabs?: TabItem[];
  className?: string;
};

const defaultTabs: TabItem[] = [
  {
    label: "Feed",
    content: (
      <div className="space-y-3">
        <div className="h-20 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-20 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-20 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
      </div>
    ),
  },
  {
    label: "Collection",
    content: (
      <div className="grid grid-cols-3 gap-3">
        <div className="aspect-square rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="aspect-square rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="aspect-square rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="aspect-square rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="aspect-square rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="aspect-square rounded-lg bg-neutral-100 dark:bg-neutral-800" />
      </div>
    ),
  },
  {
    label: "For Sale",
    content: (
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col gap-2">
            <div className="aspect-square rounded-lg bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-3 w-2/3 rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-3 w-1/3 rounded bg-neutral-200 dark:bg-neutral-700" />
          </div>
        ))}
      </div>
    ),
  },
];

export default function Tab({ tabs = defaultTabs, className = "" }: Props) {
  const [active, setActive] = useState(0);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const capsuleId = useId();

  const nudge =
    pressedIndex !== null && pressedIndex !== active
      ? pressedIndex > active
        ? 8
        : -8
      : 0;

  return (
    <div className={className}>
      <div className="inline-flex gap-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.label}
            type="button"
            onClick={() => setActive(index)}
            onPointerDown={() => setPressedIndex(index)}
            onPointerUp={() => setPressedIndex(null)}
            onPointerLeave={() => setPressedIndex(null)}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className={`relative cursor-pointer rounded-full px-4 py-2 text-base font-medium transition-colors focus:outline-none ${
              active === index
                ? "text-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            {active === index && (
              <motion.div
                layoutId={`tab-capsule-${capsuleId}`}
                className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-neutral-700 dark:shadow-black/20"
                animate={{ x: nudge }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="pt-4">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {tabs[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
