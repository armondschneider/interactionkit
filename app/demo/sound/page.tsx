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

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <SoundToggle
              initialOn={on}
              onToggle={(val) => setOn(val)}
            />
            <div className="text-sm text-neutral-600">Sound {on ? "On" : "Off"}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
