interface SheetHeaderProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
    onClose?: () => void;
    showCloseButton?: boolean;
}
declare const SheetHeader: ({ title, description, children, className, onClose, showCloseButton }: SheetHeaderProps) => import("react/jsx-runtime").JSX.Element;
export default SheetHeader;
