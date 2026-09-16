import fs from "fs";
import path from "path";
import ViewPage from "../../src/components/image/ViewPage";

function readSource(sourcePath: string) {
  return fs.readFileSync(path.join(process.cwd(), sourcePath), "utf8");
}

export default function ViewDeepDivePage() {
  return (
    <ViewPage
      modalSource={readSource("src/components/image/ImageModal.tsx")}
      stackSource={readSource("src/components/image/ImageGridRearrange.tsx")}
      gallerySource={readSource("src/components/image/ImageGridModal.tsx")}
    />
  );
}
