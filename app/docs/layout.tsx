import type { ReactNode } from "react";
import DocsShell from "../../src/site/docs/DocsShell";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
