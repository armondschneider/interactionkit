type ImageType = {
    src: string;
    alt: string;
};
type ImageStackProps = {
    images: ImageType[];
    className?: string;
};
export default function MultipleImageExpand({ images, className }: ImageStackProps): import("react/jsx-runtime").JSX.Element;
export {};
