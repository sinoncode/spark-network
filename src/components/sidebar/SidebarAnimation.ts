import gsap from "gsap";

export function animateSidebar(
    setter: (value: number) => void,
    dark: boolean
) {
    const obj = {
        progress: dark ? 100 : 0,
    };

    gsap.to(obj, {
        progress: dark ? 0 : 100,

        duration: 1.8,

        ease: "power2.inOut",

        onUpdate: () => {
            setter(obj.progress);
        },
    });
}