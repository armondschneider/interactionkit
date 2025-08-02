"use client";
import { Cancel01Icon } from 'hugeicons-react';

interface SheetHeaderProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const SheetHeader = ({ 
  title, 
  description, 
  children, 
  className = '',
  onClose,
  showCloseButton = true
}: SheetHeaderProps) => {
  return (
    <div className={`border-b border-gray-200 px-6 py-4 relative ${className}`}>
      <div className="pr-12">
        {title && (
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        )}
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
        {children}
      </div>
      
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <Cancel01Icon className="w-5 h-5 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default SheetHeader;
