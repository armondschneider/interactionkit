import OpenDemoPage from "../../../src/components/general/OpenDemoPage";
import SearchExpand from "../../../src/components/search/SearchExpand";

export default function SearchExpandDemoPage() {
  return (
    <OpenDemoPage
      title="Search expand"
      description="A search icon that springs open into a full search bar and reveals a dropdown of previous searches."
      sourcePath="src/components/search/SearchExpand.tsx"
      previewClassName="items-start pt-28"
    >
      <SearchExpand />
    </OpenDemoPage>
  );
}
