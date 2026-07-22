import OpenDemoPage from "../../../src/components/general/OpenDemoPage";
import { SpringButton } from "../../../src/components/general/SpringButton";

export default function SpringButtonDemoPage() {
  return (
    <OpenDemoPage title="Spring button" description="Compare a lightweight hover response with a tactile spring on press." sourcePath="src/components/general/SpringButton.tsx">
      <div className="flex flex-col items-center gap-8 sm:flex-row">
        <div className="flex flex-col items-center gap-3">
          <SpringButton pressSpring={false}>Hover only</SpringButton>
          <span className="text-xs text-neutral-500">CSS hover transition</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <SpringButton>Press spring</SpringButton>
          <span className="text-xs text-neutral-500">Spring press feedback</span>
        </div>
      </div>
    </OpenDemoPage>
  );
}
