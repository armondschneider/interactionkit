'use client';
import { __assign, __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete01Icon } from 'hugeicons-react';
var Button = function (_a) {
    var _b;
    var children = _a.children, _c = _a.variant, variant = _c === void 0 ? 'primary' : _c, _d = _a.className, className = _d === void 0 ? '' : _d, onClick = _a.onClick, props = __rest(_a, ["children", "variant", "className", "onClick"]);
    if (variant === 'delete') {
        var _e = props, deleteLabel = _e.deleteLabel, deletedLabel = _e.deletedLabel, rest = __rest(_e, ["deleteLabel", "deletedLabel"]);
        var _f = useState(false), deleted = _f[0], setDeleted_1 = _f[1];
        var handleClick = function (e) {
            setDeleted_1(true);
            if (onClick)
                onClick(e);
            setTimeout(function () { return setDeleted_1(false); }, 2000);
        };
        return (_jsxs(motion.button, __assign({}, rest, { onClick: handleClick, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 10 } }, transition: { type: 'spring', stiffness: 300, damping: 20 }, className: "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors duration-300 cursor-pointer ".concat(deleted ? 'bg-red-700 hover:bg-red-600' : 'bg-red-500 hover:bg-red-400', " ").concat(className), children: [_jsx(Delete01Icon, { className: "h-4 w-4 mr-1.5 flex-none" }), _jsx("div", { className: "relative overflow-hidden h-5 min-w-[60px]", children: _jsx(AnimatePresence, { initial: false, children: !deleted ? (_jsx(motion.span, { initial: { opacity: 0, filter: 'blur(4px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, exit: { opacity: 0, filter: 'blur(4px)' }, transition: { duration: 0.3 }, className: "absolute inset-0 flex items-center justify-center whitespace-nowrap text-white", children: (_b = deleteLabel !== null && deleteLabel !== void 0 ? deleteLabel : children) !== null && _b !== void 0 ? _b : 'Delete' }, "delete")) : (_jsx(motion.span, { initial: { opacity: 0, filter: 'blur(4px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, exit: { opacity: 0, filter: 'blur(4px)' }, transition: { duration: 0.3 }, className: "absolute inset-0 flex items-center justify-center whitespace-nowrap text-white", children: deletedLabel !== null && deletedLabel !== void 0 ? deletedLabel : 'Deleted' }, "deleted")) }) })] })));
    }
    return (_jsx(motion.button, __assign({}, props, { onClick: onClick, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 10 } }, transition: { type: 'spring', stiffness: 300, damping: 20 }, className: "inline-flex self-auto items-center justify-center bg-gradient-to-b from-black to-gray-800 text-white text-sm rounded-lg px-3 py-2 hover:opacity-80 cursor-pointer ".concat(className), children: children })));
};
export default Button;
//# sourceMappingURL=Button.js.map