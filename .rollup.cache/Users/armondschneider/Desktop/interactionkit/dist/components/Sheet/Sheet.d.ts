interface SheetProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    position?: 'bottom' | 'top' | 'left' | 'right';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showHandle?: boolean;
    showCloseButton?: boolean;
    backdrop?: boolean;
    className?: string;
}
declare const Sheet: ({ children, isOpen, onClose, position, size, showHandle, showCloseButton, backdrop, className }: SheetProps) => import("react").ReactPortal | null;
export default Sheet;
