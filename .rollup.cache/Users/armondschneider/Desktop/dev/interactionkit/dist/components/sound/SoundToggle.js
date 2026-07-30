"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
export default function SoundToggle(_a) {
    var _b = _a.initialOn, initialOn = _b === void 0 ? true : _b, _c = _a.className, className = _c === void 0 ? "" : _c, _d = _a.playSound, playSound = _d === void 0 ? true : _d, onToggle = _a.onToggle;
    var _e = useState(initialOn), on = _e[0], setOn = _e[1];
    var toggle = function () {
        var next = !on;
        setOn(next);
        onToggle === null || onToggle === void 0 ? void 0 : onToggle(next);
        if (playSound) {
            new Audio(next ? "/sounds/toggleon.wav" : "/sounds/toggleoff.wav")
                .play()
                .catch(function () { });
        }
    };
    var label = on ? "Sound on" : "Sound off";
    return (_jsx(motion.button, { "aria-pressed": on, "aria-label": label, title: label, onClick: toggle, whileTap: { scale: 0.9 }, className: "cursor-pointer inline-flex items-center justify-center rounded-full p-1 text-neutral-700 hover:text-neutral-900 ".concat(className), children: _jsx(AnimatePresence, { initial: false, children: _jsx(motion.span, { initial: { opacity: 0, scale: 0.84, rotate: on ? -8 : 8, filter: "blur(2px)" }, animate: { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.84, rotate: on ? 8 : -8, filter: "blur(2px)" }, transition: { type: "spring", stiffness: 700, damping: 32, mass: 0.35 }, className: "inline-flex", children: on ? _jsx(Volume2, { size: 18, "aria-hidden": true }) : _jsx(VolumeX, { size: 18, "aria-hidden": true }) }, on ? "sound-on" : "sound-off") }) }));
}
//# sourceMappingURL=SoundToggle.js.map