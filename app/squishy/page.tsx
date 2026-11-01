import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import SquishyPage from "../_components/general/SquishyPage";

export const metadata: Metadata = {
  title: "Squishy Button | Interaction Kit",
  description: "A soft press-and-hold button interaction.",
};

function readSource(sourcePath: string) {
  return fs.readFileSync(path.join(process.cwd(), sourcePath), "utf8");
}

export default function SquishyRoute() {
  return (
    <SquishyPage
      source={readSource("app/_components/general/SquishyButton.tsx")}
      toolbarSource={readSource("app/_components/general/DetachableBrowserToolbar.tsx")}
    />
  );
}
