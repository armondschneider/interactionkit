"use client";
import { __awaiter, __generator } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
var widths = [
    { label: "Small", value: 240 },
    { label: "Medium", value: 352 },
    { label: "Large", value: 480 },
];
var cardClassName = "overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/20";
function useMeasure() {
    var _a = useState(null), element = _a[0], setElement = _a[1];
    var _b = useState({ width: 0, height: 0 }), bounds = _b[0], setBounds = _b[1];
    var ref = useCallback(function (node) { return setElement(node); }, []);
    useEffect(function () {
        if (!element)
            return;
        var observer = new ResizeObserver(function (_a) {
            var entry = _a[0];
            setBounds({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            });
        });
        observer.observe(element);
        return function () { return observer.disconnect(); };
    }, [element]);
    return [ref, bounds];
}
function CardContent(_a) {
    var isSmall = _a.isSmall, isLarge = _a.isLarge;
    return (_jsx("div", { className: isSmall ? "p-4" : "p-3", children: _jsxs("div", { className: "flex gap-3 max-sm:min-h-0 max-sm:flex-col ".concat(isSmall ? "flex-col" : "flex-row ".concat(isLarge ? "min-h-36" : "min-h-32")), children: [_jsx("div", { className: "relative shrink-0 overflow-hidden rounded-lg max-sm:h-20 max-sm:w-full max-sm:self-auto ".concat(isSmall ? "h-20 w-full" : "h-auto self-stretch ".concat(isLarge ? "w-44" : "w-28")), children: _jsx("img", { src: "https://images.unsplash.com/photo-1787558890812-2c06e387121e?q=80&w=2612&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "A quiet place to pause and breathe", className: "absolute inset-0 size-full object-cover" }) }), _jsxs("div", { className: "min-w-0 self-center", children: [_jsx("h3", { className: "text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100", children: "Breathing a little better." }), _jsx("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: "This morning I left my phone behind and walked until the noise softened. The air felt slower out here, and so did I." })] })] }) }));
}
export default function MaxWidthDemo() {
    var _this = this;
    var _a = useState(widths[1].value), selectedWidth = _a[0], setSelectedWidth = _a[1];
    var _b = useState(widths[1].value), displayedWidth = _b[0], setDisplayedWidth = _b[1];
    var _c = useMeasure(), measureRef = _c[0], bounds = _c[1];
    var contentControls = useAnimationControls();
    var transitionId = useRef(0);
    var prefersReducedMotion = useReducedMotion();
    var isSmall = displayedWidth === widths[0].value;
    var isLarge = displayedWidth === widths[2].value;
    var hasMeasured = bounds.width > 0 && bounds.height > 0;
    var cardAnimation = {
        width: hasMeasured ? bounds.width + 2 : "auto",
        height: hasMeasured ? bounds.height + 2 : "auto",
    };
    var selectWidth = function (width) { return __awaiter(_this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (width === selectedWidth)
                        return [2 /*return*/];
                    setSelectedWidth(width);
                    id = ++transitionId.current;
                    if (prefersReducedMotion) {
                        contentControls.set({ opacity: 1, filter: "blur(0px)" });
                        setDisplayedWidth(width);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, contentControls.start({ opacity: 0.55, filter: "blur(2px)" }, { duration: 0.1, ease: "easeIn" })];
                case 1:
                    _a.sent();
                    if (id !== transitionId.current)
                        return [2 /*return*/];
                    setDisplayedWidth(width);
                    return [4 /*yield*/, new Promise(function (resolve) { return window.setTimeout(resolve, 30); })];
                case 2:
                    _a.sent();
                    if (id !== transitionId.current)
                        return [2 /*return*/];
                    return [4 /*yield*/, contentControls.start({ opacity: 1, filter: "blur(0px)" }, { duration: 0.16, ease: [0.22, 1, 0.36, 1] })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: "flex h-[280px] w-full max-w-[512px] flex-col items-center gap-4 px-4", children: [_jsx("div", { className: "flex gap-1", "aria-label": "Container max width", children: widths.map(function (width) {
                    var isActive = selectedWidth === width.value;
                    return (_jsx(motion.button, { type: "button", "aria-pressed": isActive, onClick: function () { return selectWidth(width.value); }, whileTap: prefersReducedMotion ? undefined : { scale: 0.96 }, transition: { type: "spring", stiffness: 500, damping: 30 }, className: "h-8 min-w-16 cursor-pointer rounded-full px-3 text-[11px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 ".concat(isActive
                            ? "bg-white text-neutral-900 shadow-sm dark:bg-white dark:text-neutral-900"
                            : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"), children: width.label }, width.value));
                }) }), _jsx(motion.article, { initial: false, animate: cardAnimation, transition: prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        width: { duration: 0.32, ease: [0.19, 1, 0.22, 1], delay: 0.03 },
                        height: { duration: 0.32, ease: [0.19, 1, 0.22, 1], delay: 0.03 },
                    }, className: "".concat(cardClassName, " shrink-0"), children: _jsx(motion.div, { ref: measureRef, animate: contentControls, style: { width: displayedWidth - 2 }, children: _jsx(CardContent, { isSmall: isSmall, isLarge: isLarge }) }) })] }));
}
//# sourceMappingURL=MaxWidthDemo.js.map