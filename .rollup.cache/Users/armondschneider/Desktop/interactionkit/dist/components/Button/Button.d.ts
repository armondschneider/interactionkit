import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    children?: React.ReactNode;
    variant?: 'primary' | 'delete';
    deleteLabel?: string;
    deletedLabel?: string;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
