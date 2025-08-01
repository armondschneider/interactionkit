"use client";

interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
}

const SheetContent = ({ children, className = '' }: SheetContentProps) => {
  return (
    <div className={`flex-1 overflow-y-auto p-6 ${className}`}>
      {children}
    </div>
  );
};

export default SheetContent;
