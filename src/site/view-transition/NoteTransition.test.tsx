import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NoteTransition from "./NoteTransition";

describe("inline note transition", () => {
  it("opens in place, saves, confirms, and keeps the note for this page session", async () => {
    const overflow = document.body.style.overflow;
    render(<NoteTransition />);
    const trigger = screen.getByRole("button", { name: "Create note" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    trigger.focus();
    fireEvent.click(trigger);
    const input = screen.getByRole("textbox", { name: "Note" });
    expect(input).toHaveFocus();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save note" })).toBeDisabled();
    expect(document.body.style.overflow).toBe(overflow);
    fireEvent.change(input, { target: { value: "Remember this" } });
    fireEvent.click(screen.getByRole("button", { name: "Save note" }));
    expect(screen.getByRole("button", { name: "Saved" })).toHaveFocus();
    expect(screen.queryByRole("textbox", { name: "Note" })).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "Create note" })).toBeInTheDocument(), { timeout: 3500 });
    fireEvent.click(screen.getByRole("button", { name: "Create note" }));
    expect(screen.getByRole("textbox", { name: "Note" })).toHaveValue("Remember this");
  });

  it("discards unsaved edits and closes with Escape", () => {
    render(<NoteTransition />);
    const trigger = screen.getByRole("button", { name: "Create note" });
    fireEvent.click(trigger);
    const input = screen.getByRole("textbox", { name: "Note" });
    fireEvent.change(input, { target: { value: "Unsaved" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(screen.getByRole("textbox", { name: "Note" })).toHaveValue("");
  });

  it("cancels without saving and returns focus to the trigger", () => {
    render(<NoteTransition />);
    const trigger = screen.getByRole("button", { name: "Create note" });
    fireEvent.click(trigger);
    fireEvent.change(screen.getByRole("textbox", { name: "Note" }), { target: { value: "Discard this" } });
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(trigger).toHaveFocus();
    fireEvent.click(trigger);
    expect(screen.getByRole("textbox", { name: "Note" })).toHaveValue("");
  });
});
