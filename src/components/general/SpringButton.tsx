"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonProps = ComponentProps<typeof motion.button> & {
  children: ReactNode;
  pressSpring?: boolean;
};

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "outline" | "filled";
};

const spring = { type: "spring", stiffness: 500, damping: 28, mass: 0.5 } as const;
const MotionLink = motion.create(Link);

export function SpringButton({ children, className = "", pressSpring = true, ...props }: ButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const canSpring = pressSpring && !prefersReducedMotion;

  return (
    <motion.button
      {...props}
      whileTap={canSpring ? { scale: 0.94 } : undefined}
      transition={canSpring ? spring : undefined}
      className={`relative isolate overflow-hidden rounded-full bg-neutral-800 px-4 py-2 text-sm font-medium text-white focus:outline-none before:absolute before:inset-0 before:-z-10 before:scale-95 before:rounded-[inherit] before:bg-neutral-700 before:opacity-0 before:transition-[transform,opacity] before:duration-150 before:ease-out hover:before:scale-100 hover:before:opacity-100 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:bg-neutral-200 dark:text-neutral-900 dark:before:bg-white dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-900 motion-reduce:before:transition-none ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function SpringLinkButton({ href, children, className = "", variant = "outline" }: LinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const variantClassName = variant === "filled"
    ? "border-neutral-800 bg-neutral-800 text-white hover:border-neutral-700 hover:bg-neutral-700 dark:border-neutral-200 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:border-white dark:hover:bg-white"
    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:text-neutral-900";

  return (
    <MotionLink
      href={href}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
      transition={spring}
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-transform duration-150 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 ${variantClassName} ${className}`}
    >
      {children}
    </MotionLink>
  );
}
