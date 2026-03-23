"use client";
import React from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const statData = [
    {
        label: "Roadmaps Generated",
        value: "124K+",
        description: "Personalized AI career paths",
        color: "var(--accent-cyan)",
    },
    {
        label: "Interviews Attempted",
        value: "85K+",
        description: "Realistic technical simulations",
        color: "var(--primary)",
    },
    {
        label: "Total Users",
        value: "50K+",
        description: "Active career climbers",
        color: "var(--accent-purple)",
    },
    {
        label: "AI Questions Generated",
        value: "1.2M+",
        description: "Quizzes & deep question banks",
        color: "#ec5b13",
    },
];

const Stats = () => {
    return (
        <section className="relative py-24 px-6 bg-background overflow-hidden">
            {/* 1. SECTION HEADER */}
            <div className="max-w-7xl mx-auto mb-16 text-center lg:text-left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-6 border-glass-border shadow-none"
                >
                    <Activity className="w-4 h-4 text-orange-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.3em] text-foreground/60 dark:text-gray-400 uppercase">
                        Real-Time Platform Pulse
                    </span>
                    <div className="flex gap-1 ml-2">
                        <span className="typing-dot bg-foreground/40 dark:bg-white/40" />
                        <span
                            className="typing-dot bg-foreground/40 dark:bg-white/40"
                            style={{ animationDelay: "0.2s" }}
                        />
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-end">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="perspective-1000 text-4xl md:text-6xl font-black text-foreground leading-tight">
                            Fueling the <br />
                            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-accent-cyan bg-clip-text text-transparent rotate-x-12 inline-block">
                                Next Generation
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-foreground/70 dark:text-gray-400 text-lg max-w-md lg:mb-2 font-light leading-relaxed"
                    >
                        Thousands of users use CareerPilot to bridge the gap
                        between their current skills and their dream roles.
                    </motion.p>
                </div>
            </div>

            {/* 2. STATS GRID */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statData.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative group p-8 rounded-2xl glass-card border-glass-border hover:border-primary/50 transition-all duration-500 overflow-hidden"
                        >
                            {/* Corner Accent Glow */}
                            <div
                                className="absolute -top-12 -right-12 w-24 h-24 blur-[80px] opacity-20 dark:opacity-10 group-hover:opacity-40 transition-opacity"
                                style={{ backgroundColor: stat.color }}
                            />

                            {/* Bottom Glow Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] opacity-30 group-hover:opacity-100 transition-opacity">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                                    }}
                                />
                            </div>

                            {/* Stat Content */}
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div
                                        className="w-1.5 h-4 rounded-full"
                                        style={{ backgroundColor: stat.color }}
                                    />
                                    <span className="text-[10px] font-black tracking-widest text-foreground/40 dark:text-gray-500 uppercase">
                                        Metric.0{index + 1}
                                    </span>
                                </div>

                                <h3 className="text-5xl font-black text-foreground mb-2 tracking-tighter group-hover:translate-x-1 transition-transform duration-300">
                                    {stat.value}
                                </h3>

                                <p className="text-sm font-bold text-foreground/80 dark:text-gray-200 mb-1 italic">
                                    {stat.label}
                                </p>

                                <p className="text-xs text-foreground/50 dark:text-gray-500 font-medium">
                                    {stat.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
