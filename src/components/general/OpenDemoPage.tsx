import fs from "fs";
import path from "path";
import type { ReactNode } from "react";
import CodeBlock from "../code/CodeBlock";
import { SpringLinkButton } from "./SpringButton";

type Props = {
  title: string;
  description: string;
  sourcePath: string;
  children: ReactNode;
  previewClassName?: string;
};

export default function OpenDemoPage({
  title,
  description,
  sourcePath,
  children,
  previewClassName = "",
}: Props) {
  const source = fs.readFileSync(path.join(process.cwd(), sourcePath), "utf8");

  return (
    <main className="min-h-screen bg-neutral-50 px-5 py-2 text-neutral-800 sm:px-8 sm:py-10">
      <nav className="mx-auto flex h-14 w-full max-w-2xl items-center" aria-label="Demo navigation">
        <SpringLinkButton href="/">Back Home</SpringLinkButton>
      </nav>
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-12 pt-8">
          <div>
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">{description}</p>
          </div>
        </header>

        <section aria-label={`${title} live preview`} className={`relative flex min-h-[420px] items-center justify-center rounded-xl border border-neutral-200 bg-white/40 p-8 sm:min-h-[500px] sm:p-12 ${previewClassName}`}>
          {children}
        </section>

        <section className="mt-12" aria-labelledby="source-code-title">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="source-code-title" className="text-sm font-medium">Source code</h2>
            <span className="text-xs text-neutral-500">Copy and paste into your project</span>
          </div>
          <CodeBlock code={source} language="tsx" title={path.basename(sourcePath)} />
        </section>
      </div>
    </main>
  );
}
