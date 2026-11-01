export function shouldDismissSheet(offsetY: number, velocityY: number, height: number) {
  const threshold = Math.min(140, Math.max(64, height * 0.25));
  return offsetY > threshold || (offsetY > 12 && velocityY > 650);
}
