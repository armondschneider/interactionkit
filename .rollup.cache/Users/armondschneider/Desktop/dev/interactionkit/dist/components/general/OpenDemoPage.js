import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import fs from "fs";
import path from "path";
import CodeBlock from "../code/CodeBlock";
import { SpringLinkButton } from "./SpringButton";
export default function OpenDemoPage(_a) {
    var title = _a.title, description = _a.description, sourcePath = _a.sourcePath, children = _a.children, _b = _a.previewClassName, previewClassName = _b === void 0 ? "" : _b;
    var source = fs.readFileSync(path.join(process.cwd(), sourcePath), "utf8");
    return (_jsxs("main", { className: "min-h-screen bg-neutral-50 px-5 py-2 text-neutral-800 sm:px-8 sm:py-10", children: [_jsx("nav", { className: "mx-auto flex h-14 w-full max-w-2xl items-center", "aria-label": "Demo navigation", children: _jsx(SpringLinkButton, { href: "/", children: "Back Home" }) }), _jsxs("div", { className: "mx-auto w-full max-w-2xl", children: [_jsx("header", { className: "mb-12 pt-8", children: _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-medium", children: title }), _jsx("p", { className: "mt-2 max-w-xl text-sm leading-relaxed text-neutral-600", children: description })] }) }), _jsx("section", { "aria-label": "".concat(title, " live preview"), className: "relative flex min-h-[420px] items-center justify-center rounded-xl border border-neutral-200 bg-white/40 p-8 sm:min-h-[500px] sm:p-12 ".concat(previewClassName), children: children }), _jsxs("section", { className: "mt-12", "aria-labelledby": "source-code-title", children: [_jsxs("div", { className: "mb-4 flex items-baseline justify-between gap-4", children: [_jsx("h2", { id: "source-code-title", className: "text-sm font-medium", children: "Source code" }), _jsx("span", { className: "text-xs text-neutral-500", children: "Copy and paste into your project" })] }), _jsx(CodeBlock, { code: source, language: "tsx", title: path.basename(sourcePath) })] })] })] }));
}
//# sourceMappingURL=OpenDemoPage.js.map