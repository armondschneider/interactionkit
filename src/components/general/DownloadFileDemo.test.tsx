import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DownloadFileDemo from "./DownloadFileDemo";

// NumberFlow's custom element needs browser animation APIs absent in jsdom.
// Keep state-machine tests independent of its rendering implementation.
vi.mock("@number-flow/react", () => ({
  default: ({ value, suffix }: { value: number; suffix: string }) => <span>{value}{suffix}</span>,
}));

describe("DownloadFileDemo", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(async () => {
    await act(async () => {});
    cleanup();
    vi.useRealTimers();
  });

  function completeDownload() {
    act(() => { vi.advanceTimersByTime(2000); });
  }

  it("starts with a download action and no file link", () => {
    render(<DownloadFileDemo />);
    expect(screen.getByRole("button", { name: "Download file" })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("shows progress and resolves to a completed card without navigation", () => {
    const { container } = render(<DownloadFileDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Download file" }));
    expect(screen.getByRole("button", { name: "Downloading file" })).toHaveAttribute("aria-disabled", "true");
    act(() => { vi.advanceTimersByTime(1000); });
    expect(container.querySelector("[data-progress]")).toHaveAttribute("data-progress", "48");
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByRole("group", { name: "Download complete: studio-mark.svg" })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Download complete");
  });

  it("does not start overlapping transfers on repeated clicks", () => {
    const { container } = render(<DownloadFileDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Download file" }));
    const pending = screen.getByRole("button", { name: "Downloading file" });
    fireEvent.click(pending);
    fireEvent.click(pending);
    act(() => { vi.advanceTimersByTime(800); });
    expect(container.querySelector("[data-progress]")).toHaveAttribute("data-progress", "40");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("cancels without later completing and can restart", () => {
    render(<DownloadFileDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Download file" }));
    act(() => { vi.advanceTimersByTime(800); });
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    completeDownload();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Download file" }));
    completeDownload();
    expect(screen.getByRole("group", { name: "Download complete: studio-mark.svg" })).toBeInTheDocument();
  });

  it("preserves keyboard focus through completion and replay", () => {
    render(<DownloadFileDemo />);
    const button = screen.getByRole("button", { name: "Download file" });
    button.focus();
    fireEvent.click(button, { detail: 0 });
    completeDownload();
    expect(screen.getByRole("group", { name: "Download complete: studio-mark.svg" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }), { detail: 0 });
    expect(screen.getByRole("button", { name: "Download file" })).toHaveFocus();
  });

  it("does not steal focus when the user has moved away", () => {
    render(<DownloadFileDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Download file" }));
    screen.getByRole("button", { name: "Cancel" }).focus();
    completeDownload();
    expect(screen.getByRole("group", { name: "Download complete: studio-mark.svg" })).not.toHaveFocus();
  });

  it("cleans up a pending transfer on unmount", () => {
    const { unmount } = render(<DownloadFileDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Download file" }));
    unmount();
    completeDownload();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
