"use client";

import type { CSSProperties, ReactNode } from "react";
import ImageViewer from "./ImageViewer";
import styles from "./styles.module.css";

export type ImageGalleryItem = {
  src: string;
  alt: string;
  thumbnailSrc?: string;
  caption?: ReactNode;
};

export type ImageGalleryProps = {
  /** Between one and four images. */
  images: readonly ImageGalleryItem[];
  className?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
};

/** A responsive grid of independent image viewers. */
export default function ImageGallery({ images, className = "", style, loading = "lazy" }: ImageGalleryProps) {
  if (images.length < 1 || images.length > 4) throw new RangeError("ImageGallery requires between 1 and 4 images.");

  return <div className={`${styles.gallery} ${className}`} style={style} data-count={images.length} data-slot="image-gallery">
    {images.map((image, index) => <div className={styles.galleryItem} key={`${image.src}-${index}`}>
      <ImageViewer {...image} className={styles.galleryTrigger} loading={loading} />
    </div>)}
  </div>;
}
