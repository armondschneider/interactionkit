"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
export default function ClickHoldButton(_a) {
    var onConfirm = _a.onConfirm, _b = _a.duration, duration = _b === void 0 ? 900 : _b, _c = _a.children, children = _c === void 0 ? "Click and hold" : _c, _d = _a.className, className = _d === void 0 ? "" : _d;
    var holdTimer = useRef(null);
    var holdProgress = useMotionValue(0);
    var scaleX = useTransform(holdProgress, [0, 100], [0, 1]);
    var _e = useState("idle"), status = _e[0], setStatus = _e[1];
    var startHold = function () {
        // Animate progress from 0 to 100 over duration
        animate(holdProgress, 100, { duration: duration / 1000, ease: "linear" });
        // @ts-ignore window.setTimeout gives number
        holdTimer.current = window.setTimeout(function () {
            setStatus("deleting");
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
            // Show "Deleted" after a brief delay
            setTimeout(function () {
                setStatus("deleted");
                holdProgress.set(0);
            }, 800);
        }, duration);
    };
    var cancelHold = function () {
        // Snap progress back to 0 with spring
        animate(holdProgress, 0, { type: "spring", stiffness: 300, damping: 25 });
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
            holdTimer.current = null;
        }
    };
    return (_jsxs(motion.button, { onPointerDown: startHold, onPointerUp: cancelHold, onPointerLeave: cancelHold, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 20 }, disabled: status !== "idle", className: "relative px-3 py-1.5 rounded-full text-sm text-white bg-red-500 overflow-hidden cursor-pointer disabled:cursor-default ".concat(className), children: [_jsx(motion.div, { className: "absolute inset-0 bg-red-600/50", className: "absolute inset-0 origin-left bg-red-600/50", style: { scaleX: scaleX } }), _jsxs("span", { className: "relative z-10 flex items-center gap-2 justify-center", children: [status === "idle" && children, status === "deleting" && (_jsxs(_Fragment, { children: [_jsx(motion.svg, { className: "w-4 h-4", animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" }, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", strokeDasharray: "60", strokeDashoffset: "15", strokeLinecap: "round" }) }), "Deleting..."] })), status === "deleted" && "Deleted!"] })] }));
}
//# sourceMappingURL=ClickHoldButton.js.map