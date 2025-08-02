"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
var SheetTrigger = function (_a) {
    var children = _a.children, onClick = _a.onClick, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.asChild, asChild = _c === void 0 ? false : _c;
    if (asChild) {
        // Clone the child element and add the onClick handler
        var child_1 = children;
        return React.cloneElement(child_1, {
            onClick: function (e) {
                onClick();
                if (child_1.props.onClick) {
                    child_1.props.onClick(e);
                }
            }
        });
    }
    return (_jsx("button", { onClick: onClick, className: "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ".concat(className), children: children }));
};
export default SheetTrigger;
//# sourceMappingURL=SheetTrigger.js.map