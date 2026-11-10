"use client";

import { useRef, useState, type RefObject } from "react";
import { useModalScrollLock } from "./useModalScrollLock";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

type Options = {
  open: boolean;
  initialFocusRef: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
  onExitComplete?: () => void;
};

/** Keeps native modal behavior alive until Motion has finished exiting. */
export function useModalLifecycle({ open, initialFocusRef, returnFocusRef, onExitComplete }: Options) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(open);
  const exitRef = useRef(onExitComplete);
  openRef.current = open;
  exitRef.current = onExitComplete;
  const [present, setPresent] = useState(false);
  const [active, setActive] = useState(false);

  useModalScrollLock(active);

  useIsomorphicLayoutEffect(() => {
    if (open) {
      if (!dialogRef.current?.open) {
        previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        // Mount animated content only after the dialog enters the top layer.
        dialogRef.current?.showModal();
      }
      setActive(true);
      setPresent(true);
    } else setPresent(false);
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    if (present && open) initialFocusRef.current?.focus({ preventScroll: true });
  }, [present, open, initialFocusRef]);

  useIsomorphicLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => { if (dialog?.open) dialog.close(); };
  }, []);

  function finishClosing() {
    // A controlled parent may reopen before an exit finishes.
    if (openRef.current) return;
    dialogRef.current?.close();
    setActive(false);
    exitRef.current?.();
    const target = returnFocusRef?.current ?? previousFocusRef.current;
    if (target?.isConnected) target.focus({ preventScroll: true });
  }

  return { dialogRef, present, finishClosing };
}
