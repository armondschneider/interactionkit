"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Cancel01Icon } from 'hugeicons-react';
var Sheet = function (_a) {
    var children = _a.children, isOpen = _a.isOpen, onClose = _a.onClose, _b = _a.position, position = _b === void 0 ? 'bottom' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, _d = _a.showHandle, showHandle = _d === void 0 ? true : _d, _e = _a.showCloseButton, showCloseButton = _e === void 0 ? true : _e, _f = _a.backdrop, backdrop = _f === void 0 ? true : _f, _g = _a.className, className = _g === void 0 ? '' : _g;
    var _h = useState(false), mounted = _h[0], setMounted = _h[1];
    useEffect(function () {
        setMounted(true);
        return function () { return setMounted(false); };
    }, []);
    useEffect(function () {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return function () {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    var getSizeStyles = function () {
        var sizes = {
            sm: position === 'bottom' || position === 'top' ? 'h-1/3' : 'w-1/3',
            md: position === 'bottom' || position === 'top' ? 'h-1/2' : 'w-1/2',
            lg: position === 'bottom' || position === 'top' ? 'h-2/3' : 'w-2/3',
            xl: position === 'bottom' || position === 'top' ? 'h-5/6' : 'w-5/6',
            full: position === 'bottom' || position === 'top' ? 'h-full' : 'w-full'
        };
        return sizes[size];
    };
    var getPositionStyles = function () {
        var positions = {
            bottom: 'bottom-0 left-0 right-0 rounded-t-3xl',
            top: 'top-0 left-0 right-0 rounded-b-3xl',
            left: 'left-0 top-0 bottom-0 rounded-r-3xl',
            right: 'right-0 top-0 bottom-0 rounded-l-3xl'
        };
        return positions[position];
    };
    var getAnimationVariants = function () {
        var variants = {
            bottom: {
                hidden: { y: '100%' },
                visible: { y: 0 }
            },
            top: {
                hidden: { y: '-100%' },
                visible: { y: 0 }
            },
            left: {
                hidden: { x: '-100%' },
                visible: { x: 0 }
            },
            right: {
                hidden: { x: '100%' },
                visible: { x: 0 }
            }
        };
        return variants[position];
    };
    var handleBackdropClick = function (e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    if (!mounted)
        return null;
    return createPortal(_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [backdrop && (_jsx(motion.div, { className: "fixed inset-0 bg-black/50 z-40", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, onClick: handleBackdropClick })), _jsxs(motion.div, { className: "fixed ".concat(getPositionStyles(), " ").concat(getSizeStyles(), " bg-white shadow-xl z-50 ").concat(className), variants: getAnimationVariants(), initial: "hidden", animate: "visible", exit: "hidden", transition: {
                        type: 'spring',
                        damping: 30,
                        stiffness: 300,
                        mass: 0.8
                    }, children: [showCloseButton && (_jsx("button", { onClick: onClose, className: "absolute top-3 right-3 z-10 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors", "aria-label": "Close", children: _jsx(Cancel01Icon, { className: "w-4 h-4 text-gray-600" }) })), showHandle && (position === 'bottom' || position === 'top') && (_jsx("div", { className: "flex justify-center py-3", children: _jsx("div", { className: "w-12 h-1.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors", onClick: onClose }) })), showHandle && (position === 'left' || position === 'right') && (_jsx("div", { className: "flex items-center justify-center h-full absolute top-0 right-2 w-6", children: _jsx("div", { className: "h-12 w-1.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors", onClick: onClose }) })), _jsx("div", { className: "flex flex-col h-full overflow-hidden", children: children })] })] })) }), document.body);
};
export default Sheet;
//# sourceMappingURL=Sheet.js.map