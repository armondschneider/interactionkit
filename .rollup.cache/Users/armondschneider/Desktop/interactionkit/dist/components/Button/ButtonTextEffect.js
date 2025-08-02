'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy01Icon } from "hugeicons-react";
var ButtonTextEffect = function () {
    var _a = useState(false), copied = _a[0], setCopied = _a[1];
    var handleClick = function () {
        // optional: write to clipboard here if desired
        setCopied(true);
        setTimeout(function () { return setCopied(false); }, 2000);
    };
    return (_jsxs(motion.button, { onClick: handleClick, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 10 } }, transition: { type: 'spring', stiffness: 300, damping: 20 }, className: "inline-flex items-center justify-center bg-gradient-to-b from-black to-gray-800 text-white text-sm rounded-lg px-3 py-2 hover:opacity-80 cursor-pointer", children: [_jsx(Copy01Icon, { className: "h-5 w-5 mr-1 flex-none" }), _jsx("div", { className: "relative overflow-hidden h-6 min-w-[80px]", children: _jsx(AnimatePresence, { children: !copied ? (_jsx(motion.span, { initial: { opacity: 0, filter: 'blur(4px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, exit: { opacity: 0, filter: 'blur(4px)' }, transition: { duration: 0.3 }, className: "absolute inset-0 flex items-center justify-center whitespace-nowrap text-white", children: "Copy Text" }, "copy")) : (_jsx(motion.span, { initial: { opacity: 0, filter: 'blur(4px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, exit: { opacity: 0, filter: 'blur(4px)' }, transition: { duration: 0.3 }, className: "absolute inset-0 flex items-center justify-center whitespace-nowrap text-white", children: "Copied" }, "copied")) }) })] }));
};
export default ButtonTextEffect;
//# sourceMappingURL=ButtonTextEffect.js.map