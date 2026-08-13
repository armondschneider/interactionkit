"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { NotificationBatteryLowIcon, NotificationBellIcon, NotificationSuccessIcon } from "./NotificationIcons";
import NotificationReveal from "./NotificationReveal";
var examples = [
    {
        label: "Meeting",
        title: "Meeting Soon",
        icon: _jsx(NotificationBellIcon, { className: "size-4" }),
        iconClassName: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
    },
    {
        label: "Charging",
        title: "Low battery",
        icon: _jsx(NotificationBatteryLowIcon, { className: "size-4" }),
        iconClassName: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    },
    {
        label: "Success",
        title: "Form submitted",
        icon: _jsx(NotificationSuccessIcon, { className: "size-5" }),
        iconClassName: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
    },
];
export default function NotificationRevealDemo() {
    var _a = useState(null), active = _a[0], setActive = _a[1];
    var prefersReducedMotion = useReducedMotion();
    return (_jsxs("div", { className: "relative flex h-[310px] w-full flex-col items-center justify-center gap-3 overflow-hidden", children: [_jsx("div", { className: "flex flex-wrap justify-center gap-2", children: examples.map(function (example, index) { return (_jsx(motion.button, { type: "button", onClick: function () { return setActive(index); }, whileTap: prefersReducedMotion ? undefined : { scale: 0.95 }, transition: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 }, className: "cursor-pointer rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition-colors hover:border-neutral-300 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:text-white dark:focus-visible:ring-neutral-500", children: example.label }, example.label)); }) }), active !== null && (_jsx("div", { className: "pointer-events-none absolute inset-0", children: _jsx(NotificationReveal, { position: "absolute", showTrigger: false, autoReveal: true, title: examples[active].title, icon: examples[active].icon, iconClassName: examples[active].iconClassName }, active) }))] }));
}
//# sourceMappingURL=NotificationRevealDemo.js.map