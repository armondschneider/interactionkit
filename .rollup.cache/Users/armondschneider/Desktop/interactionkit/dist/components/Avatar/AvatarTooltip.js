"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "./Avatar";
var AvatarTooltip = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? "image" : _b, src = _a.src, _c = _a.initials, initials = _c === void 0 ? "--" : _c, _d = _a.alt, alt = _d === void 0 ? "Profile avatar" : _d;
    var _e = useState(false), hovered = _e[0], setHovered = _e[1];
    return (_jsx("div", { className: "inline-block", children: _jsxs("div", { className: "relative", onMouseEnter: function () { return setHovered(true); }, onMouseLeave: function () { return setHovered(false); }, children: [_jsx(Avatar, { src: src, alt: alt, initials: initials, variant: variant }), _jsx(AnimatePresence, { children: hovered && (_jsx(motion.div, { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { type: "spring", stiffness: 300, damping: 20 }, className: "absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-black text-white text-sm rounded-md px-3 py-2 shadow-lg whitespace-nowrap", children: "Account created August 2019" })) })] }) }));
};
export default AvatarTooltip;
//# sourceMappingURL=AvatarTooltip.js.map