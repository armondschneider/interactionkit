"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cancel01Icon } from 'hugeicons-react';
var SheetHeader = function (_a) {
    var title = _a.title, description = _a.description, children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, onClose = _a.onClose, _c = _a.showCloseButton, showCloseButton = _c === void 0 ? true : _c;
    return (_jsxs("div", { className: "border-b border-gray-200 px-6 py-4 relative ".concat(className), children: [_jsxs("div", { className: "pr-12", children: [title && (_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: title })), description && (_jsx("p", { className: "text-sm text-gray-600 mt-1", children: description })), children] }), showCloseButton && onClose && (_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors", "aria-label": "Close", children: _jsx(Cancel01Icon, { className: "w-5 h-5 text-gray-500" }) }))] }));
};
export default SheetHeader;
//# sourceMappingURL=SheetHeader.js.map