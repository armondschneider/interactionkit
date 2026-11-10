import { contentTiming, surfaceSpring } from "./motion";

// Zero-velocity response of the package's overdamped default spring.
export function surfaceProgress(time: number) {
  const { stiffness, damping, mass } = surfaceSpring;
  const decay = damping / (2 * mass);
  const root = Math.sqrt(decay * decay - stiffness / mass);
  const a = -decay + root;
  const b = -decay - root;
  return 1 - (b * Math.exp(a * time) - a * Math.exp(b * time)) / (b - a);
}

// Motion's easeOut is cubic-bezier(0, 0, .58, 1).
export function contentOpacity(time: number) {
  const x = Math.max(0, Math.min(1, (time - contentTiming.enterDelay) / contentTiming.enterDuration));
  if (x === 0 || x === 1) return x;
  let low = 0;
  let high = 1;
  for (let i = 0; i < 20; i++) {
    const t = (low + high) / 2;
    const curveX = 3 * (1 - t) * t * t * 0.58 + t * t * t;
    if (curveX < x) low = t; else high = t;
  }
  const t = (low + high) / 2;
  return 3 * (1 - t) * t * t + t * t * t;
}
