"use client";

import { useState, useMemo } from "react";
import StatCard from "./components/StatCard";
import ResourcesSection from "../../components/Roadmaps/components/ResourceSection";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock,
    ChevronDown,
    Code2,
    Sparkles,
    Layers,
    Check,
    Trophy,
    Target,
} from "lucide-react";

interface RoadmapDetailsProps {
    roadmap: any;
}

// Animation Variants for staggered revealing
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
} as const;

export default function RoadmapDetails({ roadmap }: RoadmapDetailsProps) {
    const [completed, setCompleted] = useState<Set<string>>(new Set());
    const [openPhases, setOpenPhases] = useState<Set<number>>(new Set([1]));

    if (!roadmap) return null;

    const toggleComplete = (id: string) => {
        const newSet = new Set(completed);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        setCompleted(newSet);
    };

    const togglePhase = (num: number) => {
        const newSet = new Set(openPhases);
        newSet.has(num) ? newSet.delete(num) : newSet.add(num);
        setOpenPhases(newSet);
    };

    const totalSubtopics = useMemo(() => {
        return (roadmap?.phases ?? []).reduce((acc: number, phase: any) => {
            return (
                acc +
                (phase.topics ?? []).reduce((topicAcc: number, topic: any) => {
                    return topicAcc + (topic.subtopics?.length ?? 0);
                }, 0)
            );
        }, 0);
    }, [roadmap]);

    const progress = Math.round((completed.size / (totalSubtopics || 1)) * 100);

    return (
        <div className="relative bg-[#030712] overflow-hidden py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
            {/* Animated Background Glows */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-0 -left-24 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-0 -right-24 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="max-w-6xl mx-auto space-y-10 relative z-10">
                {/* Header Glass Card */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="relative group overflow-hidden bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <motion.h1
                        variants={itemVariants}
                        className="flex items-center gap-3 text-3xl sm:text-4xl font-extrabold mb-3 bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent italic"
                    >
                        <Sparkles className="w-8 h-8 text-indigo-400" />
                        {roadmap.skill}
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl"
                    >
                        {roadmap.roadmap_summary?.goal}
                    </motion.p>

                    {/* Stats Grid */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8"
                    >
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <StatCard
                                label="Level"
                                value={roadmap.user_profile.current_level}
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <StatCard
                                label="Hours/Day"
                                value={roadmap.user_profile.hours_per_day}
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <StatCard
                                label="Weeks"
                                value={roadmap.user_profile.total_weeks}
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <StatCard
                                label="Total Est."
                                value={`${roadmap.user_profile.total_estimated_hours}h`}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Progress Bar */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 bg-white/[0.02] border border-white/5 p-5 rounded-2xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex justify-between items-end mb-3 relative z-10">
                            <div>
                                <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-bold">
                                    <Target className="w-4 h-4" />
                                    Your Mastery
                                </p>
                                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                                    {progress}% Completed
                                </h3>
                            </div>
                            <motion.span
                                key={completed.size}
                                initial={{ scale: 1.2, color: "#a855f7" }}
                                animate={{ scale: 1, color: "#6b7280" }}
                                className="text-gray-500 text-sm font-mono"
                            >
                                {completed.size}/{totalSubtopics} topics
                            </motion.span>
                        </div>
                        <div className="w-full bg-black/40 h-3 sm:h-4 rounded-full overflow-hidden border border-white/5 relative z-10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }} // Custom spring-like easing
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative"
                            >
                                {/* Progress bar shimmer effect */}
                                <motion.div
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Phases Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-6"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-xl sm:text-2xl font-bold text-white/90 px-2 flex items-center gap-3"
                    >
                        <span className="w-8 h-px bg-gradient-to-r from-transparent to-indigo-500/50" />
                        Learning Path
                        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-500/50" />
                    </motion.h2>

                    {roadmap.phases.map((phase: any, index: number) => (
                        <motion.div
                            variants={itemVariants}
                            key={phase.phase_number}
                            layout
                            className="group bg-white/[0.02] hover:bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-indigo-500/30 rounded-2xl transition-colors duration-500 shadow-lg overflow-hidden"
                        >
                            {/* Phase Header */}
                            <div
                                className="p-4 sm:p-6 cursor-pointer flex justify-between items-center"
                                onClick={() => togglePhase(phase.phase_number)}
                            >
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.05 }}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg sm:text-xl shadow-[0_0_20px_rgba(99,102,241,0.2)] text-white border border-white/20"
                                    >
                                        {phase.phase_number}
                                    </motion.div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                                            {phase.phase_title}
                                        </h3>
                                        <p className="text-indigo-400/70 text-xs sm:text-sm font-medium flex items-center gap-1 mt-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {phase.duration_weeks} Weeks
                                        </p>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{
                                        rotate: openPhases.has(
                                            phase.phase_number,
                                        )
                                            ? 180
                                            : 0,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20,
                                    }}
                                    className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors"
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </div>

                            <AnimatePresence initial={false}>
                                {openPhases.has(phase.phase_number) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.04, 0.62, 0.23, 0.98],
                                        }}
                                        className="border-t border-white/5"
                                    >
                                        <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4">
                                            <div className="flex flex-col gap-6">
                                                {/* Topics */}
                                                {phase.topics.map(
                                                    (
                                                        topic: any,
                                                        tIndex: number,
                                                    ) => (
                                                        <div
                                                            key={tIndex}
                                                            className="relative pl-5 border-l-2 border-indigo-500/20"
                                                        >
                                                            <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                                                            <h4 className="font-bold text-indigo-300 mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
                                                                {
                                                                    topic.topic_name
                                                                }
                                                            </h4>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                                {topic.subtopics.map(
                                                                    (
                                                                        sub: string,
                                                                        sIndex: number,
                                                                    ) => {
                                                                        const id = `${phase.phase_number}-${tIndex}-${sIndex}`;
                                                                        const isDone =
                                                                            completed.has(
                                                                                id,
                                                                            );

                                                                        return (
                                                                            <motion.label
                                                                                whileHover={{
                                                                                    scale: 1.02,
                                                                                }}
                                                                                whileTap={{
                                                                                    scale: 0.98,
                                                                                }}
                                                                                key={
                                                                                    id
                                                                                }
                                                                                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group/item ${
                                                                                    isDone
                                                                                        ? "bg-indigo-500/10 border-indigo-500/30"
                                                                                        : "bg-white/5 border-white/5 hover:border-white/20"
                                                                                }`}
                                                                            >
                                                                                <div className="relative flex items-center justify-center mt-0.5">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        checked={
                                                                                            isDone
                                                                                        }
                                                                                        onChange={() =>
                                                                                            toggleComplete(
                                                                                                id,
                                                                                            )
                                                                                        }
                                                                                        className="peer w-5 h-5 rounded-md border-2 border-white/20 bg-black/40 appearance-none cursor-pointer checked:bg-indigo-500 checked:border-indigo-500 transition-all"
                                                                                    />
                                                                                    <Check
                                                                                        className={`absolute w-3.5 h-3.5 text-white pointer-events-none transition-transform duration-300 ${isDone ? "scale-100" : "scale-0"}`}
                                                                                    />
                                                                                </div>
                                                                                <span
                                                                                    className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                                                                                        isDone
                                                                                            ? "text-indigo-200/50 line-through"
                                                                                            : "text-gray-300 group-hover/item:text-white"
                                                                                    }`}
                                                                                >
                                                                                    {
                                                                                        sub
                                                                                    }
                                                                                </span>
                                                                            </motion.label>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                    ),
                                                )}

                                                {/* Phase Projects & Resources */}
                                                <div className="grid md:grid-cols-2 gap-4 pt-6 mt-2 border-t border-white/5">
                                                    {/* Phase Projects */}
                                                    <div className="bg-gradient-to-br from-purple-500/5 to-transparent p-5 sm:p-6 rounded-2xl border border-purple-500/20">
                                                        <h3 className="text-purple-300 font-bold mb-4 flex items-center gap-2 text-lg">
                                                            <Code2 className="w-5 h-5" />{" "}
                                                            Phase Projects
                                                        </h3>

                                                        {phase.projects?.map(
                                                            (
                                                                proj: any,
                                                                i: number,
                                                            ) => (
                                                                <motion.div
                                                                    whileHover={{
                                                                        y: -4,
                                                                        backgroundColor:
                                                                            "rgba(255,255,255,0.08)",
                                                                    }}
                                                                    key={i}
                                                                    className="bg-white/5 w-full border border-white/10 rounded-xl p-5 mb-4 transition-all"
                                                                >
                                                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                                                        <div className="flex-1">
                                                                            <h4 className="text-lg font-bold text-white mb-1">
                                                                                {
                                                                                    proj.project_title
                                                                                }
                                                                            </h4>
                                                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                                                {
                                                                                    proj.description
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <span className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap font-medium flex items-center gap-1.5">
                                                                            <Clock className="w-3.5 h-3.5" />{" "}
                                                                            {
                                                                                proj.estimated_hours
                                                                            }{" "}
                                                                            hrs
                                                                        </span>
                                                                    </div>

                                                                    {proj
                                                                        .key_features
                                                                        ?.length >
                                                                        0 && (
                                                                        <div className="mt-5">
                                                                            <h5 className="text-xs font-bold text-purple-400/80 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                                                                                <Sparkles className="w-3.5 h-3.5" />{" "}
                                                                                Key
                                                                                Features
                                                                            </h5>
                                                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300 text-sm">
                                                                                {proj.key_features.map(
                                                                                    (
                                                                                        feature: string,
                                                                                        fIndex: number,
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                fIndex
                                                                                            }
                                                                                            className="flex items-start gap-2"
                                                                                        >
                                                                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                                                                                            {
                                                                                                feature
                                                                                            }
                                                                                        </li>
                                                                                    ),
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )}

                                                                    {proj
                                                                        .skills_applied
                                                                        ?.length >
                                                                        0 && (
                                                                        <div className="mt-5 pt-4 border-t border-white/5">
                                                                            <h5 className="text-xs font-bold text-indigo-400/80 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                                                                                <Layers className="w-3.5 h-3.5" />{" "}
                                                                                Skills
                                                                                Applied
                                                                            </h5>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {proj.skills_applied.map(
                                                                                    (
                                                                                        skill: string,
                                                                                        sIndex: number,
                                                                                    ) => (
                                                                                        <span
                                                                                            key={
                                                                                                sIndex
                                                                                            }
                                                                                            className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-colors cursor-default"
                                                                                        >
                                                                                            {
                                                                                                skill
                                                                                            }
                                                                                        </span>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </motion.div>
                                                            ),
                                                        )}
                                                    </div>

                                                    <div className="bg-white/[0.02] p-5 sm:p-6 rounded-2xl border border-white/5 h-fit">
                                                        <ResourcesSection
                                                            resources={
                                                                phase.resources
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Final Capstone */}
                {roadmap.final_capstone_project && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative group p-[1px] rounded-3xl overflow-hidden mt-12"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#f59e0b_360deg)] opacity-20 group-hover:opacity-100 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 opacity-50" />

                        <div className="relative bg-[#0b0f1a]/90 backdrop-blur-3xl rounded-[23px] p-8 sm:p-10 border border-white/10 hover:border-amber-500/30 transition-colors">
                            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
                                <motion.div
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [-5, 5, 0],
                                    }}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.2)] border border-amber-500/20 shrink-0"
                                >
                                    <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                                </motion.div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                        <h2 className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-widest">
                                            Final Capstone
                                        </h2>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                        {roadmap.final_capstone_project.title}
                                    </h3>
                                    <p className="text-gray-400 max-w-2xl text-base sm:text-lg leading-relaxed">
                                        {
                                            roadmap.final_capstone_project
                                                .description
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
