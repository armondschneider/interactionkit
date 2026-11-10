import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TransitionTimeline from "./TransitionTimeline";

afterEach(() => vi.restoreAllMocks());

describe("transition timeline", () => {
  it("scrubs, changes speed, and restarts at the end", () => {
    vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    render(<TransitionTimeline />);
    const slider = screen.getByRole("slider", { name: "Animation timeline" });
    fireEvent.change(slider, { target: { value: "200" } });
    expect(slider).toHaveAttribute("aria-valuetext", "200 of 400 milliseconds");
    fireEvent.click(screen.getByRole("button", { name: "0.25×" }));
    expect(screen.getByRole("button", { name: "0.25×" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "0.15×" }));
    expect(screen.getByRole("button", { name: "0.15×" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Hide bounds" }));
    expect(screen.getByRole("button", { name: "Show bounds" })).toHaveAttribute("aria-pressed", "false");
    fireEvent.change(slider, { target: { value: "400" } });
    fireEvent.click(screen.getByRole("button", { name: "Replay animation" }));
    expect(slider).toHaveValue("0");
    expect(screen.getByRole("button", { name: "Pause animation" })).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByRole("button", { name: "Play animation" })).toBeInTheDocument();
  });

  it("advances elapsed time at the selected speed", () => {
    let nextFrame: FrameRequestCallback = () => {};
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => { nextFrame = callback; return 1; });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    render(<TransitionTimeline />);
    fireEvent.click(screen.getByRole("button", { name: "0.5×" }));
    fireEvent.click(screen.getByRole("button", { name: "Play animation" }));
    act(() => { nextFrame(0); nextFrame(50); });
    expect(screen.getByRole("slider", { name: "Animation timeline" })).toHaveValue("25");
  });
});
