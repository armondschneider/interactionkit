import { type ReactNode } from "react";
type Props = {
    children: ReactNode;
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
    previewClassName?: string;
};
export default function TextHighlight({ children, className, imageSrc, imageAlt, previewClassName, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
