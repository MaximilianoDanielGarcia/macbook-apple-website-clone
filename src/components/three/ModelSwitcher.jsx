import { PresentationControls } from "@react-three/drei";
import { useRef } from "react"
import { MacbookModel16 } from "../models/Macbook-16";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MacbookModel14 } from "../models/Macbook-14";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
    if (!group) return;

    group.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, {
                opacity: opacity,
                duration: ANIMATION_DURATION,
                ease: "power2.out"
            });
        }
    });
}

const moveGroup = (group, x) => {
    if (!group) return;

    gsap.to(group.position, { x, duration: ANIMATION_DURATION, ease: "power2.out" });
}

const ModelSwitcher = ({ scale, isMobile }) => {

    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    const showLargeMackbook = scale === 0.08 || scale === 0.05;

    useGSAP(() => {
        moveGroup(largeMacbookRef.current, showLargeMackbook ? 0 : OFFSET_DISTANCE);
        moveGroup(smallMacbookRef.current, showLargeMackbook ? -OFFSET_DISTANCE : 0);

        fadeMeshes(largeMacbookRef.current, showLargeMackbook ? 1 : 0);
        fadeMeshes(smallMacbookRef.current, showLargeMackbook ? 0 : 1);
    }, [scale]);

    const controlsConfig = {
        snap: true,
        speed: 1.5,
        zoom: 1,
        polar: [-Math.PI, Math.PI],
        azimuth: [-Infinity, Infinity],
        config: { mass: 1, tension: 0, friction: 26 }
    }

    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacbookRef}>
                    <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
                </group>
            </PresentationControls>

            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
    )
}

export default ModelSwitcher