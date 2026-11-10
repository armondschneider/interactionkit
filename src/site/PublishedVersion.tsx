"use client";

import { useEffect, useState } from "react";
import packageInfo from "../../lib-package.json";

export default function PublishedVersion() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadVersion() {
      try {
        const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageInfo.name)}/latest`, { signal: controller.signal });
        if (!response.ok) return;
        const data: unknown = await response.json();
        if (controller.signal.aborted || typeof data !== "object" || data === null || !("name" in data) || data.name !== packageInfo.name || !("version" in data) || typeof data.version !== "string" || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(data.version)) return;
        setVersion(data.version);
      } catch {
        // Keep the npm link usable when the registry is unavailable.
      }
    }
    void loadVersion();
    return () => controller.abort();
  }, []);

  return <a href={`https://www.npmjs.com/package/${packageInfo.name}`} target="_blank" rel="noreferrer" aria-label={version ? `${packageInfo.name} ${version} on npm` : `${packageInfo.name} on npm`} title={version ? `Published version ${version} on npm` : "View package on npm"} className="inline-flex min-h-8 min-w-9 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">{version ?? "npm"}</a>;
}
