"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-24 px-6 bg-background-dark relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative rounded-3xl glass-panel border-glass-border p-12 md:p-24 overflow-hidden text-center"
                >
                    {/* Background Technical Grid Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

                    {/* Core Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/10 blur-[120px] pointer-events-none rounded-full group-hover:bg-orange-500/20 transition-colors duration-1000" />

                    <div className="relative z-10">
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                <Zap className="w-3 h-3" /> System Ready
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-none">
                            Ready to take the <br />
                            <span className="text-gray-500">pilot's seat?</span>
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                            Join the next generation of professionals
                            accelerating their careers with autonomous AI
                            guidance. Your roadmap is primed.
                        </p>

                        <div className="flex flex-col items-center gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group/btn relative inline-flex items-center gap-4 rounded-2xl px-12 py-5 overflow-hidden transition-all duration-500"
                            >
                                {/* Button Glass Effect */}
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 group-hover/btn:bg-white/10 group-hover/btn:border-white/20 transition-all duration-500 rounded-2xl" />

                                {/* Button Orange Accent */}
                                <div className="absolute -inset-1 bg-orange-500/20 blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex items-center gap-3">
                                    <Link href="/signup">
                                        <span className="text-xs font-black uppercase tracking-[0.4em] text-white">
                                            Initialize Journey
                                        </span>
                                    </Link>

                                    <ArrowRight className="w-5 h-5 text-orange-500 group-hover/btn:translate-x-2 transition-transform duration-500" />
                                </div>

                                {/* Bottom Line Glow */}
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

                            <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                                <Sparkles className="w-3 h-3" /> 50k+ Engineers
                                Scaled
                            </div>
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-white/10 rounded-tl-3xl pointer-events-none" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/10 rounded-tr-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/10 rounded-bl-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-white/10 rounded-br-3xl pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}
