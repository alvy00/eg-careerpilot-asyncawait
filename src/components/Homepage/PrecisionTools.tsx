"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    Brain,
    Calendar,
    TrendingUp,
    Trophy,
    Users,
    Zap,
    ArrowRight,
} from "lucide-react";

const tools = [
    {
        id: 1,
        title: "Smart Roadmaps",
        description:
            "Dynamic learning paths that evolve as you progress and as industry demands shift.",
        icon: Zap,
        color: "#f97316", // Tailwind Orange 500
        size: "md:col-span-2",
    },
    {
        id: 2,
        title: "AI Mentor",
        description:
            "24/7 personal coach that explains complex topics and reviews projects.",
        icon: Brain,
        color: "var(--accent-cyan)",
        size: "md:col-span-1",
    },
    {
        id: 3,
        title: "Skill Gap Analysis",
        description:
            "Compare your skills against real job descriptions to see what's missing.",
        icon: TrendingUp,
        color: "var(--accent-purple)",
        size: "md:col-span-1",
    },
    {
        id: 4,
        title: "Mock Interviews",
        description:
            "Practice technical rounds with AI that provides sentiment & technical feedback.",
        icon: Users,
        color: "#f97316",
        size: "md:col-span-2",
    },
    {
        id: 5,
        title: "Study Planner",
        description:
            "Automated scheduling that fits learning into your busy professional life.",
        icon: Calendar,
        color: "var(--accent-cyan)",
        size: "md:col-span-1",
    },
    {
        id: 6,
        title: "Gamified XP",
        description:
            "Earn rewards and climb leaderboards while mastering technologies.",
        icon: Trophy,
        color: "var(--accent-purple)",
        size: "md:col-span-1",
    },
];

const PrecisionTools = () => {
    return (
        <section className="relative py-32 px-6 overflow-hidden bg-background">
            {/* Background Mesh Decor - Subtle Visibility */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black text-foreground leading-none mb-6">
                            Precision{" "}
                            <span className="text-orange-500">Tools</span>{" "}
                            <br />
                            for Career Growth
                        </h2>
                        <p className="text-foreground/70 dark:text-gray-400 text-lg font-light leading-relaxed">
                            Everything you need to level up your professional
                            life, powered by state-of-the-art LLMs and custom
                            engineering.
                        </p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <div className="w-12 h-[1px] bg-orange-500 self-center" />
                        <span className="text-[10px] font-bold tracking-[0.3em] text-foreground/50 dark:text-gray-500 uppercase">
                            Engineered for Success
                        </span>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`${tool.size} group relative p-6 rounded-2xl glass-card border-glass-border hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5`}
                            >
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/5 dark:via-white/5 to-transparent pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-foreground/[0.03] dark:bg-white/[0.03] border border-glass-border group-hover:scale-110 transition-transform shadow-inner"
                                            style={{ color: tool.color }}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                                            {tool.title}
                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-foreground/60 dark:text-gray-400 leading-relaxed font-normal dark:font-light line-clamp-3 group-hover:text-foreground/80 dark:group-hover:text-gray-200 transition-colors">
                                        {tool.description}
                                    </p>
                                </div>

                                {/* Bottom Glow Line */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div
                                        className="w-full h-full"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)`,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PrecisionTools;
