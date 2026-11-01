"use client";

import { Check, Clipboard, Code2, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HighlightedCode from "./HighlightedCode";

type Props = {
  code: string;
  title: string;
  terminal?: boolean;
};

export default function DocumentationCodeBlock({ code, title, terminal = false }: Props) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetRef.current) clearTimeout(resetRef.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setFailed(false);
      if (resetRef.current) clearTimeout(resetRef.current);
      resetRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setFailed(true);
    }
  }

  const Icon = terminal ? Terminal : Code2;

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-[#171716]">
      <div className="flex h-10 items-center justify-between border-b border-neutral-200/80 bg-neutral-50/80 pl-4 pr-2 text-xs text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-500">
        <span className="inline-flex items-center gap-2"><Icon size={13} strokeWidth={1.5} aria-hidden="true" />{title}</span>
        <button type="button" onClick={copy} aria-label={copied ? `Copied ${title}` : `Copy ${title}`} className="grid size-8 cursor-pointer place-items-center rounded-md transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:scale-95 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus-visible:outline-neutral-500">
          {copied ? <Check size={13} aria-hidden="true" /> : <Clipboard size={13} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[11px] leading-5 text-neutral-700 dark:text-neutral-300"><code className="font-[family-name:var(--font-inter-mono)]"><HighlightedCode code={code} terminal={terminal} /></code></pre>
      <span role="status" className="sr-only">{failed ? "Could not copy. Select and copy the code manually." : copied ? "Copied to clipboard" : ""}</span>
    </div>
  );
}
