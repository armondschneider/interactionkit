import { type ReactNode } from "react";
type NotificationRevealProps = {
    title?: string;
    duration?: number;
    position?: "fixed" | "absolute";
    className?: string;
    showTrigger?: boolean;
    autoReveal?: boolean;
    icon?: ReactNode;
    iconClassName?: string;
    onDismiss?: () => void;
};
export default function NotificationReveal({ title, duration, position, className, showTrigger, autoReveal, icon, iconClassName, onDismiss, }: NotificationRevealProps): import("react/jsx-runtime").JSX.Element;
export {};
