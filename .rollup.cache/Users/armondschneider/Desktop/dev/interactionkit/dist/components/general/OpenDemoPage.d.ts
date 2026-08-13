import type { ReactNode } from "react";
type Props = {
    title: string;
    description: string;
    sourcePath: string;
    children: ReactNode;
    previewClassName?: string;
};
export default function OpenDemoPage({ title, description, sourcePath, children, previewClassName, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
