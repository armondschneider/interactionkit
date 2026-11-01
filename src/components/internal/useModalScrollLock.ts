"use client";

import { useLayoutEffect } from "react";

type ScrollLock = { count: number; overflow: string; paddingRight: string };
const locks = new WeakMap<Document, ScrollLock>();

export function useModalScrollLock(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return;
    const existing = locks.get(document);
    if (existing) existing.count += 1;
    else {
      locks.set(document, {
        count: 1,
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      });
      const scrollbar = window.innerWidth - document.documentElement.clientWidth;
      const padding = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.overflow = "hidden";
      if (scrollbar > 0) document.body.style.paddingRight = `${padding + scrollbar}px`;
    }
    return () => {
      const lock = locks.get(document);
      if (!lock || --lock.count > 0) return;
      document.body.style.overflow = lock.overflow;
      document.body.style.paddingRight = lock.paddingRight;
      locks.delete(document);
    };
  }, [active]);
}
