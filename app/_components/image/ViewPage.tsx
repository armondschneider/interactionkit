"use client";

import CodeBlock from "../code/CodeBlock";
import ImageModal from "./ImageModal";
import ImageGridRearrange from "./ImageGridRearrange";
import ImageGridModal from "../../../src/examples/image/ImageGridModal";
import Link from "next/link";
import ArchiveShell from "../../../src/site/ArchiveShell";
import { imageGridImages as images } from "../../../src/examples/image/exampleImages";

type Props = {
  modalSource: string;
  stackSource: string;
  gallerySource: string;
};

const gridImages = images.slice(0, 3);

const imageGrid = images;

function Example({ title, description, children, source, sourceTitle, topAligned = false }: { title: string; description: string; children: React.ReactNode; source: string; sourceTitle: string; topAligned?: boolean }) {
  return (
    <article className="border-t border-neutral-200 py-6 sm:py-7 dark:border-neutral-800">
      <header className="mb-7 flex items-start justify-between gap-5">
        <div>
          <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{title}</h2>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
      </header>
      <div className={`${topAligned ? "" : "flex items-center justify-center"} min-h-[420px] overflow-hidden rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:min-h-[480px] sm:p-8`}>
        {children}
      </div>
      <div className="mt-6">
        <CodeBlock code={source} language="tsx" title={sourceTitle} previewLines={18} />
      </div>
    </article>
  );
}

export default function ViewPage({ modalSource, stackSource, gallerySource }: Props) {
  return (
    <ArchiveShell>
      <Link href="/archive" className="inline-flex min-h-8 items-center text-xs text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100">Back to old interactions</Link>

      <div>
        <header className="mb-8 mt-8">
          <h1 className="font-medium">Image view transitions</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">A closer look at keeping images connected as they move between states, using shared layout animations and simple spatial transitions.</p>
        </header>

        <section aria-label="Image view transition examples">
          <Example title="Thumbnail to focus" description="A shared layoutId carries the image from its card into a focused modal. The backdrop supports the change without competing with it." source={modalSource} sourceTitle="ImageModal.tsx">
            <div className="w-full max-w-[390px] [&>button]:h-56 sm:[&>button]:h-64"><ImageModal src={images[1].src} alt={images[1].alt} layoutId="view-modal" /></div>
          </Example>
          <Example title="A grid that finds its shape" description="Three images move and resize into each view, rather than disappearing and reappearing. The animation stays attached to the image frames." source={stackSource} sourceTitle="ImageGridRearrange.tsx" topAligned>
            <ImageGridRearrange images={gridImages} />
          </Example>
          <Example title="A gallery with a closer look" description="Click a thumbnail to expand it in place. The image stays inside the gallery and returns to its original position when you close it." source={gallerySource} sourceTitle="ImageGridModal.tsx">
            <ImageGridModal images={imageGrid} />
          </Example>
        </section>

      </div>
    </ArchiveShell>
  );
}
