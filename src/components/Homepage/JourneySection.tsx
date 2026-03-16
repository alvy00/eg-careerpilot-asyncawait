"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Map, Rocket, ChevronRight } from "lucide-react";

const steps = [
    {
        id: "01",
        icon: <Target className="w-6 h-6" />,
        title: "Define Your Goal",
        description:
            "Specify your target role and companies. Our engine scrapes current industry demand to calibrate your path.",
    },
    {
        id: "02",
        icon: <Map className="w-6 h-6" />,
        title: "Deploy Roadmap",
        description:
            "Receive a data-driven, step-by-step trajectory tailored to your specific technical background and timeline.",
    },
    {
        id: "03",
        icon: <Rocket className="w-6 h-6" />,
        title: "Execute & Land",
        description:
            "Master skill gaps, simulate high-pressure interviews, and convert your roadmap into a signed offer.",
    },
];

export default function JourneySection() {
    return (
        <section className="py-24 px-6 bg-background-dark overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <p className="text-[10px] tracking-[0.3em] text-orange-500 font-black uppercase mb-3">
                        Protocol // Implementation
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                        The Journey to{" "}
                        <span className="text-gray-500">Mastery</span>
                    </h2>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Subtle Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-12" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group relative z-10 glass-panel border-glass-border p-8 rounded-2xl flex flex-col items-start overflow-hidden bg-white/[0.01]"
                        >
                            {/* Step Number Background */}
                            <div className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.02] pointer-events-none group-hover:text-orange-500/[0.03] transition-colors duration-500">
                                {step.id}
                            </div>

                            {/* Icon & ID Badge */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-[0_0_15px_rgba(236,91,19,0.1)] group-hover:shadow-[0_0_25px_rgba(236,91,19,0.2)] transition-all">
                                    {step.icon}
                                </div>
                                <div className="h-[1px] w-8 bg-white/10" />
                                <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                                    Phase_{step.id}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
                                {step.description}
                            </p>

                            {/* Step Footer */}
                            <div className="mt-auto pt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 group-hover:text-white transition-colors">
                                System Initialized{" "}
                                <ChevronRight className="w-3 h-3 text-orange-500" />
                            </div>

                            {/* Hover Bottom Border */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, transparent, #ec5b13, transparent)",
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
