"use client";

import LiquidMask from "./LiquidMask";

interface Props {
    progress: number;
}

export default function SidebarBackground({
    progress,
}: Props) {
    return (
        <>
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-600 via-indigo-600 to-blue-600" />

            {/* Liquid Black */}
            <div className="absolute inset-0">
                <LiquidMask progress={progress} />
            </div>
        </>
    );
}