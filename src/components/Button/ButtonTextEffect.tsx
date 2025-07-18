'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy } from "react-icons/fi";

const ButtonTextEffect: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    // optional: write to clipboard here if desired
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="inline-flex items-center justify-center bg-gradient-to-b from-black to-gray-800 text-white text-sm rounded-lg px-3 py-2 hover:opacity-80 cursor-pointer"
    >
      {/* Copy icon */}
      <FiCopy className="h-5 w-5 mr-1 flex-none" />

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
    </motion.button>
  );
};

export default ButtonTextEffect;
