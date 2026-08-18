import OpenDemoPage from "../../../src/components/general/OpenDemoPage";
import PasswordInputDemo from "../../../src/components/input/PasswordInputDemo";

export default function PasswordInputDemoPage() {
  return (
    <OpenDemoPage
      title="Incorrect password"
      description="A password field that responds to a failed attempt with a subtle jiggle and focused error message. Submit with the button or press Enter."
      sourcePath="src/components/input/PasswordInput.tsx"
    >
      <PasswordInputDemo />
    </OpenDemoPage>
  );
}
