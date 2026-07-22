import SoundToggle from "../../../src/components/sound/SoundToggle";
import OpenDemoPage from "../../../src/components/general/OpenDemoPage";

export default function DemoSoundPage() {
  return (
    <OpenDemoPage title="Icon morph" description="A compact sound control with an animated state transition." sourcePath="src/components/sound/SoundToggle.tsx">
      <SoundToggle className="border border-neutral-200 bg-white p-4 shadow-sm" />
    </OpenDemoPage>
  );
}
