"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Button from "../../components/button/Button";

export default function ButtonExample() {
  const [presses, setPresses] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="flex flex-wrap items-end justify-center gap-5">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500">Primary</span>
          <Button onClick={() => setPresses((value) => value + 1)}>Continue <ArrowRight size={13} aria-hidden="true" /></Button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500">Loading</span>
          <Button loading>Continue <ArrowRight size={13} aria-hidden="true" /></Button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500">Disabled</span>
          <Button disabled>Unavailable</Button>
        </div>
      </div>
      <p role="status" className="m-0 h-4 text-[11px] text-neutral-400 dark:text-neutral-500">{presses > 0 ? `Pressed ${presses} ${presses === 1 ? "time" : "times"}` : ""}</p>
    </div>
  );
}
