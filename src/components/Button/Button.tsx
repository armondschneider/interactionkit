'use client';
import React, { useState } from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: 'primary' | 'delete';
  deleteLabel?: string;
  deletedLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}) => {
  if (variant === 'delete') {
    const { deleteLabel, deletedLabel, ...rest } = props as ButtonProps;
    const [deleted, setDeleted] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setDeleted(true);
      if (onClick) onClick(e);
      setTimeout(() => setDeleted(false), 2000);
    };

    return (
      <motion.button
        {...rest}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors duration-300 cursor-pointer ${
          deleted ? 'bg-red-700 hover:bg-red-600' : 'bg-red-500 hover:bg-red-400'
        } ${className}`}
      >
        <FiTrash2 className="h-4 w-4 mr-1.5 flex-none" />
        <div className="relative overflow-hidden h-5 min-w-[60px]">
          <AnimatePresence initial={false}>
            {!deleted ? (
              <motion.span
                key="delete"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-white"
              >
                {deleteLabel ?? children ?? 'Delete'}
              </motion.span>
            ) : (
              <motion.span
                key="deleted"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-white"
              >
                {deletedLabel ?? 'Deleted'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      {...props}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-flex self-auto items-center justify-center bg-gradient-to-b from-black to-gray-800 text-white text-sm rounded-lg px-3 py-2 hover:opacity-80 cursor-pointer ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;