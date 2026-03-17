"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Route, ArrowRight, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";

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

function Pill({ text }: { text: string }) {
    return (
        <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md backdrop-blur-md">
            {text}
        </span>
    );
}

export default function RoadmapGeneratorFeatureSection() {
    return (
        <section className="py-24 px-6 bg-background-dark overflow-hidden">
            <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-[1fr_400px] items-stretch">
                {/* Left Content Card */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="group relative rounded-2xl glass-panel border-glass-border p-8 md:p-12 overflow-hidden"
                >
                    {/* Subtle Corner Accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-orange-500/5 blur-[50px] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-[0_0_15px_rgba(236,91,19,0.1)]">
                                <Route className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] tracking-[0.3em] text-orange-500 font-black uppercase">
                                    Engine // v1.0
                                </p>
                                <h3 className="text-3xl font-black text-white tracking-tight">
                                    Roadmap{" "}
                                    <span className="text-gray-500">
                                        Generator
                                    </span>
                                </h3>
                            </div>
                        </div>

                        <p className="text-gray-400 max-w-xl leading-relaxed font-light mb-8">
                            Turn your career goals into a clinical execution
                            plan. Our engine maps your current stack against
                            industry demand to build a structured, time-boxed
                            learning trajectory.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-10">
                            <Pill text="Personalized Milestones" />
                            <Pill text="Skill-Gap Mapping" />
                            <Pill text="Weekly Sprints" />
                            <Pill text="Resource Curation" />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group/btn relative inline-flex items-center gap-3 rounded-xl px-8 py-4 overflow-hidden transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 group-hover/btn:bg-white/10 group-hover/btn:border-white/20 transition-all duration-500 rounded-xl" />

                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="absolute -inset-1 bg-orange-500/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 flex items-center gap-3">
                                <Link href="/dashboard/roadmap">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 group-hover/btn:text-white transition-colors">
                                        Generate My Roadmap
                                    </span>
                                </Link>

                                <ArrowRight className="w-4 h-4 text-orange-500 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, transparent, #ec5b13, transparent)",
                                    }}
                                />
                            </div>
                        </motion.button>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: 0.1 }}
                    className="relative rounded-2xl glass-panel border-glass-border p-4 bg-white/[0.02] flex flex-col group overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                        </div>
                        <Terminal className="w-3 h-3 text-gray-600" />
                    </div>

                    <div className="relative flex-grow rounded-xl border border-white/5 bg-[#0a0a0a] overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent">
                            <div className="text-center group-hover:scale-110 transition-transform duration-700">
                                <Sparkles className="w-12 h-12 text-white/5 mx-auto mb-2" />
                                <p className="text-[10px] text-white/10 font-mono tracking-widest uppercase">
                                    Preview_Render.sys
                                </p>
                            </div>
                        </div>

                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
