"use client";

import React from "react";

interface LiquidMaskProps {
    progress: number;
}

export default function LiquidMask({
    progress,
}: LiquidMaskProps) {
    const height = 100 - progress;

    return (
        <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
        >
            <path
                fill="#0A0A0A"
                d={`
          M0 100
          L0 ${height}
          C20 ${height + 4}
           40 ${height - 3}
           60 ${height + 5}
          C75 ${height + 2}
           90 ${height - 4}
           100 ${height}
          L100 100
          Z
        `}
            />
        </svg>
    );
}