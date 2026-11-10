"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Expand, Pause, Play, Volume2, VolumeX } from "lucide-react";
import styles from "./styles.module.css";

type Player = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  getVideoLoadedFraction: () => number;
  getIframe: () => HTMLIFrameElement;
  destroy: () => void;
};

type YouTubeWindow = Window & {
  YT?: { Player: new (element: HTMLElement, options: object) => Player };
  onYouTubeIframeAPIReady?: () => void;
};

let apiPromise: Promise<NonNullable<YouTubeWindow["YT"]>> | null = null;

function loadYouTube() {
  const win = window as YouTubeWindow;
  if (win.YT?.Player) return Promise.resolve(win.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const previous = win.onYouTubeIframeAPIReady;
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');
    const script = existing ?? document.createElement("script");
    let finished = false;
    const finish = (error?: Error) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      script.removeEventListener("error", onError);
      if (win.onYouTubeIframeAPIReady === ready) win.onYouTubeIframeAPIReady = previous;
      if (error || !win.YT?.Player) { apiPromise = null; reject(error ?? new Error("YouTube API unavailable")); }
      else resolve(win.YT);
    };
    const ready = () => { try { previous?.(); } finally { finish(); } };
    const onError = () => { if (!existing) script.remove(); finish(new Error("YouTube API failed to load")); };
    const timeout = window.setTimeout(() => { if (!existing) script.remove(); finish(new Error("YouTube API timed out")); }, 15000);
    win.onYouTubeIframeAPIReady = ready;
    script.addEventListener("error", onError);
    if (!existing) { script.src = "https://www.youtube.com/iframe_api"; script.async = true; document.head.appendChild(script); }
  });
  return apiPromise;
}

function formatTime(value: number) {
  const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function YouTubePlayer({ url, title, className = "" }: { url: string; title: string; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let instance: Player | null = null;
    const element = host.current;
    setReady(false); setFailed(false); setPlaying(false); setTime(0); setDuration(0); setBuffered(0);
    if (!element) return;
    const mount = document.createElement("div");
    element.appendChild(mount);
    loadYouTube().then((api) => {
      if (cancelled) return;
      instance = new api.Player(mount, {
        videoId: url.split("/").pop(), host: "https://www.youtube-nocookie.com",
        playerVars: { controls: 0, playsinline: 1, origin: window.location.origin },
        events: {
          onReady: (event: { target: Player }) => { if (cancelled) return; player.current = event.target; event.target.getIframe().title = title; setDuration(event.target.getDuration() || 0); setMuted(event.target.isMuted()); setReady(true); },
          onStateChange: (event: { data: number; target: Player }) => { if (cancelled) return; setPlaying(event.data === 1); setDuration(event.target.getDuration() || 0); setTime(event.target.getCurrentTime() || 0); },
          onError: () => { if (!cancelled) setFailed(true); },
        },
      });
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; player.current = null; instance?.destroy(); mount.remove(); };
  }, [url, title]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setInterval(() => {
      const current = player.current;
      if (!current) return;
      setTime(current.getCurrentTime() || 0);
      setDuration(current.getDuration() || 0);
      setBuffered(current.getVideoLoadedFraction() || 0);
      setMuted(current.isMuted());
    }, 500);
    return () => window.clearInterval(timer);
  }, [ready]);

  useEffect(() => {
    const update = () => setFullscreen(document.fullscreenElement === container.current);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  return <div ref={container} className={`${styles.youtubePlayer} ${className}`} data-slot="video-player">
    <div className={styles.youtubeFrame}>
      <div ref={host} className={styles.youtubeHost} hidden={failed} />
      {failed && <iframe className={styles.media} src={url} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />}
    </div>
    {!failed && <div className={`${styles.controls} ${styles.youtubeControls}`}>
      <button type="button" aria-label={playing ? "Pause" : "Play"} disabled={!ready} onClick={() => playing ? player.current?.pauseVideo() : player.current?.playVideo()}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button>
      <button type="button" aria-label={muted ? "Unmute" : "Mute"} disabled={!ready} onClick={() => { if (muted) player.current?.unMute(); else player.current?.mute(); setMuted(!muted); }}>{muted ? <VolumeX /> : <Volume2 />}</button>
      <span className={styles.time} aria-hidden="true">{formatTime(time)}</span>
      <div className={styles.timeline}><input className={styles.seek} style={{ "--played": `${duration ? Math.min(100, time / duration * 100) : 0}%`, "--buffered": `${Math.min(100, buffered * 100)}%` } as CSSProperties} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(time, duration)} disabled={!ready || !duration} aria-label="Seek video" aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`} onChange={(event) => { const seconds = Number(event.currentTarget.value); setTime(seconds); player.current?.seekTo(seconds, true); }} /></div>
      <span className={styles.time} aria-hidden="true">−{formatTime(duration - time)}</span>
      <button type="button" aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={() => { if (fullscreen) void document.exitFullscreen().catch(() => {}); else if (container.current?.requestFullscreen) void container.current.requestFullscreen().catch(() => {}); }}><Expand /></button>
    </div>}
    {failed && <p className={styles.youtubeNotice} role="status">Custom controls unavailable. Showing the standard YouTube player.</p>}
  </div>;
}
