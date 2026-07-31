"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const emojis = ["🤯", "😀", "😁", "😂", "🙂", "😉", "😊", "😍", "🤩", "😎", "🤓", "🤔", "🥳", "😴", "😭", "😤", "😇", "🥰", "🤠", "🫠", "🌿", "🍋", "🍓", "🌞"];
const backgrounds = [
  { name: "mint", triggerClassName: "bg-emerald-100 dark:bg-emerald-900", swatchClassName: "bg-emerald-300" },
  { name: "sky", triggerClassName: "bg-sky-100 dark:bg-sky-900", swatchClassName: "bg-sky-300" },
  { name: "violet", triggerClassName: "bg-violet-100 dark:bg-violet-900", swatchClassName: "bg-violet-300" },
  { name: "rose", triggerClassName: "bg-rose-100 dark:bg-rose-900", swatchClassName: "bg-rose-300" },
  { name: "amber", triggerClassName: "bg-amber-100 dark:bg-amber-900", swatchClassName: "bg-amber-300" },
  { name: "stone", triggerClassName: "bg-stone-100 dark:bg-stone-700", swatchClassName: "bg-stone-300" },
] as const;
type Background = (typeof backgrounds)[number];

type Props = {
  initialEmoji?: string;
  className?: string;
  onChange?: (emoji: string) => void;
};

export default function EmojiPicker({
  initialEmoji = "🤯",
  className = "",
  onChange,
}: Props) {
  const [emoji, setEmoji] = useState(initialEmoji);
  const [background, setBackground] = useState<Background>(backgrounds[0]);
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.setTimeout(() => triggerRef.current?.focus(), 0);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const chooseEmoji = (nextEmoji: string) => {
    setEmoji(nextEmoji);
    onChange?.(nextEmoji);
  };

  return (
    <div ref={pickerRef} className="relative inline-flex flex-col items-center">
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileTap={{ scale: 0.94 }}
        className={`grid size-12 cursor-pointer place-items-center rounded-full border border-neutral-50 text-xl transition-colors duration-200 ease-out hover:brightness-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-400 dark:border-neutral-700 dark:hover:brightness-110 ${background.triggerClassName} ${className}`}
        aria-label={`Choose emoji, currently ${emoji}`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={emoji}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.76, rotate: -10, filter: "blur(3px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.76, rotate: 10, filter: "blur(3px)" }}
            transition={{ type: "spring", stiffness: 1000, damping: 34, mass: 0.25 }}
          >
            {emoji}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Choose an emoji"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: -8, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -4, filter: "blur(2px)" }}
            transition={{ type: "spring", stiffness: 760, damping: 35, mass: 0.45 }}
            className="absolute top-[calc(100%+8px)] z-50 w-[220px] rounded-xl border border-neutral-100/80 bg-white p-2.5 shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
          >
            <div className="grid grid-cols-6 gap-0.5" aria-label="Available emojis">
                {emojis.map((item) => (
                  <motion.button
                    key={item}
                    type="button"
                    onClick={() => chooseEmoji(item)}
                    initial="rest"
                    animate="rest"
                    whileTap="pressed"
                    className="group relative grid aspect-square cursor-pointer place-items-center rounded-md text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                    aria-label={`Choose ${item}`}
                    aria-pressed={item === emoji}
                  >
                    <motion.span
                      aria-hidden="true"
                      variants={{ rest: { scale: 1 }, pressed: { scale: 0.94 } }}
                      transition={{ type: "spring", bounce: 0, duration: 0.18 }}
                      className={`absolute inset-0 rounded-md transition-colors ${item === emoji ? "bg-emerald-100 dark:bg-emerald-950" : "bg-transparent group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800"}`}
                    />
                    <span className="relative">{item}</span>
                  </motion.button>
                ))}
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 border-t border-neutral-100 pt-2 dark:border-neutral-800" aria-label="Emoji background color">
              {backgrounds.map((color) => (
                <motion.button
                  key={color.name}
                  type="button"
                  onClick={() => setBackground(color)}
                  initial="rest"
                  animate="rest"
                  whileTap="pressed"
                  className="grid size-8 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                  aria-label={`Use ${color.name} background`}
                  aria-pressed={color.name === background.name}
                >
                  <motion.span
                    variants={{ rest: { scale: 1 }, pressed: { scale: 0.82 } }}
                    transition={{ type: "spring", bounce: 0, duration: 0.16 }}
                    className={`size-4 rounded-full ${color.swatchClassName} ${color.name === background.name ? "ring-2 ring-neutral-700 ring-offset-2 dark:ring-neutral-200 dark:ring-offset-neutral-900" : ""}`}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
