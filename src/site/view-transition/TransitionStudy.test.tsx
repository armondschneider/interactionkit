import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TransitionStudy from "./TransitionStudy";

describe("View Transition study", () => {
  it("opens and closes the example with Escape", () => {
    render(<TransitionStudy />);
    const example = screen.getByRole("region", { name: "Morph example" });
    const trigger = within(example).getByRole("button", { name: "Open quick actions" });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(within(example).getByRole("button", { name: "New document" })).toBeInTheDocument();
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("reports an action and returns focus to the trigger", () => {
    render(<TransitionStudy />);
    const trigger = screen.getByRole("button", { name: "Open quick actions" });
    fireEvent.click(trigger);
    const option = screen.getByRole("button", { name: "New folder" });
    option.focus();
    fireEvent.click(option);
    expect(screen.getByRole("status")).toHaveTextContent("New folder selected");
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("handles rapid toggles", () => {
    render(<TransitionStudy />);
    const morph = screen.getByRole("button", { name: "Open quick actions" });
    fireEvent.click(morph);
    fireEvent.click(morph);
    fireEvent.click(morph);
    expect(morph).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses the other trigger and switches the open surface", async () => {
    render(<TransitionStudy />);
    fireEvent.click(screen.getByRole("button", { name: "Two buttons" }));
    const quick = screen.getByRole("button", { name: "Open quick actions" });
    const options = screen.getByRole("button", { name: "Open options" });
    fireEvent.click(quick);
    expect(quick).toHaveAttribute("aria-expanded", "true");
    await waitFor(() => expect(options.closest("[data-slot='view-transition']")).toHaveStyle({ width: "44px" }));
    fireEvent.click(options);
    expect(options).toHaveAttribute("aria-expanded", "true");
    expect(quick).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => expect(quick.closest("[data-slot='view-transition']")).toHaveStyle({ width: "44px" }));
    expect(screen.getByRole("button", { name: "Rename" })).toBeInTheDocument();
  });
});
