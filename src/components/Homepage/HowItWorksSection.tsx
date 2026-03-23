"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Map, BrainCircuit, Mic2, HelpCircle } from "lucide-react";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

function StepCard({
    step,
    title,
    desc,
    icon,
    accent = "cyan",
}: {
    step: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
    accent?: "cyan" | "orange" | "purple" | "blue";
}) {
    const accentColors = {
        cyan: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
        orange: "border-orange-500/30 text-orange-400 bg-orange-500/10",
        purple: "border-purple-500/30 text-purple-400 bg-purple-500/10",
        blue: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    };

    return (
        <motion.div
            variants={item}
            whileHover={{ y: -8 }}
            className="group relative rounded-2xl glass-card p-6 flex flex-col h-full transition-all duration-300 overflow-hidden"
        >
            {/* 1. Animated Glow (using your glow-bar logic for the top edge) */}
            <div
                className={`absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity glow-bar ${accentColors[accent].split(" ")[1]}`}
            />

            {/* 2. Step Indicator */}
            <div className="flex items-center justify-between mb-6">
                <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center backdrop-blur-md shadow-lg ${accentColors[accent]}`}
                >
                    {icon}
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
                    {step}
                </span>
            </div>

            {/* 3. Content */}
            <div className="flex-grow">
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-orange-100 transition-colors">
                    {title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {desc}
                </p>
            </div>

            {/* 4. Bottom Detail - Interactive Waveform (using your CSS class) */}
            <div className="mt-8 flex items-center gap-2">
                <div className="flex gap-[2px] items-center h-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-[2px] rounded-full waveform-bar ${accentColors[accent].split(" ")[1]}`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
                <span className="text-[10px] font-medium tracking-wider text-gray-500 uppercase">
                    AI Optimized
                </span>
            </div>
        </motion.div>
    );
}

export default function HowItWorksSection() {
    return (
        <section className="relative py-32 px-6 overflow-hidden bg-background-dark">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center md:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="typing-dot" />
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                            Process
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        The Intelligence{" "}
                        <span className="text-orange-500">Cycle</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
                        From your first goal to your final interview, we
                        automate the hard parts of career growth.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-4 gap-6"
                >
                    <StepCard
                        step="STEP 01"
                        accent="blue"
                        icon={<Map className="w-6 h-6" />}
                        title="Goal Mapping"
                        desc="Select your target role. Gemini API crafts a high-precision roadmap tailored to your specific experience level."
                    />
                    <StepCard
                        step="STEP 02"
                        accent="purple"
                        icon={<BrainCircuit className="w-6 h-6" />}
                        title="Mentor Learning"
                        desc="Don't just read—understand. Use our 24/7 AI Mentor to break down complex topics directly from your roadmap."
                    />
                    <StepCard
                        step="STEP 03"
                        accent="cyan"
                        icon={<HelpCircle className="w-6 h-6" />}
                        title="Active Testing"
                        desc="Validate your progress with AI-generated quizzes and deep-dive question banks for every milestone."
                    />
                    <StepCard
                        step="STEP 04"
                        accent="orange"
                        icon={<Mic2 className="w-6 h-6" />}
                        title="Interview Sim"
                        desc="Experience high-pressure mock interviews. Get instant sentiment analysis and actionable technical feedback."
                    />
                </motion.div>
            </div>
        </section>
    );
}
