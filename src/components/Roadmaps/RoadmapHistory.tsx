"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Roadmap } from "@/utils/interfaces";
import {
    LayoutGrid,
    Clock,
    ChevronRight,
    BookOpen,
    AlertCircle,
    Loader2,
} from "lucide-react";

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

    if (isLoading)
        return (
            <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin opacity-50" />
                <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">
                    Accessing Archives...
                </p>
            </div>
        );

    if (isError)
        return (
            <div className="w-full py-20 bg-red-500/5 border border-red-500/20 rounded-[2rem] flex flex-col items-center gap-4">
                <AlertCircle className="text-red-500 w-8 h-8" />
                <div className="text-center">
                    <h3 className="text-white font-bold">
                        System Connection Failed
                    </h3>
                    <p className="text-red-400/60 text-sm">
                        Unable to retrieve roadmap history.
                    </p>
                </div>
            </div>
        );

    if (roadmaps.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full py-24 bg-[#0F111A]/40 backdrop-blur-md rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center px-6"
            >
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                    <div className="relative w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-slate-400" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                    Your Knowledge Vault is Empty
                </h3>
                <p className="text-slate-500 text-sm mt-3 max-w-sm leading-relaxed uppercase tracking-wider font-medium text-[10px]">
                    Generate your first intelligence roadmap above to begin your
                    specialized learning journey.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
                {roadmaps.map((obj: any, index: number) => {
                    const roadmap = obj.roadmap;
                    const isSelected = selectedSkill === roadmap.skill;

                    return (
                        <motion.div
                            layout
                            key={roadmap.skill + index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 },
                            }}
                            onClick={() => {
                                setSelectedSkill(roadmap.skill);
                                onViewRoadmap(roadmap);
                            }}
                            className={`group relative rounded-[2rem] p-7 cursor-pointer transition-all duration-500 overflow-hidden
                                ${
                                    isSelected
                                        ? "bg-primary/10 border-primary/40 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(var(--primary-rgb),0.1)]"
                                        : "bg-[#0F111A]/60 border-white/5 hover:border-white/20 hover:bg-[#161922]"
                                } border`}
                        >
                            {/* Animated Background Pattern */}
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                <LayoutGrid size={120} />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Badge & Level */}
                                <div className="flex items-center justify-between mb-6">
                                    <div
                                        className={`p-2 rounded-xl border ${isSelected ? "bg-primary/20 border-primary/20" : "bg-white/5 border-white/10"}`}
                                    >
                                        <BrainIcon
                                            className={`w-5 h-5 ${isSelected ? "text-primary" : "text-slate-400"}`}
                                        />
                                    </div>
                                    <span className="text-[9px] bg-white/5 border border-white/10 text-slate-400 px-3 py-1 rounded-full uppercase font-black tracking-widest">
                                        {roadmap.user_profile?.current_level ||
                                            "Standard"}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-bold text-xl text-white mb-2 tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                    {roadmap.skill}
                                </h3>

                                {/* Meta Info */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                                            {roadmap.user_profile?.total_weeks}{" "}
                                            Weeks
                                        </span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                                    <span className="text-[11px] font-bold text-primary uppercase tracking-tighter">
                                        AI Optimized
                                    </span>
                                </div>

                                {/* Progress Section */}
                                <div className="mt-auto space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                            Deployment Readiness
                                        </span>
                                        <span
                                            className={`text-xs font-bold ${isSelected ? "text-primary" : "text-white"}`}
                                        >
                                            0%
                                        </span>
                                    </div>
                                    <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: isSelected
                                                    ? "10%"
                                                    : "0%",
                                            }}
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-primary rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                                        />
                                    </div>
                                </div>

                                {/* Floating Action Arrow */}
                                <div
                                    className={`absolute bottom-7 right-7 p-2 rounded-full transition-all duration-300 transform 
                                    ${isSelected ? "bg-primary text-white scale-110 rotate-0" : "bg-white/5 text-slate-600 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 rotate-[-45deg]"}
                                `}
                                >
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

// Internal Helper Component for consistent styling
const BrainIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-3.5-6.5h-1c0 2.5-1.5 4.9-3.5 6.5S5 13 5 15a7 7 0 0 0 7 7z" />
        <path d="M12 2v2" />
        <path d="M12 11v2" />
        <path d="M12 18v2" />
    </svg>
);

export default RoadmapHistory;
