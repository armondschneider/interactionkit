import fs from "fs";
import path from "path";
import type { ReactNode } from "react";
import Link from "next/link";
import DocumentationCodeBlock from "../../../src/site/code/DocumentationCodeBlock";
import ArchiveShell from "../../../src/site/ArchiveShell";

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
    <ArchiveShell>
      <Link href="/archive" className="inline-flex min-h-8 items-center text-xs text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100">Back to old interactions</Link>
        <header className="mb-8 mt-8">
          <div>
            <h1 className="font-medium">{title}</h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">{description}</p>
          </div>
        </header>

        <section aria-label={`${title} live preview`} className={`relative flex min-h-[420px] items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-50/70 p-8 dark:border-neutral-800 dark:bg-neutral-900/40 sm:min-h-[500px] sm:p-12 ${previewClassName}`}>
          {children}
        </section>

        <section className="mt-12" aria-labelledby="source-code-title">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="source-code-title" className="text-sm font-medium">Source code</h2>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Copy and paste into your project</span>
          </div>
          <DocumentationCodeBlock code={source} title={path.basename(sourcePath)} />
        </section>
    </ArchiveShell>
  );
}
