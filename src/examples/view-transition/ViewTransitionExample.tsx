"use client";

import { FilePlus2, FolderPlus, Plus } from "lucide-react";
import { useState } from "react";
import ViewTransition from "../../components/view-transition/ViewTransition";

export default function ViewTransitionExample() {
  const [selected, setSelected] = useState("");
  return <div className="flex flex-col items-center gap-3">
    <ViewTransition trigger={<><Plus size={15} aria-hidden="true" /><span className="ml-2">Quick actions</span></>}>
      {({ close }) => <div className="space-y-1">{[{ label: "New document", Icon: FilePlus2 }, { label: "New folder", Icon: FolderPlus }].map(({ label, Icon }) => <button key={label} type="button" onClick={() => { setSelected(label); close(); }} className="flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-md px-2 text-left text-sm text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-700"><Icon size={15} aria-hidden="true" />{label}</button>)}</div>}
    </ViewTransition>
    <p role="status" className="min-h-5 text-xs text-neutral-500 dark:text-neutral-400">{selected ? `${selected} selected` : ""}</p>
  </div>;
}
