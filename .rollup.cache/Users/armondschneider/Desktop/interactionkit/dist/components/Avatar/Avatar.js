// plain avatar photo or initials component 
// when importing component into other page, use variant prop to choose between image or initials
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
var Avatar = function (_a) {
    var src = _a.src, alt = _a.alt, _b = _a.initials, initials = _b === void 0 ? "--" : _b, _c = _a.variant, variant = _c === void 0 ? "image" : _c;
    if (variant === "image" && src) {
        return (_jsx("img", { src: src, alt: alt || initials, className: "w-12 h-12 rounded-full object-cover cursor-pointer border border-gray-200" }));
    }
    return (_jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 text-md cursor-pointer border border-gray-200", children: initials }));
};
export default Avatar;
//# sourceMappingURL=Avatar.js.map