"use client";

import React from "react";
import { motion } from "framer-motion";

const mockRoadmaps = [
    {
        id: 1,
        title: "MERN Stack Developer",
        level: "Beginner",
        duration: "12 Weeks",
        progress: 40,
    },
    {
        id: 2,
        title: "Data Structures & Algorithms",
        level: "Intermediate",
        duration: "8 Weeks",
        progress: 65,
    },
    {
        id: 3,
        title: "UI/UX Design",
        level: "Switching Domains",
        duration: "16 Weeks",
        progress: 20,
    },
];

const MyRoadmaps = () => {
    return (
        <div className="space-y-10">
            {/* ================= PREMIUM GENERATOR (UNCHANGED STYLE) ================= */}
            <div className="mesh-gradient flex flex-col items-center">
                <main className="w-full max-w-3xl px-6 py-12 flex flex-col items-center">
                    {/* Hero */}
                    <div className="text-center mb-8 space-y-3">
                        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
                            Generate Your Personalized{" "}
                            <span className="text-primary">Roadmap</span>
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                            Tell us what you want to learn and how much time you
                            can invest. Our AI will build a structured learning
                            plan tailored to you.
                        </p>
                    </div>

                    {/* Generator Card */}
                    <div className="w-full glass-panel rounded-2xl p-6 md:p-8 space-y-8">
                        {/* Skill Input */}
                        <div className="space-y-3">
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest ml-1">
                                What do you want to master?
                            </label>

                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-lg text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none resize-none"
                                placeholder="e.g., Become a Frontend Developer with React"
                                rows={2}
                            />
                        </div>

                        {/* Parameters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-slate-200">
                                <option className="bg-black text-white">
                                    Beginner
                                </option>
                                <option className="bg-black text-white">
                                    Intermediate
                                </option>
                                <option className="bg-black text-white">
                                    Advanced
                                </option>
                            </select>

                            <input
                                type="number"
                                placeholder="Hours per week"
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-slate-200"
                            />

                            <input
                                type="number"
                                placeholder="Duration (weeks)"
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-slate-200"
                            />
                        </div>

                        {/* CTA */}
                        <div className="pt-2 text-center">
                            <button className="min-w-[200px] bg-primary text-white text-base font-semibold py-3 px-6 rounded-full neon-glow hover:scale-[1.02] transition-all cursor-pointer">
                                Generate
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* ================= CREATED ROADMAPS SECTION ================= */}
            <section className="px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-4xl font-bold">
                            My Created{" "}
                            <span className="text-primary">Roadmaps</span>
                        </h2>
                        <span className="text-slate-500 text-sm">
                            {mockRoadmaps.length} Roadmaps
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {mockRoadmaps.map((roadmap) => (
                            <motion.div
                                key={roadmap.id}
                                whileHover={{ y: -6 }}
                                className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-all"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-lg">
                                        {roadmap.title}
                                    </h3>
                                    <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                                        {roadmap.level}
                                    </span>
                                </div>

                                <p className="text-sm text-slate-400 mb-6">
                                    Duration: {roadmap.duration}
                                </p>

                                {/* Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>Progress</span>
                                        <span>{roadmap.progress}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{
                                                width: `${roadmap.progress}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <button className="w-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary text-sm font-medium py-2 rounded-lg transition-all">
                                    View Roadmap
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyRoadmaps;
