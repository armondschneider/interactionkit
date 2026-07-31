import EmojiPicker from "../../../src/components/emoji/EmojiPicker";
import OpenDemoPage from "../../../src/components/general/OpenDemoPage";

export default function EmojiPickerDemoPage() {
  return (
    <OpenDemoPage title="Emoji picker" description="A compact emoji control that expands into a soft, spring-animated picker." sourcePath="src/components/emoji/EmojiPicker.tsx">
      <div className="-translate-y-24">
        <EmojiPicker />
      </div>
    </OpenDemoPage>
  );
}
