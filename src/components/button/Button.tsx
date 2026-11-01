"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import styles from "./styles.module.css";

export type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: ReactNode;
  size?: "sm" | "md" | "icon";
  /** Keeps the label's space and keyboard focus while blocking activation. */
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  children, size = "md", loading = false, disabled = false, type = "button",
  className = "", onClick, tabIndex = 0, whileTap, transition,
  "aria-disabled": ariaDisabled, "aria-busy": ariaBusy, ...props
}, ref) {
  const reducedMotion = useReducedMotion();
  const blocked = disabled || loading || ariaDisabled === true || ariaDisabled === "true";

  return (
    <motion.button
      {...props}
      ref={ref}
      type={type}
      tabIndex={tabIndex}
      disabled={disabled}
      aria-disabled={blocked || ariaDisabled}
      aria-busy={loading || ariaBusy}
      data-slot="button"
      data-loading={loading ? "" : undefined}
      onClick={(event) => {
        if (blocked) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      }}
      whileTap={!blocked && !reducedMotion ? (whileTap ?? { scale: 0.98 }) : undefined}
      transition={transition ?? { type: "spring", stiffness: 500, damping: 32 }}
      className={`${styles.button} ${styles[size]} ${className}`}
    >
      <span className={`${styles.label} ${loading ? styles.hiddenLabel : ""}`}>{children}</span>
      {loading && <span aria-hidden="true" className={styles.indicator}><LoaderCircle size={14} strokeWidth={1.75} className={styles.spinner} />{size !== "icon" && <span>Loading</span>}</span>}
    </motion.button>
  );
});

export default Button;
