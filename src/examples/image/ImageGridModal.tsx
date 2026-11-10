"use client";

import ImageGallery from "../../components/image-viewer/ImageGallery";

type ImageItem = {
  src: string;
  alt: string;
};

type Props = {
  images: ImageItem[];
  className?: string;
};

export default function ImageGridModal({ images, className = "" }: Props) {
  return <ImageGallery images={images} className={`!max-w-[390px] ${className}`} loading="eager" />;
}
