import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CopyAgentPrompt from "./CopyAgentPrompt";

afterEach(() => vi.unstubAllGlobals());

describe("agent prompt", () => {
  it("copies Markdown directions for the ViewTransition component", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
    render(<CopyAgentPrompt />);
    fireEvent.click(screen.getByRole("button", { name: "Copy agent prompt" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledOnce());
    const prompt = writeText.mock.calls[0][0];
    expect(prompt).toContain("# Implement an InteractionKit View Transition");
    expect(prompt).toContain("https://interactionkit.org/docs/components/view-transition");
    expect(prompt).toContain("`useintkit/styles.css`");
    expect(prompt).toContain("non-modal disclosure");
    expect(screen.getByRole("status")).toHaveTextContent("Agent prompt copied");
  });

  it("reports clipboard failures and allows a retry", async () => {
    const writeText = vi.fn().mockRejectedValueOnce(new Error("denied")).mockResolvedValueOnce(undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
    render(<CopyAgentPrompt />);
    fireEvent.click(screen.getByRole("button", { name: "Copy agent prompt" }));
    const retry = await screen.findByRole("button", { name: "Could not copy — try again" });
    expect(screen.getByRole("status")).toHaveTextContent("Could not copy the agent prompt");
    fireEvent.click(retry);
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Agent prompt copied"));
  });
});
