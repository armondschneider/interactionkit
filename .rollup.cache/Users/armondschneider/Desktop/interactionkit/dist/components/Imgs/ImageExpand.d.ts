type ImageType = {
    src: string;
    alt: string;
};
type ImageStackProps = {
    images: ImageType[];
    className?: string;
};
declare const ImageExpand: ({ images, className, }: ImageStackProps) => import("react/jsx-runtime").JSX.Element;
export default ImageExpand;
