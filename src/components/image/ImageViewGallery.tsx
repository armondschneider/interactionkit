"use client";

import Image from "next/image";
import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  location: string;
};

type Props = {
  images: GalleryImage[];
};

export default function ImageViewGallery({ images }: Props) {
  const [selected, setSelected] = useState(0);
  const image = images[selected];

  return (
    <LayoutGroup id="image-view-gallery">
      <div className="w-full max-w-[620px]">
        <motion.div layout className="relative aspect-[1.55] overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800">
          <motion.div layoutId={`gallery-image-${selected}`} className="absolute inset-0">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 90vw, 620px" className="object-cover" priority />
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-5 pt-14 text-white">
            <div>
              <p className="text-sm font-medium">{image.title}</p>
              <p className="mt-1 text-xs text-white/70">{image.location}</p>
            </div>
            <span className="font-mono text-[10px] text-white/65">0{selected + 1} / 0{images.length}</span>
          </div>
        </motion.div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Show ${item.title}`}
              aria-pressed={selected === index}
              className={`relative aspect-[1.25] overflow-hidden rounded-lg outline-none transition-[opacity,box-shadow] duration-150 ${selected === index ? "opacity-100 ring-2 ring-neutral-900 ring-offset-2 dark:ring-neutral-100 dark:ring-offset-neutral-900" : "opacity-55 hover:opacity-90"}`}
            >
              <Image src={item.src} alt="" fill sizes="140px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </LayoutGroup>
  );
}
