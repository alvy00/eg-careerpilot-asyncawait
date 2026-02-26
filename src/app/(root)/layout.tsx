"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import InitialLoader from "@/components/Homepage/InitialLoader";
import gsap from "gsap";

const RootLayout = ({ children }: { children: ReactNode }) => {
    const [showLoader, setShowLoader] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("careerPilotVisited");

        if (!hasVisited) {
            setShowLoader(true);
            sessionStorage.setItem("careerPilotVisited", "true");

            // lock scroll
            document.body.style.overflow = "hidden";
        }
    }, []);

    const handleLoaderComplete = () => {
        // animate content in BEFORE removing loader
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "expo.out",
                onComplete: () => {
                    setShowLoader(false);
                    document.body.style.overflow = "auto";
                },
            },
        );
    };

    return (
        <>
            {/* Page Content */}
            <div
                ref={contentRef}
                style={{ opacity: showLoader ? 0 : 1 }}
                className="min-h-screen"
            >
                {children}
            </div>

            {/* Loader ABOVE content */}
            {showLoader && <InitialLoader onComplete={handleLoaderComplete} />}
        </>
    );
};

export default RootLayout;
