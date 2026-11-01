import EmojiPicker from "../../_components/emoji/EmojiPicker";
import OpenDemoPage from "../../_components/general/OpenDemoPage";

export default function EmojiPickerDemoPage() {
  return (
    <OpenDemoPage title="Emoji picker" description="A compact emoji control that expands into a soft, spring-animated picker." sourcePath="app/_components/emoji/EmojiPicker.tsx">
      <div className="-translate-y-24">
        <EmojiPicker />
      </div>
    </OpenDemoPage>
  );
}
