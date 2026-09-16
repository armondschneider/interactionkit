import OpenDemoPage from "../../../src/components/general/OpenDemoPage";
import MaxWidthDemo from "../../../src/components/layout/MaxWidthDemo";

export default function MaxWidthDemoPage() {
  return (
    <OpenDemoPage
      title="Max width"
      description="A responsive container that springs between three maximum widths while its content naturally reflows."
      sourcePath="src/components/layout/MaxWidthDemo.tsx"
    >
      <MaxWidthDemo />
    </OpenDemoPage>
  );
}
