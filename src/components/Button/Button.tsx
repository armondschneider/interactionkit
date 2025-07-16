'use client';
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <motion.button
    {...props}
    whileHover={{ scale: 1.02 }}
    whileTap={{ 
      scale: 0.98,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }}
    transition={{ 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }}
    className={`inline-flex self-auto items-center justify-center bg-gradient-to-b from-black to-gray-800 text-white text-sm rounded-lg px-3 py-2 hover:opacity-80 cursor-pointer ${className}`}
  >
    {children}
  </motion.button>
);

export default Button;