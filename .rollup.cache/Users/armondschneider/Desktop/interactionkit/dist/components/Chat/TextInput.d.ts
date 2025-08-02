import React, { TextareaHTMLAttributes } from 'react';
export interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    variant?: 'default' | 'plain';
}
declare const TextInput: React.FC<TextInputProps>;
export default TextInput;
