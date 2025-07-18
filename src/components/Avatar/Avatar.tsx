// plain avatar photo or initials component 
// when importing component into other page, use variant prop to choose between image or initials
"use client";
import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  variant?: "image" | "initials";
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, initials = "--", variant = "image" }) => {
  if (variant === "image" && src) {
    return (
      <img
        src={src}
        alt={alt || initials}
        className="w-12 h-12 rounded-full object-cover cursor-pointer border border-gray-200"
      />
    );
  }
  return (
    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 text-md cursor-pointer border border-gray-200">
      {initials}
    </div>
  );
};

export default Avatar; 