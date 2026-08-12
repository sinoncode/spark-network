import * as React from "react";

export function RewardsOutlineIcon({
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
      {/* Gift box */}
      <path d="M4 10h16v10H4z" />
      <path d="M3 7h18v3H3z" />

      {/* Ribbon */}
      <path d="M12 7v13" />

      {/* Ribbon loops */}
      <path d="M12 7H8.5C7.12 7 6 5.88 6 4.5S7.12 2 8.5 2C10.5 2 12 4.5 12 7Z" />
      <path d="M12 7h3.5C16.88 7 18 5.88 18 4.5S16.88 2 15.5 2C13.5 2 12 4.5 12 7Z" />
    </svg>
  );
}

export default RewardsOutlineIcon;