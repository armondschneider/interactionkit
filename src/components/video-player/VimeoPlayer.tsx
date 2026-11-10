"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type Player from "@vimeo/player";
import { Expand, Pause, Play, Volume2, VolumeX } from "lucide-react";
import styles from "./styles.module.css";

function formatTime(value: number) {
  const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function VimeoPlayer({ url, title, className = "" }: { url: string; title: string; className?: string }) {
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
    let expired = false;
    let instance: Player | null = null;
    const element = host.current;
    setReady(false); setFailed(false); setPlaying(false); setTime(0); setDuration(0); setBuffered(0);
    if (!element) return;
    const iframe = document.createElement("iframe");
    iframe.title = title;
    iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.src = `${url}?controls=0`;
    element.appendChild(iframe);
    const timeout = window.setTimeout(() => { if (!cancelled) { expired = true; setFailed(true); } }, 15000);
    import("@vimeo/player").then(async ({ default: VimeoSDK }) => {
      if (cancelled || expired) return;
      instance = new VimeoSDK(iframe);
      const current = instance;
      current.on("play", () => { if (!cancelled) setPlaying(true); });
      current.on("pause", () => { if (!cancelled) setPlaying(false); });
      current.on("ended", () => { if (!cancelled) setPlaying(false); });
      current.on("timeupdate", (event: { seconds: number; duration: number }) => { if (!cancelled) { setTime(event.seconds); setDuration(event.duration); } });
      current.on("progress", (event: { percent: number }) => { if (!cancelled) setBuffered(event.percent); });
      current.on("volumechange", (event: { muted: boolean }) => { if (!cancelled) setMuted(event.muted); });
      await current.ready();
      if (cancelled || expired) return;
      clearTimeout(timeout);
      player.current = current;
      setReady(true);
      void current.getDuration().then((total) => { if (!cancelled && !expired) setDuration(total); }).catch(() => {});
      void current.getMuted().then((isMuted) => { if (!cancelled && !expired) setMuted(isMuted); }).catch(() => {});
    }).catch(() => { if (!cancelled) { clearTimeout(timeout); setFailed(true); } });
    return () => { cancelled = true; clearTimeout(timeout); player.current = null; if (instance) void instance.destroy().catch(() => {}); else iframe.remove(); };
  }, [url, title]);

  useEffect(() => {
    if (!failed) return;
    const current = player.current;
    player.current = null;
    if (current) void current.destroy().catch(() => {});
    host.current?.replaceChildren();
  }, [failed]);

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
      <button type="button" aria-label={playing ? "Pause" : "Play"} disabled={!ready} onClick={() => { const current = player.current; if (current) void (playing ? current.pause() : current.play()).catch(() => setFailed(true)); }}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button>
      <button type="button" aria-label={muted ? "Unmute" : "Mute"} disabled={!ready} onClick={() => { const current = player.current; if (current) void current.setMuted(!muted).then(setMuted).catch(() => {}); }}>{muted ? <VolumeX /> : <Volume2 />}</button>
      <span className={styles.time} aria-hidden="true">{formatTime(time)}</span>
      <div className={styles.timeline}><input className={styles.seek} style={{ "--played": `${duration ? Math.min(100, time / duration * 100) : 0}%`, "--buffered": `${Math.min(100, buffered * 100)}%` } as CSSProperties} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(time, duration)} disabled={!ready || !duration} aria-label="Seek video" aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`} onChange={(event) => { const seconds = Number(event.currentTarget.value); setTime(seconds); void player.current?.setCurrentTime(seconds).catch(() => {}); }} /></div>
      <span className={styles.time} aria-hidden="true">−{formatTime(duration - time)}</span>
      <button type="button" aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={() => { if (fullscreen) void document.exitFullscreen().catch(() => {}); else if (container.current?.requestFullscreen) void container.current.requestFullscreen().catch(() => {}); }}><Expand /></button>
    </div>}
    {failed && <p className={styles.youtubeNotice} role="status">Custom controls unavailable. Showing the standard Vimeo player.</p>}
  </div>;
}
