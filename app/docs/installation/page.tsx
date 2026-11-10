import DocumentationCodeBlock from "../../../src/site/code/DocumentationCodeBlock";

export default function InstallationPage() {
  return <>
    <h1 className="font-medium">Installation</h1>
    <p className="mt-2">Add InteractionKit to your React app and import the stylesheet once.</p>
    <h2 className="mt-10 font-medium">Install the package</h2>
    <div className="mt-4"><DocumentationCodeBlock title="terminal" terminal code="npm install useintkit" /></div>
    <h2 className="mt-10 font-medium">Import the styles</h2>
    <p className="mt-2 text-neutral-500 dark:text-neutral-400">Import the stylesheet in your app entry point. No Tailwind setup is required.</p>
    <div className="mt-4"><DocumentationCodeBlock title="app.tsx" code={'import "useintkit/styles.css";'} /></div>
    <p className="mt-6 text-neutral-500 dark:text-neutral-400">React, React DOM, and Framer Motion are peer dependencies. Add a <code>.dark</code> class to an ancestor to use the dark appearance.</p>
  </>;
}
