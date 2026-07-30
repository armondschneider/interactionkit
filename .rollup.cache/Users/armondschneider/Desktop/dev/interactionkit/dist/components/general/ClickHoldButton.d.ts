import React from "react";
type Props = {
    onConfirm?: () => void;
    duration?: number;
    children?: React.ReactNode;
    className?: string;
};
export default function ClickHoldButton({ onConfirm, duration, children, className }: Props): import("react/jsx-runtime").JSX.Element;
export {};
