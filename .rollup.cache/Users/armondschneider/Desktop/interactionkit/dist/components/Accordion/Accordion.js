'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown01Icon, ArrowUp01Icon } from 'hugeicons-react';
var AccordionItemComponent = function (_a) {
    var item = _a.item, isOpen = _a.isOpen, onToggle = _a.onToggle, _b = _a.isLast, isLast = _b === void 0 ? false : _b;
    return (_jsxs("div", { className: "".concat(!isLast ? 'border-b border-gray-200' : ''), children: [_jsxs("button", { onClick: onToggle, className: "w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors duration-200", children: [_jsx("span", { className: "text-sm font-medium text-gray-900", children: item.title }), _jsx(motion.div, { animate: { rotate: isOpen ? 180 : 0 }, transition: { type: 'spring', stiffness: 200, damping: 15 }, className: "flex-shrink-0 ml-4", children: isOpen ? (_jsx(ArrowUp01Icon, { className: "h-5 w-5 text-gray-500" })) : (_jsx(ArrowDown01Icon, { className: "h-5 w-5 text-gray-500" })) })] }), _jsx(AnimatePresence, { initial: false, children: isOpen && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        opacity: { duration: 0.2 }
                    }, className: "overflow-hidden", children: _jsx("div", { className: "pb-4 text-sm text-gray-600", children: item.content }) })) })] }));
};
var Accordion = function (_a) {
    var items = _a.items, _b = _a.allowMultiple, allowMultiple = _b === void 0 ? false : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    var _d = useState(new Set()), openItems = _d[0], setOpenItems = _d[1];
    var toggleItem = function (itemId) {
        setOpenItems(function (prev) {
            var newOpenItems = new Set(prev);
            if (newOpenItems.has(itemId)) {
                // Close the item
                newOpenItems.delete(itemId);
            }
            else {
                // Open the item
                if (!allowMultiple) {
                    // If multiple items aren't allowed, close all others
                    newOpenItems.clear();
                }
                newOpenItems.add(itemId);
            }
            return newOpenItems;
        });
    };
    return (_jsx("div", { className: "bg-white ".concat(className), children: items.map(function (item, index) { return (_jsx(AccordionItemComponent, { item: item, isOpen: openItems.has(item.id), onToggle: function () { return toggleItem(item.id); }, isLast: index === items.length - 1 }, item.id)); }) }));
};
export default Accordion;
//# sourceMappingURL=Accordion.js.map