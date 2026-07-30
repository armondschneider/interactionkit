import ClickHoldDeleteDemo from "../../../src/components/general/ClickHoldDeleteDemo";
import OpenDemoPage from "../../../src/components/general/OpenDemoPage";

export default function ClickHoldButtonDemo() {
  return (
    <OpenDemoPage
      title="Press and hold to delete"
      description="A destructive action that needs deliberate intent. Hold the button until its progress fill reaches the edge, then release to cancel at any point."
      sourcePath="src/components/general/ClickHoldButton.tsx"
    >
      <ClickHoldDeleteDemo />
    </OpenDemoPage>
  );
}
