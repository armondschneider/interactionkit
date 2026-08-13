"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
var emojis = ["🤯", "😀", "😁", "😂", "🙂", "😉", "😊", "😍", "🤩", "😎", "🤓", "🤔", "🥳", "😴", "😭", "😤", "😇", "🥰", "🤠", "🫠", "🌿", "🍋", "🍓", "🌞"];
var backgrounds = [
    { name: "mint", triggerClassName: "bg-emerald-100 dark:bg-emerald-900", swatchClassName: "bg-emerald-300" },
    { name: "sky", triggerClassName: "bg-sky-100 dark:bg-sky-900", swatchClassName: "bg-sky-300" },
    { name: "violet", triggerClassName: "bg-violet-100 dark:bg-violet-900", swatchClassName: "bg-violet-300" },
    { name: "rose", triggerClassName: "bg-rose-100 dark:bg-rose-900", swatchClassName: "bg-rose-300" },
    { name: "amber", triggerClassName: "bg-amber-100 dark:bg-amber-900", swatchClassName: "bg-amber-300" },
    { name: "stone", triggerClassName: "bg-stone-100 dark:bg-stone-700", swatchClassName: "bg-stone-300" },
];
export default function EmojiPicker(_a) {
    var _b = _a.initialEmoji, initialEmoji = _b === void 0 ? "🤯" : _b, _c = _a.className, className = _c === void 0 ? "" : _c, onChange = _a.onChange;
    var _d = useState(initialEmoji), emoji = _d[0], setEmoji = _d[1];
    var _e = useState(backgrounds[0]), background = _e[0], setBackground = _e[1];
    var _f = useState(false), open = _f[0], setOpen = _f[1];
    var pickerRef = useRef(null);
    var triggerRef = useRef(null);
    var reduceMotion = useReducedMotion();
    useEffect(function () {
        if (!open)
            return;
        var onKeyDown = function (event) {
            if (event.key === "Escape") {
                setOpen(false);
                window.setTimeout(function () { var _a; return (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
            }
        };
        var onPointerDown = function (event) {
            var _a;
            if (!((_a = pickerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)))
                setOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);
        return function () {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [open]);
    var chooseEmoji = function (nextEmoji) {
        setEmoji(nextEmoji);
        onChange === null || onChange === void 0 ? void 0 : onChange(nextEmoji);
    };
    return (_jsxs("div", { ref: pickerRef, className: "relative inline-flex flex-col items-center", children: [_jsx(motion.button, { ref: triggerRef, type: "button", onClick: function () { return setOpen(function (value) { return !value; }); }, whileTap: { scale: 0.94 }, className: "grid size-12 cursor-pointer place-items-center rounded-full border border-neutral-50 text-xl transition-colors duration-200 ease-out hover:brightness-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-400 dark:border-neutral-700 dark:hover:brightness-110 ".concat(background.triggerClassName, " ").concat(className), "aria-label": "Choose emoji, currently ".concat(emoji), "aria-haspopup": "dialog", "aria-expanded": open, children: _jsx(AnimatePresence, { initial: false, mode: "wait", children: _jsx(motion.span, { initial: reduceMotion ? false : { opacity: 0, scale: 0.76, rotate: -10, filter: "blur(3px)" }, animate: { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }, exit: reduceMotion ? undefined : { opacity: 0, scale: 0.76, rotate: 10, filter: "blur(3px)" }, transition: { type: "spring", stiffness: 1000, damping: 34, mass: 0.25 }, children: emoji }, emoji) }) }), _jsx(AnimatePresence, { children: open && (_jsxs(motion.div, { role: "dialog", "aria-label": "Choose an emoji", initial: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: -8, filter: "blur(5px)" }, animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }, exit: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -4, filter: "blur(2px)" }, transition: { type: "spring", stiffness: 760, damping: 35, mass: 0.45 }, className: "absolute top-[calc(100%+8px)] z-50 w-[220px] rounded-xl border border-neutral-100/80 bg-white p-2.5 shadow-xl dark:border-neutral-700 dark:bg-neutral-900", children: [_jsx("div", { className: "grid grid-cols-6 gap-0.5", "aria-label": "Available emojis", children: emojis.map(function (item) { return (_jsxs(motion.button, { type: "button", onClick: function () { return chooseEmoji(item); }, initial: "rest", animate: "rest", whileTap: "pressed", className: "group relative grid aspect-square cursor-pointer place-items-center rounded-md text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400", "aria-label": "Choose ".concat(item), "aria-pressed": item === emoji, children: [_jsx(motion.span, { "aria-hidden": "true", variants: { rest: { scale: 1 }, pressed: { scale: 0.94 } }, transition: { type: "spring", bounce: 0, duration: 0.18 }, className: "absolute inset-0 rounded-md transition-colors ".concat(item === emoji ? "bg-emerald-100 dark:bg-emerald-950" : "bg-transparent group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800") }), _jsx("span", { className: "relative", children: item })] }, item)); }) }), _jsx("div", { className: "mt-2 flex items-center justify-center gap-1 border-t border-neutral-100 pt-2 dark:border-neutral-800", "aria-label": "Emoji background color", children: backgrounds.map(function (color) { return (_jsx(motion.button, { type: "button", onClick: function () { return setBackground(color); }, initial: "rest", animate: "rest", whileTap: "pressed", className: "grid size-8 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400", "aria-label": "Use ".concat(color.name, " background"), "aria-pressed": color.name === background.name, children: _jsx(motion.span, { variants: { rest: { scale: 1 }, pressed: { scale: 0.82 } }, transition: { type: "spring", bounce: 0, duration: 0.16 }, className: "size-4 rounded-full ".concat(color.swatchClassName, " ").concat(color.name === background.name ? "ring-2 ring-neutral-700 ring-offset-2 dark:ring-neutral-200 dark:ring-offset-neutral-900" : "") }) }, color.name)); }) })] })) })] }));
}
//# sourceMappingURL=EmojiPicker.js.map