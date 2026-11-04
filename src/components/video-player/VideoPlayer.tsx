"use client";

import { useRef, useState } from "react";
import { Expand, Pause, Play, Volume2, VolumeX } from "lucide-react";
import styles from "./styles.module.css";

type Captions = { src: string; srcLang: string; label: string };

export type VideoPlayerProps = {
  /** A direct video URL or a YouTube/Vimeo video URL. */
  src: string;
  /** Describes the video for assistive technology. */
  title: string;
  provider?: "video" | "youtube" | "vimeo";
  poster?: string;
  captions?: Captions;
  className?: string;
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

export default function VideoPlayer({ src, title, provider = "video", poster, captions, className = "" }: VideoPlayerProps) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  if (provider !== "video") {
    const url = embedUrl(src, provider);
    return <div className={`${styles.player} ${styles.embed} ${className}`} data-slot="video-player">
      {url ? <iframe className={styles.media} src={url} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> : <p className={styles.error} role="alert">Invalid {provider === "youtube" ? "YouTube" : "Vimeo"} video URL.</p>}
    </div>;
  }

  const togglePlay = async () => {
    const element = video.current;
    if (!element) return;
    if (!element.paused) { element.pause(); return; }
    try { await element.play(); setError(false); } catch { setError(true); }
  };

  return <div ref={frame} className={`${styles.player} ${className}`} data-slot="video-player">
    <video key={src} ref={video} className={styles.media} src={src} poster={poster} aria-label={title} playsInline preload="metadata"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
      onEmptied={() => { setTime(0); setDuration(0); setPlaying(false); setError(false); }}
      onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
      onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
      onVolumeChange={(event) => setMuted(event.currentTarget.muted)} onError={() => setError(true)}>
      {captions && <track kind="captions" src={captions.src} srcLang={captions.srcLang} label={captions.label} default />}
    </video>
    <div className={styles.controls}>
      <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={togglePlay}>{playing ? <Pause /> : <Play />}</button>
      <button type="button" aria-label={muted ? "Unmute" : "Mute"} onClick={() => { if (video.current) video.current.muted = !video.current.muted; }}>{muted ? <VolumeX /> : <Volume2 />}</button>
      <span className={styles.time} aria-hidden="true">{formatTime(time)}</span>
      <input className={styles.seek} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(time, duration)} disabled={!duration} aria-label="Seek video" aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`} onChange={(event) => { if (video.current) video.current.currentTime = Number(event.currentTarget.value); }} />
      <span className={styles.time} aria-hidden="true">−{formatTime(duration - time)}</span>
      <button type="button" aria-label="Fullscreen" onClick={() => { if (frame.current?.requestFullscreen) void frame.current.requestFullscreen().catch(() => {}); }}><Expand /></button>
    </div>
    {error && <p className={styles.errorMessage} role="alert">Video could not be played.</p>}
  </div>;
}
