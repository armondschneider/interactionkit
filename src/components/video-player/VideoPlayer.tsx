"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Captions, Expand, Pause, Play, Volume2, VolumeX } from "lucide-react";
import styles from "./styles.module.css";
import YouTubePlayer from "./YouTubePlayer";
import VimeoPlayer from "./VimeoPlayer";

type CaptionTrack = { src: string; srcLang: string; label: string };

export type VideoPlayerProps = {
  /** A direct video URL or a YouTube/Vimeo video URL. */
  src: string;
  /** Describes the video for assistive technology. */
  title: string;
  provider?: "video" | "youtube" | "vimeo";
  poster?: string;
  captions?: CaptionTrack;
  className?: string;
  /** Use experimental custom controls below YouTube's player. Defaults to native controls. */
  youtubeControls?: "native" | "custom";
  /** Requires a Vimeo video eligible for chromeless embeds. Defaults to native controls. */
  vimeoControls?: "native" | "custom";
};

function embedUrl(src: string, provider: "youtube" | "vimeo") {
  try {
    const url = new URL(src);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    if (provider === "youtube") {
      const id = host === "youtu.be" ? url.pathname.slice(1) :
        ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(host)
          ? (url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)\/?$/)?.[1])
          : null;
      return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (!["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) return null;
    const id = url.pathname.match(/^\/(?:video\/)?(\d+)\/?$/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  } catch {
    return null;
  }
}

function formatTime(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

export default function VideoPlayer({ src, title, provider = "video", poster, captions, className = "", youtubeControls = "native", vimeoControls = "native" }: VideoPlayerProps) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const initialPlay = useRef<HTMLButtonElement>(null);
  const playbackControl = useRef<HTMLButtonElement>(null);
  const captionTrack = useRef<HTMLTrackElement>(null);
  const restoreControlFocus = useRef(false);
  const [startedSrc, setStartedSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [preview, setPreview] = useState<number | null>(null);
  const [buffered, setBuffered] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const started = provider === "video" && startedSrc === src;

  useEffect(() => {
    restoreControlFocus.current = false;
    setStartedSrc(null);
    setPlaying(false);
    setMuted(false);
    setVolume(1);
    setCaptionsOn(true);
    setPreview(null);
    setBuffered(0);
    setTime(0);
    setDuration(0);
    setError(false);
  }, [src, provider]);

  useEffect(() => {
    if (started && restoreControlFocus.current) {
      playbackControl.current?.focus();
      restoreControlFocus.current = false;
    }
  }, [started]);

  useEffect(() => {
    const update = () => setFullscreen(document.fullscreenElement === frame.current);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  if (provider !== "video") {
    const url = embedUrl(src, provider);
    if (provider === "youtube" && youtubeControls === "custom" && url) return <YouTubePlayer url={url} title={title} className={className} />;
    if (provider === "vimeo" && vimeoControls === "custom" && url) return <VimeoPlayer url={url} title={title} className={className} />;
    return <div className={`${styles.player} ${styles.embed} ${className}`} data-slot="video-player">
      {url ? <iframe className={styles.media} src={url} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> : <p className={styles.error} role="alert">Invalid {provider === "youtube" ? "YouTube" : "Vimeo"} video URL.</p>}
    </div>;
  }

  const togglePlay = async () => {
    const element = video.current;
    if (!element) return;
    if (!element.paused) { element.pause(); return; }
    try { await element.play(); if (video.current === element) setError(false); } catch { if (video.current === element) setError(true); }
  };

  const syncDuration = (element: HTMLVideoElement) => {
    setDuration(Number.isFinite(element.duration) ? element.duration : 0);
  };

  return <div ref={frame} className={`${styles.player} ${className}`} data-slot="video-player">
    <video key={src} ref={video} className={styles.media} src={src} poster={poster} aria-label={title} playsInline preload={poster ? "metadata" : "auto"}
      onPlay={(event) => { restoreControlFocus.current = document.activeElement === initialPlay.current; syncDuration(event.currentTarget); setStartedSrc(src); setPlaying(true); }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
      onEmptied={() => { setTime(0); setDuration(0); setBuffered(0); setPlaying(false); setError(false); }}
      onLoadedMetadata={(event) => syncDuration(event.currentTarget)}
      onTimeUpdate={(event) => { setTime(event.currentTarget.currentTime); if (!duration) syncDuration(event.currentTarget); }}
      onDurationChange={(event) => syncDuration(event.currentTarget)}
      onProgress={(event) => { const ranges = event.currentTarget.buffered; setBuffered(ranges.length ? ranges.end(ranges.length - 1) : 0); }}
      onVolumeChange={(event) => { setMuted(event.currentTarget.muted); setVolume(event.currentTarget.volume); }} onError={() => setError(true)}>
      {captions && <track ref={captionTrack} kind="captions" src={captions.src} srcLang={captions.srcLang} label={captions.label} default onLoad={() => { if (captionTrack.current?.track) captionTrack.current.track.mode = captionsOn ? "showing" : "disabled"; }} />}
    </video>
    {!started && <button ref={initialPlay} type="button" className={styles.initialPlay} aria-label="Play" onClick={togglePlay}><Play aria-hidden="true" fill="currentColor" /></button>}
    {started && <button type="button" className={styles.videoSurface} tabIndex={-1} aria-label={playing ? "Pause video" : "Play video"} onClick={togglePlay} />}
    {started && <div className={styles.controls}>
      <button ref={playbackControl} type="button" aria-label={playing ? "Pause" : "Play"} onClick={togglePlay}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button>
      <div className={styles.sound}>
        <button type="button" aria-label={muted || volume === 0 ? "Unmute" : "Mute"} onClick={() => { if (video.current) { if (video.current.muted || video.current.volume === 0) { video.current.muted = false; if (video.current.volume === 0) video.current.volume = 1; } else video.current.muted = true; } }}>{muted || volume === 0 ? <VolumeX /> : <Volume2 />}</button>
        <div className={styles.volume}><input type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} style={{ "--level": `${(muted ? 0 : volume) * 100}%` } as CSSProperties} aria-label="Volume" onChange={(event) => { if (video.current) { video.current.volume = Number(event.currentTarget.value); video.current.muted = false; } }} /></div>
      </div>
      <span className={styles.time} aria-hidden="true">{formatTime(time)}</span>
      <div className={styles.timeline} onPointerMove={(event) => { if (!duration || event.pointerType === "touch") return; const rect = event.currentTarget.getBoundingClientRect(); if (rect.width) setPreview(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))); }} onPointerLeave={() => setPreview(null)}>
        <input className={styles.seek} style={{ "--played": `${duration ? Math.min(100, (time / duration) * 100) : 0}%`, "--buffered": `${duration ? Math.min(100, (buffered / duration) * 100) : 0}%` } as CSSProperties} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(time, duration)} disabled={!duration} aria-label="Seek video" aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`} onChange={(event) => { if (video.current) video.current.currentTime = Number(event.currentTarget.value); }} />
        {preview !== null && <span className={styles.preview} style={{ left: `clamp(22px, ${preview * 100}%, calc(100% - 22px))` }} aria-hidden="true">{formatTime(preview * duration)}</span>}
      </div>
      <span className={styles.time} aria-hidden="true">−{formatTime(duration - time)}</span>
      {captions && <button type="button" aria-label="Captions" aria-pressed={captionsOn} onClick={() => { const next = !captionsOn; setCaptionsOn(next); if (captionTrack.current?.track) captionTrack.current.track.mode = next ? "showing" : "disabled"; }}><Captions /></button>}
      <button type="button" aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={() => { if (fullscreen) void document.exitFullscreen().catch(() => {}); else if (frame.current?.requestFullscreen) void frame.current.requestFullscreen().catch(() => {}); }}><Expand /></button>
    </div>}
    {error && <p className={styles.errorMessage} role="alert">Video could not be played.</p>}
  </div>;
}
