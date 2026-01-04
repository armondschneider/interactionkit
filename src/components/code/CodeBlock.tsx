"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  code: string;
  language?: string;
  className?: string;
  previewLines?: number;
  title?: string;
};

export default function CodeBlock({
  code,
  language,
  className = "",
  previewLines,
  title,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const copy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = code;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // ignore
    }
  };

  const lines = code.split("\n");

  const jsKeywords = new Set([
    'function', 'return', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'switch', 'case', 'break',
    'import', 'export', 'from', 'default', 'class', 'extends', 'new', 'try', 'catch', 'finally'
  ]);

  const tokenizeJSLine = (line: string) => {
    const tokens: { type: string; text: string }[] = [];
    let i = 0;
    while (i < line.length) {
      const rest = line.slice(i);
      if (rest.startsWith('//')) { tokens.push({ type: 'comment', text: rest }); break; }
      if (rest.startsWith('/*')) { const endIdx = rest.indexOf('*/'); const text = endIdx >= 0 ? rest.slice(0, endIdx + 2) : rest; tokens.push({ type: 'comment', text }); i += text.length; continue; }
      const ch = rest[0];
      if (ch === '"' || ch === "'" || ch === '`') { let j = 1; while (j < rest.length) { if (rest[j] === '\\') { j += 2; continue; } if (rest[j] === ch) { j++; break; } j++; } tokens.push({ type: 'string', text: rest.slice(0, j) }); i += j; continue; }
      const numberMatch = rest.match(/^\d+(?:\.\d+)?/);
      if (numberMatch) { tokens.push({ type: 'number', text: numberMatch[0] }); i += numberMatch[0].length; continue; }
      const idMatch = rest.match(/^[_$a-zA-Z][_$a-zA-Z0-9]*/);
      if (idMatch) { const txt = idMatch[0]; if (jsKeywords.has(txt)) tokens.push({ type: 'keyword', text: txt }); else tokens.push({ type: 'identifier', text: txt }); i += txt.length; continue; }
      const wsMatch = rest.match(/^\s+/);
      if (wsMatch) { tokens.push({ type: 'whitespace', text: wsMatch[0] }); i += wsMatch[0].length; continue; }
      tokens.push({ type: 'punct', text: rest[0] }); i += 1;
    }
    return tokens;
  };

  const tokenizeHTMLLine = (line: string) => {
    const tokens: { type: string; text: string }[] = [];
    let i = 0;
    while (i < line.length) {
      const rest = line.slice(i);
      const tagMatch = rest.match(/^<\/?[a-zA-Z0-9-]+/);
      if (tagMatch) { tokens.push({ type: 'tag', text: tagMatch[0] }); i += tagMatch[0].length; continue; }
      const attrMatch = rest.match(/^\s+[a-zA-Z\-:]+(?==)/);
      if (attrMatch) { tokens.push({ type: 'attr', text: attrMatch[0] }); i += attrMatch[0].length; continue; }
      const strMatch = rest.match(/^=\"[^\"]*\"|='[^']*'/);
      if (strMatch) { tokens.push({ type: 'string', text: strMatch[0] }); i += strMatch[0].length; continue; }
      tokens.push({ type: 'text', text: rest[0] }); i += 1;
    }
    return tokens;
  };

  const highlightLine = (line: string) => {
    if (!language) return [{ type: 'text', text: line }];
    const lang = language.toLowerCase();
    if (lang === 'html' || lang === 'xml') return tokenizeHTMLLine(line);
    return tokenizeJSLine(line);
  };

  return (
    <div className={`relative font-sans ${className}`} style={{ fontSize: '10px' }}>
      {title && (
        <div className="flex items-center justify-between px-3 py-2 bg-neutral-100 border border-b-0 border-neutral-200 rounded-t-lg">
          <span className="text-[11px] font-medium text-neutral-700">{title}</span>
        </div>
      )}
      <div className={`absolute right-2 z-10 flex items-center gap-2 ${title ? 'top-10' : 'top-2'}`}>
        <button
          type="button"
          title={copied ? "Copied" : "Copy code"}
          aria-label={copied ? "Copied" : "Copy code"}
          className="cursor-pointer inline-flex items-center gap-2 px-1.5 py-1.5 rounded-md text-neutral-700 bg-neutral-100 hover:bg-neutral-200 ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
          onClick={copy}
        >
          <AnimatePresence mode="wait">
            {!copied ? (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="inline-flex"
              >
                <Copy size={14} />
              </motion.span>
            ) : (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="inline-flex text-green-600"
              >
                <Check size={14} />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <pre
        className={`overflow-auto border border-neutral-200 text-neutral-900 p-4 scrollbar-thin ${title ? 'rounded-b-lg rounded-t-none' : 'rounded-lg'}`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(150,150,150,0.5) transparent',
        }}
      >
        <style>{`
          pre.scrollbar-thin::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          pre.scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
          pre.scrollbar-thin::-webkit-scrollbar-thumb {
            background: rgba(150,150,150,0.45);
            border-radius: 999px;
            border: none;
          }
          pre.scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: rgba(120,120,120,0.6);
          }
          pre.scrollbar-thin::-webkit-scrollbar-corner {
            background: transparent;
          }
        `}</style>
        <code className={`block whitespace-pre ${language ? `language-${language}` : ""}`}>
          {(() => {
            const tokenizedLines = lines.map((l) => highlightLine(l));
            const renderToken = (token: { type: string; text: string }, key: number) => {
              const type = token.type;
              const cls = type === 'keyword' ? 'text-indigo-600'
                : type === 'string' ? 'text-emerald-600'
                : type === 'number' ? 'text-purple-600'
                : type === 'comment' ? 'text-neutral-500 italic'
                : type === 'identifier' ? 'text-blue-600'
                : type === 'tag' ? 'text-orange-600'
                : type === 'attr' ? 'text-yellow-600'
                : type === 'punct' ? 'text-neutral-600'
                : 'text-neutral-800';
              // whitespace tokens should not get a class, preserve them for spacing
              if (type === 'whitespace') return <span key={key}>{token.text}</span>;
              return <span key={key} className={cls}>{token.text}</span>;
            };

            const visibleLines = typeof previewLines === 'number' && !expanded ? tokenizedLines.slice(0, previewLines) : tokenizedLines;
            return (
              <div>
                {visibleLines.map((tokens, i) => (
                  <div key={i} className="h-[14px] leading-[14px] break-words">
                    {tokens.length === 0 ? <span>&nbsp;</span> : tokens.map((t, j) => renderToken(t, j))}
                  </div>
                ))}
              </div>
            );
          })()}
        </code>
      </pre>
      {typeof previewLines === 'number' && lines.length > previewLines ? (
        <div className="flex justify-end mt-2 px-2">
            <button
            type="button"
            className="text-xs text-neutral-600 hover:text-neutral-900 focus:outline-none cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : `Show ${lines.length - previewLines} more`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
