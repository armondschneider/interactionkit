import React from 'react';
interface SheetTriggerProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    asChild?: boolean;
}
declare const SheetTrigger: ({ children, onClick, className, asChild }: SheetTriggerProps) => import("react/jsx-runtime").JSX.Element;
export default SheetTrigger;
