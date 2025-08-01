"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface SheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: 'bottom' | 'top' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showHandle?: boolean;
  backdrop?: boolean;
  className?: string;
}

const Sheet = ({ 
  children, 
  isOpen, 
  onClose, 
  position = 'bottom',
  size = 'md',
  showHandle = true,
  backdrop = true,
  className = ''
}: SheetProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getSizeStyles = () => {
    const sizes = {
      sm: position === 'bottom' || position === 'top' ? 'h-1/3' : 'w-1/3',
      md: position === 'bottom' || position === 'top' ? 'h-1/2' : 'w-1/2', 
      lg: position === 'bottom' || position === 'top' ? 'h-2/3' : 'w-2/3',
      xl: position === 'bottom' || position === 'top' ? 'h-5/6' : 'w-5/6',
      full: position === 'bottom' || position === 'top' ? 'h-full' : 'w-full'
    };
    return sizes[size];
  };

  const getPositionStyles = () => {
    const positions = {
      bottom: 'bottom-0 left-0 right-0 rounded-t-3xl',
      top: 'top-0 left-0 right-0 rounded-b-3xl',
      left: 'left-0 top-0 bottom-0 rounded-r-3xl',
      right: 'right-0 top-0 bottom-0 rounded-l-3xl'
    };
    return positions[position];
  };

  const getAnimationVariants = () => {
    const variants = {
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          {backdrop && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleBackdropClick}
            />
          )}

          {/* Sheet */}
          <motion.div
            className={`fixed ${getPositionStyles()} ${getSizeStyles()} bg-white shadow-xl z-50 ${className}`}
            variants={getAnimationVariants()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              mass: 0.8
            }}
          >
            {/* Close Button - Absolute Top Right */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <svg 
                className="w-4 h-4 text-gray-600" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Handle */}
            {showHandle && (position === 'bottom' || position === 'top') && (
              <div className="flex justify-center py-3">
                <div 
                  className="w-12 h-1.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
                  onClick={onClose}
                />
              </div>
            )}

            {showHandle && (position === 'left' || position === 'right') && (
              <div className="flex items-center justify-center h-full absolute top-0 right-2 w-6">
                <div 
                  className="h-12 w-1.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
                  onClick={onClose}
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col h-full overflow-hidden">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Sheet;
