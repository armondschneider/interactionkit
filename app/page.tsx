"use client";
import Link from "next/link";
import { useState } from "react";
import { Copy01Icon } from "hugeicons-react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("npm install interactionkit");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <>
      {/* Import Roboto Mono font from Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen flex items-center justify-center bg-neutral-900" style={{ fontFamily: 'Roboto Mono, monospace' }}>
      <div
        className="flex flex-col items-start justify-center mx-auto px-6 py-12"
        style={{ maxWidth: 480 }}
      >
        <h1 className="font-mono text-lg text-white mb-4">interactionKit</h1>
        <p className="font-mono text-sm text-neutral-400 mb-8">
          A modern, accessible, and open-source collection of copy-and-paste
          components for quickly building application UI with React.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={copyToClipboard}
            className="bg-neutral-800 text-white px-3 py-2 rounded-sm text-sm font-mono flex items-center gap-2 hover:bg-neutral-700 active:scale-99 transition-all duration-200 group cursor-pointer transform"
          >
            <span>npm install interactionkit</span>
            <div className="relative w-4 h-4">
              <Copy01Icon
                size={16}
                className={`absolute inset-0 transition-all duration-300 ${
                  copied ? "opacity-0 scale-75" : "opacity-100 scale-100"
                }`}
              />
              <svg
                className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
                  copied ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
          </button>
          <span className="font-mono text-sm text-neutral-400">
            coming soon
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
