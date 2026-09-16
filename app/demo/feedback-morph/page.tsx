import OpenDemoPage from "../../../src/components/general/OpenDemoPage";
import FeedbackMorph from "../../../src/components/feedback/FeedbackMorph";

export default function FeedbackMorphDemoPage() {
  return (
    <OpenDemoPage
      title="Feedback morph"
      description="Pick a thumb and the button you clicked morphs into an inline response field. Submit it (or just the rating) and the pill confirms with a thank-you before easing back into the two buttons."
      sourcePath="src/components/feedback/FeedbackMorph.tsx"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="text-[11px] text-neutral-400">Was this helpful?</span>
        <FeedbackMorph />
      </div>
    </OpenDemoPage>
  );
}
