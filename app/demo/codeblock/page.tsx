"use client";

import React from "react";
import Link from "next/link";
import CodeBlock from "../../../src/components/code/CodeBlock";

const sample = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("world"));`;

export default function DemoCodeBlockPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-lg mx-auto px-6 py-16">
        <header className="mb-8">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 underline">Back</Link>
        </header>

        <h2 className="text-md font-medium mb-4">CodeBlock demo</h2>
        <p className="text-sm text-neutral-600 mb-4">Simple code block with copy button.</p>
        <CodeBlock code={sample} language="js" />
      </div>
    </main>
  );
}
