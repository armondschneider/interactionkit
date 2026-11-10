import { surfaceProgress } from "./model";

function Frame({ time }: { time: number }) {
  const progress = surfaceProgress(time);
  const width = 144 + (240 - 144) * progress;
  const height = 44 + (163 - 44) * progress;
  const radius = 14;
  const left = (140 - width / 2) / 2;
  return <div className="min-w-0 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900/50">
    <svg viewBox="0 0 140 100" role="img" aria-label={`${Math.round(time * 1000)} milliseconds: approximately ${Math.round(width)} by ${Math.round(height)} pixels`} className="mx-auto block w-full max-w-[180px]">
      <rect x={left} y="8" width={width / 2} height={height / 2} rx={radius / 2} className="fill-neutral-200/60 stroke-neutral-800 dark:fill-neutral-700/50 dark:stroke-neutral-200" strokeWidth="1.2" />
      <rect x="34" y="8" width="72" height="22" rx="6" className="fill-none stroke-blue-500 dark:stroke-blue-400" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
    <div className="mt-2 space-y-1"><p className="text-xs font-medium tabular-nums">{Math.round(time * 1000)} ms</p><p className="whitespace-nowrap text-xs tabular-nums text-neutral-500 dark:text-neutral-400">{Math.round(width)} × {Math.round(height)} px</p></div>
  </div>;
}

export default function MorphPhases() {
  return <figure className="my-10 rounded-xl border border-neutral-200 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(23,23,23,0.04),0_3px_6px_rgba(23,23,23,0.025)] sm:p-6 dark:border-neutral-800 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.18),0_3px_6px_rgba(0,0,0,0.12)]">
    <figcaption><h2 className="font-medium">How the surface grows</h2><p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Four modeled moments in the opening spring, compared with the original trigger.</p></figcaption>
    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[0, 0.06, 0.12, 0.2].map((time) => <Frame key={time} time={time} />)}</div>
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400"><span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-4 rounded-sm border border-neutral-800 bg-neutral-200 dark:border-neutral-200 dark:bg-neutral-700" />Moving surface</span><span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-4 rounded-sm border border-dashed border-blue-500 dark:border-blue-400" />Original trigger</span></div>
    <p className="mt-4 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">Dimensions are modeled from the demo’s spring, starting from rest, and rounded to the nearest pixel. The dashed outline stays fixed; the surface grows around it. Interrupted transitions can differ.</p>
  </figure>;
}
