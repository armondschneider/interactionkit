'use client';
import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { ArrowUp01Icon } from 'hugeicons-react';
var SendButton = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'active' : _b, onClick = _a.onClick, _c = _a.className, className = _c === void 0 ? '' : _c, props = __rest(_a, ["variant", "onClick", "className"]);
    return (_jsx(motion.button, __assign({}, props, { onClick: onClick, disabled: variant === 'disabled', whileTap: variant === 'active' ? { scale: 0.95, transition: { type: 'spring', stiffness: 200, damping: 5 } } : undefined, whileHover: variant === 'active' ? { scale: 1.02 } : undefined, transition: { type: 'spring', stiffness: 200, damping: 10 }, className: "inline-flex flex-none items-center justify-center w-8 h-8  rounded-full transition ".concat(variant === 'active' ? 'bg-gradient-to-b from-black to-gray-800 text-white hover:opacity-90 cursor-pointer' : 'bg-gray-400 text-gray-600 cursor-not-allowed', " ").concat(className), children: _jsx(ArrowUp01Icon, { className: "h-5 w-5" }) })));
};
export default SendButton;
//# sourceMappingURL=SendButton.js.map