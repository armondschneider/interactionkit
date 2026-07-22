import OpenDemoPage from "../../../src/components/general/OpenDemoPage";
import TextHighlight from "../../../src/components/highlight/TextHighlight";

export default function TextHighlightDemoPage() {
  return (
    <OpenDemoPage title="Text highlight" description="A hand-drawn highlight that reveals a related image on hover." sourcePath="src/components/highlight/TextHighlight.tsx" previewClassName="items-start pt-24">
      <div className="max-w-xl space-y-8 text-base leading-relaxed text-neutral-800">
        <p>
          The view across{" "}
          <TextHighlight
            imageSrc="https://images.pexels.com/photos/28212365/pexels-photo-28212365.jpeg"
            imageAlt="A Tanzanian savanna landscape"
          >
            Tanzania
          </TextHighlight>{" "}
          stays with you long after the trip.
        </p>
        <p>
          Watching elephants cross at{" "}
          <TextHighlight
            imageSrc="https://images.pexels.com/photos/28388503/pexels-photo-28388503.jpeg"
            imageAlt="An elephant in the savanna"
          >
            sunset
          </TextHighlight>{" "}
          made the whole landscape feel still.
        </p>
      </div>
    </OpenDemoPage>
  );
}
