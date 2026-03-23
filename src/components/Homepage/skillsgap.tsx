"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
    BarChart3,
    Focus,
    Search,
    AlertCircle,
    CheckCircle2,
    ChevronRight,
} from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

function ComparisonBar({
    label,
    current,
    target,
}: {
    label: string;
    current: number;
    target: number;
}) {
    const gap = target - current;
    const isCritical = gap > 40;

    return (
        <div className="flex flex-col items-center gap-3 w-full group">
            <div
                className="h-56 w-full 
            bg-foreground/[0.04] 
            border border-glass-border 
            rounded-lg flex items-end overflow-hidden relative"
            >
                {/* Target (ghost bar) */}
                <div
                    className="absolute bottom-0 w-full 
                    bg-foreground/[0.08] 
                    border-t border-glass-border"
                    style={{ height: `${target}%` }}
                />

                {/* Current */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${current}%` }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className={`w-full z-10 ${
                        isCritical ? "bg-orange-500" : "bg-cyan-500"
                    }`}
                />

                {/* Alert */}
                {isCritical && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                        <AlertCircle className="w-3 h-3 text-orange-500 animate-pulse" />
                    </div>
                )}
            </div>

            <span className="text-[9px] font-mono text-foreground/50 tracking-tight uppercase text-center font-bold leading-tight h-6">
                {label}
            </span>
        </div>
    );
}

export default function RoadmapGapAnalyzer() {
    return (
        <section className="py-24 px-6 bg-background overflow-hidden">
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="max-w-6xl mx-auto group relative rounded-2xl glass-card overflow-hidden"
            >
                <div className="grid md:grid-cols-[320px_1fr]">
                    {/* Sidebar */}
                    <div
                        className="p-8 border-r border-glass-border 
                    bg-foreground/[0.02] flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Search className="w-4 h-4 text-orange-500" />
                                <p className="text-[10px] tracking-[0.3em] text-foreground/40 font-black uppercase">
                                    Target // Profile
                                </p>
                            </div>

                            <h4 className="text-foreground font-bold text-lg mb-2">
                                Senior Product Architect
                            </h4>

                            <p className="text-xs text-foreground/60 leading-relaxed mb-8">
                                Analyzing your current signature against
                                industry requirements for this role.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-orange-500 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                                    <AlertCircle className="w-4 h-4" />
                                    <p className="text-[10px] font-bold uppercase tracking-wider">
                                        3 Critical Gaps Identified
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 text-cyan-600 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <p className="text-[10px] font-bold uppercase tracking-wider">
                                        4 Requirements Met
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-primary transition-colors group/link">
                                View Detailed Roadmap
                                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="p-8 md:p-12 bg-foreground/[0.03]">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-lg 
                                bg-background 
                                border border-glass-border 
                                flex items-center justify-center"
                                >
                                    <BarChart3 className="w-5 h-5 text-foreground" />
                                </div>

                                <h3 className="text-xl font-black text-foreground">
                                    Gap{" "}
                                    <span className="text-foreground/40">
                                        Density Analysis
                                    </span>
                                </h3>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-sm bg-cyan-500" />
                                    <span className="text-[9px] text-foreground/40 uppercase font-bold">
                                        You
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-sm bg-foreground/20" />
                                    <span className="text-[9px] text-foreground/40 uppercase font-bold">
                                        Target
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-4 md:gap-6 items-end">
                            <ComparisonBar
                                label="Technical Mastery"
                                current={85}
                                target={95}
                            />
                            <ComparisonBar
                                label="Strategic Planning"
                                current={30}
                                target={80}
                            />
                            <ComparisonBar
                                label="Comm. Skills"
                                current={60}
                                target={75}
                            />
                            <ComparisonBar
                                label="Market Knowledge"
                                current={40}
                                target={90}
                            />
                            <ComparisonBar
                                label="Leadership"
                                current={20}
                                target={85}
                            />
                            <ComparisonBar
                                label="Ops Management"
                                current={55}
                                target={60}
                            />
                            <ComparisonBar
                                label="Risk Analysis"
                                current={70}
                                target={75}
                            />
                        </div>

                        <div className="mt-12 pt-8 border-t border-glass-border">
                            <div className="flex items-center gap-2 mb-2">
                                <Focus className="w-3 h-3 text-orange-500" />
                                <span className="text-[10px] text-foreground/40 uppercase tracking-widest font-black">
                                    Optimization Path
                                </span>
                            </div>

                            <p className="text-xs text-foreground/60 leading-relaxed max-w-2xl">
                                The engine recommends prioritizing{" "}
                                <span className="text-foreground font-bold">
                                    Leadership
                                </span>{" "}
                                and{" "}
                                <span className="text-foreground font-bold">
                                    Market Knowledge
                                </span>
                                —these represent your largest delta between
                                current state and roadmap completion.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
