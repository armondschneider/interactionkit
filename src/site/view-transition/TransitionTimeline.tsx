"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { contentOpacity, surfaceProgress } from "./model";
import styles from "./timeline.module.css";

const duration = 400;
const speeds = [0.15, 0.25, 0.5, 1] as const;

export default function TransitionTimeline() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [showBounds, setShowBounds] = useState(true);
  const id = useId();
  const clipId = `${id}-clip`;
  const timeRef = useRef(0);
  const progress = surfaceProgress(time / 1000);
  const opacity = contentOpacity(time / 1000);
  const width = 144 + 96 * progress;
  const height = 44 + 119 * progress;
  const left = (300 - width) / 2;

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last: number | undefined;
    const tick = (now: number) => {
      if (last !== undefined) timeRef.current = Math.min(duration, timeRef.current + (now - last) * speed);
      last = now;
      setTime(timeRef.current);
      if (timeRef.current >= duration) setPlaying(false);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, speed]);

  function togglePlayback() {
    if (playing) { setPlaying(false); return; }
    if (timeRef.current >= duration) { timeRef.current = 0; setTime(0); }
    setPlaying(true);
  }

  return <section aria-labelledby="timeline-title">
    <h2 id="timeline-title" className="font-medium">Inside the transition</h2>
    <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">A wireframe of the quick-actions surface as it opens. Play it or drag the timeline to inspect a moment.</p>
    <div className="mt-5 px-3 py-4">
      <svg viewBox="0 0 300 205" aria-hidden="true" className="mx-auto block h-[205px] w-full max-w-[300px]">
        <defs><clipPath id={clipId}><rect x={left} y="20" width={width} height={height} rx="14" /></clipPath></defs>
        {showBounds && <g fill="none" strokeWidth="1" strokeDasharray="4 4"><rect x="30" y="20" width="240" height="163" rx="14" className="stroke-neutral-300 dark:stroke-neutral-600" /><rect x="78" y="20" width="144" height="44" rx="14" className="stroke-blue-400 dark:stroke-blue-400" /></g>}
        <rect x={left} y="20" width={width} height={height} rx="14" className="fill-neutral-200/60 stroke-neutral-800 dark:fill-neutral-700/60 dark:stroke-neutral-200" strokeWidth="1.5" />
        <g clipPath={`url(#${clipId})`}>
          <path d={`M${left + 14} 41h38`} className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="4.5" strokeLinecap="round" />
          <g opacity={opacity} className="stroke-neutral-400 dark:stroke-neutral-500" strokeWidth="4.5" strokeLinecap="round"><path d={`M${left + 14} 83h92`} /><path d={`M${left + 14} 119h70`} /><path d={`M${left + 14} 155h82`} /></g>
        </g>
      </svg>
      <dl className="mx-auto mt-3 grid max-w-[400px] grid-cols-3 gap-2 text-center text-xs tabular-nums"><div><dt className="text-neutral-500 dark:text-neutral-400">Width</dt><dd className="mt-1 font-medium">{Math.round(width)} px</dd></div><div><dt className="text-neutral-500 dark:text-neutral-400">Height</dt><dd className="mt-1 font-medium">{Math.round(height)} px</dd></div><div><dt className="text-neutral-500 dark:text-neutral-400">Content</dt><dd className="mt-1 font-medium">{Math.round(opacity * 100)}%</dd></div></dl>
    </div>
    <div className="mt-5 flex items-center gap-3">
      <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause animation" : time >= duration ? "Replay animation" : "Play animation"} className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-800">{playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}</button>
      <label htmlFor={id} className="sr-only">Animation timeline</label>
      <input id={id} type="range" min="0" max={duration} step="1" value={Math.round(time)} aria-valuetext={`${Math.round(time)} of ${duration} milliseconds`} onChange={(event) => { setPlaying(false); timeRef.current = Number(event.target.value); setTime(timeRef.current); }} className={styles.slider} style={{ "--timeline-progress": `${time / duration * 100}%` } as CSSProperties} />
      <span aria-hidden="true" className="min-w-[96px] shrink-0 whitespace-nowrap text-right text-xs tabular-nums text-neutral-500 dark:text-neutral-400">{Math.round(time)} / {duration} ms</span>
    </div>
    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2"><div className="flex items-center gap-1" aria-label="Playback speed"><span className="mr-2 text-xs text-neutral-500 dark:text-neutral-400">Speed</span>{speeds.map((value) => <button key={value} type="button" aria-pressed={speed === value} onClick={() => setSpeed(value)} className={`min-h-8 min-w-11 cursor-pointer rounded-md px-2 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${speed === value ? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100" : "text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800"}`}>{value}×</button>)}</div><button type="button" aria-pressed={showBounds} onClick={() => setShowBounds((current) => !current)} className="min-h-8 cursor-pointer rounded-md px-2 text-xs text-neutral-500 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-800">{showBounds ? "Hide bounds" : "Show bounds"}</button></div>
    <p className="mt-4 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">The solid outline is the moving surface; dashed outlines show the starting and expanded bounds. Values model an opening from rest using the component’s default spring and content timing. Dragging pauses playback; interrupted transitions can differ.</p>
  </section>;
}
