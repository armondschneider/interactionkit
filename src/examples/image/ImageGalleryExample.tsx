"use client";

import { useState } from "react";
import ImageGallery from "../../components/image-viewer/ImageGallery";
import { imageGridImages } from "./exampleImages";

export default function ImageGalleryExample() {
  const [count, setCount] = useState(4);
  return <div>
    <div className="flex min-h-8 items-center gap-1" role="group" aria-label="Number of images">
      {[1, 2, 3, 4].map((value) => <button key={value} type="button" aria-pressed={count === value} onClick={() => setCount(value)} className={`grid size-8 place-items-center rounded-md text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${count === value ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100" : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"}`}>{value}</button>)}
    </div>
    <div className="mt-4 flex min-h-[280px] items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-50/70 p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
      <ImageGallery images={imageGridImages.slice(0, count)} className="!max-w-[250px]" loading="eager" />
    </div>
  </div>;
}
