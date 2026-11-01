"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Send, Smile, X } from "lucide-react";
import { useState, type FormEvent } from "react";

const surfaceTransition = {
  type: "spring" as const,
  stiffness: 440,
  damping: 38,
  mass: 0.8,
};

function FeedbackSurface({ expanded }: { expanded: boolean }) {
  return (
    <motion.div
      layoutId="settings-feedback-surface"
      transition={{ layout: surfaceTransition }}
      style={{
        borderRadius: expanded ? 22 : 999,
        boxShadow: expanded
          ? "0 12px 36px rgba(0, 0, 0, 0.13), 0 0 0 1px rgba(0, 0, 0, 0.08)"
          : "0 8px 24px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.08)",
      }}
      className="absolute inset-0 bg-white dark:bg-neutral-900"
    />
  );
}

export default function SettingsFeedback() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const reduceMotion = useReducedMotion();

  function close() {
    setOpen(false);
    setSubmitted(false);
  }

  function openForm() {
    setSubmitted(false);
    setOpen(true);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setMessage("");
    window.setTimeout(() => setOpen(false), reduceMotion ? 400 : 900);
  }

  const contentMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 4, filter: "blur(2px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: 2, filter: "blur(2px)" },
      };

  return (
    <motion.div layoutRoot className="fixed bottom-4 right-4 z-20 sm:bottom-6 sm:right-6">
      <AnimatePresence initial={false} mode="sync">
        {!open ? (
          <motion.div key="button" className="relative h-10 w-[112px]">
            <FeedbackSurface expanded={false} />
            <motion.button
              type="button"
              onClick={openForm}
              aria-label={submitted ? "Feedback sent. Send more feedback" : "Send feedback"}
              initial={contentMotion.initial}
              animate={contentMotion.animate}
              exit={contentMotion.exit}
              transition={{ duration: reduceMotion ? 0.1 : 0.16, ease: "easeOut", delay: submitted ? 0.08 : 0 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className="relative flex h-10 w-full items-center justify-center gap-2 rounded-full text-[13px] font-medium text-neutral-800 outline-none transition-colors hover:bg-neutral-50/80 focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-100 dark:hover:bg-neutral-800/70"
            >
              {submitted ? (
                <Check className="size-4 text-emerald-500" strokeWidth={2.4} />
              ) : (
                <Smile className="size-4 text-neutral-500 dark:text-neutral-400" strokeWidth={2.1} />
              )}
              {submitted ? "Sent" : "Feedback"}
            </motion.button>
          </motion.div>
        ) : (
          <motion.section
            key="form"
            aria-label="Feedback form"
            className="relative h-[218px] w-[min(340px,calc(100vw-2rem))]"
          >
            <FeedbackSurface expanded />
            <motion.div
              initial={contentMotion.initial}
              animate={contentMotion.animate}
              exit={contentMotion.exit}
              transition={{ duration: reduceMotion ? 0.1 : 0.18, ease: "easeOut", delay: reduceMotion ? 0 : 0.12 }}
              className="relative p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Share your feedback</h2>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">What could make this settings page better?</p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close feedback"
                  className="grid size-7 shrink-0 place-items-center rounded-full text-neutral-400 outline-none transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                >
                  <X className="size-4" />
                </button>
              </div>

              <AnimatePresence initial={false} mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="flex h-[109px] flex-col items-center justify-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-emerald-50 dark:bg-emerald-950/50">
                      <Check className="size-4" strokeWidth={2.5} />
                    </span>
                    Feedback sent
                  </motion.div>
                ) : (
                  <motion.form
                    key="fields"
                    onSubmit={submit}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.12, ease: "easeIn" }}
                  >
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      required
                      rows={3}
                      autoFocus
                      placeholder="Tell us what you think..."
                      className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-700"
                    />
                    <button
                      type="submit"
                      className="mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 text-xs font-medium text-white outline-none transition-[transform,background-color] hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-400 active:scale-[0.98] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
                    >
                      Send feedback
                      <Send className="size-3.5" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
