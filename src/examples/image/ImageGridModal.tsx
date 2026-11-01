"use client";

import ImageViewer from "../../components/image-viewer/ImageViewer";

type ImageItem = {
  src: string;
  alt: string;
};

type Props = {
  images: ImageItem[];
  className?: string;
};

export default function ImageGridModal({ images, className = "" }: Props) {
  return (
    <div className={`grid w-full max-w-[390px] grid-cols-2 gap-2 sm:gap-3 ${className}`}>
      {images.map((image) => (
        <div key={image.src}>
          <ImageViewer
            src={image.src}
            alt={image.alt}
            className="!aspect-square"
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}
