"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
var positions = {
    bottom: {
        className: "top-full left-1/2 mt-3 -translate-x-1/2",
        hidden: { opacity: 0, y: -6, scale: 0.96, filter: "blur(2px)" },
    },
    left: {
        className: "right-full top-1/2 mr-3 -translate-y-1/2",
        hidden: { opacity: 0, x: 6, scale: 0.96, filter: "blur(2px)" },
    },
    right: {
        className: "left-full top-1/2 ml-3 -translate-y-1/2",
        hidden: { opacity: 0, x: -6, scale: 0.96, filter: "blur(2px)" },
    },
};
export default function Tooltip(_a) {
    var content = _a.content, children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.side, side = _c === void 0 ? "bottom" : _c;
    var _d = useState(false), show = _d[0], setShow = _d[1];
    var closeTimer = useRef(null);
    var CLOSE_DELAY = 80; // ms - short delay to reduce flash when moving between trigger and tooltip
    var position = positions[side];
    useEffect(function () {
        return function () {
            if (closeTimer.current) {
                window.clearTimeout(closeTimer.current);
                closeTimer.current = null;
            }
        };
    }, []);
    var openSoon = function () {
        if (closeTimer.current) {
            window.clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setShow(true);
    };
    var closeSoon = function () {
        if (closeTimer.current)
            window.clearTimeout(closeTimer.current);
        // Small delay so quick mouse movements don't cause flicker
        closeTimer.current = window.setTimeout(function () {
            setShow(false);
            closeTimer.current = null;
        }, CLOSE_DELAY);
    };
    return (_jsxs("div", { className: "relative inline-flex items-center ".concat(className), children: [_jsxs("div", { className: "inline-flex cursor-default items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white", onMouseEnter: openSoon, onMouseLeave: closeSoon, onFocus: openSoon, onBlur: closeSoon, children: [children !== null && children !== void 0 ? children : _jsx("span", { className: "font-medium", children: "Info" }), _jsx(Info, { size: 16, className: "text-neutral-400 dark:text-neutral-500", "aria-hidden": true })] }), _jsx(AnimatePresence, { mode: "wait", initial: false, children: show && (_jsx(motion.div, { role: "tooltip", className: "absolute z-50 pointer-events-auto [will-change:transform,opacity,filter] ".concat(position.className), initial: position.hidden, animate: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }, exit: position.hidden, transition: {
                        opacity: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                        x: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                        y: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                        scale: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                        filter: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                    }, onMouseEnter: openSoon, onMouseLeave: closeSoon, children: _jsx("div", { className: "w-max max-w-[260px] break-words rounded-lg bg-neutral-900 px-2 py-1.5 text-center text-xs leading-relaxed text-white shadow-xl whitespace-normal dark:bg-neutral-700", children: content }) }, "tooltip")) })] }));
}
//# sourceMappingURL=Tooltip.js.map