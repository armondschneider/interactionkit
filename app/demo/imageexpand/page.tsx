import OpenDemoPage from "../../../src/components/general/OpenDemoPage";
import MultipleImageExpand from "../../../src/components/image/MultipleImageExpand";

const images = [
  { src: "https://images.unsplash.com/photo-1669655247997-7aaadce37d6e?q=80&w=1466&auto=format&fit=crop", alt: "Coastal landscape" },
  { src: "https://images.unsplash.com/photo-1619480918758-76b08c26a32d?q=80&w=1475&auto=format&fit=crop", alt: "Mountain landscape" },
  { src: "https://images.unsplash.com/photo-1762997455163-98123f974331?q=80&w=1476&auto=format&fit=crop", alt: "Ocean view" },
  { src: "https://images.unsplash.com/photo-1746003625451-fb19865e19b0?q=80&w=1470&auto=format&fit=crop", alt: "Lake landscape" },
];

export default function ImageExpandDemoPage() {
  return (
    <OpenDemoPage title="Image expand" description="A stack of images that opens into a playful spatial layout." sourcePath="src/components/image/MultipleImageExpand.tsx">
      <MultipleImageExpand images={images} />
    </OpenDemoPage>
  );
}
