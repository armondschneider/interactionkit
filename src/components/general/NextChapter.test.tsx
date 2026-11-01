import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import NextChapter from "./NextChapter";

describe("NextChapter", () => {
  // jsdom does not implement the native dialog lifecycle.
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
    HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  });

  function openAnnouncement() {
    render(<NextChapter />);
    fireEvent.click(screen.getByRole("button", { name: /InteractionKit 2.0/ }));
    return screen.getByRole("dialog");
  }

  it("opens an accessible announcement and locks background scrolling", () => {
    const dialog = openAnnouncement();
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAccessibleName("Less like a website.More like an app.");
    expect(screen.getByText(/We’re building an npm package/)).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes with the close button and restores scrolling", async () => {
    const previousOverflow = document.body.style.overflow;
    const dialog = openAnnouncement();
    fireEvent.click(screen.getByRole("button", { name: "Close announcement" }));
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
    expect(document.body.style.overflow).toBe(previousOverflow);
  });

  it("handles the native Escape cancellation and can reopen", async () => {
    const dialog = openAnnouncement();
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
    fireEvent.click(screen.getByRole("button", { name: /InteractionKit 2.0/ }));
    expect(dialog).toHaveAttribute("open");
  });
});
