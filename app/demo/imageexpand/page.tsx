"use client";

import Link from 'next/link';
import MultipleImageExpand from '../../../src/components/image/MultipleImageExpand';

export default function DemoPage() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1669655247997-7aaadce37d6e?q=80&w=1466&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'add alt id',
    },
    {
      src: 'https://images.unsplash.com/photo-1619480918758-76b08c26a32d?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'add alt id',
    },
    {
      src: 'https://images.unsplash.com/photo-1762997455163-98123f974331?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'add alt id',
    },
    {
      src: 'https://images.unsplash.com/photo-1746003625451-fb19865e19b0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'add alt id',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-lg mx-auto px-6 py-16">
        <header className="mb-8">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 underline">
            Back
          </Link>
        </header>
        <div>
          <MultipleImageExpand images={images} />
        </div>
      </div>
    </main>
  );
}
