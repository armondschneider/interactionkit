"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
export default function ClickHoldButton(_a) {
    var onConfirm = _a.onConfirm, _b = _a.duration, duration = _b === void 0 ? 900 : _b, _c = _a.children, children = _c === void 0 ? "Hold to delete" : _c, _d = _a.completedLabel, completedLabel = _d === void 0 ? "Deleted" : _d, resetAfter = _a.resetAfter, _e = _a.className, className = _e === void 0 ? "" : _e;
    var holdTimer = useRef(null);
    var resetTimer = useRef(null);
    var progressAnimation = useRef(null);
    var progress = useMotionValue(0);
    var scaleX = useTransform(progress, [0, 1], [0, 1]);
    var prefersReducedMotion = useReducedMotion();
    var _f = useState("idle"), status = _f[0], setStatus = _f[1];
    var clearHold = function () {
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
            holdTimer.current = null;
        }
    };
    var reset = function () {
        var _a;
        clearHold();
        (_a = progressAnimation.current) === null || _a === void 0 ? void 0 : _a.stop();
        progress.set(0);
        setStatus("idle");
    };
    var confirm = function () {
        clearHold();
        setStatus("deleted");
        progress.set(1);
        onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
        if (resetAfter) {
            resetTimer.current = setTimeout(reset, resetAfter);
        }
    };
    var startHold = function () {
        var _a;
        if (status !== "idle")
            return;
        setStatus("holding");
        (_a = progressAnimation.current) === null || _a === void 0 ? void 0 : _a.stop();
        progressAnimation.current = animate(progress, 1, {
            duration: duration / 1000,
            ease: "linear",
        });
        holdTimer.current = setTimeout(confirm, duration);
    };
    var cancelHold = function () {
        var _a;
        if (status !== "holding")
            return;
        clearHold();
        (_a = progressAnimation.current) === null || _a === void 0 ? void 0 : _a.stop();
        setStatus("idle");
        if (prefersReducedMotion) {
            progress.set(0);
            return;
        }
        progressAnimation.current = animate(progress, 0, {
            type: "spring",
            stiffness: 340,
            damping: 28,
        });
    };
    useEffect(function () { return function () {
        var _a;
        clearHold();
        if (resetTimer.current)
            clearTimeout(resetTimer.current);
        (_a = progressAnimation.current) === null || _a === void 0 ? void 0 : _a.stop();
    }; }, []);
    return (_jsxs(motion.button, { type: "button", onPointerDown: function (event) {
            if (!event.isPrimary || event.button !== 0)
                return;
            event.currentTarget.setPointerCapture(event.pointerId);
            startHold();
        }, onPointerUp: cancelHold, onPointerCancel: cancelHold, onKeyDown: function (event) {
            if ((event.key === " " || event.key === "Enter") && !event.repeat) {
                event.preventDefault();
                startHold();
            }
        }, onKeyUp: function (event) {
            if (event.key === " " || event.key === "Enter")
                cancelHold();
        }, onBlur: cancelHold, animate: { scale: status === "holding" ? 0.96 : 1 }, transition: prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 26, mass: 0.55 }, disabled: status === "deleted", "aria-label": status === "deleted" ? "Deleted" : "Press and hold to delete", className: "relative inline-flex min-h-9 min-w-32 items-center justify-center overflow-hidden cursor-pointer rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:cursor-default disabled:bg-red-500 dark:focus-visible:ring-offset-neutral-900 ".concat(className), children: [_jsx(motion.span, { className: "absolute inset-0 origin-left bg-red-700/45", style: { scaleX: scaleX } }), _jsx("span", { className: "relative z-10", children: status === "deleted" ? completedLabel : children })] }));
}
//# sourceMappingURL=ClickHoldButton.js.map