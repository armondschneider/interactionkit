import React from "react";
type Props = {
    content: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    side?: "bottom" | "left" | "right";
};
export default function Tooltip({ content, children, className, side }: Props): import("react/jsx-runtime").JSX.Element;
export {};
