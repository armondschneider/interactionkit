import { describe, expect, it } from "vitest";
import { shouldDismissSheet } from "./drag";

describe("sheet drag dismissal", () => {
  it("keeps a short, slow drag open", () => {
    expect(shouldDismissSheet(30, 100, 400)).toBe(false);
  });
  it("uses the sheet height with a sensible minimum and maximum", () => {
    expect(shouldDismissSheet(70, 0, 200)).toBe(true);
    expect(shouldDismissSheet(110, 0, 400)).toBe(true);
    expect(shouldDismissSheet(145, 0, 900)).toBe(true);
    expect(shouldDismissSheet(60, 0, 200)).toBe(false);
  });
  it("accepts a deliberate downward flick but not a velocity spike", () => {
    expect(shouldDismissSheet(25, 700, 400)).toBe(true);
    expect(shouldDismissSheet(3, 1000, 400)).toBe(false);
  });
  it("never dismisses on an upward gesture", () => {
    expect(shouldDismissSheet(-150, -900, 400)).toBe(false);
  });
});
