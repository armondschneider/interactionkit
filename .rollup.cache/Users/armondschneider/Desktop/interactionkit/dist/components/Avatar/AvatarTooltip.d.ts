import React from "react";
interface AvatarTooltipProps {
    variant?: "image" | "initials";
    src?: string;
    initials?: string;
    alt?: string;
}
declare const AvatarTooltip: React.FC<AvatarTooltipProps>;
export default AvatarTooltip;
