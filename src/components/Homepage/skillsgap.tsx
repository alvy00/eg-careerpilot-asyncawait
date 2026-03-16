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
            <div className="h-56 w-full bg-white/[0.02] border border-white/5 rounded-lg flex items-end overflow-hidden relative">
                {/* Target Background (Ghost bar) */}
                <div
                    className="absolute bottom-0 w-full bg-white/5 border-t border-white/10"
                    style={{ height: `${target}%` }}
                />

                {/* Current Standing */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${current}%` }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className={`w-full z-10 transition-colors duration-500 ${
                        isCritical ? "bg-orange-500" : "bg-cyan-500"
                    }`}
                />

                {/* Gap Indicator Tag */}
                {isCritical && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                        <AlertCircle className="w-3 h-3 text-orange-500 animate-pulse" />
                    </div>
                )}
            </div>
            <span className="text-[9px] font-mono text-gray-500 tracking-tighter uppercase text-center leading-tight h-6">
                {label}
            </span>
        </div>
    );
}

export default function RoadmapGapAnalyzer() {
    return (
        <section className="py-24 px-6 bg-background-dark overflow-hidden">
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="max-w-6xl mx-auto group relative rounded-2xl glass-panel border-glass-border overflow-hidden"
            >
                <div className="grid md:grid-cols-[320px_1fr] items-stretch">
                    {/* Left Sidebar: Target Analysis */}
                    <div className="p-8 border-r border-white/5 bg-white/[0.01] flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Search className="w-4 h-4 text-orange-500" />
                                <p className="text-[10px] tracking-[0.3em] text-gray-400 font-black uppercase">
                                    Target // Profile
                                </p>
                            </div>

                            <h4 className="text-white font-bold text-lg leading-tight mb-2">
                                Senior Product Architect
                            </h4>
                            <p className="text-xs text-gray-500 font-light leading-relaxed mb-8">
                                Analyzing your current signature against the
                                standard industry requirements for this role.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-orange-500 bg-orange-500/5 border border-orange-500/10 rounded-lg p-3">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p className="text-[10px] font-bold uppercase tracking-wider">
                                        3 Critical Gaps Identified
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 text-cyan-400 bg-cyan-400/5 border border-cyan-400/10 rounded-lg p-3">
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                    <p className="text-[10px] font-bold uppercase tracking-wider">
                                        4 Requirements Met
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-orange-500 transition-colors group/link">
                                View Detailed Roadmap{" "}
                                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Comparison Chart */}
                    <div className="p-8 md:p-12 relative bg-[#0a0a0a]/50">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-white">
                                    <BarChart3 className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-black text-white tracking-tight">
                                    Gap{" "}
                                    <span className="text-gray-500">
                                        Density Analysis
                                    </span>
                                </h3>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-sm bg-cyan-500" />
                                    <span className="text-[9px] text-gray-500 uppercase font-bold">
                                        You
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-sm bg-white/10" />
                                    <span className="text-[9px] text-gray-500 uppercase font-bold">
                                        Target
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-6 items-end">
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

                        <div className="mt-12 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                                <Focus className="w-3 h-3 text-orange-500" />
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                                    Optimization Path
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                                The engine recommends prioritizing{" "}
                                <span className="text-white font-medium">
                                    Leadership
                                </span>{" "}
                                and{" "}
                                <span className="text-white font-medium">
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
