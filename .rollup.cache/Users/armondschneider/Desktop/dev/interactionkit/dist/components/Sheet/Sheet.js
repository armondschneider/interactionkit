"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
export default function Sheet(_a) {
    var _b;
    var _c = _a.triggerLabel, triggerLabel = _c === void 0 ? "Open sheet" : _c, children = _a.children, title = _a.title, header = _a.header, footer = _a.footer, _d = _a.image, image = _d === void 0 ? null : _d, _e = _a.className, className = _e === void 0 ? "" : _e, _f = _a.triggerClassName, triggerClassName = _f === void 0 ? "" : _f, _g = _a.headerClassName, headerClassName = _g === void 0 ? "" : _g, _h = _a.titleClassName, titleClassName = _h === void 0 ? "" : _h, _j = _a.contentClassName, contentClassName = _j === void 0 ? "" : _j, _k = _a.footerClassName, footerClassName = _k === void 0 ? "" : _k;
    var _l = useState(false), open = _l[0], setOpen = _l[1];
    var sheetRef = useRef(null);
    useEffect(function () {
        var onKey = function (e) {
            if (e.key === "Escape")
                setOpen(false);
        };
        if (open)
            document.addEventListener("keydown", onKey);
        return function () { return document.removeEventListener("keydown", onKey); };
    }, [open]);
    // prevent background scroll when open
    useEffect(function () {
        if (open) {
            var prev_1 = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return function () {
                document.body.style.overflow = prev_1;
            };
        }
    }, [open]);
    return (_jsxs("div", { className: className, children: [_jsx("button", { onClick: function () { return setOpen(true); }, className: "inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 " +
                    triggerClassName, children: triggerLabel }), _jsx(AnimatePresence, { children: open && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: "fixed inset-0 bg-black/40 backdrop-blur-xs z-40", onClick: function () { return setOpen(false); } }, "backdrop"), _jsx(motion.div, { drag: "y", dragConstraints: { top: 0, bottom: 0 }, dragElastic: { top: 0, bottom: 0.5 }, onDragEnd: function (_, info) {
                                // if dragged down more than 10px or velocity is high, close
                                if (info.offset.y > 10 || info.velocity.y > 500) {
                                    setOpen(false);
                                }
                            }, initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" }, transition: { type: "spring", stiffness: 300, damping: 30 }, className: "fixed left-0 right-0 bottom-0 z-50 flex items-end justify-center", children: _jsxs("div", { ref: sheetRef, className: "w-full max-w-xl mx-4 mb-6 bg-white rounded-2xl shadow-xl overflow-hidden relative min-h-[200px]", role: "dialog", "aria-modal": "true", children: [_jsx("button", { onClick: function () { return setOpen(false); }, className: "absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-neutral-100 transition-colors", "aria-label": "Close", children: _jsx(X, { className: "w-5 h-5 text-neutral-600" }) }), _jsx("div", { className: "pt-2 pb-1 flex justify-center cursor-grab active:cursor-grabbing", children: _jsx("div", { className: "w-8 h-1.5 bg-neutral-300 rounded-full" }) }), _jsx("div", { className: "px-4 pt-2 pb-3 " + headerClassName, children: header ? (header) : (_jsxs("div", { className: "flex items-center gap-3", children: [image && (_jsx("div", { className: "w-10 h-10 rounded-md overflow-hidden bg-neutral-100", children: _jsx("img", { src: image.src, alt: (_b = image.alt) !== null && _b !== void 0 ? _b : "", className: "w-full h-full object-cover" }) })), title && (_jsx("div", { className: "text-sm font-medium " + titleClassName, children: title }))] })) }), _jsx("div", { className: "px-4 pb-4 " + contentClassName, children: children !== null && children !== void 0 ? children : (_jsx("div", { className: "text-sm text-neutral-700", children: "This is a bottom sheet. Click outside or press Esc to close." })) }), footer && (_jsx("div", { className: "p-4" + footerClassName, children: footer }))] }) }, "sheet")] })) })] }));
}
//# sourceMappingURL=Sheet.js.map