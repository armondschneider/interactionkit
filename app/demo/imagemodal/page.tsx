"use client";

import Link from 'next/link';
import ImageModal from '../../../src/components/image/ImageModal';

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-lg mx-auto px-6 py-16">
        <header className="mb-12">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 underline">
            Back
          </Link>
        </header>

        <article className="prose prose-neutral max-w-none text-sm">
          <p className="leading-relaxed text-neutral-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <div className="my-8">
            <ImageModal 
              src="https://images.unsplash.com/photo-1763503586151-53f36b00eb46?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mountain landscape at sunset"
              layoutId="demo-img"
            />
          </div>

          <p className="leading-relaxed text-neutral-700 mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>

          <p className="leading-relaxed text-neutral-700 mb-4">
            Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </article>
      </div>
    </main>
  );
}
