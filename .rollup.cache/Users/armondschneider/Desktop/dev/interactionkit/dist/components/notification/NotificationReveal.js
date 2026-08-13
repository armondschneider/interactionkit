"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NotificationBellIcon } from "./NotificationIcons";
export default function NotificationReveal(_a) {
    var _b = _a.title, title = _b === void 0 ? "Meeting Soon" : _b, _c = _a.duration, duration = _c === void 0 ? 3600 : _c, _d = _a.position, position = _d === void 0 ? "fixed" : _d, _e = _a.className, className = _e === void 0 ? "" : _e, _f = _a.showTrigger, showTrigger = _f === void 0 ? true : _f, _g = _a.autoReveal, autoReveal = _g === void 0 ? false : _g, _h = _a.icon, icon = _h === void 0 ? _jsx(NotificationBellIcon, { className: "size-4" }) : _h, _j = _a.iconClassName, iconClassName = _j === void 0 ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400" : _j, onDismiss = _a.onDismiss;
    var _k = useState("hidden"), phase = _k[0], setPhase = _k[1];
    var timers = useRef([]);
    var prefersReducedMotion = useReducedMotion();
    var clearTimers = function () {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    };
    var dismiss = function () {
        clearTimers();
        setPhase("hidden");
        onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
    };
    var reveal = function () {
        clearTimers();
        setPhase("hidden");
        requestAnimationFrame(function () {
            setPhase("icon");
            timers.current.push(setTimeout(function () { return setPhase("notification"); }, prefersReducedMotion ? 120 : 620));
            timers.current.push(setTimeout(dismiss, duration));
        });
    };
    useEffect(function () {
        if (autoReveal)
            reveal();
    }, [autoReveal]);
    useEffect(function () {
        var onKeyDown = function (event) {
            if (event.key === "Escape" && phase !== "hidden")
                dismiss();
        };
        document.addEventListener("keydown", onKeyDown);
        return function () {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [phase]);
    useEffect(function () { return function () { return clearTimers(); }; }, []);
    var isExpanded = phase === "notification";
    var placement = position === "fixed" ? "fixed" : "absolute";
    return (_jsxs("div", { className: "flex flex-col items-center gap-4 ".concat(className), children: [showTrigger && (_jsx(motion.button, { type: "button", onClick: reveal, whileTap: prefersReducedMotion ? undefined : { scale: 0.96 }, transition: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 }, className: "rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-medium text-neutral-700 shadow-sm transition-colors hover:border-neutral-300 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:text-white dark:focus-visible:ring-neutral-500", children: "Show notification" })), _jsx(AnimatePresence, { children: phase !== "hidden" && (_jsxs(motion.div, { layout: true, role: "status", "aria-live": "polite", initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.64, y: 34 }, animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        width: isExpanded ? 240 : 48,
                        borderRadius: 999,
                    }, exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.82, y: 8 }, transition: prefersReducedMotion
                        ? { duration: 0.15 }
                        : phase === "icon"
                            ? { duration: 0.36, ease: [0.16, 1, 0.3, 1] }
                            : { type: "spring", stiffness: 430, damping: 30, mass: 0.7 }, className: "".concat(placement, " bottom-6 left-1/2 z-50 flex h-12 -translate-x-1/2 items-center overflow-hidden pointer-events-auto ").concat(isExpanded ? "border border-neutral-200/50 bg-white p-1 shadow-md shadow-neutral-950/5 dark:border-neutral-700/50 dark:bg-neutral-800 dark:shadow-black/15" : "bg-transparent"), children: [_jsx("div", { className: "grid size-10 shrink-0 place-items-center rounded-full ".concat(iconClassName), children: icon }), _jsx(AnimatePresence, { initial: false, children: isExpanded && (_jsxs(motion.div, { initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -4 }, transition: { duration: prefersReducedMotion ? 0.1 : 0.16, ease: "easeOut" }, className: "flex min-w-0 flex-1 items-center pl-2", children: [_jsx("span", { className: "truncate text-sm font-medium text-neutral-900 dark:text-neutral-100", children: title }), _jsx("button", { type: "button", onClick: dismiss, "aria-label": "Dismiss notification", className: "ml-auto grid size-8 shrink-0 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-500", children: _jsx(X, { size: 16, "aria-hidden": true }) })] })) })] })) })] }));
}
//# sourceMappingURL=NotificationReveal.js.map