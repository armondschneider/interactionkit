import Tooltip from "../../../src/components/hover/Tooltip";
import OpenDemoPage from "../../../src/components/general/OpenDemoPage";

export default function DemoPage() {
  return (
    <OpenDemoPage title="Tooltip" description="Contextual information that can appear below, left, or right of its trigger." sourcePath="src/components/hover/Tooltip.tsx">
      <div className="flex flex-col items-center gap-16 sm:flex-row sm:gap-20">
        <Tooltip side="left" content="A small detail to the left."><span>Left context</span></Tooltip>
        <Tooltip content="Helpful information, available exactly when it is needed."><span>Below context</span></Tooltip>
        <Tooltip side="right" content="A small detail to the right."><span>Right context</span></Tooltip>
      </div>
    </OpenDemoPage>
  );
}
