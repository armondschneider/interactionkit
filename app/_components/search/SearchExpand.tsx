"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { History, Search, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

type Props = {
  previousSearches?: string[];
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
};

const defaultPreviousSearches = [
  "spring animation",
  "image modal",
  "emoji picker",
  "hold to delete",
];

const COLLAPSED_WIDTH = 48; // matches size-12 of the icon button
const EXPANDED_WIDTH = 280;
const MAX_RECENTS = 6;

export default function SearchExpand({
  previousSearches = defaultPreviousSearches,
  placeholder = "Search interactions…",
  onSearch,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [recents, setRecents] = useState<string[]>(previousSearches);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const trimmed = query.trim().toLowerCase();
  const matches = trimmed
    ? recents.filter((term) => term.toLowerCase().includes(trimmed))
    : recents;

  const openSearch = () => {
    setOpen(true);
    setDropdownVisible(true);
  };

  const closeSearch = () => {
    setOpen(false);
    setDropdownVisible(false);
  };

  // Focus the input once the bar has opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape closes (and returns focus to the icon); outside clicks collapse
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch();
        window.setTimeout(() => triggerRef.current?.focus(), 0);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) closeSearch();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Move a term to the front of the recents list (deduped, capped)
  const remember = (term: string) => {
    setRecents((current) =>
      [term, ...current.filter((item) => item !== term)].slice(0, MAX_RECENTS),
    );
  };

  const choose = (term: string) => {
    setQuery(term);
    remember(term);
    onSearch?.(term);
    setDropdownVisible(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    remember(value);
    onSearch?.(value);
    setDropdownVisible(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        initial={false}
        animate={{ width: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
        transition={
          reduceMotion
            ? { duration: 0.15 }
            : open
              ? { type: "spring", stiffness: 420, damping: 34 }
              : { type: "spring", stiffness: 420, damping: 34, delay: 0.1 }
        }
        className="relative flex h-12 items-center overflow-hidden rounded-full bg-white shadow-[0_5px_12px_rgba(0,0,0,0.04)] dark:bg-neutral-900 dark:shadow-black/20"
      >
        {/* Border lives on an overlay so the content box stays exactly 48×48 when collapsed, keeping the icon perfectly centered */}
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full border border-neutral-200 dark:border-neutral-700" />
        <motion.button
          ref={triggerRef}
          type="button"
          onClick={() => (open ? inputRef.current?.focus() : openSearch())}
          aria-label={open ? "Search" : "Open search"}
          aria-expanded={open}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full text-neutral-500 transition-colors hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-white dark:focus-visible:ring-neutral-500"
        >
          <Search size={18} aria-hidden />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.form
              onSubmit={handleSubmit}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -6, filter: "blur(3px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -6, filter: "blur(3px)" }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="flex min-w-0 flex-1 items-center gap-1 pr-2"
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setDropdownVisible(true);
                }}
                onFocus={() => setDropdownVisible(true)}
                placeholder={placeholder}
                aria-label="Search"
                className="w-full min-w-0 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setDropdownVisible(true);
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                >
                  <X size={13} aria-hidden />
                </button>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && dropdownVisible && matches.length > 0 && (
          <motion.div
            role="listbox"
            aria-label="Previous searches"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: reduceMotion
                ? { duration: 0.15 }
                : {
                    y: { type: "spring", stiffness: 480, damping: 32, mass: 0.5, delay: 0.12 },
                    opacity: { duration: 0.16, ease: "easeOut", delay: 0.12 },
                  },
            }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : -8,
              transition: reduceMotion
                ? { duration: 0.15 }
                : {
                    y: { type: "spring", stiffness: 480, damping: 32, mass: 0.5 },
                    opacity: { duration: 0.14, ease: "easeIn" },
                  },
            }}
            className="absolute left-0 top-[calc(100%+8px)] z-50 flex w-[280px] flex-col overflow-hidden rounded-xl border border-neutral-100/80 bg-white p-1.5 shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
          >
            <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
              {trimmed ? "Matches" : "Previous searches"}
            </p>
            <ul>
              {matches.map((term) => (
                <li key={term}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={term === query}
                    onClick={() => choose(term)}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-neutral-600 transition-colors duration-150 ease-out hover:bg-neutral-100 focus:outline-none focus-visible:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800"
                  >
                    <History size={14} className="shrink-0 text-neutral-400 dark:text-neutral-500" aria-hidden />
                    <span className="truncate">{term}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
