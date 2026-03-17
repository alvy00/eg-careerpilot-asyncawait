"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
    Mic,
    Timer,
    Gauge,
    MessageSquareText,
    ArrowRight,
    ShieldCheck,
    Terminal,
    Sparkles,
} from "lucide-react";
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

function FeatureIcon({
    icon,
    title,
}: {
    icon: React.ReactNode;
    title: string;
}) {
    return (
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3">
            <div className="text-orange-500">{icon}</div>
            <span className="text-[11px] font-medium text-gray-300 uppercase tracking-wider">
                {title}
            </span>
        </div>
    );
}

export default function MockInterviewFeatureSection() {
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
                                <Mic className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] tracking-[0.3em] text-orange-500 font-black uppercase">
                                    Module // v2.4
                                </p>
                                <h3 className="text-3xl font-black text-white tracking-tight">
                                    Mock Interview{" "}
                                    <span className="text-gray-500">
                                        Practice
                                    </span>
                                </h3>
                            </div>
                        </div>

                        <p className="text-gray-400 max-w-xl leading-relaxed font-light mb-8">
                            Simulate real interview rounds with a timer,
                            difficulty scaling, and feedback that tells you what
                            to fix next. Practice under real constraints to
                            improve speed and clarity.
                        </p>

                        {/* Feature Mini-Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-10">
                            <FeatureIcon
                                icon={<Timer className="w-4 h-4" />}
                                title="Timed Rounds"
                            />
                            <FeatureIcon
                                icon={<Gauge className="w-4 h-4" />}
                                title="Adaptive AI"
                            />
                            <FeatureIcon
                                icon={<MessageSquareText className="w-4 h-4" />}
                                title="Deep Feedback"
                            />
                            <FeatureIcon
                                icon={<ShieldCheck className="w-4 h-4" />}
                                title="STAR Method"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group/btn relative inline-flex items-center gap-3 rounded-xl px-8 py-4 overflow-hidden transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 group-hover/btn:bg-white/10 group-hover/btn:border-white/20 transition-all duration-500 rounded-xl" />
                            <div className="absolute -inset-1 bg-orange-500/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 flex items-center gap-3">
                                <Link href="/dashboard/interview">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 group-hover/btn:text-white transition-colors">
                                        Start Practice Session
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

                {/* Right Preview Card: Readiness Tracker */}
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

                    <div className="relative flex-grow rounded-xl border border-white/5 bg-[#0a0a0a] overflow-hidden p-6 flex flex-col justify-center">
                        {/* Readiness Meter */}
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[10px] font-mono text-orange-500 tracking-widest uppercase">
                                    Readiness_Score
                                </p>
                                <span className="text-xs font-mono text-white">
                                    62%
                                </span>
                            </div>

                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "62%" }}
                                    transition={{
                                        duration: 1,
                                        ease: "circOut",
                                    }}
                                    className="h-full bg-orange-500"
                                />
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <p className="text-[9px] text-gray-500 uppercase mb-1">
                                        Focus Area
                                    </p>
                                    <p className="text-xs text-gray-300 font-light">
                                        System design reasoning + STAR
                                        behavioral answers.
                                    </p>
                                </div>
                                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <p className="text-[9px] text-gray-500 uppercase mb-1">
                                        Last Round
                                    </p>
                                    <p className="text-xs text-gray-300 font-light">
                                        Technical Deep-Dive:{" "}
                                        <span className="text-orange-500">
                                            Passed
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Background Scanner Effect */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                    </div>

                    <div className="mt-4 px-2 flex items-center justify-between">
                        <p className="text-[9px] text-gray-600 font-mono tracking-tighter">
                            ANALYTICS_V_04
                        </p>
                        <Sparkles className="w-3 h-3 text-gray-800" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
