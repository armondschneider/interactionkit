import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Archive — InteractionKit",
  description: "The original InteractionKit collection: live React interaction demos and copy-ready source code.",
};

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return children;
}
