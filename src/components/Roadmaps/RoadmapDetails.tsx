"use client";

import { useState, useMemo } from "react";
import StatCard from "./components/StatCard";
import ResourcesSection from "../../components/Roadmaps/components/ResourceSection";
import { motion, AnimatePresence } from "framer-motion";

interface RoadmapDetailsProps {
    roadmap: any;
}

export default function RoadmapDetails({ roadmap }: RoadmapDetailsProps) {
    const [completed, setCompleted] = useState<Set<string>>(new Set());
    const [openPhases, setOpenPhases] = useState<Set<number>>(new Set([1]));
    const [openWeeks, setOpenWeeks] = useState<Set<string>>(new Set());

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

    const toggleWeek = (id: string) => {
        const newSet = new Set(openWeeks);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        setOpenWeeks(newSet);
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
        <div className="relative min-h-screen bg-[#030712] overflow-hidden py-12 px-4 sm:px-6">
            {/* BACKGROUND BLUR DECORATIONS */}
            <div className="absolute top-0 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-10 relative z-10">
                {/* HEADER GLASS CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group overflow-hidden bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent italic">
                        {roadmap.skill}
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                        {roadmap.roadmap_summary.goal}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                        <StatCard
                            label="Level"
                            value={roadmap.user_profile.current_level}
                        />
                        <StatCard
                            label="Hours/Day"
                            value={roadmap.user_profile.hours_per_day}
                        />
                        <StatCard
                            label="Weeks"
                            value={roadmap.user_profile.total_weeks}
                        />
                        <StatCard
                            label="Total Est."
                            value={`${roadmap.user_profile.total_estimated_hours}h`}
                        />
                    </div>

                    {/* Progress Bar Container */}
                    <div className="mt-10 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <p className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
                                    Your Mastery
                                </p>
                                <h3 className="text-2xl font-bold text-white">
                                    {progress}% Completed
                                </h3>
                            </div>
                            <span className="text-gray-500 text-sm font-mono">
                                {completed.size}/{totalSubtopics} topics
                            </span>
                        </div>
                        <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* PHASES SECTION */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white/90 px-2 flex items-center gap-3">
                        <span className="w-8 h-px bg-indigo-500/50" />
                        Learning Path
                        <span className="w-8 h-px bg-indigo-500/50" />
                    </h2>

                    {roadmap.phases.map((phase: any) => (
                        <div
                            key={phase.phase_number}
                            className="group bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 shadow-xl overflow-hidden"
                        >
                            {/* Phase Header */}
                            <div
                                className="p-6 cursor-pointer flex justify-between items-center"
                                onClick={() => togglePhase(phase.phase_number)}
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
                                        {phase.phase_number}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                                            {phase.phase_title}
                                        </h2>
                                        <p className="text-indigo-400/70 text-sm font-medium">
                                            ⏱ {phase.duration_weeks} Weeks of
                                            focused learning
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${openPhases.has(phase.phase_number) ? "rotate-180" : ""}`}
                                >
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 4L6 8L10 4"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <AnimatePresence>
                                {openPhases.has(phase.phase_number) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-white/5 px-6 pb-8"
                                    >
                                        {/* Changed from grid to flex-col to stack resources at the bottom */}
                                        <div className="flex flex-col gap-10 mt-8">
                                            {/* TOPICS SECTION */}
                                            <div className="space-y-8">
                                                {phase.topics.map(
                                                    (
                                                        topic: any,
                                                        tIndex: number,
                                                    ) => (
                                                        <div
                                                            key={tIndex}
                                                            className="relative pl-6 border-l border-white/10"
                                                        >
                                                            <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                                                            <h4 className="font-bold text-indigo-300 mb-4 uppercase tracking-wider text-sm">
                                                                {
                                                                    topic.topic_name
                                                                }
                                                            </h4>
                                                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                                                                            <label
                                                                                key={
                                                                                    id
                                                                                }
                                                                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isDone ? "bg-indigo-500/10 border-indigo-500/30" : "bg-white/5 border-white/5 hover:border-white/20"}`}
                                                                            >
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
                                                                                    className="w-5 h-5 rounded-md border-white/20 bg-black/40 accent-indigo-500 transition-all"
                                                                                />
                                                                                <span
                                                                                    className={`text-sm font-medium transition-all ${isDone ? "line-through text-gray-500" : "text-gray-300"}`}
                                                                                >
                                                                                    {
                                                                                        sub
                                                                                    }
                                                                                </span>
                                                                            </label>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>

                                            {/* BOTTOM SECTION: Projects & Resources (Now horizontal or stacked) */}
                                            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                                {/* Phase Projects */}
                                                <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-5 rounded-2xl border border-purple-500/20">
                                                    <h3 className="text-purple-300 font-bold mb-4 flex items-center gap-2">
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        Phase Projects
                                                    </h3>
                                                    <div className="flex flex-col gap-4 w-full">
                                                        {phase
                                                            .projects?.[0] && (
                                                            <div className="bg-white/5 w-full border border-white/20 rounded-xl p-6">
                                                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                                                    <div>
                                                                        <h3 className="text-sm uppercase tracking-wide text-purple-400 mb-1">
                                                                            Phase
                                                                            Project
                                                                        </h3>
                                                                        <h4 className="text-xl font-bold text-white">
                                                                            {
                                                                                phase
                                                                                    .projects[0]
                                                                                    .project_title
                                                                            }
                                                                        </h4>
                                                                        <p className="text-base text-gray-400 mt-2 max-w-4xl">
                                                                            {
                                                                                phase
                                                                                    .projects[0]
                                                                                    .description
                                                                            }
                                                                        </p>
                                                                    </div>

                                                                    <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 whitespace-nowrap border border-indigo-500/30">
                                                                        {
                                                                            phase
                                                                                .projects[0]
                                                                                .estimated_hours
                                                                        }{" "}
                                                                        hrs
                                                                    </span>
                                                                </div>

                                                                {/* Skills Applied */}
                                                                {phase
                                                                    .projects[0]
                                                                    .skills_applied
                                                                    ?.length >
                                                                    0 && (
                                                                    <div className="mt-6 pt-4 border-t border-white/5">
                                                                        <p className="text-xs text-gray-500 uppercase mb-3 font-semibold">
                                                                            Skills
                                                                            you'll
                                                                            use:
                                                                        </p>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {phase.projects[0].skills_applied.map(
                                                                                (
                                                                                    skill: string,
                                                                                    i: number,
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                        className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 border border-white/5"
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
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Resources Section */}
                                                <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                                                    <ResourcesSection
                                                        resources={
                                                            phase.resources
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* FINAL CAPSTONE - Extra Glassy Glow */}
                {roadmap.final_capstone_project && (
                    <div className="relative group p-[1px] rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 animate-gradient-xy opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative bg-[#0b0f1a] backdrop-blur-3xl rounded-[23px] p-8 border border-white/10">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                                    🏆
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl font-black text-amber-400 uppercase tracking-tighter italic">
                                        Final Capstone
                                    </h2>
                                    <h3 className="text-xl font-bold text-white mt-1">
                                        {roadmap.final_capstone_project.title}
                                    </h3>
                                    <p className="text-gray-400 mt-2 max-w-2xl">
                                        {
                                            roadmap.final_capstone_project
                                                .description
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
