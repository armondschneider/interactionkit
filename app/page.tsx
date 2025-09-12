import ImageExpand from "../src/components/image/MultipleImageExpand";
import Sheet from "../src/components/sheet/Sheet";
import Link from 'next/link';
import InteractionVideos from './mainsite/InteractionVideos';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-screen-md mx-auto p-8 pt-16">
        <section className="py-8">
          <div className="w-full">
            <h1 className="text-md font-medium">InteractionKit</h1>
            <p className="text-sm mt-4 text-neutral-500 leading-relaxed">
              A small collection of polished, copy-pasteable UI interactions (modals, sheets, image
              expand, and more) built with React, Tailwind and Framer Motion. Use them as-is or
              drop them into your projects.
            </p>

            <div className="mt-4 flex items-center justify-start gap-3 text-sm text-neutral-600">
              <span>Created by <span className="font-medium">Armond Schneider</span></span>
              <span aria-hidden>•</span>
              <a href="https://x.com/armondme" className="underline text-neutral-500 hover:text-neutral-900 transition-colors" target="_blank" rel="noopener noreferrer">X</a>
              <a href="https://github.com/armondschneider" className="underline text-neutral-500 hover:text-neutral-900 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>
        <div className="mt-8">
          <InteractionVideos />
        </div>
      </div>
    </main>
  );
}
