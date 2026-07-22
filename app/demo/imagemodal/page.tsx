import OpenDemoPage from "../../../src/components/general/OpenDemoPage";
import ImageModal from "../../../src/components/image/ImageModal";

export default function ImageModalDemoPage() {
  return (
    <OpenDemoPage title="Image modal" description="Expand an image into a focused, draggable full-screen view." sourcePath="src/components/image/ImageModal.tsx">
      <div className="w-full max-w-3xl">
        <ImageModal
          src="https://images.unsplash.com/photo-1763503586151-53f36b00eb46?q=80&w=1475&auto=format&fit=crop"
          alt="Mountain landscape at sunset"
          layoutId="demo-image-modal"
        />
      </div>
    </OpenDemoPage>
  );
}
