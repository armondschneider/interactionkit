"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
export default function ImageModal(_a) {
    var _b;
    var src = _a.src, _c = _a.alt, alt = _c === void 0 ? '' : _c, layoutId = _a.layoutId, _d = _a.className, className = _d === void 0 ? '' : _d;
    var _e = useState(false), open = _e[0], setOpen = _e[1];
    var id = layoutId || "img-modal-".concat(src.slice(-10));
    var image = open ? { src: src, alt: alt } : null;
    var onClose = function () { return setOpen(false); };
    useEffect(function () {
        var onKey = function (e) {
            if (e.key === "Escape")
                onClose();
        };
        if (image)
            document.addEventListener("keydown", onKey);
        return function () { return document.removeEventListener("keydown", onKey); };
    }, [image]);
    useEffect(function () {
        if (!image)
            return;
        var prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return function () {
            document.body.style.overflow = prev;
        };
    }, [image]);
    var closeIfDragged = function (offset, velocity) {
        var threshold = 140;
        var velocityThreshold = 650;
        var didClose = Math.abs(offset.x) > threshold ||
            Math.abs(offset.y) > threshold ||
            Math.abs(velocity.x) > velocityThreshold ||
            Math.abs(velocity.y) > velocityThreshold;
        return didClose;
    };
    var viewTransition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] };
    var mvX = useMotionValue(0);
    var mvY = useMotionValue(0);
    var rotateZ = useTransform(mvX, [-300, 300], [-2.5, 2.5]);
    var rotateX = useTransform(mvY, [-300, 300], [2.5, -2.5]);
    // Reset motion values when modal closes
    useEffect(function () {
        if (!open) {
            mvX.set(0);
            mvY.set(0);
        }
    }, [open, mvX, mvY]);
    return (_jsxs(LayoutGroup, { id: "image-modal-".concat(id), children: [_jsx(motion.button, { layoutId: id, type: "button", onClick: function () { return setOpen(true); }, className: "relative h-48 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-100 transition-shadow hover:shadow-lg dark:bg-neutral-800 sm:h-56 md:h-64 ".concat(className), "aria-label": "Open ".concat(alt), whileHover: { scale: 1.01 }, transition: viewTransition, children: _jsx(Image, { src: src, alt: alt, fill: true, className: "object-cover", sizes: "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px", priority: true }) }), _jsx(AnimatePresence, { children: image && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeOut" }, className: "fixed inset-0 bg-black/40 z-[60] backdrop-blur-md cursor-pointer", onClick: onClose }, "backdrop"), _jsx(motion.div, { className: "pointer-events-none fixed inset-0 z-[70] flex items-center justify-center p-4", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.18, ease: "easeOut" }, children: _jsx(motion.div, { drag: true, style: {
                                    x: mvX,
                                    y: mvY,
                                    rotateZ: rotateZ,
                                    rotateX: rotateX,
                                }, dragConstraints: { top: -90, left: -90, right: 90, bottom: 90 }, dragElastic: 0.22, onDragEnd: function (_, info) {
                                    var shouldClose = closeIfDragged(info.offset, info.velocity);
                                    if (shouldClose) {
                                        animate(mvX, info.offset.x + info.velocity.x * 80, { duration: 0.16, ease: "easeOut" });
                                        animate(mvY, info.offset.y + info.velocity.y * 80, { duration: 0.16, ease: "easeOut" });
                                        setTimeout(function () {
                                            mvX.set(0);
                                            mvY.set(0);
                                            onClose();
                                        }, 160);
                                    }
                                    else {
                                        animate(mvX, 0, { duration: 0.22, ease: [0.22, 1, 0.36, 1] });
                                        animate(mvY, 0, { duration: 0.22, ease: [0.22, 1, 0.36, 1] });
                                    }
                                }, whileDrag: { scale: 1.01 }, className: "pointer-events-auto cursor-grab touch-none [perspective:1200px] [will-change:transform] active:cursor-grabbing", onClick: function (e) { return e.stopPropagation(); }, children: _jsx(motion.div, { layoutId: id, transition: viewTransition, className: "aspect-video w-[min(900px,92vw)] max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-sm dark:bg-neutral-900", children: _jsx("div", { className: "relative h-full w-full bg-neutral-100 dark:bg-neutral-800", children: _jsx(Image, { src: image.src, alt: (_b = image.alt) !== null && _b !== void 0 ? _b : "", fill: true, sizes: "(max-width: 640px) 90vw, 900px", className: "object-cover min-h-full min-w-full bg-transparent select-none cursor-grab active:cursor-grabbing", draggable: false, onDragStart: function (e) { return e.preventDefault(); }, priority: true }) }) }) }) }, "container")] })) })] }));
}
//# sourceMappingURL=ImageModal.js.map