"use client";

import { useState } from "react";
import { animateSidebar } from "./SidebarAnimation";

export function useSidebarTheme() {
    const [progress, setProgress] = useState(100);

    const playDark = () => {
        animateSidebar(setProgress, true);
    };

    const playLight = () => {
        animateSidebar(setProgress, false);
    };

    return {
        progress,
        playDark,
        playLight,
    };
}