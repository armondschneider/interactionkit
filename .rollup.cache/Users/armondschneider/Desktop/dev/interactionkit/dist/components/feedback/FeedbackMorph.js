"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, CornerDownLeft, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
var BASE_WIDTH = 48; // matches size-12 of the icon button
var EXPANDED_WIDTH = 300;
var HIDDEN_SCALE = 0.5; // the vacating sibling scales down to this...
var HIDDEN_BLUR_PX = 6; // ...while blurring out, and springs back on return
var RESET_DELAY = 2400; // how long the confirmation stays before easing back
function RatingPill(_a) {
    var which = _a.which, state = _a.state, submitted = _a.submitted, response = _a.response, placeholder = _a.placeholder, thanksMessage = _a.thanksMessage, reduceMotion = _a.reduceMotion, inputRef = _a.inputRef, triggerRef = _a.triggerRef, onOpen = _a.onOpen, onQueryChange = _a.onQueryChange, onSubmit = _a.onSubmit;
    var expanded = state === "expanded";
    var hidden = state === "hidden";
    var isUp = which === "up";
    var Icon = isUp ? ThumbsUp : ThumbsDown;
    var activeTone = isUp
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-rose-500 dark:text-rose-400";
    var contentMotion = reduceMotion
        ? { initial: { opacity: 0 }, exit: { opacity: 0 } }
        : {
            initial: { opacity: 0, x: -6, filter: "blur(3px)" },
            exit: { opacity: 0, x: -6, filter: "blur(3px)" },
        };
    var targetWidth = expanded ? EXPANDED_WIDTH : hidden ? 0 : BASE_WIDTH;
    // Reduced motion skips scale and blur entirely — only width and opacity
    var pillAnimate = reduceMotion
        ? { width: targetWidth, opacity: hidden ? 0 : 1 }
        : {
            width: targetWidth,
            opacity: hidden ? 0 : 1,
            scale: hidden ? HIDDEN_SCALE : 1,
            filter: hidden ? "blur(".concat(HIDDEN_BLUR_PX, "px)") : "blur(0px)",
        };
    var pillTransition = reduceMotion
        ? { duration: 0.15 }
        : expanded
            ? {
                width: { type: "spring", stiffness: 420, damping: 34 },
                default: { duration: 0.2, ease: "easeOut" },
            }
            : hidden
                ? {
                    // dissolving out: quick fade, accelerating scale-down and blur
                    opacity: { duration: 0.18, ease: "easeOut" },
                    scale: { duration: 0.24, ease: "easeIn" },
                    filter: { duration: 0.2, ease: "easeIn" },
                    width: { duration: 0.26, ease: "easeIn" },
                }
                : {
                    // easing back in, synced with the expanded pill's 0.1s delayed collapse
                    opacity: { duration: 0.18, ease: "easeOut", delay: 0.1 },
                    filter: { duration: 0.22, ease: "easeOut", delay: 0.1 },
                    scale: { type: "spring", stiffness: 500, damping: 24, mass: 0.6, delay: 0.1 },
                    width: { type: "spring", stiffness: 420, damping: 34, delay: 0.1 },
                };
    return (_jsxs(motion.div, { initial: false, animate: pillAnimate, transition: pillTransition, style: { pointerEvents: hidden ? "none" : undefined }, "aria-hidden": hidden || undefined, className: "relative flex h-12 shrink-0 items-center overflow-hidden rounded-full bg-white shadow-[0_5px_12px_rgba(0,0,0,0.04)] dark:bg-neutral-900 dark:shadow-black/20", children: [_jsx("span", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 rounded-full border border-neutral-200 dark:border-neutral-700" }), _jsx(motion.button, { ref: triggerRef, type: "button", onClick: onOpen, "aria-label": isUp ? "Helpful" : "Not helpful", "aria-expanded": expanded, tabIndex: hidden ? -1 : undefined, whileHover: reduceMotion ? undefined : { scale: 1.04 }, whileTap: reduceMotion ? undefined : { scale: 0.92 }, transition: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 }, className: "grid size-12 shrink-0 cursor-pointer place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 ".concat(expanded
                    ? activeTone
                    : "text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"), children: _jsx(Icon, { size: 18, "aria-hidden": true }) }), _jsxs(AnimatePresence, { children: [expanded && submitted && (_jsxs(motion.div, { role: "status", initial: contentMotion.initial, animate: { opacity: 1, x: 0, filter: "blur(0px)" }, exit: contentMotion.exit, transition: { duration: 0.18, ease: "easeOut" }, className: "flex min-w-0 flex-1 items-center gap-2 pr-4", children: [_jsx(Check, { size: 15, className: "shrink-0 text-emerald-600 dark:text-emerald-400", "aria-hidden": true }), _jsx("p", { className: "truncate text-sm text-neutral-600 dark:text-neutral-300", children: thanksMessage })] }, "thanks")), expanded && !submitted && (_jsxs(motion.form, { onSubmit: function (event) {
                            event.preventDefault();
                            onSubmit();
                        }, initial: contentMotion.initial, animate: { opacity: 1, x: 0, filter: "blur(0px)" }, exit: contentMotion.exit, transition: { duration: 0.16, ease: "easeOut" }, className: "flex min-w-0 flex-1 items-center gap-1 pr-2", children: [_jsx("input", { ref: inputRef, value: response, onChange: function (event) { return onQueryChange(event.target.value); }, placeholder: placeholder, "aria-label": "Additional feedback", className: "w-full min-w-0 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500" }), _jsx("button", { type: "submit", "aria-label": "Submit feedback", className: "grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200", children: _jsx(CornerDownLeft, { size: 14, "aria-hidden": true }) })] }, "form"))] })] }));
}
export default function FeedbackMorph(_a) {
    var _b;
    var onFeedback = _a.onFeedback, _c = _a.upPlaceholder, upPlaceholder = _c === void 0 ? "What worked well?" : _c, _d = _a.downPlaceholder, downPlaceholder = _d === void 0 ? "What could be better?" : _d, _e = _a.thanksMessage, thanksMessage = _e === void 0 ? "Thanks for the feedback" : _e, _f = _a.className, className = _f === void 0 ? "" : _f;
    var _g = useState(null), rating = _g[0], setRating = _g[1];
    var _h = useState(""), response = _h[0], setResponse = _h[1];
    var _j = useState(false), submitted = _j[0], setSubmitted = _j[1];
    var containerRef = useRef(null);
    var upInputRef = useRef(null);
    var downInputRef = useRef(null);
    var upTriggerRef = useRef(null);
    var downTriggerRef = useRef(null);
    var reduceMotion = (_b = useReducedMotion()) !== null && _b !== void 0 ? _b : false;
    var pillState = function (which) {
        if (rating === which)
            return "expanded";
        return rating === null ? "idle" : "hidden";
    };
    var reset = function () {
        setRating(null);
        setResponse("");
        setSubmitted(false);
    };
    // Escape steps back to the buttons (and returns focus to the trigger); outside clicks do the same
    var cancel = function (which) {
        reset();
        window.setTimeout(function () { var _a; return (_a = (which === "up" ? upTriggerRef : downTriggerRef).current) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
    };
    // Focus the input whenever a rating opens
    useEffect(function () {
        var _a;
        if (!rating || submitted)
            return;
        (_a = (rating === "up" ? upInputRef : downInputRef).current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [rating, submitted]);
    useEffect(function () {
        if (!rating)
            return;
        var onKeyDown = function (event) {
            if (event.key !== "Escape")
                return;
            if (submitted)
                reset();
            else
                cancel(rating);
        };
        var onPointerDown = function (event) {
            var _a;
            if ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))
                return;
            if (submitted)
                reset();
            else
                cancel(rating);
        };
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);
        return function () {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [rating, submitted]);
    // A submitted rating morphs back into the two buttons so the interaction can replay
    useEffect(function () {
        if (!submitted)
            return;
        var id = window.setTimeout(reset, RESET_DELAY);
        return function () { return window.clearTimeout(id); };
    }, [submitted]);
    var handleSubmit = function () {
        if (!rating || submitted)
            return;
        onFeedback === null || onFeedback === void 0 ? void 0 : onFeedback({ rating: rating, response: response.trim() });
        setSubmitted(true);
    };
    var open = function (which) {
        var _a;
        if (submitted)
            return;
        if (rating === which) {
            (_a = (which === "up" ? upInputRef : downInputRef).current) === null || _a === void 0 ? void 0 : _a.focus();
            return;
        }
        setRating(which);
    };
    return (_jsxs("div", { ref: containerRef, className: "relative flex items-center justify-center gap-2 ".concat(className), children: [_jsx(RatingPill, { which: "up", state: pillState("up"), submitted: submitted, response: response, placeholder: upPlaceholder, thanksMessage: thanksMessage, reduceMotion: reduceMotion, inputRef: upInputRef, triggerRef: upTriggerRef, onOpen: function () { return open("up"); }, onQueryChange: setResponse, onSubmit: handleSubmit }), _jsx(RatingPill, { which: "down", state: pillState("down"), submitted: submitted, response: response, placeholder: downPlaceholder, thanksMessage: thanksMessage, reduceMotion: reduceMotion, inputRef: downInputRef, triggerRef: downTriggerRef, onOpen: function () { return open("down"); }, onQueryChange: setResponse, onSubmit: handleSubmit })] }));
}
//# sourceMappingURL=FeedbackMorph.js.map