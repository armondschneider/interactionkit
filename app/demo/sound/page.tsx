"use client";

import { useState } from "react";
import Link from "next/link";
import SoundToggle from "../../../src/components/sound/SoundToggle";

export default function DemoSoundPage() {
  const [on, setOn] = useState(true);

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-lg mx-auto px-6 py-16">
        <header className="mb-8">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 underline">
            Back
          </Link>
        </header>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <SoundToggle
              initialOn={on}
              size={28}
              onToggle={(val) => setOn(val)}
            />
            <div className="text-sm text-neutral-600">Sound {on ? "On" : "Off"}</div>
          </div>

          <div className="flex items-center gap-3">
            <SoundToggle size={20} onToggle={() => {}} />
            <div className="text-sm text-neutral-600">Small</div>
          </div>
        </div>
      </div>
    </main>
  );
}
