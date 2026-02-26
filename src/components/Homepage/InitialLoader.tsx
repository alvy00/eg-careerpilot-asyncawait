"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function InitialLoader({
    onComplete,
}: {
    onComplete: () => void;
}) {
    const container = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                onComplete: () => onComplete(),
            });

            // Initial states
            tl.set(".loader-text", {
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
            });

            tl.set(".underline", {
                scaleX: 0,
                transformOrigin: "left center",
            });

            tl.set(".loader-overlay", {
                clipPath: "circle(100% at 50% 50%)",
            });

            // 1️⃣ Text cinematic reveal
            tl.to(".loader-text", {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "expo.out",
            });

            // 2️⃣ Elegant underline animation
            tl.to(".underline", {
                scaleX: 1,
                duration: 0.6,
                ease: "power3.out",
            });

            // 3️⃣ Subtle hold
            tl.to({}, { duration: 0.3 });

            // 4️⃣ Screen circular reveal
            tl.to(".loader-overlay", {
                clipPath: "circle(0% at 50% 50%)",
                duration: 1,
                ease: "expo.inOut",
            });
        },
        { scope: container },
    );

    return (
        <div
            ref={container}
            className="loader-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
            <div className="text-center">
                <h2 className="loader-text text-white text-5xl md:text-6xl font-extrabold tracking-tight uppercase">
                    Career Pilot
                </h2>

                <div className="mt-4 h-[2px] w-40 mx-auto bg-white/70 underline" />
            </div>
        </div>
    );
}
