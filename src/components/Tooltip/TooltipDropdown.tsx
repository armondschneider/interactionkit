"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsProps } from 'hugeicons-react';

type TooltipItem = {
  icon?: React.ComponentType<HugeiconsProps>;
  label: string;
  onClick?: () => void;
};

type TooltipDropdownProps = {
  items: TooltipItem[];
  trigger?: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

const TooltipDropdown = ({
  items,
  trigger,
  className = '',
  position = 'bottom'
}: TooltipDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2 left-1/2 transform -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 transform -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 transform -translate-y-1/2';
      case 'bottom':
      default:
        return 'top-full mt-2 left-1/2 transform -translate-x-1/2';
    }
  };

  const getTransformOrigin = () => {
    switch (position) {
      case 'top':
        return 'bottom center';
      case 'left':
        return 'right center';
      case 'right':
        return 'left center';
      case 'bottom':
      default:
        return 'top center';
    }
  };

  const defaultTrigger = (
    <button
      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
      aria-label="More information"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    </button>
  );

  return (
    <div 
      className={`relative inline-block ${className}`} 
      ref={dropdownRef}
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <div>
        {trigger || defaultTrigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute z-50 min-w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden ${getPositionClasses()}`}
            style={{ transformOrigin: getTransformOrigin() }}
            initial={{ 
              scale: 0,
              opacity: 0,
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300,
              mass: 0.8,
            }}
          >
            <div className="py-1">
              {items.map((item, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-sm text-gray-700"
                  onClick={() => {
                    item.onClick?.();
                    closeDropdown();
                  }}
                >
                  {item.icon && (
                    <item.icon size={18} className="text-gray-500" />
                  )}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TooltipDropdown;