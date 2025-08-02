// plain avatar photo or initials component 
// when importing component into other page, use variant prop to choose between image or initials
"use client";
import React, { useRef, useState } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  variant?: "image" | "initials";
  editable?: boolean;
  onImageChange?: (file: File, previewUrl: string) => void;
  className?: string;
  stroke?: boolean;
  strokeWidth?: number;
  strokeColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  initials = "--", 
  variant = "image", 
  editable = false,
  onImageChange,
  className = "",
  stroke = false,
  strokeWidth = 2,
  strokeColor = "#3b82f6"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleImageClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setCurrentSrc(previewUrl);
      
      if (onImageChange) {
        onImageChange(file, previewUrl);
      }
    }
  };

  if (variant === "image" && currentSrc) {
    return (
      <div className="relative">
        <img
          src={currentSrc}
          alt={alt || initials}
          onClick={handleImageClick}
          className={`w-12 h-12 rounded-full object-cover ${
            stroke 
              ? '' 
              : 'border border-gray-200'
          } ${
            editable ? 'cursor-pointer' : ''
          } ${className}`}
          style={stroke ? {
            border: `${strokeWidth}px solid ${strokeColor}`
          } : undefined}
        />
        {editable && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={editable ? handleImageClick : undefined}
      className={`w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 text-md ${
        stroke 
          ? '' 
          : 'border border-gray-200'
      } ${
        editable ? 'cursor-pointer' : ''
      } ${className}`}
      style={stroke ? {
        border: `${strokeWidth}px solid ${strokeColor}`
      } : undefined}
    >
      {initials}
      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
    </div>
  );
};

export default Avatar; 