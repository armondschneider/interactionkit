"use client";

import Link from "next/link";
import Tooltip from "../../../src/components/hover/Tooltip";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-lg mx-auto px-6 py-16">
        <header className="mb-8">
          <Link
            href="/"
            className="text-sm text-neutral-600 hover:text-neutral-900 underline"
          >
            Back
          </Link>
        </header>

        <div className="flex items-center justify-center">
          <Tooltip content="Helpful information">
            <span>Hover me</span>
          </Tooltip>
        </div>
      </div>
    </main>
  );
}
