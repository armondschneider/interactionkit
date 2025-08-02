'use client';
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowUp01Icon } from 'hugeicons-react';

interface SendButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'active' | 'disabled';
}

const SendButton: React.FC<SendButtonProps> = ({
  variant = 'active',
  onClick,
  className = '',
  ...props
}) => (
  <motion.button
    {...props}
    onClick={onClick}
    disabled={variant === 'disabled'}
    whileTap={variant === 'active' ? { scale: 0.95, transition: { type: 'spring', stiffness: 200, damping: 5 } } : undefined}
    whileHover={variant === 'active' ? { scale: 1.02 } : undefined}
    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
    className={`inline-flex flex-none items-center justify-center w-8 h-8  rounded-full transition ${variant === 'active' ? 'bg-gradient-to-b from-black to-gray-800 text-white hover:opacity-90 cursor-pointer' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} ${className}`}
  >
    <ArrowUp01Icon className="h-5 w-5" />
  </motion.button>
);

export default SendButton;