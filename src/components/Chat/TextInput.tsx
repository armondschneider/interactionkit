'use client';
import React, { useRef, useEffect, TextareaHTMLAttributes } from 'react';
import SendButton from '../Button/SendButton';

export interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  variant?: 'default' | 'plain';
}

const TextInput: React.FC<TextInputProps> = ({ label, variant = 'default', className = '', ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resize();
  }, []);

  const inputClasses = variant === 'plain'
    ? 'flex-grow text-sm px-3 py-2 overflow-hidden resize-none focus:outline-none placeholder-gray-400'
    : 'flex-grow text-sm border border-gray-300 rounded-md px-3 py-2 overflow-hidden resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder-gray-400';

  return (
    <div className={`flex items-center w-86 ${className}`}>
      {label && <label className="mb-1 text-sm font-md text-gray-700">{label}</label>}
      <textarea
        {...props}
        ref={textareaRef}
        onInput={(e) => {
          resize();
          if (props.onInput) props.onInput(e);
        }}
        className={`${inputClasses} ${className}`}
      />
    </div>
  );
};

export default TextInput;