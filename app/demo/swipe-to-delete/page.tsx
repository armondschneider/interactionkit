import OpenDemoPage from "../../_components/general/OpenDemoPage";
import SwipeToDeleteDemo from "../../_components/general/SwipeToDeleteDemo";

export default function SwipeToDeletePage() {
  return (
    <OpenDemoPage
      title="Swipe to delete"
      description="A list action that feels native on touch devices. Drag a conversation to the left to reveal Delete, or keep dragging until it is removed."
      sourcePath="app/_components/general/SwipeToDeleteDemo.tsx"
    >
      <SwipeToDeleteDemo />
    </OpenDemoPage>
  );
}
