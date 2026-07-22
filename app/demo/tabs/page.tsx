import Tab from "../../../src/components/tabs/Tab";
import OpenDemoPage from "../../../src/components/general/OpenDemoPage";

export default function DemoPage() {
  return (
    <OpenDemoPage title="Tabs" description="A capsule tab interface with a responsive, animated active state." sourcePath="src/components/tabs/Tab.tsx" previewClassName="h-[500px] items-start overflow-hidden pt-12">
      <div className="w-full max-w-[410px] [&_.gap-3]:gap-2 [&_.h-20]:h-[43px] [&_.space-y-3_>_:not([hidden])_~_:not([hidden])]:mt-2 [&_button]:!px-3 [&_button]:!py-2 [&_button]:!text-xs">
        <Tab />
      </div>
    </OpenDemoPage>
  );
}
