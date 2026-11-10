import { useEffect, useLayoutEffect } from "react";

// Preserve synchronous focus/layout updates in the browser without React 18 SSR warnings.
export const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
