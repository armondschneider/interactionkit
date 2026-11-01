import OpenDemoPage from "../../_components/general/OpenDemoPage";
import DownloadFileDemo from "../../_components/general/DownloadFileDemo";

export default function DownloadFilePage() {
  return (
    <OpenDemoPage
      title="Download to file"
      description="A small document preview tracks your download with a purple progress ring that resolves into a green check. The button settles into a completed file card. This demo simulates a two-second transfer; no file is downloaded."
      sourcePath="app/_components/general/DownloadFileDemo.tsx"
      previewClassName="!px-3 sm:!px-12"
    >
      <DownloadFileDemo />
    </OpenDemoPage>
  );
}
