import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import StudyTitle from "./StudyTitle";

afterEach(() => vi.unstubAllGlobals());

describe("study title", () => {
  it("copies the page URL", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
    render(<StudyTitle />);
    fireEvent.click(screen.getByRole("button", { name: "Copy link to View Transition" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(window.location.href));
    expect(await screen.findByRole("status")).toHaveTextContent("Page link copied");
  });

  it("reports when copying fails", async () => {
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
    render(<StudyTitle />);
    fireEvent.click(screen.getByRole("button", { name: "Copy link to View Transition" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Could not copy the page link"));
  });
});
