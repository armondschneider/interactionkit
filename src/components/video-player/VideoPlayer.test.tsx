import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import VideoPlayer from "./VideoPlayer";

describe("VideoPlayer", () => {
  it("renders accessible custom controls and plays a direct video", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    render(<VideoPlayer src="/movie.mp4" title="A quiet scene" />);
    expect(screen.getByLabelText("A quiet scene")).toHaveAttribute("src", "/movie.mp4");
    expect(screen.queryByRole("slider", { name: "Seek video" })).not.toBeInTheDocument();
    const initialPlay = screen.getByRole("button", { name: "Play" });
    initialPlay.focus();
    fireEvent.click(initialPlay);
    await waitFor(() => expect(play).toHaveBeenCalledOnce());
    fireEvent.play(screen.getByLabelText("A quiet scene"));
    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pause" })).toHaveFocus();
    play.mockRestore();
  });

  it("preloads the first frame when no poster is supplied", () => {
    const { rerender } = render(<VideoPlayer src="/movie.mp4" title="Movie" />);
    expect(screen.getByLabelText("Movie")).toHaveAttribute("preload", "auto");
    rerender(<VideoPlayer src="/movie.mp4" title="Movie" poster="/poster.jpg" />);
    expect(screen.getByLabelText("Movie")).toHaveAttribute("preload", "metadata");
    expect(screen.getByLabelText("Movie")).toHaveAttribute("poster", "/poster.jpg");
  });

  it("updates progress and permits keyboard-accessible seeking", () => {
    render(<VideoPlayer src="/movie.mp4" title="Movie" />);
    const video = screen.getByLabelText("Movie") as HTMLVideoElement;
    fireEvent.play(video);
    Object.defineProperty(video, "duration", { configurable: true, value: 100 });
    fireEvent.durationChange(video);
    fireEvent.change(screen.getByRole("slider", { name: "Seek video" }), { target: { value: "35" } });
    expect(video.currentTime).toBe(35);
    fireEvent.timeUpdate(video);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuetext", "0:35 of 1:40");
  });

  it("reads duration on play when metadata was loaded before event handlers attached", () => {
    render(<VideoPlayer src="/movie.mp4" title="Movie" />);
    const video = screen.getByLabelText("Movie") as HTMLVideoElement;
    Object.defineProperty(video, "duration", { configurable: true, value: 100 });
    Object.defineProperty(video, "currentTime", { configurable: true, value: 25, writable: true });
    fireEvent.play(video);
    fireEvent.timeUpdate(video);
    const seek = screen.getByRole("slider", { name: "Seek video" });
    expect(seek).toHaveAttribute("aria-valuetext", "0:25 of 1:40");
    expect(seek).toHaveStyle({ "--played": "25%" });
  });

  it("toggles playback when clicking the video after it starts", async () => {
    const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    render(<VideoPlayer src="/movie.mp4" title="Movie" />);
    const video = screen.getByLabelText("Movie") as HTMLVideoElement;
    Object.defineProperty(video, "paused", { configurable: true, value: false });
    fireEvent.play(video);
    fireEvent.click(screen.getByRole("button", { name: "Pause video" }));
    expect(pause).toHaveBeenCalledOnce();
    Object.defineProperty(video, "paused", { configurable: true, value: true });
    fireEvent.pause(video);
    fireEvent.click(screen.getByRole("button", { name: "Play video" }));
    await waitFor(() => expect(play).toHaveBeenCalledOnce());
    pause.mockRestore();
    play.mockRestore();
  });

  it("returns to the initial play button when the source changes", () => {
    const { rerender } = render(<VideoPlayer src="/first.mp4" title="Movie" />);
    fireEvent.play(screen.getByLabelText("Movie"));
    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
    rerender(<VideoPlayer src="/second.mp4" title="Movie" />);
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
    expect(screen.queryByRole("slider")).not.toBeInTheDocument();
  });

  it("clears errors and previous playback state when switching sources and back", () => {
    const { rerender } = render(<VideoPlayer src="/first.mp4" title="Movie" />);
    const video = screen.getByLabelText("Movie");
    fireEvent.play(video);
    fireEvent.error(video);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    rerender(<VideoPlayer src="/second.mp4" title="Movie" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    rerender(<VideoPlayer src="/first.mp4" title="Movie" />);
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
    expect(screen.queryByRole("slider")).not.toBeInTheDocument();
  });

  it("ignores a playback failure from a previous source", async () => {
    let rejectPlay!: (error: Error) => void;
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => new Promise((_, reject) => { rejectPlay = reject; }));
    const { rerender } = render(<VideoPlayer src="/first.mp4" title="Movie" />);
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    rerender(<VideoPlayer src="/second.mp4" title="Movie" />);
    await act(async () => { rejectPlay(new Error("blocked")); });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    play.mockRestore();
  });

  it("reports failed playback", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(new Error("blocked"));
    render(<VideoPlayer src="/movie.mp4" title="Movie" />);
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Video could not be played");
    play.mockRestore();
  });

  it("offers compact volume and caption controls after playback starts", () => {
    render(<VideoPlayer src="/movie.mp4" title="Movie" captions={{ src: "/captions.vtt", srcLang: "en", label: "English" }} />);
    const video = screen.getByLabelText("Movie") as HTMLVideoElement;
    fireEvent.play(video);
    fireEvent.change(screen.getByLabelText("Volume"), { target: { value: "0.5" } });
    expect(video.volume).toBe(0.5);
    const captions = screen.getByRole("button", { name: "Captions" });
    expect(captions).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(captions);
    expect(captions).toHaveAttribute("aria-pressed", "false");
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
