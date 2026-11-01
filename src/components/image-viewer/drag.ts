export function shouldDismissImage(offset: { x: number; y: number }, velocity: { x: number; y: number }) {
  const distance = Math.hypot(offset.x, offset.y);
  return distance > 120 || (distance > 12 && Math.hypot(velocity.x, velocity.y) > 650);
}
