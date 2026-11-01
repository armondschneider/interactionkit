"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const widths = [
  { label: "Small", value: 240 },
  { label: "Medium", value: 352 },
  { label: "Large", value: 480 },
];

const cardClassName = "overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/20";

function useMeasure<T extends HTMLElement>() {
  const [element, setElement] = useState<T | null>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const ref = useCallback((node: T | null) => setElement(node), []);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, bounds] as const;
}

function CardContent({
  isSmall,
  isLarge,
}: {
  isSmall: boolean;
  isLarge: boolean;
}) {
  return (
    <div className={isSmall ? "p-4" : "p-3"}>
      <div className={`flex gap-3 max-sm:min-h-0 max-sm:flex-col ${isSmall ? "flex-col" : `flex-row ${isLarge ? "min-h-36" : "min-h-32"}`}`}>
        <div
          className={`relative shrink-0 overflow-hidden rounded-lg max-sm:h-20 max-sm:w-full max-sm:self-auto ${
            isSmall ? "h-20 w-full" : `h-auto self-stretch ${isLarge ? "w-44" : "w-28"}`
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1787558890812-2c06e387121e?q=80&w=2612&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A quiet place to pause and breathe"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="min-w-0 self-center">
          <h3 className="text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100">
            Breathing a little better.
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            This morning I left my phone behind and walked until the noise softened. The air felt slower out here, and so did I.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MaxWidthDemo() {
  const [selectedWidth, setSelectedWidth] = useState(widths[1].value);
  const [displayedWidth, setDisplayedWidth] = useState(widths[1].value);
  const [measureRef, bounds] = useMeasure<HTMLDivElement>();
  const contentControls = useAnimationControls();
  const transitionId = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const isSmall = displayedWidth === widths[0].value;
  const isLarge = displayedWidth === widths[2].value;
  const hasMeasured = bounds.width > 0 && bounds.height > 0;
  const cardAnimation = {
    width: hasMeasured ? bounds.width + 2 : "auto",
    height: hasMeasured ? bounds.height + 2 : "auto",
  };

  const selectWidth = async (width: number) => {
    if (width === selectedWidth) return;

    setSelectedWidth(width);
    const id = ++transitionId.current;

    if (prefersReducedMotion) {
      contentControls.set({ opacity: 1, filter: "blur(0px)" });
      setDisplayedWidth(width);
      return;
    }

    await contentControls.start(
      { opacity: 0.55, filter: "blur(2px)" },
      { duration: 0.1, ease: "easeIn" },
    );
    if (id !== transitionId.current) return;

    setDisplayedWidth(width);
    await new Promise((resolve) => window.setTimeout(resolve, 30));
    if (id !== transitionId.current) return;

    await contentControls.start(
      { opacity: 1, filter: "blur(0px)" },
      { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
    );
  };

  return (
    <div className="flex h-[280px] w-full max-w-[512px] flex-col items-center gap-4 px-4">
      <div className="flex gap-1" aria-label="Container max width">
        {widths.map((width) => {
          const isActive = selectedWidth === width.value;

          return (
            <motion.button
              key={width.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectWidth(width.value)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`h-8 min-w-16 cursor-pointer rounded-full px-3 text-[11px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 ${
                isActive
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-white dark:text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              {width.label}
            </motion.button>
          );
        })}
      </div>

      <motion.article
        initial={false}
        animate={cardAnimation}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                width: { duration: 0.32, ease: [0.19, 1, 0.22, 1], delay: 0.03 },
                height: { duration: 0.32, ease: [0.19, 1, 0.22, 1], delay: 0.03 },
              }
        }
        className={`${cardClassName} shrink-0`}
      >
        <motion.div ref={measureRef} animate={contentControls} style={{ width: displayedWidth - 2 }}>
          <CardContent isSmall={isSmall} isLarge={isLarge} />
        </motion.div>
      </motion.article>
    </div>
  );
}
