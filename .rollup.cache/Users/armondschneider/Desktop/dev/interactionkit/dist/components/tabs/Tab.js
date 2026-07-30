"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
var defaultTabs = [
    {
        label: "Feed",
        content: (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "h-20 rounded-lg bg-neutral-100" }), _jsx("div", { className: "h-20 rounded-lg bg-neutral-100" }), _jsx("div", { className: "h-20 rounded-lg bg-neutral-100" })] })),
    },
    {
        label: "Collection",
        content: (_jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" }), _jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" }), _jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" }), _jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" }), _jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" }), _jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" })] })),
    },
    {
        label: "For Sale",
        content: (_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" }), _jsx("div", { className: "h-3 w-2/3 rounded bg-neutral-100" }), _jsx("div", { className: "h-3 w-1/3 rounded bg-neutral-200" })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" }), _jsx("div", { className: "h-3 w-2/3 rounded bg-neutral-100" }), _jsx("div", { className: "h-3 w-1/3 rounded bg-neutral-200" })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" }), _jsx("div", { className: "h-3 w-2/3 rounded bg-neutral-100" }), _jsx("div", { className: "h-3 w-1/3 rounded bg-neutral-200" })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("div", { className: "aspect-square rounded-lg bg-neutral-100" }), _jsx("div", { className: "h-3 w-2/3 rounded bg-neutral-100" }), _jsx("div", { className: "h-3 w-1/3 rounded bg-neutral-200" })] })] })),
    },
];
export default function Tab(_a) {
    var _b = _a.tabs, tabs = _b === void 0 ? defaultTabs : _b, _c = _a.className, className = _c === void 0 ? "" : _c;
    var _d = useState(0), active = _d[0], setActive = _d[1];
    var _e = useState(null), pressedIndex = _e[0], setPressedIndex = _e[1];
    // Nudge the capsule toward the pressed tab
    var nudge = pressedIndex !== null && pressedIndex !== active
        ? pressedIndex > active
            ? 8
            : -8
        : 0;
    return (_jsxs("div", { className: className, children: [_jsx("div", { className: "inline-flex gap-1 rounded-full bg-neutral-100 p-1", children: tabs.map(function (tab, i) { return (_jsxs(motion.button, { onClick: function () { return setActive(i); }, onPointerDown: function () { return setPressedIndex(i); }, onPointerUp: function () { return setPressedIndex(null); }, onPointerLeave: function () { return setPressedIndex(null); }, whileTap: { scale: 0.97 }, transition: { type: "spring", stiffness: 500, damping: 25 }, className: "relative rounded-full px-4 py-2 text-base font-medium transition-colors cursor-pointer focus:outline-none ".concat(active === i
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-700"), children: [active === i && (_jsx(motion.div, { layoutId: "tab-capsule", className: "absolute inset-0 rounded-full bg-white shadow-sm", animate: { x: nudge }, transition: { type: "spring", stiffness: 400, damping: 30 } })), _jsx("span", { className: "relative", children: tab.label })] }, tab.label)); }) }), _jsx("div", { className: "pt-4", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 12, filter: "blur(4px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: { opacity: 0, y: -12, filter: "blur(4px)" }, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }, children: tabs[active].content }, active) }) })] }));
}
//# sourceMappingURL=Tab.js.map