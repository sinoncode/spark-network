import * as React from "react";

export function LeaderboardOutlineIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* 1st place */}
      <path d="M12 4v3" />
      <path d="M9.5 7h5v7h-5z" />

      {/* 2nd place */}
      <path d="M4 11h5v5H4z" />

      {/* 3rd place */}
      <path d="M15 14h5v4h-5z" />

      {/* Base */}
      <path d="M3 20h18" />
      <path d="M6.5 16v4" />
      <path d="M17.5 18v2" />
      <path d="M12 14v6" />
    </svg>
  );
}

export default LeaderboardOutlineIcon;