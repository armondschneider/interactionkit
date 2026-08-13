import OpenDemoPage from "../../../src/components/general/OpenDemoPage";
import NotificationRevealDemo from "../../../src/components/notification/NotificationRevealDemo";

export default function NotificationRevealDemoPage() {
  return (
    <OpenDemoPage
      title="Notification reveal"
      description="A notification signal that rises into view, then expands around its icon into a dismissible toast."
      sourcePath="src/components/notification/NotificationReveal.tsx"
    >
      <NotificationRevealDemo />
    </OpenDemoPage>
  );
}
