'use client';
import { __assign, __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
var TextInput = function (_a) {
    var label = _a.label, _b = _a.variant, variant = _b === void 0 ? 'default' : _b, _c = _a.className, className = _c === void 0 ? '' : _c, props = __rest(_a, ["label", "variant", "className"]);
    var textareaRef = useRef(null);
    var resize = function () {
        var ta = textareaRef.current;
        if (ta) {
            ta.style.height = 'auto';
            ta.style.height = "".concat(ta.scrollHeight, "px");
        }
    };
    useEffect(function () {
        resize();
    }, []);
    var inputClasses = variant === 'plain'
        ? 'flex-grow text-sm px-3 py-2 overflow-hidden resize-none focus:outline-none placeholder-gray-400'
        : 'flex-grow text-sm border border-gray-300 rounded-md px-3 py-2 overflow-hidden resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder-gray-400';
    return (_jsxs("div", { className: "flex items-center w-86 ".concat(className), children: [label && _jsx("label", { className: "mb-1 text-sm font-md text-gray-700", children: label }), _jsx("textarea", __assign({}, props, { ref: textareaRef, onInput: function (e) {
                    resize();
                    if (props.onInput)
                        props.onInput(e);
                }, className: "".concat(inputClasses, " ").concat(className) }))] }));
};
export default TextInput;
//# sourceMappingURL=TextInput.js.map