"use client";

import ImageModal from "./ImageModal";

type ImageItem = {
  src: string;
  alt: string;
};

type Props = {
  images: ImageItem[];
};

export default function ImageGridModal({ images }: Props) {
  return (
    <div className="grid w-full max-w-[390px] grid-cols-2 gap-2 sm:gap-3">
      {images.map((image, index) => (
        <div key={image.src} className="[&>button]:!aspect-square [&>button]:!h-auto">
          <ImageModal
            src={image.src}
            alt={image.alt}
            layoutId={`image-grid-modal-${index}`}
            expandedClassName="!aspect-[4/3] !w-[min(480px,88vw)]"
            backdropClassName="!backdrop-blur-sm"
          />
        </div>
      ))}
      </div>
  );
}
