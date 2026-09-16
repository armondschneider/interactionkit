"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useId, useState } from "react";
export default function PasswordInput(_a) {
    var verifyPassword = _a.verifyPassword, _b = _a.label, label = _b === void 0 ? "Password" : _b, _c = _a.placeholder, placeholder = _c === void 0 ? "Enter your password" : _c, _d = _a.submitLabel, submitLabel = _d === void 0 ? "Continue" : _d, _e = _a.errorMessage, errorMessage = _e === void 0 ? "Password incorrect" : _e, _f = _a.className, className = _f === void 0 ? "" : _f;
    var _g = useState(""), password = _g[0], setPassword = _g[1];
    var _h = useState(false), incorrect = _h[0], setIncorrect = _h[1];
    var _j = useState(false), correct = _j[0], setCorrect = _j[1];
    var controls = useAnimationControls();
    var reduceMotion = useReducedMotion();
    var inputId = useId();
    var errorId = "".concat(inputId, "-error");
    var handleSubmit = function (event) {
        event.preventDefault();
        if (verifyPassword(password)) {
            setIncorrect(false);
            setCorrect(true);
            return;
        }
        setCorrect(false);
        setIncorrect(true);
        if (!reduceMotion) {
            void controls.start({
                x: [0, -4, 3, -2, 1, 0],
                transition: { duration: 0.26, ease: "easeOut" },
            });
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "w-full max-w-72 ".concat(className), noValidate: true, children: [_jsx("label", { htmlFor: inputId, className: "mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200", children: label }), _jsxs(motion.div, { animate: controls, className: "relative", children: [_jsx("input", { id: inputId, type: "password", value: password, onChange: function (event) {
                            setPassword(event.target.value);
                            setIncorrect(false);
                            setCorrect(false);
                        }, placeholder: placeholder, autoComplete: "current-password", "aria-invalid": incorrect, "aria-describedby": incorrect ? errorId : undefined, className: "h-10 w-full rounded-lg border bg-white px-3 pr-10 text-[13px] text-neutral-900 shadow-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-neutral-400 focus:ring-2 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 ".concat(incorrect
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/15 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400/15"
                            : "border-neutral-200 focus:border-neutral-400 focus:ring-neutral-900/5 dark:border-neutral-700 dark:focus:border-neutral-500 dark:focus:ring-white/10") }), _jsx(AnimatePresence, { children: correct && (_jsx(motion.span, { initial: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7, filter: "blur(2px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }, transition: { duration: 0.18, ease: "easeOut" }, className: "absolute right-3 top-1/2 grid size-4 -translate-y-1/2 place-items-center rounded-full bg-emerald-500 text-white dark:bg-emerald-400 dark:text-neutral-950", "aria-label": "Password correct", children: _jsx(Check, { size: 11, strokeWidth: 3, "aria-hidden": true }) })) })] }), _jsx("div", { className: "h-8 pt-1", children: _jsx(AnimatePresence, { children: incorrect && (_jsx(motion.p, { id: errorId, role: "alert", initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -2, filter: "blur(3px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" }, transition: { duration: 0.18, ease: "easeOut" }, className: "text-xs text-red-600 dark:text-red-400", children: errorMessage })) }) }), _jsx(motion.button, { type: "submit", whileTap: reduceMotion ? undefined : { scale: 0.98 }, transition: { type: "spring", stiffness: 500, damping: 30 }, className: "flex h-9 w-full cursor-pointer items-center justify-center rounded-lg bg-neutral-900 px-4 text-[13px] font-medium text-white transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white dark:focus-visible:ring-neutral-400 dark:focus-visible:ring-offset-neutral-900", children: submitLabel })] }));
}
//# sourceMappingURL=PasswordInput.js.map