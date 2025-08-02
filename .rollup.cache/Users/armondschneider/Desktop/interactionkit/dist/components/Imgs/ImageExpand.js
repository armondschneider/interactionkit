"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
// Calculate dimensions for each image based on index
var calculateDimensions = function (index, isExpanded) {
    if (isExpanded) {
        // Expanded dimensions - wider aspect ratios
        switch (index) {
            case 0: return { width: 240, height: 180 };
            case 1: return { width: 260, height: 180 };
            case 2: return { width: 280, height: 160 };
            case 3: return { width: 320, height: 180 };
            default: return { width: 220, height: 180 };
        }
    }
    else {
        return { width: 240, height: 180 }; // Wider collapsed state
    }
};
// calculate offset based on index and expanded state
var calculateOffset = function (index, isExpanded) {
    if (isExpanded) {
        switch (index) {
            case 0: return { x: -120, y: -80 };
            case 1: return { x: 120, y: -110 };
            case 2: return { x: -120, y: 50 };
            case 3: return { x: 120, y: 120 };
            default: return { x: 0, y: 0 };
        }
    }
    else {
        return { x: 0, y: index * 35 };
    }
};
var ImageExpand = function (_a) {
    var images = _a.images, _b = _a.className, className = _b === void 0 ? '' : _b;
    var _c = useState(false), isExpanded = _c[0], setIsExpanded = _c[1];
    // Memoize rotations to prevent them from changing on every render
    var rotations = useMemo(function () {
        return images.map(function (_, index) { return ({
            collapsed: Math.random() * 15 - 5, // Small random rotation when collapsed
            expanded: Math.random() * 25 - 5 // Larger random rotation when expanded
        }); });
    }, [images]);
    var toggleExpand = function () {
        setIsExpanded(!isExpanded);
    };
    return (_jsx("div", { className: "relative flex justify-center ".concat(className), children: _jsx("div", { className: "relative", style: {
                height: isExpanded ? '400px' : '200px',
                width: isExpanded ? '800px' : '260px',
                transition: 'all 0.5s ease-in-out'
            }, children: _jsx(AnimatePresence, { children: images.map(function (image, index) {
                    var dimensions = calculateDimensions(index, isExpanded);
                    var offset = calculateOffset(index, isExpanded);
                    var rotation = isExpanded ? rotations[index].expanded : rotations[index].collapsed;
                    return (_jsx(motion.div, { className: "absolute rounded-3xl overflow-hidden bg-white border-4 border-white cursor-pointer", style: {
                            zIndex: 20 + index,
                            width: dimensions.width,
                            height: dimensions.height,
                            left: '50%',
                            top: '50%',
                            transformOrigin: 'center center',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
                        }, onClick: toggleExpand, initial: false, animate: {
                            x: offset.x - dimensions.width / 2,
                            y: offset.y - dimensions.height / 2,
                            rotate: rotation,
                            width: dimensions.width,
                            height: dimensions.height,
                        }, transition: {
                            type: 'spring',
                            damping: 25,
                            stiffness: 200,
                            mass: 1.2,
                            bounce: 0.8,
                        }, children: _jsx(Image, { src: image.src, alt: image.alt, width: dimensions.width, height: dimensions.height, className: "w-full h-full object-cover", priority: true }) }, image.src));
                }) }) }) }));
};
export default ImageExpand;
//# sourceMappingURL=ImageExpand.js.map