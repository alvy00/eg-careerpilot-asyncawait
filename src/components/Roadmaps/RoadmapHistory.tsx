"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Roadmap } from "@/utils/interfaces";

interface RoadmapHistoryProps {
    onViewRoadmap: (roadmap: Roadmap) => void;
    setRoadmapCount: (count: number) => void;
}

const RoadmapHistory = ({
    onViewRoadmap,
    setRoadmapCount,
}: RoadmapHistoryProps) => {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

    const {
        data: roadmaps = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["roadmaps"],
        queryFn: async () => {
            const res = await axios.get("/api/roadmaps");
            return res.data;
        },
    });

    useEffect(() => {
        setRoadmapCount(roadmaps.length);
    }, [roadmaps, setRoadmapCount]);

    if (isLoading) return <div>Loading...</div>;
    if (isError)
        return (
            <div className="text-center py-20 text-red-400">
                Failed to load roadmaps.
            </div>
        );

    if (roadmaps.length === 0) {
        return (
            <div className="w-full py-20 glass-panel rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    📚
                </div>
                <h3 className="text-xl font-medium text-slate-300">
                    Your library is empty
                </h3>
                <p className="text-slate-500 text-sm mt-2 max-w-xs">
                    Generated roadmaps will appear here for you to track your
                    progress.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {roadmaps.map((obj: any, index: number) => {
                const roadmap = obj.roadmap;
                const isSelected = selectedSkill === roadmap.skill;

                return (
                    <motion.div
                        key={roadmap.skill + index}
                        whileHover={{ y: -4 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 18,
                        }}
                        className={`glass-panel rounded-2xl p-6 border transition-all duration-300 cursor-pointer
                            ${
                                isSelected
                                    ? "border-orange-400 bg-white/10 shadow-[0_0_8px_2px_rgba(255,165,0,0.5)]"
                                    : "border-white/5 hover:border-primary/30"
                            }`}
                        onClick={() => {
                            setSelectedSkill(roadmap.skill);
                            onViewRoadmap(roadmap);
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg truncate text-white">
                                {roadmap.skill}
                            </h3>
                            <span className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-full uppercase font-bold">
                                {roadmap.user_profile?.current_level || "Level"}
                            </span>
                        </div>

                        <p className="text-sm text-slate-400 mb-6">
                            Duration:{" "}
                            <span className="text-white font-medium">
                                {roadmap.user_profile?.total_weeks} Weeks
                            </span>
                        </p>

                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>Initial Progress</span>
                                <span>0%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "0%" }}
                                    transition={{ duration: 1 }}
                                    className="bg-primary h-2 rounded-full"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedSkill(roadmap.skill);
                                onViewRoadmap(roadmap);
                            }}
                            className={`w-full py-2.5 text-sm font-medium rounded-lg border transition-all duration-300
                                ${
                                    isSelected
                                        ? "bg-orange-400/20 border-orange-400 text-white"
                                        : "bg-white/5 border-white/10 text-white hover:bg-primary/20 hover:border-primary"
                                }`}
                        >
                            View Full Details
                        </button>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default RoadmapHistory;
