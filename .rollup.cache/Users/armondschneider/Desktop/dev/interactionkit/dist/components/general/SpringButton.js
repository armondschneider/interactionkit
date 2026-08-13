"use client";
import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
var spring = { type: "spring", stiffness: 500, damping: 28, mass: 0.5 };
var MotionLink = motion.create(Link);
export function SpringButton(_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.pressSpring, pressSpring = _c === void 0 ? true : _c, props = __rest(_a, ["children", "className", "pressSpring"]);
    var prefersReducedMotion = useReducedMotion();
    var canSpring = pressSpring && !prefersReducedMotion;
    return (_jsx(motion.button, __assign({}, props, { whileTap: canSpring ? { scale: 0.94 } : undefined, transition: canSpring ? spring : undefined, className: "relative isolate overflow-hidden rounded-full bg-neutral-800 px-4 py-2 text-sm font-medium text-white focus:outline-none before:absolute before:inset-0 before:-z-10 before:scale-95 before:rounded-[inherit] before:bg-neutral-700 before:opacity-0 before:transition-[transform,opacity] before:duration-150 before:ease-out hover:before:scale-100 hover:before:opacity-100 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:bg-neutral-200 dark:text-neutral-900 dark:before:bg-white dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-900 motion-reduce:before:transition-none ".concat(className), children: children })));
}
export function SpringLinkButton(_a) {
    var href = _a.href, children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.variant, variant = _c === void 0 ? "outline" : _c;
    var prefersReducedMotion = useReducedMotion();
    var variantClassName = variant === "filled"
        ? "border-neutral-800 bg-neutral-800 text-white hover:border-neutral-700 hover:bg-neutral-700 dark:border-neutral-200 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:border-white dark:hover:bg-white"
        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:text-neutral-900";
    return (_jsx(MotionLink, { href: href, whileTap: prefersReducedMotion ? undefined : { scale: 0.96 }, transition: spring, className: "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-transform duration-150 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 ".concat(variantClassName, " ").concat(className), children: children }));
}
//# sourceMappingURL=SpringButton.js.map