import fs from "fs";
import path from "path";
import ViewPage from "../_components/image/ViewPage";

function readSource(sourcePath: string) {
  return fs.readFileSync(path.join(process.cwd(), sourcePath), "utf8");
}

export default function ViewDeepDivePage() {
  return (
    <ViewPage
      modalSource={readSource("app/_components/image/ImageModal.tsx")}
      stackSource={readSource("app/_components/image/ImageGridRearrange.tsx")}
      gallerySource={readSource("src/examples/image/ImageGridModal.tsx")}
    />
  );
}
