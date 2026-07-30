"use client";
import { __awaiter, __generator } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function CodeBlock(_a) {
    var _this = this;
    var code = _a.code, language = _a.language, _b = _a.className, className = _b === void 0 ? "" : _b, previewLines = _a.previewLines, title = _a.title;
    var _c = useState(false), copied = _c[0], setCopied = _c[1];
    var _d = useState(false), expanded = _d[0], setExpanded = _d[1];
    var copy = function () { return __awaiter(_this, void 0, void 0, function () {
        var el, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!(typeof navigator !== "undefined" && navigator.clipboard)) return [3 /*break*/, 2];
                    return [4 /*yield*/, navigator.clipboard.writeText(code)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    el = document.createElement("textarea");
                    el.value = code;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand("copy");
                    document.body.removeChild(el);
                    _a.label = 3;
                case 3:
                    setCopied(true);
                    setTimeout(function () { return setCopied(false); }, 1500);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var lines = code.split("\n");
    var jsKeywords = new Set([
        'function', 'return', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'switch', 'case', 'break',
        'import', 'export', 'from', 'default', 'class', 'extends', 'new', 'try', 'catch', 'finally'
    ]);
    var tokenizeJSLine = function (line) {
        var tokens = [];
        var i = 0;
        while (i < line.length) {
            var rest = line.slice(i);
            if (rest.startsWith('//')) {
                tokens.push({ type: 'comment', text: rest });
                break;
            }
            if (rest.startsWith('/*')) {
                var endIdx = rest.indexOf('*/');
                var text = endIdx >= 0 ? rest.slice(0, endIdx + 2) : rest;
                tokens.push({ type: 'comment', text: text });
                i += text.length;
                continue;
            }
            var ch = rest[0];
            if (ch === '"' || ch === "'" || ch === '`') {
                var j = 1;
                while (j < rest.length) {
                    if (rest[j] === '\\') {
                        j += 2;
                        continue;
                    }
                    if (rest[j] === ch) {
                        j++;
                        break;
                    }
                    j++;
                }
                tokens.push({ type: 'string', text: rest.slice(0, j) });
                i += j;
                continue;
            }
            var numberMatch = rest.match(/^\d+(?:\.\d+)?/);
            if (numberMatch) {
                tokens.push({ type: 'number', text: numberMatch[0] });
                i += numberMatch[0].length;
                continue;
            }
            var idMatch = rest.match(/^[_$a-zA-Z][_$a-zA-Z0-9]*/);
            if (idMatch) {
                var txt = idMatch[0];
                if (jsKeywords.has(txt))
                    tokens.push({ type: 'keyword', text: txt });
                else
                    tokens.push({ type: 'identifier', text: txt });
                i += txt.length;
                continue;
            }
            var wsMatch = rest.match(/^\s+/);
            if (wsMatch) {
                tokens.push({ type: 'whitespace', text: wsMatch[0] });
                i += wsMatch[0].length;
                continue;
            }
            tokens.push({ type: 'punct', text: rest[0] });
            i += 1;
        }
        return tokens;
    };
    var tokenizeHTMLLine = function (line) {
        var tokens = [];
        var i = 0;
        while (i < line.length) {
            var rest = line.slice(i);
            var tagMatch = rest.match(/^<\/?[a-zA-Z0-9-]+/);
            if (tagMatch) {
                tokens.push({ type: 'tag', text: tagMatch[0] });
                i += tagMatch[0].length;
                continue;
            }
            var attrMatch = rest.match(/^\s+[a-zA-Z\-:]+(?==)/);
            if (attrMatch) {
                tokens.push({ type: 'attr', text: attrMatch[0] });
                i += attrMatch[0].length;
                continue;
            }
            var strMatch = rest.match(/^=\"[^\"]*\"|='[^']*'/);
            if (strMatch) {
                tokens.push({ type: 'string', text: strMatch[0] });
                i += strMatch[0].length;
                continue;
            }
            tokens.push({ type: 'text', text: rest[0] });
            i += 1;
        }
        return tokens;
    };
    var highlightLine = function (line) {
        if (!language)
            return [{ type: 'text', text: line }];
        var lang = language.toLowerCase();
        if (lang === 'html' || lang === 'xml')
            return tokenizeHTMLLine(line);
        return tokenizeJSLine(line);
    };
    return (_jsxs("div", { className: "relative font-sans text-[10px] ".concat(className), children: [title && (_jsx("div", { className: "flex items-center justify-between px-3 py-2 bg-neutral-100 border border-b-0 border-neutral-200 rounded-t-lg", children: _jsx("span", { className: "text-[11px] font-medium text-neutral-700", children: title }) })), _jsx("div", { className: "absolute right-2 z-10 flex items-center gap-2 ".concat(title ? 'top-10' : 'top-2'), children: _jsxs("button", { type: "button", title: copied ? "Copied" : "Copy code", "aria-label": copied ? "Copied" : "Copy code", className: "cursor-pointer inline-flex items-center gap-2 px-1.5 py-1.5 rounded-md text-neutral-700 bg-neutral-100 hover:bg-neutral-200 ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300", onClick: copy, children: [_jsx(AnimatePresence, { mode: "wait", children: !copied ? (_jsx(motion.span, { initial: { opacity: 0, scale: 0.8, filter: 'blur(4px)' }, animate: { opacity: 1, scale: 1, filter: 'blur(0px)' }, exit: { opacity: 0, scale: 0.8, filter: 'blur(4px)' }, transition: { duration: 0.1, ease: "easeOut" }, className: "inline-flex", children: _jsx(Copy, { size: 14 }) }, "copy")) : (_jsx(motion.span, { initial: { opacity: 0, scale: 0.8, filter: 'blur(4px)' }, animate: { opacity: 1, scale: 1, filter: 'blur(0px)' }, exit: { opacity: 0, scale: 0.8, filter: 'blur(4px)' }, transition: { duration: 0.15, ease: "easeOut" }, className: "inline-flex text-green-600", children: _jsx(Check, { size: 14 }) }, "check")) }), _jsx("span", { className: "sr-only", children: copied ? 'Copied' : 'Copy' })] }) }), _jsx("pre", { className: "overflow-auto border border-neutral-200 p-4 text-neutral-900 [scrollbar-color:rgb(150_150_150_/_0.5)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-400/50 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500/60 ".concat(title ? 'rounded-b-lg rounded-t-none' : 'rounded-lg'), children: _jsx("code", { className: "block whitespace-pre ".concat(language ? "language-".concat(language) : ""), children: (function () {
                        var tokenizedLines = lines.map(function (l) { return highlightLine(l); });
                        var renderToken = function (token, key) {
                            var type = token.type;
                            var cls = type === 'keyword' ? 'text-indigo-600'
                                : type === 'string' ? 'text-emerald-600'
                                    : type === 'number' ? 'text-purple-600'
                                        : type === 'comment' ? 'text-neutral-500 italic'
                                            : type === 'identifier' ? 'text-blue-600'
                                                : type === 'tag' ? 'text-orange-600'
                                                    : type === 'attr' ? 'text-yellow-600'
                                                        : type === 'punct' ? 'text-neutral-600'
                                                            : 'text-neutral-800';
                            // whitespace tokens should not get a class, preserve them for spacing
                            if (type === 'whitespace')
                                return _jsx("span", { children: token.text }, key);
                            return _jsx("span", { className: cls, children: token.text }, key);
                        };
                        var visibleLines = typeof previewLines === 'number' && !expanded ? tokenizedLines.slice(0, previewLines) : tokenizedLines;
                        return (_jsx("div", { children: visibleLines.map(function (tokens, i) { return (_jsx("div", { className: "h-[14px] leading-[14px] break-words", children: tokens.length === 0 ? _jsx("span", { children: "\u00A0" }) : tokens.map(function (t, j) { return renderToken(t, j); }) }, i)); }) }));
                    })() }) }), typeof previewLines === 'number' && lines.length > previewLines ? (_jsx("div", { className: "flex justify-end mt-2 px-2", children: _jsx("button", { type: "button", className: "text-xs text-neutral-600 hover:text-neutral-900 focus:outline-none cursor-pointer", onClick: function () { return setExpanded(!expanded); }, children: expanded ? 'Show less' : "Show ".concat(lines.length - previewLines, " more") }) })) : null] }));
}
//# sourceMappingURL=CodeBlock.js.map