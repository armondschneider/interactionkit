import React from "react";
type TabItem = {
    label: string;
    content: React.ReactNode;
};
type Props = {
    tabs?: TabItem[];
    className?: string;
};
export default function Tab({ tabs, className }: Props): import("react/jsx-runtime").JSX.Element;
export {};
