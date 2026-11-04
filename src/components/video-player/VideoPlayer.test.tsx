import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import VideoPlayer from "./VideoPlayer";

describe("VideoPlayer", () => {
  it("renders accessible custom controls and plays a direct video", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    render(<VideoPlayer src="/movie.mp4" title="A quiet scene" />);
    expect(screen.getByLabelText("A quiet scene")).toHaveAttribute("src", "/movie.mp4");
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    await waitFor(() => expect(play).toHaveBeenCalledOnce());
    fireEvent.play(screen.getByLabelText("A quiet scene"));
    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
    play.mockRestore();
  });

  it("updates progress and permits keyboard-accessible seeking", () => {
    render(<VideoPlayer src="/movie.mp4" title="Movie" />);
    const video = screen.getByLabelText("Movie") as HTMLVideoElement;
    Object.defineProperty(video, "duration", { configurable: true, value: 100 });
    fireEvent.durationChange(video);
    fireEvent.change(screen.getByRole("slider", { name: "Seek video" }), { target: { value: "35" } });
    expect(video.currentTime).toBe(35);
    fireEvent.timeUpdate(video);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuetext", "0:35 of 1:40");
  });

  it("reports failed playback", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(new Error("blocked"));
    render(<VideoPlayer src="/movie.mp4" title="Movie" />);
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Video could not be played");
    play.mockRestore();
  });

  it.each([
    ["youtube", "https://youtu.be/dQw4w9WgXcQ", "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"],
    ["vimeo", "https://vimeo.com/123456", "https://player.vimeo.com/video/123456"],
  ] as const)("embeds %s without covering its player", (provider, src, expected) => {
    render(<VideoPlayer provider={provider} src={src} title="Embedded video" />);
    expect(screen.getByTitle("Embedded video")).toHaveAttribute("src", expected);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("rejects unrelated embed URLs", () => {
    render(<VideoPlayer provider="youtube" src="https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ" title="Video" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid YouTube video URL");
    expect(screen.queryByTitle("Video")).not.toBeInTheDocument();
  });
});
