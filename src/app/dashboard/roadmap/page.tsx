"use client";

import EmptyRoadmapState from "@/components/Roadmaps/components/EmptyRoadmapState";
import RoadmapDetails from "@/components/Roadmaps/RoadmapDetails";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import RoadmapHistory from "@/components/Roadmaps/RoadmapHistory";
import { useAuth } from "@/context/AuthContext";
import { Roadmap } from "@/utils/interfaces";
import RoadmapHeroSection from "@/components/Roadmaps/RoadmapHeroSection";
import RoadmapGeneratorSection from "@/components/Roadmaps/components/RoadmapGeneratorSection";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const MyRoadmaps = () => {
    const { user } = useAuth();
    const limit = 3;

    const [query, setQuery] = useState("");
    const [duration, setDuration] = useState("");
    const [hours, setHours] = useState("");
    const [currentLevel, setCurrentLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [roadmap, setRoadmap] = useState<Roadmap>();
    const [roadmapCount, setRoadmapCount] = useState<number>(0);

    const detailsRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async () => {
        if (!query || !duration || !hours) return;
        setLoading(true);

        try {
            const res = await axios.post("/api/roadmaps", {
                userId: user?.uid,
                userEmail: user?.email,
                query,
                duration,
                hours,
                currentLevel,
            });

            const newRoadmap = res.data.roadmap;
            setRoadmap(newRoadmap);
            setQuery("");

            console.log(newRoadmap);
        } catch (err) {
            console.error("Generation Error:", err);
            setLoading(false);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const handleViewRoadmap = (selectedRoadmap: Roadmap) => {
        setRoadmap(selectedRoadmap);
    };

    useEffect(() => {
        if (!roadmap) return;
        detailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [roadmap]);

    return (
        <div className="relative min-h-screen">
            {/* ================= LOADING OVERLAY ================= */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl"
                    >
                        <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-8">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </div>
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-center"
                        >
                            <h2 className="text-2xl font-bold text-white mb-2 tracking-tighter">
                                ARCHITECTING YOUR PATH
                            </h2>
                            <p className="text-slate-400 text-sm font-mono uppercase tracking-[0.3em]">
                                Analyzing {query || "Requirements"}...
                            </p>
                        </motion.div>

                        {/* Background Decorative Element */}
                        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.15)_0%,transparent_70%)]" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-10">
                <div className="mesh-gradient flex flex-col items-center">
                    <main className="w-full max-w-5xl px-6 py-12 flex flex-col items-center">
                        {/* Hero Section */}
                        <RoadmapHeroSection />

                        {/* Generator */}
                        <RoadmapGeneratorSection
                            query={query}
                            setQuery={setQuery}
                            currentLevel={currentLevel}
                            setCurrentLevel={setCurrentLevel}
                            hours={hours}
                            setHours={setHours}
                            duration={duration}
                            setDuration={setDuration}
                            handleGenerate={handleGenerate}
                            loading={loading}
                        />
                    </main>
                </div>

                <section className="px-6 pb-20">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-2">
                                My Created
                                <span className="text-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-orange-400 after:to-primary">
                                    Roadmaps
                                </span>
                            </h2>

                            {/* Roadmap Count Badge */}
                            <span className="inline-block bg-white/10 text-white/90 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                                {roadmapCount !== 0
                                    ? `${roadmapCount}/${limit}`
                                    : "No Roadmaps Yet"}
                            </span>
                        </div>

                        {/* Roadmap History Grid */}
                        <RoadmapHistory
                            onViewRoadmap={handleViewRoadmap}
                            setRoadmapCount={setRoadmapCount}
                        />
                    </div>
                </section>

                {/* Result Section */}
                <div id="roadmap-result" className=" w-full pt-10 ">
                    {roadmap ? (
                        <motion.div
                            ref={detailsRef}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                        >
                            <RoadmapDetails
                                key={roadmap?.skill}
                                roadmap={roadmap}
                            />
                        </motion.div>
                    ) : (
                        <EmptyRoadmapState />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyRoadmaps;
