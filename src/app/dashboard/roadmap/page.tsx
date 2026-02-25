"use client";

import EmptyRoadmapState from "@/components/Roadmaps/components/EmptyRoadmapState";
import RoadmapDetails from "@/components/Roadmaps/RoadmapDetails";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP Plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const MyRoadmaps = () => {
    const [query, setQuery] = useState("");
    const [duration, setDuration] = useState("");
    const [hours, setHours] = useState("");
    const [currentLevel, setCurrentLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [roadmaps, setRoadmaps] = useState<any[]>([]);

    const detailsRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async () => {
        if (!query || !duration || !hours) return;
        setLoading(true);

        try {
            const res = await axios.post(
                "https://careerpilotasync.vercel.app/api/roadmaps",
                {
                    query,
                    duration,
                    hours,
                    currentLevel,
                },
            );

            const newRoadmap = res.data.roadmap;
            setRoadmaps((prev) => [newRoadmap, ...prev]);
            setQuery("");
        } catch (err) {
            console.error("Generation Error:", err);
            setLoading(false);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    useEffect(() => {
        if (!loading && roadmaps.length > 0) {
            const ctx = gsap.context(() => {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: "#roadmap-result",
                        offsetY: 40,
                        autoKill: true,
                    },
                    ease: "power4.inOut",
                });
            });
            return () => ctx.revert();
        }
    }, [loading, roadmaps]);

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
                        <div className="text-center mb-8 space-y-3">
                            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
                                Generate Your Personalized{" "}
                                <span className="text-primary">Roadmap</span>
                            </h1>
                            <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                                Tell us what you want to learn. Our AI will
                                build a structured learning plan tailored to
                                you.
                            </p>
                        </div>

                        {/* Generator Card */}
                        <div className="w-full glass-panel rounded-2xl p-6 md:p-8 space-y-8">
                            <div className="space-y-3">
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest ml-1">
                                    What do you want to master?
                                </label>
                                <textarea
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-lg text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 transition-all outline-none resize-none"
                                    placeholder="e.g., Become a Frontend Developer with React"
                                    rows={2}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <select
                                    value={currentLevel}
                                    onChange={(e) =>
                                        setCurrentLevel(e.target.value)
                                    }
                                    className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-slate-200 outline-none focus:border-primary/50"
                                >
                                    <option className="bg-black">
                                        Experience Level
                                    </option>
                                    <option
                                        value="Beginner"
                                        className="bg-black"
                                    >
                                        Beginner
                                    </option>
                                    <option
                                        value="Intermediate"
                                        className="bg-black"
                                    >
                                        Intermediate
                                    </option>
                                    <option
                                        value="Advanced"
                                        className="bg-black"
                                    >
                                        Advanced
                                    </option>
                                </select>

                                <input
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    type="number"
                                    placeholder="Hours per day"
                                    className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-slate-200 outline-none"
                                />

                                <input
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                    type="number"
                                    placeholder="Duration (weeks)"
                                    className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-slate-200 outline-none"
                                />
                            </div>

                            <div className="pt-2 text-center">
                                <button
                                    onClick={handleGenerate}
                                    disabled={loading}
                                    className="min-w-50 bg-primary text-white text-base font-semibold py-3 px-10 rounded-full neon-glow hover:scale-[1.05] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Processing..." : "Generate"}
                                </button>
                            </div>
                        </div>

                        {/* Result Section */}
                        <div
                            id="roadmap-result"
                            className="mt-16 w-full scroll-mt-20"
                        >
                            {roadmaps && roadmaps.length > 0 ? (
                                <motion.div
                                    ref={detailsRef}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="border rounded-2xl overflow-hidden bg-white shadow-2xl"
                                >
                                    <RoadmapDetails roadmap={roadmaps[0]} />
                                </motion.div>
                            ) : (
                                <EmptyRoadmapState />
                            )}
                        </div>
                    </main>
                </div>

                <section className="px-6 pb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-4xl font-bold">
                                My Created{" "}
                                <span className="text-primary">Roadmaps</span>
                            </h2>
                            <span className="text-slate-500 text-sm">
                                {roadmaps
                                    ? "1 Roadmap Generated"
                                    : "No Roadmaps Yet"}
                            </span>
                        </div>

                        {roadmaps ? (
                            /* CASE: Roadmap Found */
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {roadmaps?.map((item: any, index: number) => (
                                    <motion.div
                                        key={`${item.skill}-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -6 }}
                                        className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-lg truncate pr-2 text-white">
                                                {item.skill}
                                            </h3>
                                            <span className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-full uppercase font-bold">
                                                {item.user_profile
                                                    ?.current_level || "Level"}
                                            </span>
                                        </div>

                                        <p className="text-sm text-slate-400 mb-6">
                                            Duration:{" "}
                                            {item.user_profile?.total_weeks}{" "}
                                            Weeks
                                        </p>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>Initial Progress</span>
                                                <span>0%</span>
                                            </div>
                                            <div className="w-full bg-white/10 rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full"
                                                    style={{ width: `0%` }}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setRoadmaps(item)}
                                            className="w-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary text-sm font-medium py-2 rounded-lg transition-all text-white cursor-pointer"
                                        >
                                            View Full Details
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            /* CASE: No Roadmaps Found (The "Something Else") */
                            <div className="w-full py-20 glass-panel rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-8 h-8 text-slate-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-slate-300">
                                    Your library is empty
                                </h3>
                                <p className="text-slate-500 text-sm mt-2 max-w-xs">
                                    Generated roadmaps will appear here for you
                                    to track your progress.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MyRoadmaps;
