"use client";

import React from 'react';

interface SheetTriggerProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  asChild?: boolean;
}

const SheetTrigger = ({ 
  children, 
  onClick, 
  className = '',
  asChild = false 
}: SheetTriggerProps) => {
  if (asChild) {
    // Clone the child element and add the onClick handler
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        onClick();
        if (child.props.onClick) {
          child.props.onClick(e);
        }
      }
    });
  }

  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default SheetTrigger;
