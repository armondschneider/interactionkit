import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import VideoPlayer from "./VideoPlayer";

afterEach(() => { vi.unstubAllGlobals(); });

describe("experimental YouTube controls", () => {
  it("controls an unobscured iframe via the player API", async () => {
    const playVideo = vi.fn();
    const seekTo = vi.fn();
    const destroy = vi.fn();
    let options: { playerVars: { controls: number }; events: { onReady: (event: { target: unknown }) => void; onStateChange: (event: { data: number; target: unknown }) => void } };
    const iframe = document.createElement("iframe");
    const api = { playVideo, pauseVideo: vi.fn(), seekTo, mute: vi.fn(), unMute: vi.fn(), isMuted: () => false, getCurrentTime: () => 0, getDuration: () => 100, getVideoLoadedFraction: () => 0.5, getIframe: () => iframe, destroy };
    class Player {
      constructor(_element: HTMLElement, config: typeof options) { options = config; return api; }
    }
    vi.stubGlobal("YT", { Player });
    const { unmount } = render(<VideoPlayer provider="youtube" youtubeControls="custom" src="https://youtu.be/dQw4w9WgXcQ" title="Example" />);
    await waitFor(() => expect(options).toBeDefined());
    expect(options!.playerVars.controls).toBe(0);
    expect(screen.getByRole("button", { name: "Play" })).toBeDisabled();
    act(() => options!.events.onReady({ target: api }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Play" })).toBeEnabled());
    expect(iframe.title).toBe("Example");
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(playVideo).toHaveBeenCalledOnce();
    fireEvent.change(screen.getByRole("slider", { name: "Seek video" }), { target: { value: "35" } });
    expect(seekTo).toHaveBeenCalledWith(35, true);
    unmount();
    expect(destroy).toHaveBeenCalledOnce();
  });
});
