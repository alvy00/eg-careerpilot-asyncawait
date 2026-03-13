"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    BarChart,
    BarChart2,
    BarChart3,
    Layers,
} from "lucide-react";

const levels = [
    { name: "Beginner", icon: BarChart, desc: "Starting from scratch" },
    { name: "Intermediate", icon: BarChart2, desc: "Basic knowledge known" },
    { name: "Advanced", icon: BarChart3, desc: "Deepening expertise" },
];

export default function ExperienceLevelDropdown({
    currentLevel,
    setCurrentLevel,
}: {
    currentLevel: string;
    setCurrentLevel: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative space-y-4" ref={dropdownRef}>
            {/* Header / Label */}
            <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-500" />
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Current Level
                </label>
            </div>

            {/* Trigger Container */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`
                    w-full bg-white/[0.03] border rounded-2xl px-6 py-4 text-sm text-slate-200 
                    flex items-center justify-between backdrop-blur-md transition-all duration-300 shadow-inner
                    ${open ? "border-primary/50 bg-white/[0.06] ring-4 ring-primary/5" : "border-white/10 hover:border-white/20"}
                `}
            >
                <span className="font-medium tracking-wide italic">
                    {currentLevel ? currentLevel : "Select Expertise"}
                </span>

                <motion.div
                    animate={{
                        rotate: open ? 180 : 0,
                        color: open ? "#FB923C" : "#64748b",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <ChevronDown size={18} />
                </motion.div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute mt-3 w-full bg-[#161922] backdrop-blur-2xl border border-white/10 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[70] p-2"
                    >
                        <div className="flex flex-col gap-1">
                            {levels.map((level) => {
                                const isSelected = currentLevel === level.name;
                                return (
                                    <button
                                        key={level.name}
                                        onClick={() => {
                                            setCurrentLevel(level.name);
                                            setOpen(false);
                                        }}
                                        className="relative group w-full text-left px-4 py-3 rounded-xl transition-all duration-200 overflow-hidden"
                                    >
                                        {/* Hover/Active Highlight */}
                                        <motion.div
                                            className={`absolute inset-0 z-0 ${isSelected ? "bg-primary/10" : "bg-white/5 opacity-0 group-hover:opacity-100"}`}
                                            layoutId="dropdown-highlight"
                                        />

                                        {/* Content */}
                                        <div className="relative z-10 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <level.icon
                                                    className={`w-4 h-4 ${isSelected ? "text-primary" : "text-slate-500"}`}
                                                />
                                                <div>
                                                    <p
                                                        className={`text-sm font-semibold ${isSelected ? "text-white" : "text-slate-300"}`}
                                                    >
                                                        {level.name}
                                                    </p>
                                                    <p className="text-[10px] text-slate-500 font-medium">
                                                        {level.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#FB923C]"
                                                />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
