import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
type ButtonProps = ComponentProps<typeof motion.button> & {
    children: ReactNode;
    pressSpring?: boolean;
};
type LinkProps = {
    href: string;
    children: ReactNode;
    className?: string;
    variant?: "outline" | "filled";
};
export declare function SpringButton({ children, className, pressSpring, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export declare function SpringLinkButton({ href, children, className, variant }: LinkProps): import("react/jsx-runtime").JSX.Element;
export {};
