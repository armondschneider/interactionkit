import React from "react";
interface AvatarProps {
    src?: string;
    alt?: string;
    initials?: string;
    variant?: "image" | "initials";
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
