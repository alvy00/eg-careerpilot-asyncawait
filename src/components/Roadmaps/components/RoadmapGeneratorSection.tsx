"use client";

import React from "react";
import { RoadmapGeneratorSectionProps } from "@/utils/interfaces";
import ExperienceLevelDropdown from "./ExpDropdown";

const RoadmapGeneratorSection: React.FC<RoadmapGeneratorSectionProps> = ({
    query,
    setQuery,
    currentLevel,
    setCurrentLevel,
    hours,
    setHours,
    duration,
    setDuration,
    handleGenerate,
    loading,
}) => {
    return (
        <section className="w-full">
            <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-8">
                {/* ================= Skill Input ================= */}
                <div className="space-y-2">
                    <label
                        htmlFor="skill"
                        className="block text-xs font-semibold text-slate-300 uppercase tracking-widest"
                    >
                        What do you want to master?
                    </label>

                    <textarea
                        id="skill"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows={3}
                        placeholder="e.g., Become a Frontend Developer with React"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-lg text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none resize-none transition-all"
                    />
                </div>

                {/* ================= Configuration Inputs ================= */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Experience Level */}
                    <ExperienceLevelDropdown
                        currentLevel={currentLevel}
                        setCurrentLevel={setCurrentLevel}
                    />

                    {/* Hours Per Day */}
                    <div className="space-y-2">
                        <label
                            htmlFor="hours"
                            className="text-xs font-semibold text-slate-300 uppercase tracking-widest"
                        >
                            Hours Per Day
                        </label>

                        <input
                            id="hours"
                            type="number"
                            min={1}
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="e.g., 3"
                            className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-slate-200 outline-none focus:border-primary/50"
                        />
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                        <label
                            htmlFor="duration"
                            className="text-xs font-semibold text-slate-300 uppercase tracking-widest"
                        >
                            Duration (Weeks)
                        </label>

                        <input
                            id="duration"
                            type="number"
                            min={1}
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g., 8"
                            className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-slate-200 outline-none focus:border-primary/50"
                        />
                    </div>
                </div>

                {/* ================= CTA ================= */}
                <div className="flex justify-center pt-2">
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="min-w-[200px] bg-primary text-white text-base font-semibold py-3 px-10 rounded-full neon-glow transition-all hover:scale-[1.05] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : "Generate Roadmap"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RoadmapGeneratorSection;
