"use client";

import { useState } from "react";
import Sheet from "../../components/sheet/Sheet";
import Button from "../../components/button/Button";

export default function SheetExample() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [updates, setUpdates] = useState(true);
  const [tips, setTips] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Sheet
        open={open}
        onOpenChange={(next) => { setOpen(next); if (next) setSaved(false); }}
        trigger="Open sheet"
        title="A little more your own."
        description="Choose what you’d like to hear about. The rest can wait."
        footer={
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => setOpen(false)} className="min-h-8 cursor-pointer rounded-md px-2 text-xs text-neutral-500 outline-none hover:text-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus-visible:ring-neutral-500">Cancel</button>
            <Button size="sm" onClick={() => { setSaved(true); setOpen(false); }}>Save preferences</Button>
          </div>
        }
      >
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3">
            <span><span className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">Product updates</span><span className="mt-1 block text-xs text-neutral-500 dark:text-neutral-400">New components and thoughtful improvements.</span></span>
            <input type="checkbox" checked={updates} onChange={(event) => setUpdates(event.target.checked)} className="size-4 shrink-0 cursor-pointer accent-neutral-800 dark:accent-neutral-200" />
          </label>
          <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3">
            <span><span className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">Tips and ideas</span><span className="mt-1 block text-xs text-neutral-500 dark:text-neutral-400">Small ways to make your app feel better.</span></span>
            <input type="checkbox" checked={tips} onChange={(event) => setTips(event.target.checked)} className="size-4 shrink-0 cursor-pointer accent-neutral-800 dark:accent-neutral-200" />
          </label>
        </div>
      </Sheet>
      <p role="status" className="m-0 h-4 text-[11px] text-neutral-400 dark:text-neutral-500">{saved ? "Preferences saved" : ""}</p>
    </div>
  );
}
