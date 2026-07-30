"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
export default function Tooltip(_a) {
    var content = _a.content, children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b;
    var _c = useState(false), show = _c[0], setShow = _c[1];
    var closeTimer = useRef(null);
    var CLOSE_DELAY = 80; // ms - short delay to reduce flash when moving between trigger and tooltip
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
    return (_jsxs("div", { className: "relative inline-flex items-center ".concat(className), children: [_jsxs("div", { className: "inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-default", onMouseEnter: openSoon, onMouseLeave: closeSoon, onFocus: openSoon, onBlur: closeSoon, children: [children !== null && children !== void 0 ? children : _jsx("span", { className: "font-medium", children: "Info" }), _jsx(Info, { size: 16, className: "text-neutral-400", "aria-hidden": true })] }), _jsx(AnimatePresence, { mode: "wait", initial: false, children: show && (_jsx(motion.div, { role: "tooltip", className: "absolute top-full left-1/2 z-50 mt-3 -translate-x-1/2 pointer-events-auto [will-change:transform,opacity,filter]", initial: { opacity: 0, y: -6, scale: 0.96, filter: "blur(2px)" }, animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, y: -6, scale: 0.96, filter: "blur(2px)" }, transition: {
                        opacity: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                        y: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                        scale: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                        filter: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                    }, onMouseEnter: openSoon, onMouseLeave: closeSoon, children: _jsx("div", { className: "bg-neutral-900 text-white text-xs leading-relaxed px-2 py-1.5 rounded-lg shadow-xl text-center min-w-[70px] max-w-[260px] break-words whitespace-normal", children: content }) }, "tooltip")) })] }));
}
//# sourceMappingURL=Tooltip.js.map