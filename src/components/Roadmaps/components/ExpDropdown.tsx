"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function ExperienceLevelDropdown({
    currentLevel,
    setCurrentLevel,
}: {
    currentLevel: string;
    setCurrentLevel: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
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
        <div className="relative space-y-2" ref={dropdownRef}>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
                Experience Level
            </label>

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-slate-200 flex items-center justify-between backdrop-blur-md hover:border-primary/50 transition-all"
            >
                <span>{currentLevel ? currentLevel : "Select Level"}</span>

                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={18} />
                </motion.div>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="absolute mt-2 w-full bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                        {levels.map((level) => (
                            <button
                                key={level}
                                onClick={() => {
                                    setCurrentLevel(level);
                                    setOpen(false);
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-white/10 transition-colors"
                            >
                                {level}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
