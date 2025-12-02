"use client";

import React from 'react';
import Link from 'next/link';

type VideoItem = {
  src: string;
  caption?: string;
};

type Props = {
  videos?: VideoItem[];
};

export default function InteractionVideos({ videos }: Props = {}) {
  const defaults: VideoItem[] = videos || [
    { src: '/videos/imageexpand.mp4', caption: 'Image expand' },
    { src: '/videos/imagemodal.mp4', caption: 'Modal pop-out' },
    { src: '/videos/dragdrop.mp4', caption: 'Drag & Drop' },
    { src: '/videos/soundtoggle.mp4', caption: 'Sound Toggle' },
  ];

  const anchors = [
    '/demo/imageexpand#imageexpand',
    '/demo/imagemodal#image-modal',
    '/demo/dragdrop',
    '/demo/sound',
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {defaults.map((v, i) => (
        <Link href={anchors[i] ?? '/demo'} key={i} className="group border border-neutral-100 rounded-md overflow-hidden" aria-label={`Go to ${v.caption ?? 'demo'}`}>
          <figure className="cursor-pointer relative">
            {v.src.endsWith('.gif') || v.src.includes('giphy') ? (
              <img src={v.src} alt={v.caption ?? ''} className="w-full h-44 md:h-36 lg:h-44 object-cover pointer-events-none" />
            ) : (
              <video
                className="w-full h-44 md:h-36 lg:h-44 object-cover pointer-events-none"
                poster={(v as any).poster ?? `/videos/posters/${(v.caption ?? 'thumb').toLowerCase().replace(/\s+/g, '-')}.jpg`}
                preload="metadata"
                loop
                muted
                playsInline
                autoPlay
                aria-hidden="true"
              >
                <source src={v.src} type={v.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                {/* fallback image if video can't play */}
                <img src={(v as any).poster ?? `/videos/posters/${(v.caption ?? 'thumb').toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={v.caption ?? ''} className="w-full h-44 md:h-36 lg:h-44 object-cover" />
              </video>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="px-4 py-2 text-sm font-medium text-neutral-900">
                {v.caption}
              </span>
            </div>
          </figure>
        </Link>
      ))}
    </div>
  );
}