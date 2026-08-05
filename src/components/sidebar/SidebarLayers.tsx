import SidebarBackground from "./SidebarBackground";
import LiquidMask from "./LiquidMask";

interface SidebarLayersProps {
    dark: boolean;
}

export default function SidebarLayers({
    dark,
}: SidebarLayersProps) {
    return (
        <>
            {/* Gradient */}
            <SidebarBackground />

            {/* Black Overlay */}
            <LiquidMask dark={dark} />
        </>
    );
}