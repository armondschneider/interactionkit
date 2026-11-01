"use client";

import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import { Check, CornerDownLeft, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";

export type FeedbackRating = "up" | "down";

export type FeedbackMorphValue = {
  rating: FeedbackRating;
  response: string;
};

type Props = {
  onFeedback?: (value: FeedbackMorphValue) => void;
  upPlaceholder?: string;
  downPlaceholder?: string;
  thanksMessage?: string;
  className?: string;
};

type PillState = "idle" | "expanded" | "hidden";

const BASE_WIDTH = 48; // matches size-12 of the icon button
const EXPANDED_WIDTH = 300;
const HIDDEN_SCALE = 0.5; // the vacating sibling scales down to this...
const HIDDEN_BLUR_PX = 6; // ...while blurring out, and springs back on return
const RESET_DELAY = 2400; // how long the confirmation stays before easing back
const MORPH_EASE = [0.22, 1, 0.36, 1] as const;

type RatingPillProps = {
  which: FeedbackRating;
  state: PillState;
  submitted: boolean;
  response: string;
  placeholder: string;
  thanksMessage: string;
  reduceMotion: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
};

function RatingPill({
  which,
  state,
  submitted,
  response,
  placeholder,
  thanksMessage,
  reduceMotion,
  inputRef,
  triggerRef,
  onOpen,
  onQueryChange,
  onSubmit,
}: RatingPillProps) {
  const expanded = state === "expanded";
  const hidden = state === "hidden";
  const isUp = which === "up";
  const Icon = isUp ? ThumbsUp : ThumbsDown;
  const activeTone = isUp
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-rose-500 dark:text-rose-400";

  const contentMotion = reduceMotion
    ? { initial: { opacity: 0 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: -6, filter: "blur(3px)" },
        exit: { opacity: 0, x: -6, filter: "blur(3px)" },
      };
  const iconMotion = reduceMotion
    ? { initial: { opacity: 0 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.7, filter: "blur(3px)" },
        exit: { opacity: 0, scale: 0.7, filter: "blur(3px)" },
      };

  const targetWidth = expanded ? EXPANDED_WIDTH : hidden ? 0 : BASE_WIDTH;

  // Reduced motion skips scale and blur entirely — only width and opacity
  const pillAnimate = reduceMotion
    ? { width: targetWidth, opacity: hidden ? 0 : 1 }
    : {
        width: targetWidth,
        opacity: hidden ? 0 : 1,
        scale: hidden ? HIDDEN_SCALE : 1,
        filter: hidden ? `blur(${HIDDEN_BLUR_PX}px)` : "blur(0px)",
      };

  const pillTransition: Transition = reduceMotion
    ? { duration: 0.15 }
    : expanded
      ? {
          width: { duration: 0.28, ease: MORPH_EASE },
          default: { duration: 0.2, ease: "easeOut" },
        }
      : hidden
        ? {
            // dissolving out: quick fade, accelerating scale-down and blur
            opacity: { duration: 0.18, ease: "easeOut" },
            scale: { duration: 0.24, ease: "easeIn" },
            filter: { duration: 0.2, ease: "easeIn" },
            width: { duration: 0.28, ease: MORPH_EASE },
          }
        : {
            // easing back in, synced with the expanded pill's 0.1s delayed collapse
            opacity: { duration: 0.18, ease: "easeOut", delay: 0.1 },
            filter: { duration: 0.22, ease: "easeOut", delay: 0.1 },
            scale: { type: "spring", stiffness: 500, damping: 24, mass: 0.6, delay: 0.1 },
            width: { duration: 0.28, ease: MORPH_EASE, delay: 0.1 },
          };

  return (
    <motion.div
      initial={false}
      animate={pillAnimate}
      transition={pillTransition}
      style={{ pointerEvents: hidden ? "none" : undefined }}
      aria-hidden={hidden || undefined}
      className="relative flex h-12 shrink-0 items-center overflow-hidden rounded-full bg-white shadow-[0_5px_12px_rgba(0,0,0,0.04)] dark:bg-neutral-900 dark:shadow-black/20"
    >
      {/* Border lives on an overlay so the content box stays exactly 48×48 when collapsed, keeping the icon perfectly centered */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full border border-neutral-200 dark:border-neutral-700" />
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={onOpen}
        aria-label={submitted ? "Feedback submitted" : isUp ? "Helpful" : "Not helpful"}
        aria-expanded={expanded}
        tabIndex={hidden ? -1 : undefined}
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.5 }}
        className={`grid size-12 shrink-0 cursor-pointer place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 ${
          expanded
            ? activeTone
            : "text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        }`}
      >
        <AnimatePresence initial={false}>
          {submitted ? (
            <motion.span
              key="confirmed"
              initial={iconMotion.initial}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={iconMotion.exit}
              transition={{ duration: 0.18, ease: MORPH_EASE }}
              className="col-start-1 row-start-1 grid size-7 place-items-center rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 dark:bg-emerald-500"
            >
              <Check size={15} strokeWidth={2.5} aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="rating"
              initial={iconMotion.initial}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={iconMotion.exit}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="col-start-1 row-start-1 grid place-items-center"
            >
              <Icon size={18} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence mode="popLayout">
        {expanded && submitted && (
          <motion.div
            key="thanks"
            role="status"
            initial={contentMotion.initial}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={contentMotion.exit}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex min-w-0 flex-1 items-center pr-4"
          >
            <p className="truncate text-sm text-neutral-600 dark:text-neutral-300">{thanksMessage}</p>
          </motion.div>
        )}
        {expanded && !submitted && (
          <motion.form
            key="form"
            onSubmit={(event: FormEvent) => {
              event.preventDefault();
              onSubmit();
            }}
            initial={contentMotion.initial}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={contentMotion.exit}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="flex min-w-0 flex-1 items-center gap-1 pr-2"
          >
            <input
              ref={inputRef}
              value={response}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={placeholder}
              aria-label="Additional feedback"
              className="w-full min-w-0 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              aria-label="Submit feedback"
              className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
            >
              <CornerDownLeft size={14} aria-hidden />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FeedbackMorph({
  onFeedback,
  upPlaceholder = "What worked well?",
  downPlaceholder = "What could be better?",
  thanksMessage = "Thanks for the feedback",
  className = "",
}: Props) {
  const [rating, setRating] = useState<FeedbackRating | null>(null);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const upInputRef = useRef<HTMLInputElement>(null);
  const downInputRef = useRef<HTMLInputElement>(null);
  const upTriggerRef = useRef<HTMLButtonElement>(null);
  const downTriggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const pillState = (which: FeedbackRating): PillState => {
    if (rating === which) return "expanded";
    return rating === null ? "idle" : "hidden";
  };

  const reset = () => {
    setRating(null);
    setResponse("");
    setSubmitted(false);
  };

  // Escape steps back to the buttons (and returns focus to the trigger); outside clicks do the same
  const cancel = (which: FeedbackRating) => {
    reset();
    window.setTimeout(() => (which === "up" ? upTriggerRef : downTriggerRef).current?.focus(), 0);
  };

  // Focus the input whenever a rating opens
  useEffect(() => {
    if (!rating || submitted) return;
    (rating === "up" ? upInputRef : downInputRef).current?.focus();
  }, [rating, submitted]);

  useEffect(() => {
    if (!rating) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (submitted) reset();
      else cancel(rating);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      if (submitted) reset();
      else cancel(rating);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [rating, submitted]);

  // A submitted rating morphs back into the two buttons so the interaction can replay
  useEffect(() => {
    if (!submitted) return;
    const id = window.setTimeout(reset, RESET_DELAY);
    return () => window.clearTimeout(id);
  }, [submitted]);

  const handleSubmit = () => {
    if (!rating || submitted) return;
    onFeedback?.({ rating, response: response.trim() });
    setSubmitted(true);
  };

  const open = (which: FeedbackRating) => {
    if (submitted) return;
    if (rating === which) {
      (which === "up" ? upInputRef : downInputRef).current?.focus();
      return;
    }
    setRating(which);
  };

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center gap-2 ${className}`}>
      <RatingPill
        which="up"
        state={pillState("up")}
        submitted={submitted}
        response={response}
        placeholder={upPlaceholder}
        thanksMessage={thanksMessage}
        reduceMotion={reduceMotion}
        inputRef={upInputRef}
        triggerRef={upTriggerRef}
        onOpen={() => open("up")}
        onQueryChange={setResponse}
        onSubmit={handleSubmit}
      />
      <RatingPill
        which="down"
        state={pillState("down")}
        submitted={submitted}
        response={response}
        placeholder={downPlaceholder}
        thanksMessage={thanksMessage}
        reduceMotion={reduceMotion}
        inputRef={downInputRef}
        triggerRef={downTriggerRef}
        onOpen={() => open("down")}
        onQueryChange={setResponse}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
