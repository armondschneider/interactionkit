"use client";
import { __spreadArray } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { History, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
var defaultPreviousSearches = [
    "spring animation",
    "image modal",
    "emoji picker",
    "hold to delete",
];
var COLLAPSED_WIDTH = 48; // matches size-12 of the icon button
var EXPANDED_WIDTH = 280;
var MAX_RECENTS = 6;
export default function SearchExpand(_a) {
    var _b = _a.previousSearches, previousSearches = _b === void 0 ? defaultPreviousSearches : _b, _c = _a.placeholder, placeholder = _c === void 0 ? "Search interactions…" : _c, onSearch = _a.onSearch, _d = _a.className, className = _d === void 0 ? "" : _d;
    var _e = useState(false), open = _e[0], setOpen = _e[1];
    var _f = useState(""), query = _f[0], setQuery = _f[1];
    var _g = useState(false), dropdownVisible = _g[0], setDropdownVisible = _g[1];
    var _h = useState(previousSearches), recents = _h[0], setRecents = _h[1];
    var containerRef = useRef(null);
    var inputRef = useRef(null);
    var triggerRef = useRef(null);
    var reduceMotion = useReducedMotion();
    var trimmed = query.trim().toLowerCase();
    var matches = trimmed
        ? recents.filter(function (term) { return term.toLowerCase().includes(trimmed); })
        : recents;
    var openSearch = function () {
        setOpen(true);
        setDropdownVisible(true);
    };
    var closeSearch = function () {
        setOpen(false);
        setDropdownVisible(false);
    };
    // Focus the input once the bar has opened
    useEffect(function () {
        var _a;
        if (open)
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [open]);
    // Escape closes (and returns focus to the icon); outside clicks collapse
    useEffect(function () {
        if (!open)
            return;
        var onKeyDown = function (event) {
            if (event.key === "Escape") {
                closeSearch();
                window.setTimeout(function () { var _a; return (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
            }
        };
        var onPointerDown = function (event) {
            var _a;
            if (!((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)))
                closeSearch();
        };
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);
        return function () {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [open]);
    // Move a term to the front of the recents list (deduped, capped)
    var remember = function (term) {
        setRecents(function (current) {
            return __spreadArray([term], current.filter(function (item) { return item !== term; }), true).slice(0, MAX_RECENTS);
        });
    };
    var choose = function (term) {
        var _a;
        setQuery(term);
        remember(term);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(term);
        setDropdownVisible(false);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        var value = query.trim();
        if (!value)
            return;
        remember(value);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(value);
        setDropdownVisible(false);
    };
    return (_jsxs("div", { ref: containerRef, className: "relative ".concat(className), children: [_jsxs(motion.div, { initial: false, animate: { width: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH }, transition: reduceMotion
                    ? { duration: 0.15 }
                    : open
                        ? { type: "spring", stiffness: 420, damping: 34 }
                        : { type: "spring", stiffness: 420, damping: 34, delay: 0.1 }, className: "relative flex h-12 items-center overflow-hidden rounded-full bg-white shadow-[0_5px_12px_rgba(0,0,0,0.04)] dark:bg-neutral-900 dark:shadow-black/20", children: [_jsx("span", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 rounded-full border border-neutral-200 dark:border-neutral-700" }), _jsx(motion.button, { ref: triggerRef, type: "button", onClick: function () { var _a; return (open ? (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus() : openSearch()); }, "aria-label": open ? "Search" : "Open search", "aria-expanded": open, whileHover: reduceMotion ? undefined : { scale: 1.04 }, transition: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 }, className: "grid size-12 shrink-0 cursor-pointer place-items-center rounded-full text-neutral-500 transition-colors hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-white dark:focus-visible:ring-neutral-500", children: _jsx(Search, { size: 18, "aria-hidden": true }) }), _jsx(AnimatePresence, { children: open && (_jsxs(motion.form, { onSubmit: handleSubmit, initial: reduceMotion ? { opacity: 0 } : { opacity: 0, x: -6, filter: "blur(3px)" }, animate: { opacity: 1, x: 0, filter: "blur(0px)" }, exit: reduceMotion ? { opacity: 0 } : { opacity: 0, x: -6, filter: "blur(3px)" }, transition: { duration: 0.16, ease: "easeOut" }, className: "flex min-w-0 flex-1 items-center gap-1 pr-2", children: [_jsx("input", { ref: inputRef, value: query, onChange: function (event) {
                                        setQuery(event.target.value);
                                        setDropdownVisible(true);
                                    }, onFocus: function () { return setDropdownVisible(true); }, placeholder: placeholder, "aria-label": "Search", className: "w-full min-w-0 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500" }), query && (_jsx("button", { type: "button", onClick: function () {
                                        var _a;
                                        setQuery("");
                                        setDropdownVisible(true);
                                        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                                    }, "aria-label": "Clear search", className: "grid size-6 shrink-0 cursor-pointer place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200", children: _jsx(X, { size: 13, "aria-hidden": true }) }))] })) })] }), _jsx(AnimatePresence, { children: open && dropdownVisible && matches.length > 0 && (_jsxs(motion.div, { role: "listbox", "aria-label": "Previous searches", initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }, animate: {
                        opacity: 1,
                        y: 0,
                        transition: reduceMotion
                            ? { duration: 0.15 }
                            : {
                                y: { type: "spring", stiffness: 480, damping: 32, mass: 0.5, delay: 0.12 },
                                opacity: { duration: 0.16, ease: "easeOut", delay: 0.12 },
                            },
                    }, exit: {
                        opacity: 0,
                        y: reduceMotion ? 0 : -8,
                        transition: reduceMotion
                            ? { duration: 0.15 }
                            : {
                                y: { type: "spring", stiffness: 480, damping: 32, mass: 0.5 },
                                opacity: { duration: 0.14, ease: "easeIn" },
                            },
                    }, className: "absolute left-0 top-[calc(100%+8px)] z-50 flex w-[280px] flex-col overflow-hidden rounded-xl border border-neutral-100/80 bg-white p-1.5 shadow-xl dark:border-neutral-700 dark:bg-neutral-900", children: [_jsx("p", { className: "px-2.5 pb-1 pt-1.5 text-[11px] font-medium text-neutral-400 dark:text-neutral-500", children: trimmed ? "Matches" : "Previous searches" }), _jsx("ul", { children: matches.map(function (term) { return (_jsx("li", { children: _jsxs("button", { type: "button", role: "option", "aria-selected": term === query, onClick: function () { return choose(term); }, className: "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-neutral-600 transition-colors duration-150 ease-out hover:bg-neutral-100 focus:outline-none focus-visible:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800", children: [_jsx(History, { size: 14, className: "shrink-0 text-neutral-400 dark:text-neutral-500", "aria-hidden": true }), _jsx("span", { className: "truncate", children: term })] }) }, term)); }) })] })) })] }));
}
//# sourceMappingURL=SearchExpand.js.map