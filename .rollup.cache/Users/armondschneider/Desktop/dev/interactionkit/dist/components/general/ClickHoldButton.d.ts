import { type ReactNode } from "react";
type Props = {
    onConfirm?: () => void;
    duration?: number;
    children?: ReactNode;
    completedLabel?: ReactNode;
    resetAfter?: number;
    className?: string;
};
export default function ClickHoldButton({ onConfirm, duration, children, completedLabel, resetAfter, className, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
