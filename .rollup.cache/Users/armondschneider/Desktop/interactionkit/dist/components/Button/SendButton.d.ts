import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
interface SendButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
    variant?: 'active' | 'disabled';
}
declare const SendButton: React.FC<SendButtonProps>;
export default SendButton;
