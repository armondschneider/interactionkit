"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
var expandedOffsets = [
    { x: -96, y: -54 },
    { x: 96, y: -54 },
    { x: -78, y: 54 },
    { x: 78, y: 54 },
];
function rotationForIndex(index, expanded) {
    var _a;
    if (expanded === void 0) { expanded = false; }
    var rotations = [-10, 7, -4, 11];
    var base = (_a = rotations[index]) !== null && _a !== void 0 ? _a : 0;
    return expanded ? base * 1.2 : base * 0.7;
}
export default function MultipleImageExpand(_a) {
    var images = _a.images, _b = _a.className, className = _b === void 0 ? "" : _b;
    var _c = useState(false), isExpanded = _c[0], setIsExpanded = _c[1];
    var rotations = useMemo(function () { return images.map(function (_, index) { return ({ collapsed: rotationForIndex(index), expanded: rotationForIndex(index, true) }); }); }, [images]);
    return (_jsx("div", { className: "relative flex justify-center ".concat(className), children: _jsx("div", { className: "relative h-[260px] w-[440px]", children: images.map(function (image, index) {
                var _a;
                var offset = isExpanded ? (_a = expandedOffsets[index]) !== null && _a !== void 0 ? _a : { x: 0, y: 0 } : { x: 0, y: index * 13 };
                return (_jsx(motion.button, { type: "button", "aria-label": "".concat(isExpanded ? "Collapse" : "Expand", " image stack"), "aria-pressed": isExpanded, className: "absolute left-1/2 top-1/2 h-[126px] w-[190px] origin-center -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-xl border-[3px] border-white bg-white p-0 shadow-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-300", animate: {
                        x: offset.x,
                        y: offset.y,
                        rotate: isExpanded ? rotations[index].expanded : rotations[index].collapsed,
                        scale: isExpanded ? 1.015 : 1,
                        zIndex: isExpanded ? 20 + index : 10 + index,
                    }, whileHover: { scale: isExpanded ? 1.04 : 1.025 }, whileTap: { scale: 0.98 }, transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.75 }, onClick: function () { return setIsExpanded(function (value) { return !value; }); }, children: _jsx(Image, { src: image.src, alt: image.alt, fill: true, sizes: "190px", className: "object-cover", priority: true }) }, image.src));
            }) }) }));
}
//# sourceMappingURL=MultipleImageExpand.js.map