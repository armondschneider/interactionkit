import OpenDemoPage from "../../_components/general/OpenDemoPage";
import MaxWidthDemo from "../../_components/layout/MaxWidthDemo";

export default function MaxWidthDemoPage() {
  return (
    <OpenDemoPage
      title="Max width"
      description="A responsive container that springs between three maximum widths while its content naturally reflows."
      sourcePath="app/_components/layout/MaxWidthDemo.tsx"
    >
      <MaxWidthDemo />
    </OpenDemoPage>
  );
}
