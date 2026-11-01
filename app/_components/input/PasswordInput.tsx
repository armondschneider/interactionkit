"use client";

import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

type Props = {
  verifyPassword: (password: string) => boolean;
  label?: string;
  placeholder?: string;
  submitLabel?: string;
  errorMessage?: string;
  className?: string;
};

export default function PasswordInput({
  verifyPassword,
  label = "Password",
  placeholder = "Enter your password",
  submitLabel = "Continue",
  errorMessage = "Password incorrect",
  className = "",
}: Props) {
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [correct, setCorrect] = useState(false);
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verifyPassword(password)) {
      setIncorrect(false);
      setCorrect(true);
      return;
    }

    setCorrect(false);
    setIncorrect(true);
    if (!reduceMotion) {
      void controls.start({
        x: [0, -4, 3, -2, 1, 0],
        transition: { duration: 0.26, ease: "easeOut" },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-72 ${className}`} noValidate>
      <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
        {label}
      </label>

      <motion.div animate={controls} className="relative">
        <input
          id={inputId}
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setIncorrect(false);
            setCorrect(false);
          }}
          placeholder={placeholder}
          autoComplete="current-password"
          aria-invalid={incorrect}
          aria-describedby={incorrect ? errorId : undefined}
          className={`h-10 w-full rounded-lg border bg-white px-3 pr-10 text-[13px] text-neutral-900 shadow-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-neutral-400 focus:ring-2 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 ${
            incorrect
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/15 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400/15"
              : "border-neutral-200 focus:border-neutral-400 focus:ring-neutral-900/5 dark:border-neutral-700 dark:focus:border-neutral-500 dark:focus:ring-white/10"
          }`}
        />
        <AnimatePresence>
          {correct && (
            <motion.span
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-3 top-1/2 grid size-4 -translate-y-1/2 place-items-center rounded-full bg-emerald-500 text-white dark:bg-emerald-400 dark:text-neutral-950"
              aria-label="Password correct"
            >
              <Check size={11} strokeWidth={3} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="h-8 pt-1">
        <AnimatePresence>
          {incorrect && (
            <motion.p
              id={errorId}
              role="alert"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -2, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="text-xs text-red-600 dark:text-red-400"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex h-9 w-full cursor-pointer items-center justify-center rounded-lg bg-neutral-900 px-4 text-[13px] font-medium text-white transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white dark:focus-visible:ring-neutral-400 dark:focus-visible:ring-offset-neutral-900"
      >
        {submitLabel}
      </motion.button>
    </form>
  );
}
