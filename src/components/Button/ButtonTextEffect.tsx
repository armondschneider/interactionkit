'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy } from "react-icons/fi";
import ButtonPrimary from './Button';

const ButtonTextEffect: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    // Optional: write to clipboard here if desired
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ButtonPrimary onClick={handleClick} className="inline-flex items-center">
      {/* Copy icon */}
      <FiCopy className="h-5 w-5 mr-0.5 flex-none" />

      {/* Animated text */}
      <div className="relative overflow-hidden h-6 min-w-[80px]">
        <AnimatePresence>
          {!copied ? (
            <motion.span
              key="copy"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-white"
            >
              Copy Text
            </motion.span>
          ) : (
            <motion.span
              key="copied"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-white"
            >
              Copied
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </ButtonPrimary>
  );
};

export default ButtonTextEffect;
