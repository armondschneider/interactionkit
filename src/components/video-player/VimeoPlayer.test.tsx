import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VideoPlayer from "./VideoPlayer";

const sdk = vi.hoisted(() => ({ play: vi.fn(), pause: vi.fn(), setMuted: vi.fn(), setCurrentTime: vi.fn(), ready: vi.fn(), getDuration: vi.fn(), getMuted: vi.fn(), on: vi.fn(), destroy: vi.fn() }));
vi.mock("@vimeo/player", () => ({ default: class { constructor() { return sdk; } } }));

beforeEach(() => {
  vi.clearAllMocks();
  sdk.ready.mockResolvedValue(undefined);
  sdk.getDuration.mockResolvedValue(100);
  sdk.getMuted.mockResolvedValue(false);
  sdk.play.mockResolvedValue(undefined);
  sdk.setMuted.mockResolvedValue(true);
  sdk.setCurrentTime.mockResolvedValue(35);
  sdk.destroy.mockResolvedValue(undefined);
});

describe("experimental Vimeo controls", () => {
  it("uses the Vimeo SDK and places controls outside the embed", async () => {
    const { unmount } = render(<VideoPlayer provider="vimeo" vimeoControls="custom" src="https://vimeo.com/123456" title="Example" />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Play" })).toBeEnabled());
    const iframe = screen.getByTitle("Example");
    expect(iframe).toHaveAttribute("src", "https://player.vimeo.com/video/123456?controls=0");
    expect(iframe).toHaveAttribute("allow", expect.stringContaining("fullscreen"));
    expect(iframe).toHaveAttribute("allowfullscreen");
    expect(iframe).toHaveAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    expect(iframe.parentElement?.parentElement).not.toContainElement(screen.getByRole("button", { name: "Play" }));
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(sdk.play).toHaveBeenCalledOnce();
    fireEvent.change(screen.getByRole("slider", { name: "Seek video" }), { target: { value: "35" } });
    expect(sdk.setCurrentTime).toHaveBeenCalledWith(35);
    unmount();
    expect(sdk.destroy).toHaveBeenCalledOnce();
  });

  it("falls back to a native embed when initialization fails", async () => {
    sdk.ready.mockRejectedValue(new Error("failed"));
    render(<VideoPlayer provider="vimeo" vimeoControls="custom" src="https://vimeo.com/123456" title="Example" />);
    expect(await screen.findByRole("status")).toHaveTextContent("standard Vimeo player");
    expect(screen.getByTitle("Example")).toHaveAttribute("src", "https://player.vimeo.com/video/123456");
    expect(screen.queryByRole("button", { name: "Play" })).not.toBeInTheDocument();
  });

  it("allows playback even if optional metadata requests fail", async () => {
    sdk.getDuration.mockRejectedValue(new Error("unavailable"));
    sdk.getMuted.mockRejectedValue(new Error("unavailable"));
    render(<VideoPlayer provider="vimeo" vimeoControls="custom" src="https://vimeo.com/123456" title="Example" />);
    const play = await screen.findByRole("button", { name: "Play" });
    await waitFor(() => expect(play).toBeEnabled());
    fireEvent.click(play);
    expect(sdk.play).toHaveBeenCalledOnce();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
