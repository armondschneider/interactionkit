"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  soundEnabled?: boolean;
  ariaLabel?: string;
  className?: string;
};

type BrowserWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

function playPressTone(context: AudioContext) {
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(220, now);
  oscillator.frequency.exponentialRampToValueAtTime(145, now + 0.14);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.16);
}

export default function SquishyButton({
  children = "Squish",
  soundEnabled = true,
  ariaLabel,
  className = "",
}: Props) {
  const [pressed, setPressed] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const playSound = () => {
    if (!soundEnabled || typeof window === "undefined") return;

    try {
      const AudioContextConstructor = window.AudioContext ?? (window as BrowserWindow).webkitAudioContext;
      if (!AudioContextConstructor) return;
      if (!audioContext.current) audioContext.current = new AudioContextConstructor();
      if (audioContext.current.state === "suspended") void audioContext.current.resume().catch(() => {});
      playPressTone(audioContext.current);
    } catch {
      // Sound is optional and should never block the button interaction.
    }
  };

  const startPress = () => {
    if (pressed) return;
    setPressed(true);
    playSound();
  };

  const endPress = () => {
    setPressed(false);
  };

  useEffect(() => () => {
    audioContext.current?.close().catch(() => {});
  }, []);

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        startPress();
      }}
      onPointerUp={endPress}
      onPointerCancel={endPress}
      onLostPointerCapture={endPress}
      onKeyDown={(event) => {
        if ((event.key === " " || event.key === "Enter") && !event.repeat) {
          event.preventDefault();
          startPress();
        }
      }}
      onKeyUp={(event) => {
        if (event.key === " " || event.key === "Enter") endPress();
      }}
      onBlur={endPress}
      className={`relative isolate inline-flex min-h-10 cursor-pointer items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-4 dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-900 ${className}`}
    >
      <motion.span
        aria-hidden="true"
        animate={{ boxShadow: pressed ? "0 0 0 2px currentColor" : "0 0 0 4px currentColor" }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        className="absolute inset-1 -z-10 rounded-[inherit] bg-current text-neutral-900 dark:text-neutral-100"
      />
      <motion.span
        animate={{ scale: pressed ? 0.96 : 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        className="relative inline-flex min-h-10 items-center justify-center gap-2 px-4 py-2 text-white dark:text-neutral-900"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
