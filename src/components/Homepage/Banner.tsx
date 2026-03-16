"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
    // Animation variants for staggered entrance
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    } as const;

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    } as const;

    return (
        <section className="pt-10 relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark mesh-gradient">
            {/* Background Decor */}
            <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] floating" />
            <div
                className="absolute bottom-1/4 -right-10 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[150px] floating"
                style={{ animationDelay: "2s" }}
            />

            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="relative max-w-7xl mx-auto px-6 py-20 text-center z-10"
            >
                {/* Badge */}
                <motion.div
                    variants={fadeInUp}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-glass-border mb-8 pulse-ring"
                >
                    <span className="w-2 h-2 bg-orange-500 rounded-full neon-glow-primary"></span>
                    <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">
                        Next-Gen Career Intelligence
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    variants={fadeInUp}
                    className="perspective-1000 text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight"
                >
                    Your AI-Powered <br />
                    <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-accent-cyan bg-clip-text text-transparent rotate-x-12 inline-block">
                        Career GPS
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={fadeInUp}
                    className="mt-8 max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed font-light"
                >
                    Navigate the modern job market with personalized skill
                    roadmaps,
                    <span className="text-white font-medium">
                        {" "}
                        24/7 AI mentorship
                    </span>
                    , and real-time industry gap analysis.
                </motion.p>

                {/* Actions */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
                >
                    <Link href="/dashboard/roadmap">
                        <button className="relative cursor-pointer group px-10 py-4 rounded-xl font-bold text-white overflow-hidden transition-all hover:scale-[1.03] active:scale-95 shadow-2xl shadow-orange-950/20">
                            <div className="absolute inset-0 bg-orange-600/20 backdrop-blur-xl border border-orange-500/30 group-hover:bg-orange-600/30 group-hover:border-orange-500/60 transition-all rounded-xl" />

                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="absolute top-0 left-0 w-full h-[1px] glow-bar opacity-50" />

                            <span className="relative z-10 flex items-center gap-2 text-orange-50 group-hover:text-white transition-colors">
                                <span className="drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]">
                                    ✨
                                </span>
                                Generate My Roadmap
                            </span>
                        </button>
                    </Link>

                    <Link href="/dashboard/mentor">
                        <button className="group relative cursor-pointer px-10 py-4 rounded-xl font-bold transition-all duration-300 glass-card overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent" />

                            <div className="absolute top-0 right-0 w-8 h-8 bg-accent-cyan/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <span className="relative z-10 flex items-center justify-center gap-2 text-gray-300 group-hover:text-white transition-colors">
                                Try AI Mentor
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="typing-dot bg-accent-cyan" />
                                    <span
                                        className="typing-dot bg-accent-cyan"
                                        style={{ animationDelay: "0.2s" }}
                                    />
                                </div>
                            </span>

                            {/* 4. Bottom Accent: A very thin glow-bar that appears on hover */}
                            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-accent-cyan transition-all duration-500 opacity-50 shadow-[0_0_8px_#22d3ee]" />
                        </button>
                    </Link>
                </motion.div>

                {/* Waveform indicator */}
                <div className="mt-20 flex justify-center items-end gap-1 opacity-30 h-8">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-accent-cyan waveform-bar"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
