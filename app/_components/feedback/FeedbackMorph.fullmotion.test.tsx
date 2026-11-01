import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FeedbackMorph from "./FeedbackMorph";

// framer-motion caches the reduced-motion preference in module state the first
// time useReducedMotion() runs, so the full-motion choreography (blur + scale
// exits, spring scale-ins) is exercised in its own test file where the module
// registry is fresh and matchMedia reports motion allowed.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

const helpfulButton = () => screen.getByRole("button", { name: "Helpful" });
const notHelpfulButton = () => screen.getByRole("button", { name: "Not helpful" });

describe("FeedbackMorph under full motion", () => {
  it("dissolves the vacating sibling with a fade, blur and scale-down", async () => {
    render(<FeedbackMorph />);

    const downTrigger = notHelpfulButton();
    fireEvent.click(helpfulButton());

    // The pill shell carries the exit: it fades, blurs and scales down, and
    // pointer events are cut immediately
    const downPill = downTrigger.parentElement as HTMLElement;
    await waitFor(() => {
      expect(Number(downPill.style.opacity)).toBeLessThan(1);
      expect(downPill.style.filter).toContain("blur");
      expect(downPill.style.transform).toMatch(/scale/);
    });
    expect(downPill.style.pointerEvents).toBe("none");
  });

  it("springs the sibling back in when the response field collapses", async () => {
    render(<FeedbackMorph />);

    // Capture the shell before the click hides the sibling from the a11y tree
    const downPill = notHelpfulButton().parentElement as HTMLElement;
    fireEvent.click(helpfulButton());

    fireEvent.keyDown(document, { key: "Escape" });

    // The sibling eases back in (0.1s choreography delay) and settles visible
    await waitFor(
      () => expect(Number(downPill.style.opacity)).toBe(1),
      { timeout: 2000 },
    );
    expect(Number(downPill.style.opacity)).toBe(1);
  });
});
