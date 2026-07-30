type ImageProp = {
    src: string;
    alt?: string;
};
type Props = {
    triggerLabel?: string;
    children?: React.ReactNode;
    title?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    image?: ImageProp | null;
    className?: string;
    triggerClassName?: string;
    headerClassName?: string;
    titleClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
};
export default function Sheet({ triggerLabel, children, title, header, footer, image, className, triggerClassName, headerClassName, titleClassName, contentClassName, footerClassName, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
