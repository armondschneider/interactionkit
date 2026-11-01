import { describe, expect, it } from "vitest";
import { shouldDismissImage } from "./drag";

describe("image drag dismissal", () => {
  it("keeps a short, slow drag open", () => {
    expect(shouldDismissImage({ x: 20, y: 20 }, { x: 50, y: 50 })).toBe(false);
  });
  it("dismisses a long drag in any direction", () => {
    for (const offset of [{ x: 130, y: 0 }, { x: 0, y: -130 }, { x: -90, y: 90 }]) {
      expect(shouldDismissImage(offset, { x: 0, y: 0 })).toBe(true);
    }
  });
  it("dismisses a deliberate flick without projecting the image off screen", () => {
    expect(shouldDismissImage({ x: 0, y: 30 }, { x: 0, y: 700 })).toBe(true);
  });
  it("ignores velocity spikes with almost no displacement", () => {
    expect(shouldDismissImage({ x: 2, y: 2 }, { x: 900, y: 900 })).toBe(false);
  });
});
