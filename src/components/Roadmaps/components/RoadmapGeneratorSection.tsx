"use client";

import React from "react";
import { RoadmapGeneratorSectionProps } from "@/utils/interfaces";
import ExperienceLevelDropdown from "./ExpDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, CalendarDays, BrainCircuit } from "lucide-react";

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
    // Parent Framer Motion container variants for cascading animations
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <section className="w-full max-w-4xl mx-auto px-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative group"
            >
                {/* Dynamic Decorative Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-orange-500/20 rounded-[2.5rem] blur-3xl opacity-40 group-hover:opacity-75 transition duration-1000 pointer-events-none" />

                {/* NOTE: 'overflow-visible' is used here instead of 'overflow-hidden' 
                  so that absolute-positioned items in our dropdown don't get clipped.
                */}
                <div className="relative bg-card-bg backdrop-blur-2xl border border-card-border rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-visible">
                    <div className="space-y-8">
                        {/* ================= Skill Input Area ================= */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-3"
                        >
                            <div className="flex items-center gap-2">
                                <BrainCircuit className="w-4.5 h-4.5 text-primary animate-pulse" />
                                <label
                                    htmlFor="skill"
                                    className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]"
                                >
                                    Learning Objective
                                </label>
                            </div>

                            <div className="relative group/input">
                                <textarea
                                    id="skill"
                                    disabled={loading}
                                    value={query || ""}
                                    onChange={(e) => setQuery(e.target.value)}
                                    rows={3}
                                    placeholder="Enter any skill, profession, or academic subject (e.g., 'Learn Rust from scratch' or 'Data Science Career Path')..."
                                    className="w-full bg-body-bg/60 border border-card-border/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl px-6 py-5 text-lg text-foreground placeholder:text-muted/60 outline-none resize-none transition-all duration-300 shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
                                />
                                <div className="absolute bottom-4 right-4 pointer-events-none text-muted/30 group-focus-within/input:text-primary/60 transition-colors">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>

                        {/* ================= Configuration Grid ================= */}
                        <motion.div
                            variants={itemVariants}
                            // Added high relative z-index hierarchy so dropdown contents sit on top of lower layout blocks
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 relative z-20"
                        >
                            {/* Dropdown element for experience levels */}
                            <div className="space-y-2 relative z-30">
                                <ExperienceLevelDropdown
                                    currentLevel={currentLevel}
                                    setCurrentLevel={setCurrentLevel}
                                />
                            </div>

                            {/* Dynamic Hours Config */}
                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted/80" />
                                    <label
                                        htmlFor="hours"
                                        className="text-[10px] font-black text-muted uppercase tracking-[0.2em]"
                                    >
                                        Hours Per Day
                                    </label>
                                </div>
                                <input
                                    id="hours"
                                    disabled={loading}
                                    type="number"
                                    min={1}
                                    max={24}
                                    value={hours || ""}
                                    onChange={(e) => setHours(e.target.value)}
                                    placeholder="e.g., 3"
                                    className="w-full bg-body-bg/60 border border-card-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl px-6 py-4 text-sm text-foreground outline-none transition-all duration-300 shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Dynamic Duration Weeks */}
                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-muted/80" />
                                    <label
                                        htmlFor="duration"
                                        className="text-[10px] font-black text-muted uppercase tracking-[0.2em]"
                                    >
                                        Duration (Weeks)
                                    </label>
                                </div>
                                <input
                                    id="duration"
                                    disabled={loading}
                                    type="number"
                                    min={1}
                                    max={52}
                                    value={duration || ""}
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                    placeholder="e.g., 8"
                                    className="w-full bg-body-bg/60 border border-card-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl px-6 py-4 text-sm text-foreground outline-none transition-all duration-300 shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
                                />
                            </div>
                        </motion.div>

                        {/* ================= Call To Action Section ================= */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col items-center gap-4 pt-4 border-t border-card-border/40 relative z-0"
                        >
                            <motion.button
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                onClick={handleGenerate}
                                disabled={loading || !query.trim()}
                                className="relative group/btn min-w-[280px] w-full sm:w-auto overflow-hidden rounded-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {/* Active Interactive Gradient BG */}
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-primary transition-all duration-300 group-hover/btn:opacity-90" />

                                <div className="relative px-10 py-5 flex items-center justify-center gap-3">
                                    <AnimatePresence mode="wait">
                                        {loading ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span className="text-white font-bold uppercase tracking-widest text-sm">
                                                    Processing Intelligence
                                                </span>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="flex items-center gap-3"
                                            >
                                                <span className="text-white font-bold uppercase tracking-widest text-sm">
                                                    Compute Roadmap
                                                </span>
                                                <motion.div
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 1.5,
                                                    }}
                                                >
                                                    <BrainCircuit className="w-4 h-4 text-white" />
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.button>

                            <p className="text-[10px] text-muted/60 font-semibold uppercase tracking-widest flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                Powered by Gemini AI Engine
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default RoadmapGeneratorSection;
