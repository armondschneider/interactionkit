import CodeBlock from "../../../src/components/code/CodeBlock";
import OpenDemoPage from "../../../src/components/general/OpenDemoPage";

const sample = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("world"));`;

export default function DemoCodeBlockPage() {
  return (
    <OpenDemoPage title="Code block" description="A syntax-highlighted code block with a copy confirmation." sourcePath="src/components/code/CodeBlock.tsx" previewClassName="items-start pt-20">
      <div className="w-full max-w-2xl"><CodeBlock code={sample} language="js" /></div>
    </OpenDemoPage>
  );
}
