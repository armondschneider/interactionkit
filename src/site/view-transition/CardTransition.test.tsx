import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CardTransition from "./CardTransition";

describe("card transition", () => {
  it("opens with a separate close button and restores focus", () => {
    render(<CardTransition />);
    const trigger = screen.getByRole("button", { name: "Open A quieter place" });
    fireEvent.click(trigger);
    const close = screen.getByRole("button", { name: "Close A quieter place" });
    expect(close).toHaveFocus();
    expect(screen.getByText(/room to breathe/)).toBeInTheDocument();
    fireEvent.click(close);
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports Escape and disabling the drag handle", () => {
    render(<CardTransition dragToClose={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Open A quieter place" }));
    expect(screen.queryByRole("button", { name: /drag down/ })).not.toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("button", { name: "Close A quieter place" }), { key: "Escape" });
    expect(screen.getByRole("button", { name: "Open A quieter place" })).toHaveFocus();
  });

  it("switches between the preview and motion guides without closing the card", () => {
    render(<CardTransition />);
    fireEvent.click(screen.getByRole("button", { name: "Open A quieter place" }));
    fireEvent.click(screen.getByRole("button", { name: "Motion guides" }));
    expect(screen.getByRole("button", { name: "Motion guides" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/title crossfades rather than moving/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close A quieter place" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Preview" }));
    expect(screen.getByRole("button", { name: "Preview" })).toHaveAttribute("aria-pressed", "true");
  });

  it("closes with Escape while a motion guide control has focus", () => {
    render(<CardTransition />);
    fireEvent.click(screen.getByRole("button", { name: "Open A quieter place" }));
    const guides = screen.getByRole("button", { name: "Motion guides" });
    guides.focus();
    fireEvent.click(guides);
    fireEvent.keyDown(guides, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Open A quieter place" })).toHaveFocus();
  });
});
