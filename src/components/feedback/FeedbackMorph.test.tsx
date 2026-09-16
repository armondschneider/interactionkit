import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FeedbackMorph from "./FeedbackMorph";

const helpfulButton = () => screen.getByRole("button", { name: "Helpful" });
const notHelpfulButton = () => screen.getByRole("button", { name: "Not helpful" });
const responseField = () => screen.getByRole("textbox", { name: "Additional feedback" });
const submitButton = () => screen.getByRole("button", { name: "Submit feedback" });

// Exit animations keep unmounted content in the DOM for a moment, so removals
// are always awaited rather than asserted synchronously.
const waitForGone = (query: () => HTMLElement | null) =>
  waitFor(() => expect(query()).not.toBeInTheDocument());

describe("FeedbackMorph", () => {
  it("renders both rating buttons and no response field", () => {
    render(<FeedbackMorph onFeedback={vi.fn()} />);

    expect(helpfulButton()).toBeInTheDocument();
    expect(notHelpfulButton()).toBeInTheDocument();
    expect(helpfulButton()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("morphs the clicked button into a focused response field and hides the sibling", () => {
    render(<FeedbackMorph onFeedback={vi.fn()} />);

    fireEvent.click(helpfulButton());

    const input = responseField();
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute("placeholder", "What worked well?");
    expect(helpfulButton()).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByRole("button", { name: "Not helpful" })).not.toBeInTheDocument();
  });

  it("asks what could be better when thumbs down is picked", () => {
    render(<FeedbackMorph onFeedback={vi.fn()} />);

    fireEvent.click(notHelpfulButton());

    expect(screen.getByPlaceholderText("What could be better?")).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Helpful" })).not.toBeInTheDocument();
  });

  it("submits the typed response trimmed, alongside the rating", () => {
    const onFeedback = vi.fn();
    render(<FeedbackMorph onFeedback={onFeedback} />);

    fireEvent.click(helpfulButton());
    fireEvent.change(responseField(), { target: { value: "  Clear and quick  " } });
    fireEvent.click(submitButton());

    expect(onFeedback).toHaveBeenCalledTimes(1);
    expect(onFeedback).toHaveBeenCalledWith({ rating: "up", response: "Clear and quick" });
    expect(screen.getByRole("status")).toHaveTextContent("Thanks for the feedback");
  });

  it("submits the rating alone when nothing is typed", () => {
    const onFeedback = vi.fn();
    render(<FeedbackMorph onFeedback={onFeedback} />);

    fireEvent.click(notHelpfulButton());
    fireEvent.click(submitButton());

    expect(onFeedback).toHaveBeenCalledWith({ rating: "down", response: "" });
  });

  it("returns to the buttons on Escape, discarding the draft and refocusing the trigger", async () => {
    const onFeedback = vi.fn();
    render(<FeedbackMorph onFeedback={onFeedback} />);

    fireEvent.click(helpfulButton());
    fireEvent.change(responseField(), { target: { value: "half-finished draft" } });
    fireEvent.keyDown(document, { key: "Escape" });

    await waitForGone(() => screen.queryByRole("textbox"));
    expect(onFeedback).not.toHaveBeenCalled();
    expect(notHelpfulButton()).toBeInTheDocument();
    await waitFor(() => expect(helpfulButton()).toHaveFocus());

    // The discarded draft does not resurface when the rating is picked again
    fireEvent.click(helpfulButton());
    expect(responseField()).toHaveValue("");
  });

  it("collapses the response field when clicking outside of it", async () => {
    render(<FeedbackMorph onFeedback={vi.fn()} />);

    fireEvent.click(helpfulButton());
    fireEvent.pointerDown(document.body);

    await waitForGone(() => screen.queryByRole("textbox"));
    expect(helpfulButton()).toBeInTheDocument();
    expect(notHelpfulButton()).toBeInTheDocument();
    expect(helpfulButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("morphs back into the two buttons after submitting, ready to replay", async () => {
    const onFeedback = vi.fn();
    render(<FeedbackMorph onFeedback={onFeedback} />);

    fireEvent.click(notHelpfulButton());
    fireEvent.click(submitButton());
    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        expect(helpfulButton()).toBeInTheDocument();
        expect(notHelpfulButton()).toBeInTheDocument();
      },
      { timeout: 4000 },
    );

    // The interaction can be played again straight away
    fireEvent.click(helpfulButton());
    expect(responseField()).toHaveAttribute("placeholder", "What worked well?");
    expect(onFeedback).toHaveBeenCalledTimes(1);
  });
});
